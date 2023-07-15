const menuItems = document.getElementById("menu-items")

const apiData = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`

async function fetchFoods(){
    try {

        const response = await fetch(apiData, {
            method : 'get'
        });
        const data = await response.json();
        renderData(data);
        
    } catch (error) {
        console.log("Error while fetching:",error)
        menuItems.style.display = 'flex';
        const para = document.createElement('p')
        para.innerText = 'No Details Found';
        menuItems.appendChild(para);
    }
}


function renderData(data){
    menuItems.innerHTML = '';
    data.forEach(foodItems => {
        menuItems.innerHTML += `
                            <div class="food-item-card">
                                <div class="food-image">
                                    <img src="${foodItems.imgSrc}" alt="burger-img">
                                </div>
                                <div class="food-desc">
                                    <div class="title-price">
                                        <div class="title">${foodItems.name}</div>
                                        <div class="price">$${foodItems.price}/-</div>
                                    </div>
                                    <button class="add-btn">
                                        <img src="./Assets/add.png" alt="add-btn">
                                    </button>
                                </div>
                            </div>
                                `
    });
}

let foodOrderList = [
    {
        id : 1,
        imgSrc: "https://source.unsplash.com/random/1920x1080/?cheeseburger",
        name: "Cheeseburger",
        price: 5.99
    },
    {
        id : 1,
        imgSrc: "https://source.unsplash.com/random/1920x1080/?cheeseburger",
        name: "Cheeseburger",
        price: 5.99
    },
    {
        id : 1,
        imgSrc: "https://source.unsplash.com/random/1920x1080/?cheeseburger",
        name: "Cheeseburger",
        price: 5.99
    },
];


// Take order of the user
function takeOrder() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            const order = {
                foodOrder: foodOrderList
            }
            resolve(order);
        }, 2500);
    });
}



// prepare a order for the user
function orderPrep(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                order_status:true,
                paid:false
            })
        }, 1500);
    });
}

// User Payment
function payOrder(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                order_status:true,
                paid:true
            })
        }, 1000);
    })
}


//give the confirmation of the order

function thankyouFnc(){
    alert("Thankyou for eating with us today!")
}

fetchFoods();

takeOrder()
.then(order => {
    console.log("order:", order);
    return orderPrep();
})
.then(orderStatus =>{
    console.log("Order_Status:", orderStatus)
    return payOrder();
})
.then(paymentStatus =>{
    console.log("Payment_Status:", paymentStatus)
    return thankyouFnc();
})
.catch(error => {
    alert('Your order cannot be fulfilled, Sorry for Inconvenience.');
    console.log("Error:",error);
})
