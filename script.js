```javascript
/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


/* Close mobile menu after clicking */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });

});


/* =========================
   QUANTITY
========================= */

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const quantityInput = document.getElementById("quantity");
const totalBox = document.getElementById("total");

const productPrice = 799;


function updateTotal() {

    let quantity = parseInt(quantityInput.value);

    if (quantity < 1) {
        quantity = 1;
    }

    if (quantity > 10) {
        quantity = 10;
    }

    quantityInput.value = quantity;

    const total = productPrice * quantity;

    totalBox.textContent = "৳" + total.toLocaleString("en-BD");
}


plusBtn.addEventListener("click", () => {

    let quantity = parseInt(quantityInput.value);

    if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
        updateTotal();
    }

});


minusBtn.addEventListener("click", () => {

    let quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotal();
    }

});


/* =========================
   ORDER FORM
========================= */

const orderForm = document.getElementById("orderForm");
const successMessage = document.getElementById("successMessage");
const newOrderBtn = document.getElementById("newOrder");


orderForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const quantity = quantityInput.value;

    if (!name || !phone || !address) {
        alert("Please fill in all required fields.");
        return;
    }


    /* Basic Bangladesh phone validation */

    const phonePattern = /^(01)[3-9]\d{8}$/;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid Bangladesh mobile number.");
        return;
    }


    const orderData = {

        product: "Dragon Powar Perfume",

        customerName: name,

        phone: phone,

        quantity: quantity,

        total: productPrice * quantity,

        address: address,

        orderTime: new Date().toLocaleString()

    };


    /*
       Demo storage.

       Orders are saved in browser LocalStorage.
       Later this can be connected to MySQL,
       Firebase, Google Sheets or an Admin Portal.
    */

    let orders = JSON.parse(
        localStorage.getItem("dragonPowarOrders")
    ) || [];

    orders.push(orderData);

    localStorage.setItem(
        "dragonPowarOrders",
        JSON.stringify(orders)
    );


    orderForm.style.display = "none";

    successMessage.style.display = "block";

});


/* =========================
   NEW ORDER
========================= */

newOrderBtn.addEventListener("click", () => {

    orderForm.reset();

    quantityInput.value = 1;

    updateTotal();

    successMessage.style.display = "none";

    orderForm.style.display = "block";

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".about-card, .review-card, .note, .order-box"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});


/* =========================
   INITIAL TOTAL
========================= */

updateTotal();
```
