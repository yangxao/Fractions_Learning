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
		
		this.line_a = {};
		this.line_b = {};
		this.line_c = {};
		this.line_d = {};

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
		this.sequence = inputData;
	};

	// will be reusing all the same objects, just changing them
	// 
	SequenceHandler.prototype.defineDrawObjects = function() {

		var SCALE = this.height * .4;
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

				// DO SOMETHING
				console.log(this.sequence);
			}
			else{

				if(self.sequence[self.sequenceIndex]["correct_side"] == "left"){
					/*
						Sequence is correct.
						Record data.
					*/

					//console.log(self.timeRecorder);
					//console.log(Date.now());

					var time = Date.now() - self.timeRecorder;
					time = convertMStoS(time, 3);

					self.outPutData[self.sequenceIndex]['answer'] = "correct";
					self.outPutData[self.sequenceIndex]['side_selected'] = "left";
					self.outPutData[self.sequenceIndex]['time'] = time;
					console.log("correct");
				}
				else{
					/*
						Sequence is incorrect.
						Record data.
					*/
					//console.log(self.timeRecorder);
					//console.log(Date.now());

					var time = Date.now() - self.timeRecorder;
					time = convertMStoS(time, 3);

					self.outPutData[self.sequenceIndex]['answer'] = "incorrect";
					self.outPutData[self.sequenceIndex]['side_selected'] = "left";
					self.outPutData[self.sequenceIndex]['time'] = time;

					console.log("incorrect");
				}

				// go to the next row
				self.sequenceIndex++;
			}

			// starts the next sequence
			//console.log(self.outPutData[self.sequenceIndex - 1]);
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

				if(self.sequence[self.sequenceIndex]["correct_side"] == "right"){
					/*
						Sequence is correct.
						Record data.
					*/
					//console.log(self.timeRecorder);
					//console.log(Date.now());

					var time = Date.now() - self.timeRecorder;
					time = convertMStoS(time, 3);

					self.outPutData[self.sequenceIndex]['answer'] = "correct";
					self.outPutData[self.sequenceIndex]['side_selected'] = "right";
					self.outPutData[self.sequenceIndex]['time'] = time;
					console.log("correct");
				}
				else{
					/*
						Sequence is incorrect.
						Record data.
					*/

					//console.log(self.timeRecorder);
					//console.log(Date.now());

					var time = Date.now() - self.timeRecorder;
					time = convertMStoS(time, 3);

					self.outPutData[self.sequenceIndex]['answer'] = "incorrect";
					self.outPutData[self.sequenceIndex]['side_selected'] = "right";
					self.outPutData[self.sequenceIndex]['time'] = time;

					console.log("incorrect");
				}

				self.sequenceIndex++;
			}

			// clear the screen, record the info
			//console.log(self.outPutData[self.sequenceIndex - 1]);
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

		// resets the timer
		this.timeRecorder = -1;

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

		// print stats
		var text = new createjs.Text("END", "bold 72px Arial", "#ffffff");
		text.x = .35 * this.height;
		text.y = .4 * this.width;

		this.sequenceStage.addChild(text);

		
	}

	// this sequence loops continously 
	SequenceHandler.prototype.handleSequence = function(seq){

		if(this.fixationTimeOver() && this.sequenceOn){
			var num = this.sequence[this.sequenceIndex]["numerator"];
			var den = this.sequence[this.sequenceIndex]["denominator"];

			if(this.sequenceIndex == (this.sequenceRowLength-1)){
				this.displayEndSequence();
			}
			else{

				if(this.timeRecorder == -1){
					this.timeRecorder = Date.now();
				}
				
				//console.log(this.timeRecorder);
				this.showFraction(num, den);
				this.showNonSymbolicRatios();
				// set time:
			}
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

		line_a = {
			'length' : this.sequence[this.sequenceIndex]['a_length'],
			'top'	   : this.sequence[this.sequenceIndex]['a_top']
		}
		
		line_b = {
			'length' : this.sequence[this.sequenceIndex]['b_length'],
			'top'	   : this.sequence[this.sequenceIndex]['b_top']
		}

		line_c = {
			'length' : this.sequence[this.sequenceIndex]['c_length'],
			'top'	   : this.sequence[this.sequenceIndex]['c_top']
		}

		line_d = {
			'length' : this.sequence[this.sequenceIndex]['d_length'],
			'top'	   : this.sequence[this.sequenceIndex]['d_top']
		}

		var cw = this.width;
		var ch = this.height;

		// make visible
		this.l_line_ratio.visible = true;
		this.r_line_ratio.visible = true;

		// add background
		this.l_line_ratio.x = cw * .25;
		this.l_line_ratio.y = ch * .5;
		this.l_line.graphics.moveTo(0,(line_a.top * ch - this.l_line_ratio.y)).lineTo(0, line_a.length * ch);
		this.l_line.graphics.moveTo(20,(line_b.top * ch - this.l_line_ratio.y)).lineTo(20, line_b.length * ch);

		// add background
		this.r_line_ratio.x = cw * .75;
		this.r_line_ratio.y = ch * .5;
		this.r_line.graphics.moveTo(0,(line_c.top * ch - this.r_line_ratio.y)).lineTo(0, line_c.length * ch);
		this.r_line.graphics.moveTo(20,(line_d.top * ch - this.r_line_ratio.y)).lineTo(20, line_d.length * ch);

	}

	window.SequenceHandler = SequenceHandler;
}(window))