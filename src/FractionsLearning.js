
var canvas;
var stage;

var fraction_Container;

function init(){

	canvas = document.getElementById("myCanvas");
	stage = new createjs.Stage(canvas);	

	//drawGrid();
	showFraction();
	showNonSymbolicRatios();

	stage.update();
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(60);
}

function drawGrid(){

	var cw = canvas.width;
	var ch = canvas.height;

	var line = new createjs.Shape();
	line.graphics.setStrokeStyle(3).beginStroke("white");
	line.graphics.moveTo(cw *.5, 0).lineTo(cw * .5, ch);
	line.graphics.moveTo(0, ch * .35).lineTo(cw, ch * .35);


	stage.addChild(line);
}

function showFraction(){
	
	var fraction = {}
	fraction.numerator = "1";
	fraction.denominator = "2";

	var cw = canvas.width;
	var ch = canvas.height;

	var numerator = fraction.numerator;
	var denominator = fraction.denominator;

	fraction_Container = new createjs.Container();

	var numeratorText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
	numeratorText.text = numerator;
	numeratorText.x = 0;
	numeratorText.y = 0;

	var denominatorText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
	denominatorText.text = denominator;
	denominator.x = 0;
	denominatorText.y = 45;

	var divsionSign = new createjs.Shape();
	divsionSign.graphics.setStrokeStyle(3).beginStroke("white");
	divsionSign.graphics.moveTo(0, 40).lineTo(20, 40);

	fraction_Container.addChild(numeratorText);
	fraction_Container.addChild(divsionSign);
	fraction_Container.addChild(denominatorText);
	fraction_Container.x = cw * .48;
	fraction_Container.y = ch * .15;

	stage.addChild(fraction_Container);

}

function showNonSymbolicRatios(ratio1, ratio2){

	var SCALE = 200;

	var cw = canvas.width;
	var ch = canvas.height;

	var l_line_ratio = new createjs.Container();

	var l_line = new createjs.Shape();
	l_line.graphics.setStrokeStyle(10).beginStroke("white");
	l_line.graphics.moveTo(0,0).lineTo(0, SCALE);
	l_line.graphics.moveTo(20,0).lineTo(20, SCALE *.45);

	// add background
	var l_back = new createjs.Shape();
	l_back.graphics.beginFill('#AAAAAA').drawRoundRect(-10,-10, 40, SCALE+20,10);

	l_line_ratio.addChild(l_back);
	l_line_ratio.addChild(l_line);
	l_line_ratio.x = cw * .25;
	l_line_ratio.y = ch * .35;


	l_line_ratio.addEventListener("click", function(evt){
		alert("left ratio clicked");
	});

	/////////

	var r_line_ratio = new createjs.Container();

	var r_line = new createjs.Shape();
	r_line.graphics.setStrokeStyle(10).beginStroke("white");
	r_line.graphics.moveTo(0,0).lineTo(0, SCALE);
	r_line.graphics.moveTo(20,10).lineTo(20, SCALE *.75);

	// add background
	var r_back = new createjs.Shape();
	r_back.graphics.beginFill('#AAAAAA').drawRoundRect(-10,-10, 40, SCALE+20,10);

	r_line_ratio.addChild(r_back);
	r_line_ratio.addChild(r_line);
	r_line_ratio.x = cw * .75;
	r_line_ratio.y = ch * .35;

	r_line_ratio.addEventListener("click", function(evt){
		alert("right ratio clicked");
	});

	stage.addChild(l_line_ratio);
	stage.addChild(r_line_ratio);
}

function tick(){

}