package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var DB *sql.DB

func main() {

	db, err := sql.Open("mysql", "root@tcp(127.0.0.1:3306)/testdb")
	if err != nil {
		panic("Unable to connect to database")
	}
	defer db.Close()
	DB = db

	router := mux.NewRouter()

	router.HandleFunc("/restaurants", getRestaurants).Methods("GET")
	router.HandleFunc("/order/create", createOrder).Methods("POST")
	router.HandleFunc("/products", getProducts).Methods("GET")
	http.ListenAndServe(":8000", router)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Content-Type", "text/html; charset=utf-8")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

type Resturant struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	Status    int    `json:"status"`
	CreatedAt string `json:"created_at"`
}

func getRestaurants(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	var restaurants []Resturant

	result, err := DB.Query("SELECT id, name, status, created_at from restaurants")

	if err != nil {
		panic(err.Error())
	}

	defer result.Close()
	for result.Next() {
		var resturant Resturant
		err := result.Scan(&resturant.Id, &resturant.Name, &resturant.Status, &resturant.CreatedAt)
		if err != nil {
			panic(err.Error())
		}
		restaurants = append(restaurants, resturant)
	}

	json.NewEncoder(w).Encode(restaurants)
}

type OrderRequest struct {
	Product    int
	Quantity   int
	Indication string
}

type CreateOrderRequest struct {
	UserId int
	Orders []OrderRequest
}

type CreateOrderResponse struct {
	Status  bool
	Message string
}

func createOrder(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)

	var createOrderRequest_ CreateOrderRequest
	err := decoder.Decode(&createOrderRequest_)

	if err != nil {
		panic(err.Error())
	}

	tx, err := DB.Begin()
	stmt, _ := DB.Prepare("INSERT INTO `orders` (`user_id`, `product_id`, `quantity`, `indication`) VALUES (?, ?, ?, ?)")

	for _, o := range createOrderRequest_.Orders {
		stmt.Exec(createOrderRequest_.UserId, o.Product, o.Quantity, o.Indication)
		if err != nil {
			panic(err.Error())
		}
	}

	tx.Commit()

	var res CreateOrderResponse
	res.Message = "Order has been placed"
	res.Status = true

	json.NewEncoder(w).Encode(res)
}

type Product struct {
	Id           int
	Name         string
	Price        int
	ProductId    int
	Product      string
	RestaurantId int
	Restaurant   string
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	var response []Product

	result, err := DB.Query("select p.id as Id, p.name as Name, p.price as Price, t.id as ProductId, t.name as Product, r.id as RestaurantId, r.name as Restaurant from products as p left join product_type as t on p.product_type = t.id left join restaurants as r on p.resturant = r.id order by t.id")

	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var res Product
		err := result.Scan(&res.Id, &res.Name, &res.Price, &res.ProductId, &res.Product, &res.RestaurantId, &res.Restaurant)
		if err != nil {
			panic(err.Error())
		}
		response = append(response, res)
	}

	json.NewEncoder(w).Encode(response)
}
