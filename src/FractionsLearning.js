
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

	/*
		IN THE FUTURE CHECK FOR PLATFORM
	*/

	// sequenceHandler will parse the input data
	sequenceHandler = new SequenceHandler(stage, canvas.width, canvas.height, inputdata);

	stage.update();
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(60);
}

function tick(){

	sequenceHandler.handleSequence();
	stage.update();
}