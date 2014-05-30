
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

function readData(){

	test_array=[{"numerator":"1","denominator":"2","sn":"sn1","distract_distance":0.1,"target_magnitude":0.5,"distract_magnitude":0.6,"correct_side":"left","a_length":0.165,"b_length":0.33,"c_length":0.198,"d_length":0.33,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"3","sn":"sn1","distract_distance":0.1,"target_magnitude":0.33333333333333,"distract_magnitude":0.43333333333333,"correct_side":"left","a_length":0.13666666666667,"b_length":0.41,"c_length":0.17766666666667,"d_length":0.41,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"2","sn":"sn1","distract_distance":0.1,"target_magnitude":0.5,"distract_magnitude":0.6,"correct_side":"left","a_length":0.195,"b_length":0.39,"c_length":0.234,"d_length":0.39,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"3","sn":"sn1","distract_distance":0.1,"target_magnitude":0.33333333333333,"distract_magnitude":0.43333333333333,"correct_side":"right","a_length":0.12566666666667,"b_length":0.29,"c_length":0.096666666666667,"d_length":0.29,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"2","sn":"sn1","distract_distance":0.1,"target_magnitude":0.5,"distract_magnitude":0.6,"correct_side":"right","a_length":0.234,"b_length":0.39,"c_length":0.195,"d_length":0.39,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"3","sn":"sn1","distract_distance":0.1,"target_magnitude":0.33333333333333,"distract_magnitude":0.43333333333333,"correct_side":"left","a_length":0.08,"b_length":0.24,"c_length":0.104,"d_length":0.24,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"2","sn":"sn1","distract_distance":0.1,"target_magnitude":0.5,"distract_magnitude":0.6,"correct_side":"left","a_length":0.145,"b_length":0.29,"c_length":0.174,"d_length":0.29,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5},
				{"numerator":"1","denominator":"3","sn":"sn1","distract_distance":0.1,"target_magnitude":0.33333333333333,"distract_magnitude":0.43333333333333,"correct_side":"right","a_length":0.052,"b_length":0.12,"c_length":0.04,"d_length":0.12,"a_top":0.5,"b_top":0.5,"c_top":0.5,"d_top":0.5}];

	// In the future, should test to make sure the array has all of its associative properties
	return test_array;
}



function init(user_id){

	var inputData = readData();

	// set up the stage
	canvas = document.getElementById("myCanvas");
	stage = new createjs.Stage(canvas);	

	//

	/*
		IN THE FUTURE CHECK FOR PLATFORM
	*/

	// sequenceHandler will parse the input data
	sequenceHandler = new SequenceHandler(stage, canvas.width, canvas.height, inputData, user_id);

	stage.update();
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(60);
}

function tick(){

	sequenceHandler.handleSequence();
	stage.update();
}