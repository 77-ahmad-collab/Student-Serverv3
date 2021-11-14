const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     allowedHeaders: true,
//     exposedHeaders: ["Content-Length", "X-FOO", "X-BAR"],
//   })
// );
app.use(cors({ credentials: true }))

// app.options('/login', function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.end();
// });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   res.header("Access-Control-Expose-Headers");

//   next();
// });


// const corsOpts = {
//   origin: '*',

//   methods: [
//     'GET',
//     'POST',
//   ],

//   allowedHeaders: [
//     'Content-Type:text/plain',
//   ],
// };
// app.use(cors(corsOpts));

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
const router = require("./Rout/router");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router);

app.listen(PORT, () => {
  console.log("app is listening on port 5000");
});
