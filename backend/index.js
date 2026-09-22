require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/db");

// routes
const userRoutes = require("./routes/user-routes");
const passwordRoutes = require("./routes/password-routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        // origin: "http://localhost:5173",
        origin: "https://passguard0.vercel.app",
        credentials: true,
    }),
);

app.get("/", (req, res) => {
    res.send("Pass Guard, Manager.");
});

app.use("/user", userRoutes);
app.use("/password", passwordRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
