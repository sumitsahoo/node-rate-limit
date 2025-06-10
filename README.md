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

## 🧠 How Does express-rate-limit Work?

The `express-rate-limit` middleware works by tracking requests from each client (typically by IP address) and enforcing limits based on a configurable time window. Here’s the core logic it implements:

- **Request Counting:** For each incoming request, it identifies the client (by default, using the IP address) and increments a counter for that client.
- **Time Window:** The counter is reset after a specified time window (`windowMs`).
- **Limit Enforcement:** If the client’s request count exceeds the allowed maximum (`max`) within the window, further requests are blocked and a custom response (e.g., an error message) is sent.
- **Custom Responses:** You can customize the response sent when the limit is exceeded (e.g., status code, message).
- **Flexible Storage:** By default, it uses in-memory storage, but you can use external stores (like Redis) for distributed rate limiting.
- **Key Generation:** You can customize how clients are identified (e.g., by user ID, API key, or IP address).

This logic helps protect your API from abuse and ensures fair usage among clients.

## ▶️ How to Run

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server in development mode (auto-reload):
   ```sh
   npm run dev
   ```
3. Start the server in production mode with PM2:
   ```sh
   npm start
   ```
   This runs:
   ```sh
   pm2 start app.js --name rate-limit-app
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Running & Monitoring with PM2

This project uses [PM2](https://pm2.keymetrics.io/) for advanced process management and clustering in production environments.

- **List all processes:**
  ```sh
  pm2 list
  ```
- **View logs:**
  ```sh
  pm2 logs rate-limit-app
  ```
- **Monitor resource usage (live):**
  ```sh
  pm2 monit
  ```
- **Stop the app:**
  ```sh
  pm2 stop rate-limit-app
  ```
- **Restart the app:**
  ```sh
  pm2 restart rate-limit-app
  ```
- **Delete the app from PM2:**
  ```sh
  pm2 delete rate-limit-app
  ```

For more, see the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).

## 🐳 Docker & Production Deployment

> **Important:** Do **not** use PM2 or clustering inside Docker containers or on platforms like GCP Cloud Run. Run a single Node.js process per container. Let Docker or your cloud platform handle scaling and process management for best performance and reliability.

**Recommended production start script for Docker:**
```json
"scripts": {
  "start": "node app.js"
}
```


## 📁 Project Structure
```
app.js           # Main Express server with rate limit and slow down
public/index.html # Static HTML page
```

## 📝 License
MIT
