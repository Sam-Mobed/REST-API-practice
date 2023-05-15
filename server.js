//import dependency, similar to importing a module/library
const express = require("express");

//setup the express server by creating an instance of the express class
const app = express();
//in the tutorial, the port value is hard coded to 3000,
//but I decidede to use the environment variable instead
const port = process.env.port;

//import middlware into express
//the following line sets a limit on the size of the JSON payload
//that can be parsed by the middleware
//by including this middleware, any incoming request with JSON can be
//parsed and made available on req.body
app.use(express.json({ limit: "100mb" }));

//here we are importing and assigning two router modules defined in ./routes
//in the express.js framework, routers aare used to define separate sets of routes
//for different parts of the app
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/messages");

//we mount the two modules that we imported to specific paths.
//any requests to these paths will be handled by the appropriate router module
app.use("/api/messages", messageRouter);
app.use("/api/auth", authRouter);

//start the server
app.listen(port, () =>{
    console.log(`Listening on port ${port}...`);
});