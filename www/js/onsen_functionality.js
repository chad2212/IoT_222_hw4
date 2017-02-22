var fat_health = {"vlow":"Essential Fat","low":"Atheletic","medium":"Fitness","high":"Acceptable","vhigh":"Obese"}


document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'all-calculator') {
  	page.querySelector('ons-toolbar .center').innerHTML = "Calculators";

    page.querySelector('#push-button-unit-converter').onclick = function() {
      document.querySelector('#myNavigator').pushPage('unit-converter.html', {data: {title: 'Unit Converter'}});
    };
    page.querySelector('#push-button-date-calculator').onclick = function() {
      document.querySelector('#myNavigator').pushPage('date-calculator.html', {data: {title: 'Date Calculator'}});
    };
    page.querySelector('#push-button-bmi').onclick = function() {
      document.querySelector('#myNavigator').pushPage('bmi-calculator.html', {data: {title: 'Fat % Calculator'}});
    };
    page.querySelector('#push-button-temperature-converter').onclick = function() {
      document.querySelector('#myNavigator').pushPage('temperature-converter.html', {data: {title: 'Temperature Converter'}});
    };
  } else{
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    if (page.data.title == 'Date Calculator')
    {
      document.querySelector('#startDate').value = getToday();
      document.querySelector('#endDate').value = getToday();
      document.querySelector('#differenceDays').value = calculateDifference();
      

		document.getElementById('startDate').addEventListener("change",calculateDifference);
		document.getElementById('endDate').addEventListener("change",calculateDifference);
    }
    else if(page.data.title == 'Fat % Calculator')
    {
    	document.getElementById('fats').style.visibility="hidden"
    	document.getElementById('fatsConv').style.visibility="hidden";
    	document.getElementById('radio-male').addEventListener("change",calculateFat);
    	document.getElementById('radio-female').addEventListener("change",calculateFat);
    	document.getElementById('weight').addEventListener("change",calculateFat);
    	document.getElementById('height').addEventListener("change",calculateFat);
    	document.getElementById('hip-circum').addEventListener("change",calculateFat);
    	document.getElementById('waist-circum').addEventListener("change",calculateFat);
    	document.getElementById('neck-circum').addEventListener("change",calculateFat);
    }
    else if(page.data.title == 'Unit Converter')
    {
    	document.getElementById('units').style.visibility="hidden"
			document.getElementById('unitsConv').style.visibility="hidden"
    	document.getElementById('radio-inch').addEventListener("change",convertMetrics);
    	document.getElementById('radio-feet').addEventListener("change",convertMetrics);
    	document.getElementById('radio-yard').addEventListener("change",convertMetrics);
    	document.getElementById('radio-meter').addEventListener("change",convertMetrics);
    	document.getElementById('convert-num').addEventListener("change",convertMetrics);
    
    }
    else if(page.data.title == 'Temperature Converter')
    {
    	document.getElementById('radio-celsius-from').addEventListener("change",convertTemps);
    	document.getElementById('radio-kelvin-from').addEventListener("change",convertTemps);
    	document.getElementById('radio-fahrenheit-from').addEventListener("change",convertTemps);
    	document.getElementById('radio-celsius-to').addEventListener("change",convertTemps);
    	document.getElementById('radio-fahrenheit-to').addEventListener("change",convertTemps);
    	document.getElementById('radio-kelvin-to').addEventListener("change",convertTemps);
    	document.getElementById('temperature-num').addEventListener("change",convertTemps);
    }
    
    
  }
});



function getToday(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    return today;
}


function calculateDifference()
{
        var startDate = new Date(document.getElementById('startDate').value);
        var endDate = new Date(document.getElementById('endDate').value);
        var difference = Math.abs(endDate-startDate);
        var result = difference/1000/3600/24;
      	console.log("got called");
        document.getElementById('differenceDays').innerHTML = result;
}

