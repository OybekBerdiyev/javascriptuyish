// foydalanish bo'yicha qo'llanma
// buy (mahsulot) (miqdori) (narxi) -- sotib olish
// sell (mahsulot) (miqdori) (narxi) -- sotish
// hisob -- umumiy foydani chiqarib beradi
// shows -- ombordagi mahsulotlarni chiqarib beradi

const Product = require("./models/Product");
const fs = require("fs");

const action = process.argv[2];

const bootstrap = async () => {
  if (action === "buy") {
    const name = process.argv[3];
    const count = process.argv[4];
    const price = process.argv[5];

    const products = JSON.parse(
      await fs.promises.readFile("./database/buy.json")
    );

    const findProduct = products.find((product) => product.name === name);

    if (!findProduct) {
      const id = products.length + 1;

      const newProduct = new Product(id, name, +count, +price);

      const data = products.length ? [...products, newProduct] : [newProduct];

      await fs.promises.writeFile(
        "./database/buy.json",
        JSON.stringify(data, null, 2)
      );
    } else {
      findProduct.count += +count;
      findProduct.price += +price;
      await fs.promises.writeFile(
        "./database/buy.json",
        JSON.stringify(products, null, 2)
      );
    }

  } else if (action === "sell") {
    const name = process.argv[3];
    const count = process.argv[4];
    const price = process.argv[5];

    const products = JSON.parse(
      await fs.promises.readFile("./database/buy.json")
    );

    const findProducts = products.find((product) => product.name === name);
    if (!findProducts || findProducts.count < count) {
      console.log("Bunday mahsulot mavjud emas");
      return;
    }
   
    const sells = JSON.parse(
      await fs.promises.readFile("./database/sell.json")
    );    

    const findProduct = sells.find((sells) => sells.name === name);
  
    
    if (!findProduct) {
      const id = sells.length + 1;

      const newProduct = new Product(id, name, +count, +price);

      const data = sells.length ? [...sells, newProduct] : [newProduct];
      await fs.promises.writeFile(
        "./database/sell.json",
        JSON.stringify(data, null, 2)
      ); 
    } else {
      findProduct.count += +count;
      findProduct.price += +price;
      await fs.promises.writeFile(
        "./database/sell.json",
        JSON.stringify(sells, null, 2)
      );
    }



    findProducts.count -= count;
    findProducts.price -= price;

    await fs.promises.writeFile(
      "./database/buy.json",
      JSON.stringify(products, null, 2)
    );



  } else if (action === "shows") {
    const products = JSON.parse(
      await fs.promises.readFile("./database/products.json")
    );

    console.table(products);
  } else if (action === "hisob") {

    let = priceOf_sell = 0
    const buy = JSON.parse(
      await fs.promises.readFile("./database/buy.json")
    );
    const sell = JSON.parse(
      await fs.promises.readFile("./database/sell.json")
    );
    

      for (let i = 0; i < sell.length; i++) {
        
        priceOf_sell += sell[i]["price"]
      }
    
      console.log(priceOf_sell);
  }
};

bootstrap();
