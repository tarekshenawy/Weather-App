import React,{  useRef, useState} from 'react';
import "./Weather.css";
import wind from "./Images/172922.png";
import humidity from "./Images/219816.png";
import clouds from "./Images/clouds.png";
import drizzle from "./Images/drizzle.png";
import mist from "./Images/mist.png";
import sun from "./Images/pngtree-sun-png-clipart-colored-png-image_5656301.png";
import rain from "./Images/rain.png";
import snow from "./Images/5f53a1fb060f2e00048580db.png";
import searchicon from "./Images/search-icon-clip-art-clkerm-vector-clip-art-online-22.png";


export default function Weather() {
    const [ state , setState] =useState({
        celisus:17,
        name:"london",
        humidity:40,
        speed:4.5,
        images:clouds,

    });

    let inputref= useRef();
  
    let apikey = "cfbda38b04141bfbbec72fb647313238";
    let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  

    async function checkweather (city){
        const response = await fetch(apiurl + city +`&appid=${apikey}`);
        var items = await response.json();
        if(response.status === 404){
            document.getElementById("valid").innerHTML="invalid value";
            document.querySelector(".display").style.display ="none";
        }
        else{
            let imageitems = "";
                if(items.weather[0].main === "Clear"){
                    imageitems =sun;
           
        
                  
               }else if(items.weather[0].main === "Clouds"){
                imageitems= clouds;
          
                
       
               }else if(items.weather[0].main === "Drizzle"){
               imageitems = drizzle;
            
               }
               else if(items.weather[0].main === "Mist"){
                imageitems =mist;
          
        
               }
               else if(items.weather[0].main === "Rain"){
                
                imageitems = rain;
    
        
                }
                else if(items.weather[0].main === "Snow"){
                
                    imageitems = snow;
        
            
                    }
               
               setState({
                    celisus:items.main.temp,
                    name:items.name,
                    humidity:items.main.humidity,
                    speed:items.wind.speed,
                    images:imageitems, 
                });
                    console.log(items);
      
       
    
    }
}




  const clickhandler = ()=>{
    checkweather(inputref.current.value);
    inputref.current.value="";
    document.querySelector(".display").style.display ="block";
    document.getElementById("valid").innerHTML="";
    
  

  }


  return (

    <div className="container">

            <div className="inputs">
                <input id="searchvalue" ref={inputref} type="text" placeholder="enter the city"/>
                <button id="searchicon" onClick={()=>clickhandler()}><img src={searchicon} alt=""/></button>
            </div>

            <p id="valid"></p>

            <div className="display">

                <div className="sun">
                   <img src={state.images} alt=""/>
                     </div>
                
                <div className="temprature-city">
                    <h1>{Math.round(state.celisus)}°C</h1>
                    <h2>{state.name}</h2>
                </div>
            
                <div className="thedegrees">

                        <div className="humidty">
                            <img src={humidity} alt=""/>
                            <div className="degree">
                                <p>{state.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className="speed">
                            <img src={wind} alt=""></img>
                            <div className="wind">
                            <p id="wind">{state.speed} km/h</p>
                            <p>wind speed</p>
                            </div>
                
                        </div>

                </div>
                
            </div>
   
</div>
  )}

