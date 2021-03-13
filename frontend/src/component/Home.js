import React, { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(false);
  const [orders, setOrders] = useState([]);
  var totalAmount = 0

  useEffect(async () => {
    let res = await fetch(`http://localhost:8000/products`, {
      method: "GET",
    });
    res = await res.json();
    setProducts(res);
    getRestaurants(res);
  }, []);

  const getRestaurants = (data) => {
    var resArr = [];
    data.forEach(function (item) {
      var i = resArr.findIndex((x) => x.RestaurantId == item.RestaurantId);
      if (i == -1) {
        resArr.push(item);
      }
    });
    setRestaurant(resArr);
  };

  const onRestaurantChange = (e) => {
    e = e.target.value;
    if (e == 0) return;

    setSelectedRestaurant(e);
  };

  const getProducts = (p, r) => {
    var resArr = [];
    products.forEach(function (item) {
      if (item.ProductId == p && item.RestaurantId == r) resArr.push(item);
    });
    return resArr;
  };

  const addtoOrders = (e) => {
    const arr = orders.filter((e, index) => e.Id !== e.id);
    setOrders([...arr, e]);
  };

  const addtoBasket = (e) => {
    let itemid = e.target.getAttribute("item");
    let itemname = e.target.getAttribute("itemname");
    let state = e.target.getAttribute("state");
    let itemprice = e.target.getAttribute("itemprice");
    let qty = e.target.previousSibling.value;

    if (!qty || qty < 1) {
      qty = 1;
      e.target.previousSibling.value = 1;
    }

    let preference =
      e.target.parentNode.parentNode.nextSibling.childNodes[0].childNodes[1]
        .value;

    addtoOrders({
      id: itemid,
      name: itemname,
      qty: qty,
      preference: preference,
      price: itemprice,
    });

    if (state == 1) {
      e.target.innerHTML = "Confirm";
      e.target.parentNode.parentNode.nextSibling.classList.toggle("d-none");
      e.target.classList.add("btn-success");
      e.target.setAttribute("state", 2);
    } else if (state == 2) {
      e.target.innerHTML = "Update";
      e.target.classList.add("btn-info");
      e.target.setAttribute("state", 3);
    }
  };

  return (
    <div className="app-container">
      <div className="row">
        <div className="col-6">
          <h2>Place Your order</h2>
          <div className="form-group">
            <label>Select Restaurant</label>
            <select className="form-control" onChange={onRestaurantChange}>
              <option key={0} value="0">
                -- Select Restaurant --
              </option>
              {restaurant.map((r, i) => {
                return (
                  <option key={i} value={r.RestaurantId}>
                    {r.Restaurant}
                  </option>
                );
              })}
            </select>
          </div>
          {selectedRestaurant && (
            <div className="card">
              <div className="card-body">
                <h3>Menu</h3>
                <hr />
                <div className="menu-section">
                  <h6>Appetizers</h6>
                  {getProducts(1, selectedRestaurant).map((item, i) => {
                    return (
                      <div className="menu-item" key={i}>
                        <div className="menu-item-top">
                          <div className="menu-item-left">
                            <span className="price">
                              <b>${item.Price}.00</b>
                            </span>
                            <span>
                              <b>{item.Name}</b>
                            </span>
                          </div>
                          <div className="menu-item-right">
                            <input type="number" placeholder={"Qty"} />
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                addtoBasket(e);
                              }}
                              item={item.Id}
                              itemname={item.Name}
                              itemprice={item.Price}
                              state="1"
                            >
                              Add to basket
                            </button>
                          </div>
                        </div>
                        <div className="menu-item-bottom d-none">
                          <div className="form-group">
                            <label>Any Preference</label>
                            <textarea
                              className="form-control"
                              id=""
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="menu-section">
                  <h6>Entrées</h6>
                  {getProducts(3, selectedRestaurant).map((item, i) => {
                    return (
                      <div className="menu-item" key={i}>
                        <div className="menu-item-top">
                          <div className="menu-item-left">
                            <span className="price">
                              <b>${item.Price}.00</b>
                            </span>
                            <span>
                              <b>{item.Name}</b>
                            </span>
                          </div>
                          <div className="menu-item-right">
                            <input type="number" placeholder={"Qty"} />
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                addtoBasket(e);
                              }}
                              item={item.Id}
                              itemname={item.Name}
                              itemprice={item.Price}
                              state="1"
                            >
                              Add to basket
                            </button>
                          </div>
                        </div>
                        <div className="menu-item-bottom d-none">
                          <div className="form-group">
                            <label>Any Preference</label>
                            <textarea
                              className="form-control"
                              id=""
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="menu-section">
                  <h6>Side Dishes</h6>
                  {getProducts(4, selectedRestaurant).map((item, i) => {
                    return (
                      <div className="menu-item" key={i}>
                        <div className="menu-item-top">
                          <div className="menu-item-left">
                            <span className="price">
                              <b>${item.Price}.00</b>
                            </span>
                            <span>
                              <b>{item.Name}</b>
                            </span>
                          </div>
                          <div className="menu-item-right">
                            <input type="number" placeholder={"Qty"} />
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                addtoBasket(e);
                              }}
                              item={item.Id}
                              itemname={item.Name}
                              itemprice={item.Price}
                              state="1"
                            >
                              Add to basket
                            </button>
                          </div>
                        </div>
                        <div className="menu-item-bottom d-none">
                          <div className="form-group">
                            <label>Any Preference</label>
                            <textarea
                              className="form-control"
                              id=""
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="menu-section">
                  <h6>Dishes</h6>
                  {getProducts(2, selectedRestaurant).map((item, i) => {
                    return (
                      <div className="menu-item" key={i}>
                        <div className="menu-item-top">
                          <div className="menu-item-left">
                            <span className="price">
                              <b>${item.Price}.00</b>
                            </span>
                            <span>
                              <b>{item.Name}</b>
                            </span>
                          </div>
                          <div className="menu-item-right">
                            <input type="number" placeholder={"Qty"} />
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                addtoBasket(e);
                              }}
                              item={item.Id}
                              itemname={item.Name}
                              itemprice={item.Price}
                              state="1"
                            >
                              Add to basket
                            </button>
                          </div>
                        </div>
                        <div className="menu-item-bottom d-none">
                          <div className="form-group">
                            <label>Any Preference</label>
                            <textarea
                              className="form-control"
                              id=""
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="menu-section">
                  <h6>Drink</h6>
                  {getProducts(5, selectedRestaurant).map((item, i) => {
                    return (
                      <div className="menu-item" key={i}>
                        <div className="menu-item-top">
                          <div className="menu-item-left">
                            <span className="price">
                              <b>${item.Price}.00</b>
                            </span>
                            <span>
                              <b>{item.Name}</b>
                            </span>
                          </div>
                          <div className="menu-item-right">
                            <input type="number" placeholder={"Qty"} />
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                addtoBasket(e);
                              }}
                              item={item.Id}
                              itemname={item.Name}
                              itemprice={item.Price}
                              state="1"
                            >
                              Add to basket
                            </button>
                          </div>
                        </div>
                        <div className="menu-item-bottom d-none">
                          <div className="form-group">
                            <label>Any Preference</label>
                            <textarea
                              className="form-control"
                              id=""
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-6">
          {orders.length > 0 && (
            <div className="card" style={{ marginTop: 80 }}>
              <div className="card-body">
                <h3>Orders</h3>
                {orders.map((item, i) => {
                  let itemPrice = item.price * item.qty
                  totalAmount += itemPrice
                  return (
                    <div className="order-row" key={i}>
                      <span>
                        {item.name} @ {item.price} x {item.qty}
                      </span>
                      <span>
                        <b>${itemPrice}.00</b>
                      </span>
                    </div>
                  );
                })}
                <div className="order-total-row">
                  <span> Total Amount </span>
                  <span>
                    <b>${totalAmount}.00</b>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
