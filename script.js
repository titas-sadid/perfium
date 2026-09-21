```javascript
/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuBtn.textContent = "☰";

    });

});


/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);


const animationObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                animationObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {

    animationObserver.observe(element);

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

    totalBox.textContent =
        "৳" + total.toLocaleString("en-BD");

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

const successMessage =
    document.getElementById("successMessage");

const newOrderBtn =
    document.getElementById("newOrder");


orderForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const quantity =
        parseInt(quantityInput.value);


    if (!name || !phone || !address) {

        alert("Please fill in all required fields.");

        return;

    }


    /* Bangladesh mobile validation */

    const phonePattern =
        /^(01)[3-9]\d{8}$/;


    if (!phonePattern.test(phone)) {

        alert(
            "Please enter a valid Bangladesh mobile number."
        );

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


    /* Save demo order */

    let orders =
        JSON.parse(
            localStorage.getItem(
                "dragonPowarOrders"
            )
        ) || [];


    orders.push(orderData);


    localStorage.setItem(
        "dragonPowarOrders",
        JSON.stringify(orders)
    );


    /* Show success */

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
   YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   INITIAL TOTAL
========================= */

updateTotal();
```
