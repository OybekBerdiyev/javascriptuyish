const http = require("http");
const bodyParser = require("./bodyParser");
const Io = require("./utils/io");
const Todos2 = new Io("./database/sell.json");
const Todos = new Io("./database/buy.json");
const Product = require("./models/Product"); 

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/buy" && req.method === "POST") {
    req.body = await bodyParser(req);
  
    const {name, count, price} = req.body;

    const products = await Todos.read();
    const findProduct = products.find((product) => product.name === name);
    if (!findProduct) {
        const id = (products[products.length - 1]?.id || 0) + 1;       

        const newData = new Product(id, name, +count, +price);
        const result = products.length ? [...products, newData] : [newData];    
        await Todos.write(result);
    }else{
        findProduct.count += +count;
        findProduct.price += +price;
        await Todos.write(products)
    } 
    res.writeHead(201, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({message:"Sotib olindi"}));

    }
    else if(req.url === "/sell" && req.method === "POST"){

        req.body = await bodyParser(req);
        const {name, count, price} = req.body;
    
        const mahsulot = await Todos.read();
        const findProducts = mahsulot.find((product) => product.name === name);
        if (!findProducts || findProducts.count < count) {
            res.writeHead(404, {
                "Content-Type": "application/json",
              });
            res.end(JSON.stringify({message:"Bunday mahsulot mavjud emas"}));
            return
        }else{
            findProducts.count -= count;
            findProducts.price -= price;
            await Todos.write(mahsulot)
        }

        const products = await Todos2.read();
        const findProduct = products.find((product) => product.name === name);
        if (!findProduct) {
            const id = (products[products.length - 1]?.id || 0) + 1;       
    
            const newData = new Product(id, name, +count, +price);
            const result = products.length ? [...products, newData] : [newData];    
            await Todos2.write(result);
            res.writeHead(200, {
                "Content-Type": "application/json",
              });
              res.end(JSON.stringify({message:"Sotildi"}));
        }else{
            findProduct.count += +count;
            findProduct.price += +price;
            await Todos2.write(products)
            res.writeHead(200, {
                "Content-Type": "application/json",
              });
              res.end(JSON.stringify({ message: "Sotildi" }));
        } 
          
    } else if (req.url === "/hisob" && req.method === "GET") {
        let = priceOf_sell = 0
        const sell = await Todos2.read()
        for (let i = 0; i < sell.length; i++) {
            priceOf_sell += sell[i]["price"]
        }
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({priceOf_sell}));
    }
  });
  
  server.listen(4000, "localhost", () => {
    console.log("4000");
  });
  