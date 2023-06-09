
const btn =  $("#search-button");
const place = $('#c_place');
const temperature = $('#temperature');
const windVal = $('#windVal');
const textFeild = $('#searchPlace');
const weatherCondition = $('#weatherCondition');
const c_feelsLike = $('#c_feelsLike');
const c_dataTime = $('#c_dataTime');
const c_humidity = $('#c_humidity');
const c_visibility = $('#c_visibility');
const c_uvIndex = $('#c_uvIndex');
const c_maxTemp = $('#c_maxTemp');
const c_minTemp = $('#c_minTemp');
const c_sunrise = $('#c_sunrise');
const c_sunset = $('#c_sunset');
const c_moonPhase = $('#c_moonPhase');
const umbrella = $('#umbrella');
const outDoor = $('#outDoor');
const cloths = $('#cloths');

//const c_weatherIMG = $('#c_weatherIMG');
//const c_weatherIMG = $('#c_weatherIMG');
//const c_weatherIMG = $('#c_weatherIMG');
//const c_weatherIMG = $('#c_weatherIMG');

//const c_weatherIMG = $('#c_weatherIMG');
//const c_weatherIMG = $('#c_weatherIMG');
//const c_weatherIMG = $('#c_weatherIMG');

  btn.click(function (){
    let searchedLocation = textFeild.val();
  
    $.ajax({
      url:`http://api.weatherapi.com/v1/current.json?Key=9029f4832b0341f38c7130418231505&q=${searchedLocation}`,
      method:"GET",
      success: function (resp){
        place.text(resp.location.name+", "+resp.location.region+", "+resp.location.country);
        c_dataTime.text(resp.location.localtime);
        temperature.text(resp.current.temp_c + " °C");
        weatherCondition.text(resp.current.condition.text);
        c_feelsLike.text(resp.current.feelslike_c + " °C");
        windVal.text(resp.current.wind_mph);
        c_humidity.text(resp.current.humidity +" %");
        c_visibility.text(resp.current.vis_km +" km");
        c_uvIndex.text(resp.current.uv);
       $("#c_weatherIMG").attr('src', "https:"+resp.current.condition.icon);
      },
      error:function (error){

      }
    });

    $.ajax({
       
        url:`http://api.weatherapi.com/v1/forecast.json?Key=9029f4832b0341f38c7130418231505&q=${searchedLocation}&alerts=alerts=yes`,
        method:"GET",
        success: function (resp1){
            c_sunrise.text(resp1.forecast.forecastday[0].astro.sunrise);
             c_sunset.text(resp1.forecast.forecastday[0].astro.sunset);
             c_moonPhase.text(resp1.forecast.forecastday[0].astro.moon_phase);
             c_maxTemp.text(resp1.forecast.forecastday[0].day.maxtemp_c + "/" + resp1.forecast.forecastday[0].day.mintemp_c);

            //Next 4 hours forecast
            const d = new Date();
            var hour_now = d.getHours(); //get current hour
            var j=0;
            if(hour_now<20){
                j=5;
            }else if(hour_now==20){
                j=4;
            }else if(hour_now==21){
                j=3;
            }else if(hour_now==22){
                j=2;
            }else{
                j=1;
            }
            console.log(j);
            if(j != 1){
                for( var i=1; i<j; i++){
                    $("#hour_"+i).text(resp1.forecast.forecastday[0].hour[hour_now+i].time.slice(11));
                    $("#hourTemp_"+i).text(resp1.forecast.forecastday[0].hour[hour_now+i].temp_c + " °C");
                    $("#hourWeather_"+i).attr('src', "https:"+resp1.forecast.forecastday[0].hour[hour_now+i].condition.icon);
                }
            }
         
            //End of next 4 hours forecast

           

            //suggestions for the day
           var willRain = resp1.forecast.forecastday[0].day.daily_will_it_rain;
            if(willRain == '1'){
                $("#umbrella").text("Need");
                $("#outDoor").text("Not Good");
                $("#cloths").text("Long Sleeves");
            }else{
                $("#umbrella").text("No Need");
                $("#outDoor").text("Good");
                $("#cloths").text("Shorts");
            }

        },
        error:function (error){
  
        }
      });

      $.ajax({
        url:`http://api.weatherapi.com/v1/forecast.json?Key=9029f4832b0341f38c7130418231505&q=${searchedLocation}&days=3`,
        method:"GET",
        success: function (resp2){
          //next 4 days forecast
          for( var i=1; i<3; i++){
            console.log(i);
            $("#day_"+i).text(resp2.forecast.forecastday[i].date);
            $("#dayTepm_"+i).text(resp2.forecast.forecastday[i].day.maxtemp_c + " °C");
            $("#dayImg_"+i).attr('src', "https:"+resp2.forecast.forecastday[i].day.condition.icon);
        }
    //end of next 4 days forecast
        },
        error:function (error){
  
        }
      });

      $.ajax({
        url:`http://api.weatherapi.com/v1/history.json?Key=9029f4832b0341f38c7130418231505&q=${searchedLocation}&dt=2023-06-01&end_dt=2023-06-07`,
        method:"GET",
        success: function (resp2){
          //next 4 days forecast
          for( var i=1; i<3; i++){
            console.log(i);
            $("#day_"+i).text(resp2.forecast.forecastday[i].date);
            $("#dayTepm_"+i).text(resp2.forecast.forecastday[i].day.maxtemp_c + " °C");
            $("#dayImg_"+i).attr('src', "https:"+resp2.forecast.forecastday[i].day.condition.icon);
        }
    //end of next 4 days forecast
        },
        error:function (error){
  
        }
      });

  });

  

  //Week forecast doughnut chart
  const chartData = {
    
    labels: ["Sunny days","Rain/Snow days"],
    data: [10, 6],
};

const myChart = document.querySelector(".my-chart");
const ul=document.querySelector(".weather-last-week .details ul");

new Chart(myChart, {
    type:"doughnut",
    data:{
        labels: chartData.labels,
        datasets:[
        {
            label:"Last Week",
            data: chartData.data,
        },
        ],
    },
    options:{
        borderWidth:5,
        borderRadius:2,
        hoverBorderWidth:0,
        plugins:{
            legend:{
                display:false,
            },
        },
    },
});

const populateUl = () => {
    chartData.labels.forEach((l, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${l}:<span class='weatherStatus'>${chartData.data[i]}</span>`;
        ul.appendChild(li);
    });
};

populateUl();



//Week forecast doughnut chart End