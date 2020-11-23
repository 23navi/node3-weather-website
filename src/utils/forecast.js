const { url } = require("inspector");
const request = require("request");

const forecast = (lat,long, callback)=>{
    const url="http://api.weatherapi.com/v1/forecast.json?key=b282bd41b0194f33a9f151708201311&q="+lat+","+long;
    request({url:url,json: true}, (error, response)=>{
        if(error){
            callback("Unable to connect to the server",undefined);
        } else if(response.body.error){
            callback("Cannot find the place, plz try something else",undefined);
        } else {
            callback(undefined,response.body.forecast.forecastday[0].day.maxtemp_c+" C");
        }
    })

}

module.exports=forecast;