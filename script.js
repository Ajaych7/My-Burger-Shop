function getMenu() {
    fetch("https://free-food-menus-api-production.up.railway.app/burgers")
      .then(response => response.json())
      .then(data => {
        const menu = document.getElementById("menu");
        data.forEach(item => {
          const div = document.createElement("div");
          div.innerText = `${item.name}: $${item.price}`;
          menu.appendChild(div);
        });
      });
  }
  
  function takeOrder() {
    const burgers = ["Cheeseburger", "Bacon Burger", "Mushroom Swiss Burger", "Veggie Burger"];
    const order = {};
    for (let i = 0; i < 3; i++) {
      const burger = burgers[Math.floor(Math.random() * burgers.length)];
      order[burger] = (order[burger] || 0) + 1;
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(order);
      }, 2500);
    });
  }
  
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  function thankyouFnc() {
    const thankyou = document.getElementById("thankyou");
    thankyou.innerText = "Thank you for your order!";
    alert('Thank you for your payment!');
  }
  
  async function placeOrder() {
    const status = document.getElementById("status");
    const payment = document.getElementById("payment");
  
    status.innerText = "Placing order...";
    const order = await takeOrder();
  
    status.innerText = "Preparing order...";
    const prep = await orderPrep();
  
    if (prep.order_status) {
      status.innerText = "Processing payment...";
      const pay = await payOrder();
  
      if (pay.paid) {
        status.innerText = "";
        payment.innerText = "Payment received.";
        thankyouFnc();
      } else {
        status.innerText = "Payment failed.";
      }
    } else {
      status.innerText = "Order failed.";
    }
  }
  