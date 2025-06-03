import express from "express";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import compression from "compression";

const app = express();
const port = 3000;

const limiter = rateLimit({
	// 15-minute time window for rate limiting (in milliseconds)
	windowMs: 15 * 60 * 1000, 
	// Limit each IP to 5 requests per 15 minutes
	max: 5, 
	// Custom message sent when rate limit is exceeded
	message: "Go away you spammer! 😡",
});

const speedLimiter = slowDown({
	// 15-minute time window for slowdown checks (in milliseconds)
	windowMs: 15 * 60 * 1000, 
	// Allow 1 request per 15 minutes, then delay each subsequent request
	delayAfter: 1, 
	// Delay (in ms) to apply to each request after delayAfter is reached
	delayMs: () => 2000,
});

app.use(compression());
app.use(speedLimiter);
app.use(limiter);
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
