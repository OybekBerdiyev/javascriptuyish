const product = document.getElementById("product");
const count = document.getElementById("count"); 
const price = document.getElementById("price");
const buy = document.getElementById("buy");
const sell = document.getElementById("sell");
const hisob = document.getElementById("hisob")
const div  = document.querySelector("div")

async function logSellResponse() {
  try {
    const response = await fetch("http://localhost:4000/sell");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Backenddan javob olishda xatolik yuz berdi:", error);
  }
}

async function bootstrap() {
  try {
    const data = await fetch("http://localhost:4000/hisob");
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    console.error("Backenddan javob olishda xatolik yuz berdi:", error);
    return null;
  }
}


buy.addEventListener("click", async (e) => {
  e.preventDefault();
  const productValue = product.value;
  const countValue = +count.value;
  const priceValue = +price.value;
  
  let olish = await fetch("http://localhost:4000/buy", {
    body: JSON.stringify({ name: productValue, count: countValue, price: priceValue}),
    method: "POST",
  });
  const olishData = await olish.json();
  div.innerHTML = JSON.stringify(olishData.message);
  product.value = ""
  count.value = ""
  price.value = ""
});

sell.addEventListener("click", async (e) => {
  e.preventDefault();
  const productValue = product.value;
  const countValue = count.value;
  const priceValue = price.value;

  let sotish = await fetch("http://localhost:4000/sell", {
    body: JSON.stringify({ name: productValue, count: countValue, price: priceValue }),
    method: "POST",
  })

  const sotishData = await sotish.json();
  div.innerHTML = JSON.stringify(sotishData.message);
  product.value = ""
  count.value = ""
  price.value = ""
});


hisob.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await bootstrap();
  div.innerHTML = JSON.stringify(res.priceOf_sell);
});
