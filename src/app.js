const path=require("path");
const express= require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// set up paths for the express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,"../templates/views");
const partialsPath= path.join(__dirname,"../templates/partials");

app.set('view engine', 'hbs') //to set up hbs with express

app.set('views', viewPath); //to change the default path name of views

hbs.registerPartials(partialsPath);

app.get("",(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Navi Sureka'
    });
})

app.get("/help",(req,res)=>{
    res.render("help",{
        message:"Hello this is the message from the help section",
        title : "Help",
        name: "Navi Sureka"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name : "Navi Sureka"
    })
})

//set up for the static page 
app.use(express.static(publicDirectoryPath));


// connect the weather app with the webserver 
app.get("/weather",(req,res)=>{
    const city= req.query.address;
    if(!city){
        return res.send({
        error:"Please provide the address"
        })
    } else{
        geocode(city,(error,data)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            const loc= data.location;
            forecast(data.long,data.lat,(error, response)=>{
                if(error){
                    return res.send({
                    error: error
                    })
                }
                res.send({
                    Location: loc,
                    Address: city,
                    Tempreture: response
                    })
            })
        })
    }

    // if(!req.query.address){
    //     return res.send({
    //         error:"Please provide the address"
    //     })
    // }
    // res.send({
    //     forecast: "Cold",
    //     temp: 50,
    //     location: req.query.address
    // });
})


//just to test query string
app.get("/product",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide the search term"
        })
    }
    res.send({
        product:[]
    })
})


app.get("/help/*",(req,res)=>{
    res.render("helpnotfound",{
        errorMessage:"Help article not found",
        name: "Navi Sureka",
        title:"404 Error"
    })
})

app.get("*",(req,res)=>{
    res.render("notfound",{
        errorMessage:"Page not found",
        name: "Navi Sureka",
        title: "404 Error"
    })
})

//to start the express server on the port provided
app.listen(3000,()=>{
    console.log("Server started at 3000");
})

