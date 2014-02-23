(function(window){
	function SequenceHandler(stage, cWidth, cHeight, inputData){
		this.sequenceStage = stage;
		this.width  = cWidth;
		this.height = cHeight;

		this.sequence = null;
		this.fixation = null;

		// will parse the inputdata
		// will generate sequences

		// sequence:
		// cross(time)
		// fraction1
		// fraction2
		// feedback

		// automated sequences;
		// intro, end sequences
		this.parseInputData(inputData);

		// start the sequence
		this.handleSequence();
	};

	SequenceHandler.prototype.parseInputData = function(inputData) {
		
		var sequence = {};
		// iterate through the input array
		for(var i = 0; i < inputData.length; i++){
			sequence[i] = { "frac_num": inputData[i][1], "frac_dem": inputData[i][2], 
							"nume1": inputData[i][5], "denom1": inputData[i][6], 
							"nume2": inputData[i][7], "denom2": inputData[i][8]
						};
		}

		// we have sequence:
		// fraction num, fraction denom
		// left fraction: num1, demo1
		// right fraction: num2, demo2
		this.sequence = sequence;
	};

	SequenceHandler.prototype.handleSequence = function(){
		//start intro sequence
		this.displayIntroSequence();


		// play all the sequences



		//play end sequence + feedback
		//this.displayEndSequence();
		//end
	}

	SequenceHandler.prototype.displayIntroSequence = function(){

		this.displayFixation(3000);
	}

	SequenceHandler.prototype.displayEndSequence = function(){


	}

	// this generates the image of the fixation. The param, time takes in
	// time in milliseconds and displays the fixation for that duration.
	SequenceHandler.prototype.displayFixation = function(time){

		var cw = this.width;
		var ch = this.height;

		this.fixation = new createjs.Shape();
		this.fixation.graphics.setStrokeStyle(3).beginStroke("white");
		this.fixation.graphics.moveTo(cw *.5, ch* .4).lineTo(cw * .5, ch * .6);
		this.fixation.graphics.moveTo(cw * .4, ch * .5).lineTo(cw * .6, ch * .5);

		this.fixation.startTime = createCountDown(time);
		this.sequenceStage.addChild(this.fixation);
	}

	SequenceHandler.prototype.checkFixation = function(){
		if(convertMStoS(this.fixation.startTime()) < 0 || convertMStoS(this.fixation.startTime()) == 0){
			this.fixation.alpha = 0;
			this.fixation.startTime = false;
		}
	};

	window.SequenceHandler = SequenceHandler;
}(window))