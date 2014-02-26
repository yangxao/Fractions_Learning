
var canvas;
var stage;

var fraction_Container;
var sequenceHandler;

function createCountDown(timeRemaining) {
	var startTime = Date.now();
	return function(){
		return timeRemaining - ( Date.now() - startTime);
	}
}

function convertMStoS(num, p){
	p = typeof p !== 'undefined' ? p : 1;
	return (num/ 1000).toFixed(p);
}

function init(){

	// get input data from the table, will get replaced by
	// GET Request in the future from the server
	var inputdata = [];	// object
	var table = document.getElementById("input");
	var tRowLen = table.rows.length;	// each row is a sequence
	for (var i = 0; i < tRowLen; i++){
		// loops through the rows
		var sequence = [];	// array
		var tCells = table.rows.item(i).cells;
		var cLen = tCells.length;
		for(var j = 0; j < cLen; j++){
			sequence.push(tCells.item(j).innerHTML);
		}

		inputdata.push(sequence);
	}

	// set up the stage
	canvas = document.getElementById("myCanvas");
	stage = new createjs.Stage(canvas);	

	// check for platform
	

	sequenceHandler = new SequenceHandler(stage, canvas.width, canvas.height, inputdata);

	stage.update();
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(60);
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

	sequenceHandler.handleSequence();
	stage.update();
}