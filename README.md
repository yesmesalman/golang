## Go Food Order test application

In this application user would be able to order food from a restaurant so that the restaurant prepares it and I can receive it at my home.
The customers will select the restaurant of his choice and then select the food he wants to order, it might be appetizers, main dishes, and entrées, side dishes, and drinks as well. The customer will be able to put indications on each product and order several products of the same type.


### Usage
- clone repo using url ```https://github.com/yesmesalman/golang.git``` and checkout to master branch using ```git checkout master```
- repo contains ```db.sql``` file for database you can import the file in you mysql
- repo also contains postman collection JSON file so you can check APIs
- dir ```/server/``` contains backend go lang project with have APIs for the task. i can be run by ``` go run .\main.go ``` then application will start listening at port ```8000```  with full url ``` http://localhost:8000```
- You will have to change database credentials in file ```/server/main.go ``` in ```main``` function
- One server starts running you can go to ```cd ./frontend/ ``` and install required libraries using ```npm install``` start frontend React project with command ``` npm start ``` then frontend application will start running on ```http://localhost:3000/``` if you didn't change default port.