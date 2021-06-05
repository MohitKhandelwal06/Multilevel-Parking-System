const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const path = require ("path");
const app = express();
app.set("view engine","ejs");
const cookieParser = require('cookie-parser');
const body1 = require('body-parser');
app.use(body1.urlencoded({ extended: false }));
app.use(body1.json());
app.use(cookieParser());
//console.log(__dirname);
//const staticpath = path.join(__dirname,"../public");
//app.set("view engine","hbs");
//app.use(express.static(staticpath));
app.use(express.static(path.join(__dirname,"public")));
//app.use('/public/images/',express.static('./public/images'));
//console.log(path.join(__dirname,"../public"));
//const staticpath = path.join(__dirname,"../public");
const userRouter = require("./api/users/user.router");
app.use("/api/users",userRouter);

app.use(express.json());

// app.get("/",(req,res)=>
// {
//   res.sendFile(__dirname + "/ParkingSystemHome.html")
// }
app.get("/api",(req,res) =>
{
  //  res.sendFile(__dirname + '/static/index.html');
    res.json({
        success : 1,
        message: "this is rest api working"
    });
});

app.get("/",(req,res)=>
{
res.render("ParkingSystemHome");
})
app.get("/ParkingSystemLogin",(req,res)=>
{
  res.render("ParkingSystemLogin");
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
  });
  app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/static/home.html');
  });

  app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
    //res.sendFile(home2)
  });
  app.get('/logout',(req,res) =>
  {
    res.clearCookie("jwt");
    res.render("ParkingSystemHome");
  });
  
app.listen(process.env.APP_PORT, () =>
{
    console.log(`listening port no ${process.env.APP_PORT}`);
});


