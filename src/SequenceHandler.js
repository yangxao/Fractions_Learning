(function(window){
	function SequenceHandler(stage, cWidth, cHeight, inputData){
		this.sequenceStage = stage;

		this.width  = cWidth;
		this.height = cHeight;
		this.sequenceIndex = 0;		// the current fraction pair
		this.sequenceOn = true;
		// fixation time
		this.time = 2000;	// in milliseconds
		this.timeRecorder = 0;	// used to keep track of time

		// create the objects for fractions
		this.defineDrawObjects();

		// parses the inputdata, and start the sequence
		this.outPutData = inputData;
		this.parseInputData(inputData);
		this.startSequence();
	};


	// this function takes in a 2d array
	// Loops through the rows, and keeps track of specific columns
	//
	SequenceHandler.prototype.parseInputData = function(inputData) {
		
		var sequence = {};
		this.sequenceRowLength = inputData.length;

		// iterate through the input array
		for(var i = 0; i < this.sequenceRowLength; i++){
			sequence[i] = { "frac_num": inputData[i][1], "frac_dem": inputData[i][2], 
							"nume1": inputData[i][5], "denom1": inputData[i][6], 
							"nume2": inputData[i][7], "denom2": inputData[i][8],
							"correct": inputData[i][4]
						};
		}

		// we have sequence:
		// fraction numerator, fraction denominator
		// left fraction: numerator1, denominator1
		// right fraction: numerator2, denominator2
		this.sequence = sequence;
	};

	// will be reusing all the same objects, just changing them
	// 
	SequenceHandler.prototype.defineDrawObjects = function() {

		var SCALE = 200;
		var cw = this.width;
		var ch = this.height;

		//  draws the fixation object
		this.fixation =  new createjs.Shape();
		this.fixation.graphics.setStrokeStyle(3).beginStroke("white");
		this.fixation.graphics.moveTo(cw *.5, ch* .4).lineTo(cw * .5, ch * .6);
		this.fixation.graphics.moveTo(cw * .4, ch * .5).lineTo(cw * .6, ch * .5);
		this.sequenceStage.addChild(this.fixation);

		// This code chunk manages the objects for
		// the nonsymbolic ratios
		this.l_line = new createjs.Shape();
		this.l_line.graphics.setStrokeStyle(10).beginStroke("white");

		this.r_line = new createjs.Shape();
		this.r_line.graphics.setStrokeStyle(10).beginStroke("white");
		
		this.l_click_area = new createjs.Shape();
		this.l_click_area.graphics.f('#AAAAAA').rr(-10,-10, 40, SCALE + 20,10);
		this.r_click_area = new createjs.Shape();
		this.r_click_area.graphics.f('#AAAAAA').rr(-10,-10, 40, SCALE + 20,10);
		
		this.l_line_ratio = new createjs.Container();
		this.l_line_ratio.addChild(this.l_click_area);
		this.l_line_ratio.addChild(this.l_line);		


		/*
			This code chunk handles the click event for the left fraction.
			In the future, line ratio should be its own class
		*/
		var self = this;
		this.l_line_ratio.on("click", function(evt){

			if(self.sequenceIndex == (self.sequenceRowLength-1)){
				/*
					The sequence ends here. Do something...
					Submit a POST request with the statistics
				
				*/

				self.displayEndSequence();
			}
			else{

				if(self.sequence[self.sequenceIndex]["correct"] == "left"){
					/*
						Sequence is correct.
						Record data.
					*/

					console.log(self.timeRecorder);
					console.log(Date.now());
					var time = Date.now() - self.timeRecorder;
					//time = convertMStoS(time, 2);

					self.outPutData[self.sequenceIndex].push("correct");
					self.outPutData[self.sequenceIndex].push("left");
					self.outPutData[self.sequenceIndex].push(time);
				}
				else{
					/*
						Sequence is incorrect.
						Record data.
					*/
					var time = Date.now() - self.timeRecorder;
					//time = convertMStoS(time, 2);

					self.outPutData[self.sequenceIndex].push("incorrect");
					self.outPutData[self.sequenceIndex].push("left");
					self.outPutData[self.sequenceIndex].push(time);
				}

				// go to the next row
				self.sequenceIndex++;
			}

			// starts the next sequence
			console.log(self.outPutData[self.sequenceIndex - 1]);
			self.startSequence();
		});


		/*
			This code chunk handles the click event for the right fraction.
			In the future, line ratio should be its own class
		*/
		this.r_line_ratio = new createjs.Container();
		this.r_line_ratio.addChild(this.r_click_area);
		this.r_line_ratio.addChild(this.r_line);

		this.r_line_ratio.on("click", function(evt){

			if(self.sequenceIndex == (self.sequenceRowLength-1)){
				/*
					The sequence ends here. Do something...
					Submit a POST request with the statistics
				
				*/

				self.displayEndSequence();
			}
			else{

				if(self.sequence[self.sequenceIndex]["correct"] == "right"){
					/*
						Sequence is correct.
						Record data.
					*/
					console.log(self.timeRecorder);
					console.log(Date.now());

					var time = Date.now() - self.timeRecorder;
					//time = convertMStoS(time, 2);

					self.outPutData[self.sequenceIndex].push("correct");
					self.outPutData[self.sequenceIndex].push("right");
					self.outPutData[self.sequenceIndex].push(time);
				}
				else{
					/*
						Sequence is incorrect.
						Record data.
					*/

					var time = Date.now() - self.timeRecorder;
					//time = convertMStoS(time, 2);

					self.outPutData[self.sequenceIndex].push("incorrect");
					self.outPutData[self.sequenceIndex].push("right");
					self.outPutData[self.sequenceIndex].push(time);
				}

				self.sequenceIndex++;
			}

			// clear the screen, record the info
			console.log(self.outPutData[self.sequenceIndex - 1]);
			self.startSequence();
		});

		/*
		This chunk of code is responsible for the fraction.

		*/
		this.fraction_Container = new createjs.Container();

		// this code chunk takes care of the objects 
		// required to display the fraction
		this.divsionSign = new createjs.Shape();
		this.divsionSign.graphics.setStrokeStyle(3).beginStroke("white");
		this.divsionSign.graphics.moveTo(0, 40).lineTo(20, 40);

		this.numeratorText = new createjs.Text("--", "bold 36px Arial", "#ffffff");

		this.denominatorText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		this.denominatorText.y = 45;

		this.fraction_Container.x = cw * .48;
		this.fraction_Container.y = ch * .15;
		this.fraction_Container.addChild(this.numeratorText);
		this.fraction_Container.addChild(this.divsionSign);
		this.fraction_Container.addChild(this.denominatorText);

		// adds the elements to the canvas stage for display
		this.sequenceStage.addChild(this.fraction_Container);
		this.sequenceStage.addChild(this.l_line_ratio);
		this.sequenceStage.addChild(this.r_line_ratio);
	}

	SequenceHandler.prototype.startSequence = function(){

		this.unShow();
		this.fixation.startTime = createCountDown(this.time);
		this.fixation.visible = true;
		this.handleSequence();
	}

	/*
	Currently just hides the fraction and nonysmbolic ratios.
	Can change to show statistics in the end, or to submit the
	POST request.
	*/
	SequenceHandler.prototype.displayEndSequence = function(){
		this.unShow();
		this.sequenceOn = false;
	}

	SequenceHandler.prototype.handleSequence = function(seq){

		if(this.fixationTimeOver() && this.sequenceOn){
			var num = this.sequence[this.sequenceIndex]["frac_num"];
			var den = this.sequence[this.sequenceIndex]["frac_dem"];

			this.showFraction(num, den);
			this.showNonSymbolicRatios();
			// set time:
			this.timeRecorder = Date.now();
		}
	}


	/*
	Hides the fraction and nonsymoblic ratios.
	*/
	SequenceHandler.prototype.unShow = function(){
		this.l_line_ratio.visible = false;
		this.r_line_ratio.visible = false;

		this.fraction_Container.visible = false;
	}

	// this generates the image of the fixation. The param, time takes in
	// time in milliseconds and displays the fixation for that duration.
	SequenceHandler.prototype.displayFixation = function(time){

		this.fixation.startTime = createCountDown(time);
		this.sequenceStage.addChild(this.fixation);
	}


	// Checks to see if the fixation has exceed its time limit
	SequenceHandler.prototype.fixationTimeOver = function(){
		if(convertMStoS(this.fixation.startTime()) < 0 || convertMStoS(this.fixation.startTime()) == 0){
			this.fixation.visible = false;
			return true;
		}

		return false;
	};


	// Sets the visibility to true
	// assigns the numerator and denominator values
	SequenceHandler.prototype.showFraction = function(num, dem){

		if(!this.fraction_Container.visible){
			this.fraction_Container.visible = !this.fraction_Container.visible;
		}

		// changes the numerator and denominator values
		this.numeratorText.text = num;
		this.denominatorText.text = dem;

	}

	SequenceHandler.prototype.showNonSymbolicRatios = function(ratio1, ratio2, scale)
	{

		// get the ratios for the current sequence
		// denominators will be the scale
		var SCALE = 200;
		var l_ratio = this.sequence[this.sequenceIndex]["nume1"] / this.sequence[this.sequenceIndex]["denom1"];
		var r_ratio = this.sequence[this.sequenceIndex]["nume2"] / this.sequence[this.sequenceIndex]["denom2"]; 

		var cw = this.width;
		var ch = this.height;

		// make visible
		this.l_line_ratio.visible = true;
		this.r_line_ratio.visible = true;

		// add background
		this.l_line_ratio.x = cw * .25;
		this.l_line_ratio.y = ch * .35;
		this.l_line.graphics.moveTo(0,0).lineTo(0, SCALE);
		this.l_line.graphics.moveTo(20,0).lineTo(20, SCALE * l_ratio);

		// add background
		this.r_line_ratio.x = cw * .75;
		this.r_line_ratio.y = ch * .35;
		this.r_line.graphics.moveTo(0,0).lineTo(0, SCALE);
		this.r_line.graphics.moveTo(20,0).lineTo(20, SCALE * r_ratio);

	}

	window.SequenceHandler = SequenceHandler;
}(window))