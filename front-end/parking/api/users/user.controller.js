
const { sign} = require("jsonwebtoken");
const {getUserByUserEmail,create,create2,create3,create4,create5,create6} = require("./user.service");
var err_msg ='';
module.exports = {

login: (req,res) => {   
const body = req.body;
console.log(body);
//console.log("result" +result);
getUserByUserEmail(body.email,(err,result) => {
    if(err)
    {
        console.log(err);
}
if(!result) {
    err_msg= "invalid";
    res.render("ParkingSystemLogin", { err_msg: err_msg });

    // return res.json({
    //     success: 0,
    //     data: "undefined"
    // });   
    console.log(result +"variable");
}
//const results = compareSync(body.password,result.password);
if(body.password === result.password){
    
    result.password=undefined;
    const jsontoken = sign({results:result},"qwe1234",{
        expiresIn: '1h'

    });
    res.cookie("jwt",jsontoken,{

        expires:new Date(Date.now() + 60000),
        httpOnly:true
    });
    
    // return res.send({
    //     success: 1,
    //     message:"login successfully",
    //     token: jsontoken
    // });

    return res.render("home2");
}else {
    err_msg="invalid";
    return res.render("ParkingSystemLogin",{err_msg: err_msg});
    // return res.send({
    //     success: 0,
    //     data: "invalid email or password"
    // });
}
});
},
//   ""
checkin:(req,res)=> {
    const body = req.body;
    console.log(body);

   //const salt = genSaltSync(10); 
    //body.password = hashSync(body.password,salt);

    create(body, (error,result) =>
    {
        if(error) {
            console.log(error);
            return;
        }
        if(!result) {
            return res.json({
                success: 0,
                message: "record not found"
            });
        }
        
        return res.json ({
            success: 1,
            data: result
        });
            });
        },
    


checkout:(req,res) => {
    const body = req.body;
    console.log(body);

   //const salt = genSaltSync(10); 
    //body.password = hashSync(body.password,salt);

    create2(body, (error,result) =>
    {
        if(error) {
            console.log(error);
            return;
        }
        if(!result) {
            return res.json({
                success: 0,
                message: "record not found"
            });
        }
        
        return res.json ({
            success: 1,
            data: result
        });
            });
        },
invoice: (req,res) =>{
    const body = req.body;
    console.log(body);
        create3(body,(err,result) => {
if(err) {
    console.log(err);
    return res.json({
        success:0,
        message:"db error"
    });
}

return res.json({
    success: 1,
    data: result
});
    });
},
    
    history: (req,res) =>{
        const body = req.body;
        console.log(body);
            create4(body,(err,result) => {
    if(err) {
        console.log(err);
        return res.json({
            success:0,
            message:"db error"
        });
    }
    
    return res.json({
        success: 1,
        data: result
    });
        });
    },
    available: (req,res) =>{
       
            create5((err,result) => {
    if(err) {
        console.log(err);
       return;
    }
    
    return res.json({
        success: 1,
        data: result
    });
        });
    },
    nonavailable: (req,res) =>{
       
        create6((err,result) => {
if(err) {
    console.log(err);
   return;
}

return res.json({
    success: 1,
    data: result
});
    });
},
}











