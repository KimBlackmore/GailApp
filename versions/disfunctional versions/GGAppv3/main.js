var walks = [];
var days = [];
var totalWalks = 0;

function recordWalks(n,d,newEntry){
	//alert(n);
	walks.push(n);
	totalWalks += ~~n;
	if(d===1){ //make date equal today
		var currentDate = new Date();
		day = currentDate.getDate()
		month = currentDate.getMonth()+1;
		year = currentDate.getFullYear();
	} else { //extract info from date
		year = d.substring(0,4);
		month = d.substring(5,7);
		day = d.substring(8,10)
	}
	walkLabel = day + " " + monthName(month-1);
	days.push(walkLabel); 
	//alert(days);	 
	if(newEntry==1){ //send new data to the database
		datenodash = year + "" + month+ ""+ day;
		//alert(datenodash);
		postNum(n,~~datenodash);
		//alert("New total walks:" + totalWalks);
	}
}

function monthName(m){
	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";
	return month[m];
}

function resizeChart() {
    var chartCanvas = document.getElementById('chartCanvas');
    var chartRatio = 1;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight - 200;

    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > chartRatio) {
        newWidth = newHeight * chartRatio;
        chartCanvas.style.height = newlHeight ;
        chartCanvas.style.width = newWidth ;
        alert("a short one");
    } else {
        newHeight = newWidth / chartRatio;
        chartCanvas.style.width = newWidth ;
        chartCanvas.style.height = newHeight ;
        alert("a long one")
    }
    
    var chartCanvas = document.getElementById('chartCanvas');
    chartCanvas.width = newWidth;
    chartCanvas.height = newHeight;
}

window.addEventListener('load', resizeChart, false);
window.addEventListener('resize', resizeChart, false);
window.addEventListener('orientationchange', resizeChart, false);

var lineChartData = {
	labels : days,
	datasets : [
		{
			label: "My Walks",
			fillColor : "rgba(79,34,98,0.2)",
			strokeColor : "rgba(79,34,98,1)",
			pointColor : "rgba(0,0,0,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(164,50,123,1)",
			data : walks
		}
	]
}
	
$(document).on("pageshow","#walkHistory",function(){
	var ctx = document.getElementById("chartCanvas").getContext("2d");
	window.myLine = new Chart(ctx).Line(lineChartData, {
		responsive: true
	});
	document.getElementById("showTotal").innerHTML = totalWalks;
});

$.ajax({ 
    type: "POST",
    // for now this gets the last week's worth of data but need to work out how to pass it a different date range
    url: "http://home.exetel.com.au/blackmores/GailApp/getNums.php",
    dataType: "json",
  	data: {  //this bit os for sending data to the database
  	}
}).done(function( data ) { //this bit is for putting retrieved data into the walks array
	//alert('got Nums');
	$.each(data, function(index, element) { 
		//put each row of the retrieved data into a temporary array feady for charting
		recordWalks(element.Num,element.Label,0);
	});
}).fail(function() { 
 	
});

function postNum(n,d){
	//alert("in postNum: num "+n+" day "+d);
	$.ajax({ 
	    type: "POST",
	    url: "http://home.exetel.com.au/blackmores/GailApp/postNum.php", 
	    data:{num:n, date:d} 
	}).done(function( data ) { 
	}).fail(function() {  
		alert("I failed to record the new number");
	});

}

/* try to make a selecor list of just the dates in the most recent history chart
instead of giving a full date selector
But not working yet...

 function make_datelist(){
	alert("boop");
    var select = "<select id='w_daySelected'></select>";
    $('#w_dayOptions').html(select);
    alert(days.length);
    for(var i=0;i<days.name.length;i++){
        $('#w_dayOptions').append($("<option></option>")
         .attr("value",i)
         .text(days.name[i]));
    }
}

$(function(){
    make_w_day();
    $('#w_daySelected').change(function(){
        console.log($(this).val());
     });
});*/


	

