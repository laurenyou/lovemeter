var theResults;

var deco;
var deco2;

var a;
var b;
var c;
var d;
var e;

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index: -1; position: absolute;');

	//Fountain particles in the background

	var one =
    {
        name: "decoration",
        colors: ["#e55ea2","#ffdae0","red"],
        lifetime: 300,
        angle: [360,100],
        size: [2,8],
        speedx: 0.7,
        x: 0.2,
        y: 0.1
    };

    var two =
    {
        name: "decoration",
        colors: ["#e55ea2","#ffdae0","red"],
        lifetime: 300,
        angle: [360,100],
        size: [2,8],
        speedx: 0.7,
        x: 0.8,
        y: 0.1
    };

    deco = new Fountain(null, one);
    deco2 = new Fountain(null, two);

}


var widthVal = 20;
var triHeight = 100;

var a = new Audio('wedding.mp3'); //try 'lauren' and 'lee min ho'

var b = new Audio('feelthelove.mp3'); //try 'disney pixar' and 'dreamworks'

var c = new Audio('chanceonme.mp3'); //try 'brad' and 'angelina'

var d = new Audio('usedtoknow.mp3'); //try 'clinton' and 'trump'

var e = new Audio('mrlonely.mp3'); // try leaving both names blank


//Function to start song from the beginning (not where it was paused)

function playMusic(song,song2,song3,song4,song5){
	if (song.paused === true){
		song.currentTime = 0;
		song.play();
		song2.pause();
		song3.pause();
		song4.pause();
		song5.pause();

	} else{
		song.play();
		song2.pause();
		song3.pause();
		song4.pause();
		song5.pause();
	}
}



//Drawing Triangle Heartbeat

function draw(){
	background('#f4abab');
	noStroke();
	fill(random(100,255),random(0,100),random(0,100));

	frameRate(60);
	if (theResults >= 99){
		playMusic(a,b,c,d,e);
		fill(random(0,255),random(0,255),random(0,255));
		widthVal = random(20,80);
		triHeight = random(100,400);
	}
	else if (theResults >= 80){
		playMusic(b,a,c,d,e);
		frameRate(40);
		fill(random(0,180),random(0,180),random(0,180));
		widthVal = random(20,60);
		triHeight = random(100, 300);
	} else if (theResults >= 60){
		playMusic(c,a,b,d,e);;
		frameRate(30);
		fill(random(0,120),random(0,120),random(0,120));
		widthVal = random(20,40);
		triHeight = random(100,200);
	} else if (theResults >= 50){
		playMusic(c,a,b,d,e);
		frameRate(25);
		fill(random(0,110),random(0,110),random(0,110));
		widthVal = random(20,30);
		triHeight = random(100,150);
	} else if (theResults >= 30){
		playMusic(d,a,b,c,e);
		frameRate(20);
		fill(random(0,90),random(0,90),random(0,90));
		widthVal = random(20,25);
		triHeight = random(100,125);
	} else if (theResults >= 20){ 
		playMusic(d,a,b,c,e);
		frameRate(15);
		fill(random(0,70),random(0,70),random(0,70));
		widthVal = random(10,20);
		triHeight = random(60,80);
	} else if (theResults > 0){
		playMusic(e,a,b,c,d);
		frameRate(10);
		fill(random(0,50),random(0,50),random(0,50));
		widthVal = random(5,10);
		triHeight = random(40,60);
	} else if (theResults === 0){
		playMusic(e,a,b,c,d);
		widthVal = 0;
		triHeight = 0;
	}

	for (var i = 0; i < widthVal; i++){
		if (i%2 === 0){
			triangle(i * windowWidth/widthVal, windowHeight/2, windowWidth/(widthVal*2) + (i * windowWidth/widthVal), windowHeight/2 + triHeight, windowWidth/widthVal + (i * windowWidth/widthVal), windowHeight/2);
		}
		else {
			triangle(i * windowWidth/widthVal, windowHeight/2, windowWidth/(widthVal*2) + (i * windowWidth/widthVal), windowHeight/2 - triHeight, windowWidth/widthVal + (i * windowWidth/widthVal), windowHeight/2);
		}
	}

	deco.Draw();
	deco2.Draw();
	deco.Create();
	deco2.Create();
	deco.Step();
	deco2.Step();
	noStroke();
	stroke(0);

}

//Spinner

var opts = {
  lines: 13 // The number of lines to draw
, length: 28 // The length of each line
, width: 14 // The line thickness
, radius: 51 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.6 // Opacity of the lines
, rotate: 19 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1.7 // Rounds per second
, trail: 61 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
var target = document.getElementById('the-board');



//Window resize

function windowResized(){
	console.log('resizing!');
	resizeCanvas(windowWidth,windowHeight);
}


//Getting API Data

var dataURL = 'https://love-calculator.p.mashape.com/getPercentage?fname=';
var dataURL2 = '&sname=';

function getData(name1,name2){
	console.log('getting data!');
	
	var spinner = new Spinner().spin();
	target.appendChild(spinner.el);
	
	searchURL = dataURL + name1 + dataURL2 + name2;


	$.ajax({
    url: searchURL, // The URL to the API
    type: 'POST', // The HTTP Method
    data: {}, // Additional parameters here
    datatype: 'json',

    error: function(err) {
    	console.log('we got problems');
    	alert(err); 
    },
    beforeSend: function(xhr) {
    	xhr.setRequestHeader("X-Mashape-Authorization", "Ryc1lKnWeqmshrHMBdsAb7UFmyHPp1FQ2IEjsnbQMG7ghGH3VM"); // Enter here your Mashape key
	    },
    success: function(data) {
    	console.log('Woohoo!');
    	console.log(data);
    	//alert(JSON.stringify(data)); 

    	theResults = parseInt(data.percentage);
    	console.log(theResults);

    	var theResults2 = data.result;

    	var htmlString = "<div>" + theResults + "% compatibility" + '<br>' + theResults2 + '</br>' + "</div>";

    	$('#the-board').html(htmlString);
	}

	});
}

//On button click

$('#the-button').click(function(){
	console.log('button was clicked!');

	var theInputValue = $('#the-input').val();

	var theInputValue2 = $('#the-input2').val();

		getData(theInputValue,theInputValue2);

});