function calculateFat()
{
    	console.log("got here")
        var gender = document.getElementById("radio-male").checked;
        var weight = document.getElementById("weight").value;
        var height = document.getElementById("height").value;
        var hip = document.getElementById("hip-circum").value;
        var neck = document.getElementById("neck-circum").value;
        var waist = document.getElementById("waist-circum").value;
        
        
        //check if any nulls
        if(weight != "" && height != "" && hip != "" && neck != "" && waist != "")
        {
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
			if(gender == true) //male
			{
				bodyFatPerc = 495/(1.0324 - 0.19077*(Math.log(waist-neck))+0.15456*(Math.log(height)))-450;
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
				bodyFatPerc = 495/(1.29579 - 0.35004*(Math.log(waist+hip-neck))+0.22100*(Math.log(height)))-450;
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
			document.getElementById('fats').style.visibility="visible";
			document.getElementById('fatsConv').style.visibility="visible";
        }
        else
        {
      	    document.getElementById('fats').style.visibility="hidden";
      	    document.getElementById('fatsConv').style.visibility="hidden";
        
        }
        
        
        
}



function convertMetrics()
{
    console.log("Start of convert");
    var metricInput = document.getElementById("convert-num").value;

    if(metricInput<0)
    {
        alert("Invalid value detecetd");
    }
    else
    { 
        var inchConv = 0;
        var feetConv = 0;
        var ydConv = 0;
        var meterConv = 0;
        if(document.getElementById('radio-inch').checked == true)
        {
            inchConv = metricInput*1;
            feetConv = metricInput/12;
            yardConv = metricInput*0.027777778
            meterConv = metricInput*0.0254
        }
        else if(document.getElementById('radio-feet').checked == true)
        {
            inchConv = metricInput*12;
            feetConv = metricInput*1;
            yardConv = metricInput*0.3333;
            meterConv = metricInput *0.3048;
        }
        else if(document.getElementById('radio-yard').checked == true)
        {
            inchConv =36*metricInput;
            feetConv = 3*metricInput;
            yardConv = metricInput*1;
            meterConv = 0.9144*metricInput;
        }
        else if(document.getElementById('radio-meter').checked == true)
        {
            inchConv = 39.3701*metricInput;
            feetConv = 3.28084*metricInput;
            yardConv = 1.09361*metricInput;
            meterConv = metricInput*1;
        }
        document.getElementById('units').style.visibility="visible"
        document.getElementById('unitsConv').style.visibility="visible"
        document.getElementById("inchCell").innerHTML = inchConv.toFixed(2);
        document.getElementById("feetCell").innerHTML = feetConv.toFixed(2);
        document.getElementById("yardCell").innerHTML = yardConv.toFixed(2);
        document.getElementById("meterCell").innerHTML = meterConv.toFixed(2);
        
    }
}

function convertTemps()
{
	var tempInput = document.getElementById("temperature-num").value;
	
	if(document.getElementById('radio-celsius-from').checked == true)
    {
         if(document.getElementById('radio-celsius-to').checked == true)
   		 {
   		 	result = tempInput * 1;
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Celsius";
   		 }
   		 if(document.getElementById('radio-fahrenheit-to').checked == true)
   		 {
   		 	result = tempInput * 9/5 +32;
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Fahrenheit";
   		 }
   		 if(document.getElementById('radio-kelvin-to').checked == true)
   		 {
   		 	result = tempInput * 1 + 273.15;
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Kelvin";
   		 }
    }
    if(document.getElementById('radio-fahrenheit-from').checked == true)
    {
         if(document.getElementById('radio-celsius-to').checked == true)
   		 {
            result = (5/9)*(tempInput-32);
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Celsius";
   		 }
   		 if(document.getElementById('radio-fahrenheit-to').checked == true)
   		 {
            result = tempInput * 1;
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Fahrenheit";
   		 }
   		 if(document.getElementById('radio-kelvin-to').checked == true)
   		 {
            result = (5/9)*(tempInput-32) +273.15;
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Kelvin";
   		 }
    }
    if(document.getElementById('radio-kelvin-from').checked == true)
    {
         if(document.getElementById('radio-celsius-to').checked == true)
   		 {
            result = tempInput * 1 - 273.15;
            document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Celsius";
   		 }
   		 if(document.getElementById('radio-fahrenheit-to').checked == true)
   		 {
           	result = (9/5)*(tempInput - 273.15) +32;
           	 document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Fahrenheit";
   		 }
   		 if(document.getElementById('radio-kelvin-to').checked == true)
   		 {
            result = tempInput * 1;
             document.getElementById('convertTempLabel').innerHTML = result.toFixed(2) + " Kelvin";
   		 }
    }
	
}


