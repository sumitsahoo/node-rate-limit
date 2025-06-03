# 🚦 Express Rate Limit & Slow Down Example

> **Reference:** [Securing APIs with Express Rate Limit and Slow Down (MDN Blog)](https://developer.mozilla.org/en-US/blog/securing-apis-express-rate-limit-and-slow-down/)

This project demonstrates how to use rate limiting and speed limiting (slow down) in an Express.js application using the `express-rate-limit` and `express-slow-down` middleware.

## ⏳ What is Rate Limiting?

**Rate limiting** is a technique used to control the number of requests a client can make to a server within a specified time window. It helps protect your application from abuse, brute-force attacks, and accidental overload by limiting how often a user can hit your endpoints.

## 🐢 What is Speed Limiting (Slow Down)?

**Speed limiting** (or slow down) delays responses for clients who exceed a certain number of requests, rather than blocking them outright. This discourages excessive requests while still allowing access, just at a slower rate.

## ⚙️ How is it Implemented Here?

This app uses two middlewares:

- [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit): Blocks requests that exceed a set limit within a time window.
- [`express-slow-down`](https://www.npmjs.com/package/express-slow-down): Adds a delay to responses after a certain number of requests.

### 🛠️ Configuration Used

#### 🚫 Rate Limiter
```js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Go away you spammer!",
});
```
- **windowMs**: Time window for rate limiting (15 minutes).
- **max**: Maximum number of requests allowed per IP in the window (5 requests).
- **message**: Custom message sent when the limit is exceeded.

#### 🕒 Speed Limiter
```js
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 1, // allow 1 request per 15 minutes without delay
  delayMs: () => 2000, // add 2 seconds delay per request after the first
});
```
- **windowMs**: Time window for speed limiting (15 minutes).
- **delayAfter**: Number of requests allowed before delays are applied (1 request).
- **delayMs**: Delay (in ms) added to each request after the threshold (2 seconds).

### 🔧 Possible Configurations
- **windowMs**: Adjust the time window (e.g., 1 minute, 1 hour).
- **max**: Set a higher or lower request limit based on your needs.
- **delayAfter**: Allow more or fewer requests before slowing down.
- **delayMs**: Increase or decrease the delay per request.
- **message**: Customize the response message for blocked requests.

## ▶️ How to Run

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
app.js           # Main Express server with rate limit and slow down
public/index.html # Static HTML page
```

## 📝 License
MIT
