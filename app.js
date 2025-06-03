import express from "express";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const app = express();
const port = 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // limit each IP to 5 requests per windowMs
	message: "Go away you spammer! 😡",
});

const speedLimiter = slowDown({
	windowMs: 15 * 60 * 1000, // 15 minutes
	delayAfter: 1, // allow 1 request per 15 minutes
	delayMs: () => 2000,
});

app.use(speedLimiter);
app.use(limiter);
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
