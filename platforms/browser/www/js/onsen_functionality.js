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

