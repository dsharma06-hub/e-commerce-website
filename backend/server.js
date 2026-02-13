const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------ DATA (TEMP STORAGE) ------------------ */
let products = [];
let users = [];
let cart = [];
let orders = [];

/* ------------------ MIDDLEWARE ------------------ */
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

/* ------------------ PRODUCTS API ------------------ */
app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  // Validation
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  const product = {
    id: products.length + 1,
    name,
    price
  };

  products.push(product);
  res.status(201).json(product);
});

/* ------------------ USERS API ------------------ */
app.post("/users/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  users.push({ email, password });
  res.json({ message: "User registered successfully" });
});

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", token: "dummy-token" });
});

/* ------------------ CART API ------------------ */
app.post("/cart", authMiddleware, (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  cart.push({ productId, quantity });
  res.json({ message: "Item added to cart" });
});

app.get("/cart", authMiddleware, (req, res) => {
  res.json(cart);
});

/* ------------------ ORDERS API ------------------ */
app.post("/orders", authMiddleware, (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = {
    id: orders.length + 1,
    items: cart
  };

  orders.push(order);
  cart = [];

  res.json({ message: "Order placed successfully", order });
});

/* ------------------ ERROR HANDLING ------------------ */
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});

/* ------------------ SERVER ------------------ */
app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
