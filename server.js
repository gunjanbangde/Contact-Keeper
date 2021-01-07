const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.get("/", (req, res) => res.json({ message: "Hello" }));

//Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
