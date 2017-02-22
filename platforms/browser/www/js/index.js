//calculator functionality
// document.getElementById("convert-num").addEventListener("click" ,convertMetrics);
var fat_health = {"vlow":"Essential Fat","low":"Atheletic","medium":"Fitness","high":"Acceptable","vhigh":"Obese"}

function convertMetrics()
{
    console.log("Start of convert");
    var metricInput = document.getElementById("metric").value;
    var currentMetric = document.getElementById("metricSelection").value;
    if(metricInput<=0)
    {
        alert("Invalid value detecetd");
    }
    else
    { 
        var inchConv = 0;
        var feetConv = 0;
        var ydConv = 0;
        var meterConv = 0;
        if(currentMetric == "inches")
        {
            inchConv = metricInput;
            feetConv = metricInput/12;
            yardConv = metricInput*0.027777778
            meterConv = metricInput*0.0254
        }
        else if(currentMetric == "feet")
        {
            inchConv = metricInput*12;
            feetConv = metricInput;
            yardConv = metricInput*0.3333;
            meterConv = metricInput *0.3048;
        }
        else if(currentMetric == "yards")
        {
            inchConv =36*metricInput;
            feetConv = 3*metricInput;
            yardConv = metricInput;
            meterConv = 0.9144*metricInput;
        }
        else if(currentMetric == "meters")
        {
            inchConv = 39.3701*metricInput;
            feetConv = 3.28084*metricInput;
            yardConv = 1.09361*metricInput;
            meterConv = metricInput;
        }
        
        document.getElementById("inchCell").innerHTML = inchConv;
        document.getElementById("feetCell").innerHTML = feetConv;
        document.getElementById("yardCell").innerHTML = yardConv;
        document.getElementById("meterCell").innerHTML = meterConv;
        
    }
}


// document.getElementById("convertDate").addEventListener("click" ,convertDates);

function convertDates()
{
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);
        var difference = Math.abs(endDate-startDate);
        var result = difference/1000/3600/24;
        document.getElementById("differenceDays").innerHTML=result;
}



// document.getElementById("calculateFat").addEventListener("click" ,calculateFat);

function calculateFat()
{
    
        var gender = document.getElementById("genderSelection").value;
        var weight = document.getElementById("weight").value;
        var height = document.getElementById("height").value;
        var hip = document.getElementById("hip").value;
        var neck = document.getElementById("neck").value;
        var waist = document.getElementById("waist").value;
        
        
        var bodyFatPerc = 0;
        var fatMass = 0;
        var leanMass =0 ;
        var healthy = "Not Possible";
        
        var healthyDictMale = {};
        healthyDictMale["Lean"]=2;
        healthyDictMale["Athletes"]=6;
        healthyDictMale["Fitness"]=14;
        healthyDictMale["Average"]=18;
        healthyDictMale["Obese"]=25;
        healthyDictMale["Not Applicable"]=100;
        
        var healthyDictFemale = {};
        healthyDictFemale["Lean"]=10;
        healthyDictFemale["Athletes"]=14;
        healthyDictFemale["Fitness"]=21;
        healthyDictFemale["Average"]=25;
        healthyDictFemale["Obese"]=32;
        healthyDictFemale["Not Applicable"]=100;
    
        var previousKey = "Not Possible";
        if(gender == "male")
        {
            bodyFatPerc = 495/(1.0324 - 0.19077*(Math.log10(waist-neck))+0.15456*(Math.log10(height)))-450;
            fatMass = bodyFatPerc/100*weight;
            leanMass = weight - fatMass;
            for( var key in healthyDictMale)
            {
                
                    if(healthyDictMale[key] > bodyFatPerc && previousKey != "Not Possible" && bodyFatPerc > 0 && bodyFatPerc <= 100)
                    {
                        
                        healthy = previousKey;
                        
                    }
                    previousKey = key;
                    
            }
        }
        else
        {
            bodyFatPerc = 495/(1.29579 - 0.35004*(Math.log10(waist+hip-neck))+0.22100*(Math.log10(height)))-450;
            fatMass = bodyFatPerc/100*weight;
            leanMass = weight - fatMass;
            for( var key in healthyDictFemale)
            {
            
                    if(healthyDictFemale[key] > bodyFatPerc && previousKey != "Not Possible" && bodyFatPerc > 0 && bodyFatPerc <= 100)
                    {   
                    
                        healthy = previousKey;
                        
                    }
                    previousKey = key;
            }
            
        }
        
        document.getElementById("bodyFatPercCell").innerHTML = bodyFatPerc.toFixed(2);
        document.getElementById("fatMassCell").innerHTML = fatMass.toFixed(2);
        document.getElementById("leanMassCell").innerHTML = leanMass.toFixed(2);
        document.getElementById("healthyCell").innerHTML = healthy;
        
        //Data structure
        var healthyDictMale = {};
        var healthyDictFemale = {};
        
        
        
        
}





