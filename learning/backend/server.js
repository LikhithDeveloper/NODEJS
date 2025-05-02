const express = require("express");
const app = express();
port = 3000;

// middlewares :- these are the things that execute between the server request and route or [ it will execute before running a route ]
// server request(frontend request) ---> middleware ---> route(backend or server) ---> response
// middleware code:

app.use((req, res, next) => {
  console.log("Middleware running-1");
  next(); // next used to come out and go next to the middleware
});

app.use((req, res, next) => {
  console.log("Middleware running-2");
  next(); // next used to come out and go next to the middleware
});
app.use(express.json()); // used to parse the data coming from the frontend supports for text and json
app.use(express.urlencoded({ extended: true })); // used to parse the data coming from the frontend forms supports for form data

// we can write any logic in this

// applying middleware to specific routes this is type one
// const addition = (req, res, next) => {
//   console.log("----------------");
//   console.log(req);
//   console.log("----------------");
//   const { a, b } = req.body;
//   req.c = Number(a) + Number(b);
//   next();
// };
// ---------- route --------------
// app.post("/about/:id", addition, (req, res) => {
//   res.send({ message: req.c, status: "200" });
// });
// -------------------------------

// this type 2 of writing middlewares in express
app.use("/about/:id", (err, req, res, next) => {
  if (err) {
    console.err(err);
  }
  console.log("----------------");
  //   console.log(req);
  console.log("----------------");
  const { a, b } = req.body;
  req.c = Number(a) + Number(b);
  next();
});
app.post("/about/:id", (req, res) => {
  res.send({ message: req.c, status: "200" });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("Server is running");
});
