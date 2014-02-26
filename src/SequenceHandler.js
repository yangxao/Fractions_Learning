(function(window){
	function SequenceHandler(stage, cWidth, cHeight, inputData){
		this.sequenceStage = stage;
		this.width  = cWidth;
		this.height = cHeight;

		// fixation time
		this.time = 3000;	// in milliseconds

		// create the objects for fractions
		this.defineDrawObjects();

		// automated sequences;
		// intro, end sequences
		this.parseInputData(inputData);

		this.startSequence();
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

	// will be reusing all the same objects, just changing them
	SequenceHandler.prototype.defineDrawObjects = function() {

		var SCALE = 200;
		var cw = this.width;
		var ch = this.height;

		// fixation object
		this.fixation =  new createjs.Shape();
		this.fixation.graphics.setStrokeStyle(3).beginStroke("white");
		this.fixation.graphics.moveTo(cw *.5, ch* .4).lineTo(cw * .5, ch * .6);
		this.fixation.graphics.moveTo(cw * .4, ch * .5).lineTo(cw * .6, ch * .5);
		this.sequenceStage.addChild(this.fixation);

		// This code chunk manages the objects for
		// the nonsymbolic ratios
		this.l_line = new createjs.Shape();
		this.l_line.graphics.setStrokeStyle(10).beginStroke("white");
		this.l_line.graphics.moveTo(0,0).lineTo(0, SCALE);
		this.l_line.graphics.moveTo(20,0).lineTo(20, SCALE *.45);

		this.r_line = new createjs.Shape();
		this.r_line.graphics.setStrokeStyle(10).beginStroke("white");
		this.r_line.graphics.moveTo(0,0).lineTo(0, SCALE);
		this.r_line.graphics.moveTo(20,10).lineTo(20, SCALE *.75);
		
		this.l_click_area = new createjs.Shape();
		this.l_click_area.graphics.f('#AAAAAA').rr(-10,-10, 40, SCALE + 20,10);
		this.r_click_area = new createjs.Shape();
		this.r_click_area.graphics.f('#AAAAAA').rr(-10,-10, 40, SCALE + 20,10);
		
		this.l_line_ratio = new createjs.Container();
		this.l_line_ratio.addChild(this.l_click_area);
		this.l_line_ratio.addChild(this.l_line);		

		var self = this;
		this.l_line_ratio.on("click", function(evt){
			console.log("left ratio clicked")

			// clear the screen, record the info
			self.startSequence();
		});

		this.r_line_ratio = new createjs.Container();
		this.r_line_ratio.addChild(this.r_click_area);
		this.r_line_ratio.addChild(this.r_line);

		this.r_line_ratio.on("click", function(evt){
			console.log("right ratio clicked");

			// clear the screen, record the info
			self.startSequence();
		});

		this.fraction_Container = new createjs.Container();

		// this code chunk takes care of the objects 
		// required to display the fraction
		this.divsionSign = new createjs.Shape();
		this.divsionSign.graphics.setStrokeStyle(3).beginStroke("white");
		this.divsionSign.graphics.moveTo(0, 40).lineTo(20, 40);

		this.numeratorText = new createjs.Text("--", "bold 36px Arial", "#ffffff");
		this.numeratorText.x = 0;
		this.numeratorText.y = 0;

		this.denominatorText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		this.denominatorText.x = 0;
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

		// this.displayFixation();
		this.unShow();
		this.fixation.startTime = createCountDown(this.time);
		this.fixation.visible = true;
		this.handleSequence();

		// this.displayEndSequence();
	}


	SequenceHandler.prototype.handleSequence = function(seq){

		if(this.checkFixation()){
			this.showFraction("1", "3");
			this.showNonSymbolicRatios();
		}
	}

	SequenceHandler.prototype.unShow = function(){
		this.l_line_ratio.visible = false;
		this.r_line_ratio.visible = false;

		this.fraction_Container.visible = false;
	}

	SequenceHandler.prototype.displayIntroSequence = function(){

		this.displayFixation(3000);
	}

	SequenceHandler.prototype.displayEndSequence = function(){

	}

	// this generates the image of the fixation. The param, time takes in
	// time in milliseconds and displays the fixation for that duration.
	SequenceHandler.prototype.displayFixation = function(time){

		this.fixation.startTime = createCountDown(time);
		this.sequenceStage.addChild(this.fixation);
	}

	SequenceHandler.prototype.checkFixation = function(){
		if(convertMStoS(this.fixation.startTime()) < 0 || convertMStoS(this.fixation.startTime()) == 0){
			this.fixation.visible = false;
			return true;
		}

		return false;
	};


	// Just place the number and denominator and 
	// this changes the fraction
	SequenceHandler.prototype.showFraction = function(num, dem){

		// forces the container to be displayed
		if(!this.fraction_Container.visible){
			this.fraction_Container.visible = !this.fraction_Container.visible;
		}

		// changes the numerator and denominator values
		this.numeratorText.text = num;
		this.denominatorText.text = dem;

	}

	SequenceHandler.prototype.showNonSymbolicRatios = function(ratio1, ratio2, scale)
	{

		var cw = this.width;
		var ch = this.height;

		// make visible
		this.l_line_ratio.visible = true;
		this.r_line_ratio.visible = true;

		// add background
		this.l_line_ratio.x = cw * .25;
		this.l_line_ratio.y = ch * .35;

		// add background
		this.r_line_ratio.x = cw * .75;
		this.r_line_ratio.y = ch * .35;

	}

	window.SequenceHandler = SequenceHandler;
}(window))