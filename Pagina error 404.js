(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Símbolo13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("AugOhIAA9BIdBAAIAAdBg");
	this.shape.setTransform(92.9,92.9);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,185.8,185.8);


(lib.Símbolo12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.btn_back2 = new cjs.Text("Jugar de nuevo", "bold 28px 'Arial'", "#2D2D2D");
	this.btn_back2.name = "btn_back2";
	this.btn_back2.textAlign = "center";
	this.btn_back2.lineHeight = 33;
	this.btn_back2.lineWidth = 216;
	this.btn_back2.parent = this;
	this.btn_back2.setTransform(110.05,2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("AxMCwIAAlgMAiZAAAIAAFgg");
	this.shape.setTransform(110.075,17.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn_back2,p:{color:"#2D2D2D"}}]}).to({state:[{t:this.btn_back2,p:{color:"#A3195B"}}]},1).to({state:[{t:this.shape},{t:this.btn_back2,p:{color:"#A3195B"}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,220.2,35.3);


(lib.Símbolo9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFBF6").s().p("AAPARIgvAmIgBgpIgzAoIAAhtIAzAoIAAgnIAwAnIAAgmIBGA2IhGA3g");
	this.shape.setTransform(15.875,14.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5CB7E").s().p("AgPCMQgJgDgHgGIhjhkQgNgNAAgSQAAgSANgNIBjhjQAOgNARAAQASAAANANIBkBjQANANAAASQAAASgNANIhkBkQgGAGgJADQgIAEgIAAQgHAAgIgEgAAeA3IBGg3IhGg2IAAAmIgwgnIAAAnIgzgoIAABtIAzgpIABAqIAvgmg");
	this.shape_1.setTransform(14.4,14.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D5D7D9").s().p("AgPCvIAAlcQAPAGAQgGIAAFcg");
	this.shape_2.setTransform(14.4,45.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo9, new cjs.Rectangle(0,0,28.8,63.3), null);


(lib.Símbolo8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFBF6").s().p("AAhANIABAqIgzgoIAAAoIhGg3IBFg2IABApIAygpIAAArIA2grIABBtg");
	this.shape.setTransform(12.2,14.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBE565").s().p("AgQCMQgIgDgGgGIhkhkQgNgNAAgSQAAgSANgNIBkhjQANgNARAAQATAAAMANIBkBjQANANAAASQAAASgNANIhkBkQgFAGgJADQgJAEgIAAQgHAAgJgEgABCA3IAAhtIg2AqIAAgqIgzApIAAgqIhGA3IBGA2IAAgnIAzAoIAAgqIA2Aqg");
	this.shape_1.setTransform(14.375,14.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D5D7D9").s().p("AgQCvIAAlcQAQAGARgGIAAFcg");
	this.shape_2.setTransform(14.375,45.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo8, new cjs.Rectangle(0,0,28.8,63.3), null);


(lib.Símbolo7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2E3131").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape.setTransform(7.4,7.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E3131").s().p("AgBAEQgEgDACgCQACgDADABQAEACgCADQgBABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgBAAg");
	this.shape_1.setTransform(9.0133,4.6364);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2E3131").s().p("AgDACQgCgCAEgCQADgDACAEQACACgEADIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBgBg");
	this.shape_2.setTransform(10.1897,5.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAAAADQAAAEgEAAQgDAAAAgEg");
	this.shape_3.setTransform(10.625,7.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2E3131").s().p("AgBAEQgEgCACgDQACgEADACQAEACgDADQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAAAAAIgCAAg");
	this.shape_4.setTransform(10.2017,9.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2E3131").s().p("AgDACQgCgDAEgCQACgCADAEQACACgEADIgCABQAAAAAAgBQgBAAAAAAQgBAAAAgBQAAAAgBgBg");
	this.shape_5.setTransform(9.0133,10.2103);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAABADQgBAEgEAAQgDAAAAgEg");
	this.shape_6.setTransform(7.4,10.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2E3131").s().p("AgBAEQgEgDACgCQADgEACACQAEACgCADQgBABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBgBg");
	this.shape_7.setTransform(5.7897,10.2103);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2E3131").s().p("AgCACQgDgDAEgCQADgCACAEQACADgEACIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBg");
	this.shape_8.setTransform(4.5983,9.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAAAADQAAAEgEAAQgDAAAAgEg");
	this.shape_9.setTransform(4.175,7.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2E3131").s().p("AgBAEQgEgDACgCQACgEADADQAEABgCADQgBABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgBAAg");
	this.shape_10.setTransform(4.6103,5.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2E3131").s().p("AgDACQgCgDAEgCQADgCACAEQACACgEADIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBgBg");
	this.shape_11.setTransform(5.7897,4.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAABADQgBAEgEAAQgDAAAAgEg");
	this.shape_12.setTransform(7.4,4.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D5D7D9").s().p("AgeAfQgMgNAAgSQAAgRAMgNQANgMARAAQASAAANAMQAMANAAARQAAASgMANQgNAMgSAAQgRAAgNgMgAgDAgQAAAEADAAQAEAAABgEQgBgEgEAAQgDAAAAAEgAAOAYQgEACADAEQABAEAEgCQAEgDgCgDQAAgBgBAAQAAgBgBAAQAAAAgBgBQAAAAgBAAIgCABgAgTAaQgCADAEADQAEACABgEQADgEgEgCIgCgBQgBAAAAAAQgBABAAAAQgBAAAAABQgBAAAAABgAAYAOQgCAEAEACQAEACACgEQADgEgFgCIgCAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAABgAgdAMQgFACAEAEQABAEAEgCQAEgCgCgEQAAgBgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIgCAAgAgGgGQgDADAAADQAAAEADADQADADADAAQAEAAADgDQADgDAAgEQAAgDgDgDQgDgDgEAAQgDAAgDADgAAcAAQAAAEAEAAQAEAAAAgEQAAgDgEAAQgEAAAAADgAgkAAQAAAEAFAAQAEAAAAgEQAAgDgEAAQgFAAAAADgAAagTQgEACACAEQADAEADgDQAEgCgCgDQgBgBAAAAQAAgBgBAAQAAAAgBgBQAAAAgBAAIgCABgAgegRQgDADAEACQADADADgEQACgEgEgCIgCgBQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAAAABgAANgdQgDADAEADQAEACACgEQACgEgEgCIgCAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAAAABgAgRgfQgEACACAEQADAEADgCQAEgDgDgDQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAAAAAAAIgDAAgAgDgfQAAAEADAAQAEAAABgEQgBgFgEAAQgDAAAAAFg");
	this.shape_13.setTransform(7.4,7.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2E3131").s().p("AgzA1QgWgWAAgfQAAgeAWgVQAWgWAdAAQAfAAAVAWQAWAVAAAeQAAAfgWAWQgVAVgfAAQgdAAgWgVgAgegdQgMANAAAQQAAASAMANQANANARAAQASAAANgNQAMgNAAgSQAAgQgMgNQgNgNgSAAQgRAAgNANg");
	this.shape_14.setTransform(7.4,7.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo7, new cjs.Rectangle(0,0,14.8,14.8), null);


(lib.Símbolo6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2E3131").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape.setTransform(7.4,7.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E3131").s().p("AgBAEQgEgDACgCQADgEACACQAEACgCADQgBABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgBAAg");
	this.shape_1.setTransform(9.025,4.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2E3131").s().p("AgDACQgCgCAEgCQACgDADAEQACADgEACIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBgBg");
	this.shape_2.setTransform(10.2133,5.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAAAADQAAAEgEAAQgDAAAAgEg");
	this.shape_3.setTransform(10.625,7.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2E3131").s().p("AgBAEQgFgCADgDQACgDADABQAEACgCADQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgBAAg");
	this.shape_4.setTransform(10.2014,9.0364);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2E3131").s().p("AgDACQgCgDAEgBQADgDACAEQACADgEACIgCABQAAAAAAAAQAAgBgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_5.setTransform(9.025,10.1983);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAAAADQAAAEgEAAQgDAAAAgEg");
	this.shape_6.setTransform(7.425,10.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2E3131").s().p("AgBAEQgEgDACgCQACgEADACQAEACgCADQgBABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBgBg");
	this.shape_7.setTransform(5.8103,10.2103);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2E3131").s().p("AgDACQgCgDAEgCQADgCACAEQACADgEACIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBgBg");
	this.shape_8.setTransform(4.625,9.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAAAADQAAAEgEAAQgDAAAAgEg");
	this.shape_9.setTransform(4.175,7.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2E3131").s().p("AgBAEQgEgCACgDQACgEADADQAEABgCADQgBABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAIgCgBg");
	this.shape_10.setTransform(4.625,5.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2E3131").s().p("AgCACQgDgDAEgCQADgCACAEQACACgEADIgCAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBg");
	this.shape_11.setTransform(5.7983,4.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2E3131").s().p("AgDAAQAAgDADAAQAEAAAAADQAAAEgEAAQgDAAAAgEg");
	this.shape_12.setTransform(7.425,4.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D5D7D9").s().p("AgeAfQgMgNAAgSQAAgRAMgNQANgMARAAQASAAANAMQAMANAAARQAAASgMANQgNAMgSAAQgRAAgNgMgAgDAgQAAAEADAAQAEAAAAgEQAAgEgEAAQgDAAAAAEgAAOAYQgEACACAEQADAEADgCQAEgDgCgDQgBgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAIgDABgAgTAaQgCADAEADQADACADgEQACgEgEgCIgDgBQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAgBABgAAYAOQgDAEAFACQADACADgEQACgEgEgCIgCAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAABgAgdAMQgEACACAEQACAEAEgCQAEgCgCgEQgBgBAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIgCAAgAgGgGQgDADAAADQAAAEADADQADADADAAQAEAAADgDQADgDAAgEQAAgDgDgDQgDgDgEAAQgDAAgDADgAAcAAQAAAEAEAAQAEAAAAgEQAAgDgEAAQgEAAAAADgAgkAAQAAAEAFAAQAEAAAAgEQAAgDgEAAQgFAAAAADgAgfgRQgCAEAEABQAEADACgEQACgEgEgCIgDgBQAAAAgBAAQAAAAAAABQgBAAAAABQAAAAgBABgAAagTQgEACACAEQACAEAEgDQAEgBgCgEQgBgBAAAAQgBgBAAAAQgBAAAAgBQAAAAgBAAIgCABgAAMgdQgCADAEADQAEACACgEQACgEgEgCIgCAAQgBAAAAAAQgBAAAAAAQgBAAAAABQAAAAgBABgAgRgfQgFACADAEQACAEAEgCQAEgDgCgDQgBgBAAAAQAAgBgBAAQAAAAgBAAQAAAAgBAAIgCAAgAgDgfQAAAEADAAQAEAAAAgEQAAgFgEAAQgDAAAAAFg");
	this.shape_13.setTransform(7.425,7.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2E3131").s().p("AgzA1QgWgWAAgfQAAgeAWgVQAWgWAdAAQAeAAAXAWQAVAVAAAeQAAAfgVAWQgWAVgfAAQgdAAgWgVgAgegdQgMANAAAQQAAASAMANQANANARAAQASAAANgNQANgNAAgSQAAgQgNgNQgNgNgSAAQgRAAgNANg");
	this.shape_14.setTransform(7.4,7.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo6, new cjs.Rectangle(0,0,14.8,14.8), null);


(lib.Símbolo4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.text = new cjs.Text("Jugar de nuevo", "bold 28px 'Arial'", "#2D2D2D");
	this.text.textAlign = "center";
	this.text.lineHeight = 33;
	this.text.lineWidth = 216;
	this.text.parent = this;
	this.text.setTransform(110.05,2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0099CC").s().p("AxMCwIAAlgMAiZAAAIAAFgg");
	this.shape.setTransform(110.075,17.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text,p:{color:"#2D2D2D"}}]}).to({state:[{t:this.text,p:{color:"#A3195B"}}]},1).to({state:[{t:this.shape},{t:this.text,p:{color:"#A3195B"}}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,220.2,35.3);


(lib.Símbolo3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D8083").s().p("AgVBQQghgJgRgdQgSgeAJggQAJgiAegRQAegRAhAIQAhAJARAfQASAdgJAhQgJAhgeARQgUAMgVAAQgKAAgMgEg");
	this.shape.setTransform(63.825,28.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D8083").s().p("AgpBIQgegRgJghQgJghASgeQARgdAhgJQAhgJAeARQAeARAJAhQAJAhgSAeQgRAeghAJQgMADgKAAQgVAAgUgMg");
	this.shape_1.setTransform(63.825,54.4971);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7D8083").s().p("Ag6A7QgZgZAAgiQAAgiAZgYQAYgYAiAAQAjAAAYAYQAYAYABAiQgBAigYAZQgYAYgjAAQgiAAgYgYg");
	this.shape_2.setTransform(41.7,67.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7D8083").s().p("AgVBRQghgJgRgeQgSgeAJghQAJghAegRQAegRAhAJQAhAJARAdQASAegJAhQgJAhgeARQgUAMgVAAQgKAAgMgDg");
	this.shape_3.setTransform(19.575,54.4971);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#7D8083").s().p("AgpBIQgegRgJghQgJghASgdQARgfAhgJQAhgIAeARQAeARAJAiQAJAggSAeQgRAdghAJQgMAEgKAAQgVAAgUgMg");
	this.shape_4.setTransform(19.575,28.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7D8083").s().p("Ag6A7QgZgYAAgjQAAgiAZgYQAYgYAiAAQAjAAAYAYQAYAYABAiQgBAjgYAYQgYAYgjAAQgiAAgYgYg");
	this.shape_5.setTransform(41.7,16.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#7D8083").p("ABZAAQAAAlgaAbQgaAaglAAQgkAAgbgaQgZgbAAglQAAgkAZgaQAbgaAkAAQAlAAAaAaQAaAaAAAkg");
	this.shape_6.setTransform(41.7,41.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7D8083").s().p("AgQASQgIgIABgKQgBgJAIgIQAHgHAJAAQAKAAAIAHQAGAIAAAJQAAAKgGAIQgIAHgKAAQgJAAgHgHg");
	this.shape_7.setTransform(41.7,41.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D5D7D9").s().p("AkKELQhvhuAAidQAAicBvhuQBvhvCbAAQCdAABuBvQBwBuAACcQAACdhwBuQhuBvidAAQibAAhvhvg");
	this.shape_8.setTransform(41.7,41.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#202120").s().p("AkmEnQh6h6AAitQAAisB6h6QB6h6CsAAQCtAAB6B6QB6B6AACsQAACth6B6Qh6B6itAAQisAAh6h6g");
	this.shape_9.setTransform(41.7,41.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFDFB").s().p("AgeAvIAAhaIAWAAIACAQIABAAQAFgKAGgEQAGgFAIAAIAGABIAFABIgFAYIgFgBIgFgBQgFAAgGAEQgFAEgDAJIAAA0g");
	this.shape_10.setTransform(79.925,82.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFDFB").s().p("AgZAsQgHgDgDgHQgDgGAAgIQAAgOAMgHQAMgIAagDQAAgGgEgDQgDgEgGAAQgGAAgGACQgGACgGAEIgKgSQAJgFAJgDQAKgDAKgBQARAAAKALQAJAKAAAVIAAAzIgWAAIgCgKIAAAAQgGAGgHADQgFADgIAAQgIAAgGgEgAgHAJQgGAEABAFQAAAFACACQADACAFAAQAEAAADgCIAHgGIAAgQQgNACgGAEg");
	this.shape_11.setTransform(70.625,83.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFDFB").s().p("AgjAtIAAgOIAlg2IgiAAIAAgWIBEAAIAAAPIgmA3IAnAAIAAAUg");
	this.shape_12.setTransform(61.75,83.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFDFB").s().p("AAOAvIAAg0QAAgKgCgEQgDgEgGAAQgEAAgEADQgEACgEAEIAAA9IgbAAIAAhaIAWAAIACALIABAAQAFgFAHgEQAHgEAJgBQAPABAGAJQAHAKAAARIAAA4g");
	this.shape_13.setTransform(52.2,82.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFDFB").s().p("AgRAqQgKgFgHgLQgGgLAAgPQABgOAGgKQAGgLAJgGQAKgFAKgBQANABAIAFQAJAGAFAKQAEAKAAAMIgBAGIAAAFIg2AAQACAKAGAFQAGAEAJAAIAKgBIAKgFIAIARQgHAFgIACQgIADgJAAQgMAAgKgGgAASgIQAAgIgEgFQgDgFgJAAQgFAAgEAEQgFAFgCAJIAgAAIAAAAg");
	this.shape_14.setTransform(42.15,83.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFDFB").s().p("AAoAvIAAg0QAAgKgDgEQgCgEgGAAQgDAAgEADQgEACgFAEIAAA9IgaAAIAAg0QAAgKgCgEQgDgEgGAAQgDAAgEADQgEACgEAEIAAA9IgbAAIAAhaIAWAAIACALIAAAAQAGgFAGgEQAHgEAJgBQAJABAFADQAHAEADAIQAGgHAHgEQAHgEAJgBQAOABAHAJQAHAKAAARIAAA4g");
	this.shape_15.setTransform(29.575,82.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFDFB").s().p("AgVAqQgKgFgGgLQgGgLgBgPQABgOAGgLQAGgKAKgGQAKgFALgBQAMABAKAFQAKAGAGAKQAGALAAAOQAAAPgGALQgGALgKAFQgKAGgMAAQgLAAgKgGgAgLgSQgEAHAAALQAAAMAEAHQADAHAIAAQAIAAAFgHQAEgHAAgMQAAgLgEgHQgFgHgIAAQgIAAgDAHg");
	this.shape_16.setTransform(16.55,83.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFDFB").s().p("AgPAqQgKgFgGgLQgGgLAAgPQABgOAGgLQAHgKAKgGQALgFAMgBQAIABAHACQAHADAEAFIgMARIgGgEQgDgCgEAAQgKAAgEAHQgGAHAAALQAAAMAGAHQAEAHAJAAIAKgCIAHgFIALASQgHAFgIADQgIADgIAAQgLAAgLgGg");
	this.shape_17.setTransform(7.275,83.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#666666").s().p("AkLELQhuhuAAidQAAicBuhuQBwhvCbAAQCcAABwBvQBvBuAACcQAACdhvBuQhvBvidAAQibAAhwhvg");
	this.shape_18.setTransform(41.7,22.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFDFB").s().p("AnuJZIAAyxIPdAAIAASxg");
	this.shape_19.setTransform(42.475,38.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9,p:{y:41.725}},{t:this.shape_8},{t:this.shape_7,p:{y:41.725}},{t:this.shape_6,p:{y:41.7}},{t:this.shape_5,p:{y:16.175}},{t:this.shape_4,p:{y:28.95}},{t:this.shape_3,p:{y:54.4971}},{t:this.shape_2,p:{y:67.275}},{t:this.shape_1,p:{y:54.4971}},{t:this.shape,p:{y:28.95}}]}).to({state:[{t:this.shape_9,p:{y:22.825}},{t:this.shape_18},{t:this.shape_7,p:{y:22.825}},{t:this.shape_6,p:{y:22.8}},{t:this.shape_5,p:{y:-2.725}},{t:this.shape_4,p:{y:10.05}},{t:this.shape_3,p:{y:35.5971}},{t:this.shape_2,p:{y:48.375}},{t:this.shape_1,p:{y:35.5971}},{t:this.shape,p:{y:10.05}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_19},{t:this.shape_9,p:{y:22.825}},{t:this.shape_18},{t:this.shape_7,p:{y:22.825}},{t:this.shape_6,p:{y:22.8}},{t:this.shape_5,p:{y:-2.725}},{t:this.shape_4,p:{y:10.05}},{t:this.shape_3,p:{y:35.5971}},{t:this.shape_2,p:{y:48.375}},{t:this.shape_1,p:{y:35.5971}},{t:this.shape,p:{y:10.05}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-21.2,99,120.3);


(lib.Símbolo1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2E3131").s().p("AiaAUIAAgnIE1AAIAAAng");
	this.shape.setTransform(57.4004,597.4792,3.4828,3.4828);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E3131").s().p("AiaAUIAAgnIE1AAIAAAng");
	this.shape_1.setTransform(668.5507,597.4792,3.4828,3.4828);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#202120").p("EAz6Al5MhnxAAAQiKAAhhhhQhihiAAiJMAAAhBaQAAiKBihgQBhhhCKAAMBnxAAAQCJAABgBhQBiBgAACKMAAABBaQAACJhiBiQhgBhiJAAg");
	this.shape_2.setTransform(365.275,256.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFBF6").s().p("Egz3Al5QiKAAhhhhQhihiAAiJMAAAhBaQAAiJBihgQBhhiCKAAMBnxAAAQCJAABgBiQBiBgAACJMAAABBaQAACJhiBiQhgBhiJAAg");
	this.shape_3.setTransform(365.275,256.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#150D08").s().p("Ak1ApQgRgBgMgMQgMgLAAgRQAAgQAMgMQAMgMARABIJrAAQARgBAMAMQAMAMAAAQQAAARgMALQgMAMgRABg");
	this.shape_4.setTransform(369.6365,14.1045,3.4828,3.4828);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#150D08").s().p("AhBCWIAAkrICDAAIAAErg");
	this.shape_5.setTransform(59.8384,538.5323,3.4828,3.4828);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#150D08").s().p("AhBCWIAAkrICDAAIAAErg");
	this.shape_6.setTransform(667.2446,538.5323,3.4828,3.4828);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo1, new cjs.Rectangle(-1,0,732.6,604.3), null);


(lib.Path_45 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AjpFRIFDqhICQAAIj8Khg");
	this.shape.setTransform(23.35,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_45, new cjs.Rectangle(0,0,46.7,67.4), null);


(lib.Path_44 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AgVAAIAsAAIgtAAg");
	this.shape.setTransform(2.2625,0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_44, new cjs.Rectangle(0,0,4.6,0.1), null);


(lib.Path_43 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AizFRIiRqhIKJAAIjgKhg");
	this.shape.setTransform(32.5,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_43, new cjs.Rectangle(0,0,65,67.4), null);


(lib.Path_42 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_41 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ADnFRQgFgLgFgKIiVqIIj4AAIEAI0IgKgBQg5AAgsAgIjfpXIFaAAICjKhg");
	this.shape.setTransform(25.525,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_41, new cjs.Rectangle(0,0,51.1,67.4), null);


(lib.Path_40 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AhylNIDlJpQgSAVgKAYIhaAAQgLAAgHAFg");
	this.shape.setTransform(11.5,33.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_40, new cjs.Rectangle(0,0,23,66.9), null);


(lib.Path_39 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AgLFHIhxAAID5qVIhzKdQgKgIgLAAg");
	this.shape.setTransform(12.525,33.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_39, new cjs.Rectangle(0.1,0,24.9,67), null);


(lib.Path_38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AAuD7Iioo+IgLgBIB3ABICUKIQgfg1g5gVg");
	this.shape.setTransform(20.225,32.4875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_38, new cjs.Rectangle(6.8,0.1,26.900000000000002,64.9), null);


(lib.Path_37 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAuD7Iioo+IgLgBIB3ABICUKIQgfg1g5gVg");
	this.shape.setTransform(20.225,32.4875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_37, new cjs.Rectangle(6.8,0.1,26.900000000000002,64.9), null);


(lib.Path_36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AB6EaIkAo0IA9ABIDQI0g");
	this.shape.setTransform(13.475,28.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_36, new cjs.Rectangle(0,0,27,56.6), null);


(lib.Path_35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AB6EaIkAo0IA9ABIDQI0g");
	this.shape.setTransform(13.475,28.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_35, new cjs.Rectangle(0,0,27,56.6), null);


(lib.Path_34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ABVEWIjQo1IBPABICoI+QgRgHgWgDg");
	this.shape.setTransform(12.4,28.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_34, new cjs.Rectangle(0,0,24.8,57.6), null);


(lib.Path_33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABVEWIjQo1IBPABICoI+QgRgHgWgDg");
	this.shape.setTransform(12.4,28.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_33, new cjs.Rectangle(0,0,24.8,57.6), null);


(lib.Path_32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ABVEWIjQo1IBPABICoI+QgRgHgWgDg");
	this.shape.setTransform(12.4,28.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_32, new cjs.Rectangle(0,0,24.8,57.6), null);


(lib.Path_31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ABEFRIijqhIAuAAICQKhg");
	this.shape.setTransform(9.55,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_31, new cjs.Rectangle(0,0,19.1,67.4), null);


(lib.Path_30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABEFRIijqhIAuAAICQKhg");
	this.shape.setTransform(9.55,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_30, new cjs.Rectangle(0,0,19.1,67.4), null);


(lib.Path_29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AjFFRIFCqgIBJgBIlCKhg");
	this.shape.setTransform(19.825,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_28, new cjs.Rectangle(0,0,39.7,67.4), null);


(lib.Path_27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AjFFRIFCqgIBJgBIlCKhg");
	this.shape.setTransform(19.825,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_27, new cjs.Rectangle(0,0,39.7,67.4), null);


(lib.Path_26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AhLADIAAgDICXgCIgCAFg");
	this.shape.setTransform(7.625,0.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_26, new cjs.Rectangle(0,0,15.3,0.5), null);


(lib.Path_25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AjIFRIABgBIAQgBIEIqfIB4AAIgBABIhOABIj5Kfg");
	this.shape.setTransform(20.075,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_25, new cjs.Rectangle(0,0,40.2,67.4), null);


(lib.Path_24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AjIFRIABgBIAQgBIEIqfIB4AAIgBABIhOABIj5Kfg");
	this.shape.setTransform(20.075,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_24, new cjs.Rectangle(0,0,40.2,67.4), null);


(lib.Path_23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AijFRID5qgIBOgBIlCKhg");
	this.shape.setTransform(16.4,33.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_23, new cjs.Rectangle(0,0,32.8,67.3), null);


(lib.Path_22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AijFRID5qgIBOgBIlCKhg");
	this.shape.setTransform(16.4,33.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_22, new cjs.Rectangle(0,0,32.8,67.3), null);


(lib.Path_21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("AijFRID5qgIBOgBIlCKhg");
	this.shape.setTransform(16.4,33.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_21, new cjs.Rectangle(0,0,32.8,67.3), null);


(lib.Path_20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ABZlQIAuAAIj5KgIgUABg");
	this.shape.setTransform(13.525,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_20, new cjs.Rectangle(0,0,27.1,67.4), null);


(lib.Path_19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABZlQIAuAAIj5KgIgUABg");
	this.shape.setTransform(13.525,33.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_19, new cjs.Rectangle(0,0,27.1,67.4), null);


(lib.Path_18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ABulQIAfAAIkIKgIgRABg");
	this.shape.setTransform(14.075,33.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_18, new cjs.Rectangle(0,0,28.2,67.3), null);


(lib.Path_17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#008ECE").s().p("ABulQIAfAAIkIKgIgRABg");
	this.shape.setTransform(14.075,33.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_17, new cjs.Rectangle(0,0,28.2,67.3), null);


(lib.Path_16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABulQIAfAAIkIKgIgRABg");
	this.shape.setTransform(14.075,33.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_16, new cjs.Rectangle(0,0,28.2,67.3), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Símbolo11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.instance = new lib.Símbolo13();
	this.instance.setTransform(84.55,83.7,1,1,0,0,0,92.9,92.9);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.Símbolo13(), 3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D8083").s().p("AgVBQQghgJgRgdQgSgeAJggQAJgiAegRQAegRAhAIQAhAJARAfQASAdgJAhQgJAhgeARQgUAMgVAAQgKAAgMgEg");
	this.shape.setTransform(130.7363,59.2791,2.0489,2.0489);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D8083").s().p("AgpBIQgegRgJghQgJghASgeQARgdAhgJQAhgJAeARQAeARAJAhQAJAhgSAeQgRAeghAJQgMADgKAAQgVAAgUgMg");
	this.shape_1.setTransform(130.7363,111.6226,2.0489,2.0489);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7D8083").s().p("Ag6A7QgZgZAAgiQAAgiAZgYQAYgYAiAAQAjAAAYAYQAYAYABAiQgBAigYAZQgYAYgjAAQgiAAgYgYg");
	this.shape_2.setTransform(85.4043,137.8034,2.0489,2.0489);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7D8083").s().p("AgVBRQghgJgRgeQgSgeAJghQAJghAegRQAegRAhAJQAhAJARAdQASAegJAhQgJAhgeARQgUAMgVAAQgKAAgMgDg");
	this.shape_3.setTransform(40.0723,111.6226,2.0489,2.0489);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#7D8083").s().p("AgpBIQgegRgJghQgJghASgdQARgfAhgJQAhgIAeARQAeARAJAiQAJAggSAeQgRAdghAJQgMAEgKAAQgVAAgUgMg");
	this.shape_4.setTransform(40.0723,59.2791,2.0489,2.0489);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7D8083").s().p("Ag6A7QgZgYAAgjQAAgiAZgYQAYgYAiAAQAjAAAYAYQAYAYABAiQgBAjgYAYQgYAYgjAAQgiAAgYgYg");
	this.shape_5.setTransform(85.4043,33.1044,2.0489,2.0489);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#7D8083").p("ABZAAQAAAlgaAbQgaAaglAAQgkAAgbgaQgZgbAAglQAAgkAZgaQAbgaAkAAQAlAAAaAaQAaAaAAAkg");
	this.shape_6.setTransform(85.4043,85.4026,2.0489,2.0489);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7D8083").s().p("AgQASQgIgIABgKQgBgJAIgIQAHgHAJAAQAKAAAIAHQAGAIAAAJQAAAKgGAIQgIAHgKAAQgJAAgHgHg");
	this.shape_7.setTransform(85.4043,85.4539,2.0489,2.0489);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D5D7D9").s().p("AkKELQhvhuAAidQAAicBvhuQBvhvCbAAQCdAABuBvQBwBuAACcQAACdhwBuQhuBvidAAQibAAhvhvg");
	this.shape_8.setTransform(85.4043,85.4539,2.0489,2.0489);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#202120").s().p("AkmEnQh6h6AAitQAAisB6h6QB6h6CsAAQCtAAB6B6QB6B6AACsQAACth6B6Qh6B6itAAQisAAh6h6g");
	this.shape_9.setTransform(85.4043,85.4539,2.0489,2.0489);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo11, new cjs.Rectangle(-8.3,-9.2,185.8,185.79999999999998), null);


(lib.Símbolo10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa_1
	this.instance = new lib.Símbolo11();
	this.instance.setTransform(85.45,85.45,1,1,0,0,0,85.5,85.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:84.6,regY:83.7,rotation:76.5957,x:86.95,y:92.65},0).wait(1).to({rotation:153.1915,y:103.45},0).wait(1).to({rotation:229.7872,x:84.55,y:112.45},0).wait(1).to({rotation:306.383,x:83.5,y:118.7},0).wait(1).to({rotation:382.9787,x:85.35,y:125.5},0).wait(1).to({rotation:459.5745,x:87.3,y:135.35},0).wait(1).to({rotation:536.1702,x:86.35,y:146.05},0).wait(1).to({rotation:612.766,x:83.95,y:154.05},0).wait(1).to({rotation:689.3617,x:83.8,y:160},0).wait(1).to({rotation:765.9574,x:86.1,y:167.65},0).wait(1).to({rotation:842.5532,x:87.4,y:178.2},0).wait(1).to({rotation:919.1489,x:85.65,y:188.35},0).wait(1).to({rotation:995.7447,x:83.6,y:195.5},0).wait(1).to({rotation:1072.3404,x:84.35,y:201.5},0).wait(1).to({rotation:1148.9362,x:86.8,y:210.15},0).wait(1).to({rotation:1225.5319,x:87.15,y:221.05},0).wait(1).to({rotation:1302.1277,x:84.85,y:230.3},0).wait(1).to({rotation:1378.7234,x:83.45,y:236.65},0).wait(1).to({rotation:1455.3191,x:85.1,y:243.3},0).wait(1).to({rotation:1531.9149,x:87.25,y:252.85},0).wait(1).to({rotation:1608.5106,x:86.65,y:263.65},0).wait(1).to({rotation:1685.1064,x:84.15,y:271.95},0).wait(1).to({rotation:1761.7021,x:83.7,y:278},0).wait(1).to({rotation:1838.2979,x:85.9,y:268.9},0).wait(1).to({rotation:1914.8936,x:87.45,y:262.75},0).wait(1).to({rotation:1991.4894,x:85.9,y:256.65},0).wait(1).to({rotation:2068.0851,x:83.65,y:247.55},0).wait(1).to({rotation:2144.6809,x:84.15,y:237.1},0).wait(1).to({rotation:2221.2766,x:86.6,y:228.9},0).wait(1).to({rotation:2297.8723,x:87.25,y:223.2},0).wait(1).to({rotation:2374.4681,x:85.1,y:216.35},0).wait(1).to({rotation:2451.0638,x:83.5,y:206.5},0).wait(1).to({rotation:2527.6596,x:84.85,y:196.4},0).wait(1).to({rotation:2604.2553,x:87.1,y:189.2},0).wait(1).to({rotation:2680.8511,x:86.85,y:183.6},0).wait(1).to({rotation:2757.4468,x:84.4,y:175.8},0).wait(1).to({rotation:2834.0426,x:83.55,y:165.45},0).wait(1).to({rotation:2910.6383,x:85.65,y:156},0).wait(1).to({rotation:2987.234,x:87.4,y:149.65},0).wait(1).to({rotation:3063.8298,x:86.15,y:143.75},0).wait(1).to({rotation:3140.4255,x:83.85,y:135},0).wait(1).to({rotation:3217.0213,x:84,y:124.4},0).wait(1).to({rotation:3293.617,x:86.35,y:116},0).wait(1).to({rotation:3370.2128,x:87.4,y:110.15},0).wait(1).to({rotation:3446.8085,x:85.4,y:103.6},0).wait(1).to({rotation:3523.4043,x:83.5,y:93.95},0).wait(1).to({rotation:3600,x:84.6,y:83.7},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.7,-21.5,266.2,430);


(lib.Símbolo5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Auto
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#202120").s().p("ADtC5QAAgigXgYQgYgYghAAQgiAAgXAYQgYAYAAAiIioAAQAAgigYgYQgWgYgiAAQghAAgYAYQgXAYAAAiIglAAQgUAAgOgOQgPgPAAgUIAAhyQAAgVAPgOQAOgOAUAAIAXAAIBTiLQAFgIAKgFQALgFANAAIEYAAQAbAAALARIBeCMIAWAAQAUAAAOAOQAPAOAAAVIAAByQAAAUgPAPQgOAOgUAAgADXgsIhKhuQgKgNgUAAIhpAAIAAB7IDRAAgAiNiZIhBBtIDBAAIAAh7IhhAAQgWAAgJAOg");
	this.shape.setTransform(33.85,18.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#414A79").s().p("AhgA9IBChrQAJgOAVAAIBhAAIAAB5g");
	this.shape_1.setTransform(22.775,7.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#414A79").s().p("AhnA9IAAh5IBoAAQAUAAAKANIBJBsg");
	this.shape_2.setTransform(44.875,7.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(48));

	// rueda_1_
	this.instance = new lib.Símbolo6();
	this.instance.setTransform(16.55,37.05,1,1,0,0,0,7.4,7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:-7.6596},0).wait(1).to({rotation:-15.3191},0).wait(1).to({rotation:-22.9787,x:16.5,y:37},0).wait(1).to({rotation:-30.6383,y:37.05},0).wait(1).to({rotation:-38.2979,x:16.55,y:37},0).wait(1).to({rotation:-45.9574,x:16.5,y:37.05},0).wait(1).to({rotation:-53.617,x:16.55},0).wait(1).to({rotation:-61.2766,y:37},0).wait(1).to({rotation:-68.9362,x:16.5},0).wait(1).to({rotation:-76.5957},0).wait(1).to({rotation:-84.2553,y:37.05},0).wait(1).to({rotation:-91.9149,x:16.55,y:37},0).wait(1).to({rotation:-99.5745,x:16.5},0).wait(1).to({rotation:-107.234,y:37.05},0).wait(1).to({rotation:-114.8936,x:16.55},0).wait(1).to({rotation:-122.5532,x:16.5,y:37},0).wait(1).to({rotation:-130.2128},0).wait(1).to({rotation:-137.8723,y:37.05},0).wait(1).to({rotation:-145.5319,x:16.55,y:37},0).wait(1).to({rotation:-153.1915},0).wait(1).to({rotation:-160.8511},0).wait(1).to({rotation:-168.5106,x:16.5,y:37.05},0).wait(1).to({rotation:-176.1702,y:37},0).wait(1).to({rotation:-183.8298},0).wait(1).to({rotation:-191.4894,x:16.55},0).wait(1).to({rotation:-199.1489,x:16.5,y:37.05},0).wait(1).to({rotation:-206.8085},0).wait(1).to({rotation:-214.4681},0).wait(1).to({rotation:-222.1277,x:16.55,y:37},0).wait(1).to({rotation:-229.7872,x:16.5},0).wait(1).to({rotation:-237.4468},0).wait(1).to({rotation:-245.1064,x:16.55,y:37.05},0).wait(1).to({rotation:-252.766,y:37},0).wait(1).to({rotation:-260.4255,x:16.5},0).wait(1).to({rotation:-268.0851,y:37.05},0).wait(1).to({rotation:-275.7447,x:16.55,y:37},0).wait(1).to({rotation:-283.4043,x:16.5},0).wait(1).to({rotation:-291.0638},0).wait(1).to({rotation:-298.7234,y:37.05},0).wait(1).to({rotation:-306.383,x:16.55},0).wait(1).to({rotation:-314.0426,y:37},0).wait(1).to({rotation:-321.7021,x:16.5,y:37.05},0).wait(1).to({rotation:-329.3617,x:16.55,y:37},0).wait(1).to({rotation:-337.0213,x:16.5},0).wait(1).to({rotation:-344.6809,x:16.55,y:37.05},0).wait(1).to({rotation:-352.3404},0).wait(1).to({rotation:-360},0).wait(1));

	// rueda_2
	this.instance_1 = new lib.Símbolo7();
	this.instance_1.setTransform(49.55,37.05,1,1,0,0,0,7.4,7.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({rotation:-7.6596},0).wait(1).to({rotation:-15.3191},0).wait(1).to({rotation:-22.9787,x:49.5,y:37},0).wait(1).to({rotation:-30.6383,y:37.05},0).wait(1).to({rotation:-38.2979,x:49.55,y:37},0).wait(1).to({rotation:-45.9574,x:49.5,y:37.05},0).wait(1).to({rotation:-53.617,x:49.55},0).wait(1).to({rotation:-61.2766,y:37},0).wait(1).to({rotation:-68.9362,x:49.5},0).wait(1).to({rotation:-76.5957},0).wait(1).to({rotation:-84.2553,y:37.05},0).wait(1).to({rotation:-91.9149,x:49.55,y:37},0).wait(1).to({rotation:-99.5745,x:49.5},0).wait(1).to({rotation:-107.234,y:37.05},0).wait(1).to({rotation:-114.8936,x:49.55},0).wait(1).to({rotation:-122.5532,x:49.5,y:37},0).wait(1).to({rotation:-130.2128},0).wait(1).to({rotation:-137.8723,y:37.05},0).wait(1).to({rotation:-145.5319,x:49.55,y:37},0).wait(1).to({rotation:-153.1915},0).wait(1).to({rotation:-160.8511},0).wait(1).to({rotation:-168.5106,x:49.5,y:37.05},0).wait(1).to({rotation:-176.1702,y:37},0).wait(1).to({rotation:-183.8298},0).wait(1).to({rotation:-191.4894,x:49.55},0).wait(1).to({rotation:-199.1489,x:49.5,y:37.05},0).wait(1).to({rotation:-206.8085},0).wait(1).to({rotation:-214.4681},0).wait(1).to({rotation:-222.1277,x:49.55,y:37},0).wait(1).to({rotation:-229.7872,x:49.5},0).wait(1).to({rotation:-237.4468},0).wait(1).to({rotation:-245.1064,x:49.55,y:37.05},0).wait(1).to({rotation:-252.766,y:37},0).wait(1).to({rotation:-260.4255,x:49.5},0).wait(1).to({rotation:-268.0851,y:37.05},0).wait(1).to({rotation:-275.7447,x:49.55,y:37},0).wait(1).to({rotation:-283.4043,x:49.5},0).wait(1).to({rotation:-291.0638},0).wait(1).to({rotation:-298.7234,y:37.05},0).wait(1).to({rotation:-306.383,x:49.55},0).wait(1).to({rotation:-314.0426,y:37},0).wait(1).to({rotation:-321.7021,x:49.5,y:37.05},0).wait(1).to({rotation:-329.3617,x:49.55,y:37},0).wait(1).to({rotation:-337.0213,x:49.5},0).wait(1).to({rotation:-344.6809,x:49.55,y:37.05},0).wait(1).to({rotation:-352.3404},0).wait(1).to({rotation:-360},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,67.7,44.6);


// stage content:
(lib.Paginaerror404 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,2,3,4];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_1 = function() {
		var sentidoAuto = true;
		this.stop();
		
		function comenzarJuego(){
			this.gotoAndStop(2);
		}
		this.btn_rueda.addEventListener("click", comenzarJuego.bind(this));
		
		function moverAuto(){
			if(sentidoAuto == true){
				this.mc_autito.x += 12;
			}else{
				this.mc_autito.x-=12;
			}
			
			if(this.mc_autito.x > stage.canvas.width + 100){
				sentidoAuto = false;
				}else if(this.mc_autito.x < 0){
					sentidoAuto = true;
				}
		}
		this.addEventListener("tick", moverAuto.bind(this));
		
		function cambiarRumbo(e){
			if(e.currentTarget.name == "mc_right"){
				sentidoAuto = true;
			}else{
				sentidoAuto = false;
			}
		}
		this.mc_left.addEventListener("click", cambiarRumbo.bind(this));
		this.mc_right.addEventListener("click", cambiarRumbo.bind(this));
	}
	this.frame_2 = function() {
		this.mc_ruedota.cursor = "pointer"; 
		
		var puntoGanado = 0; 
		var puntoPerdido = 0; 
		
		this.txt_perdidos.text = puntoPerdido;
		this.txt_capturados.text = puntoGanado; 
		
		var velocidadRuedota = 15; 
		
		function moverRuedota(){
			this.mc_ruedota.x += velocidadRuedota; 
			if (this.mc_ruedota.x > stage.canvas.width){
				this.mc_ruedota.x = 0;
				this.mc_ruedota.y = Math.random() * 800;
				velocidadRuedota++;
				puntoPerdido++;
				this.txt_perdidos.text = puntoPerdido;
			}
			if (puntoPerdido == 10) {
				this.removeEventListener("tick", auxiliar);
				this.gotoAndStop(3);
				
			}
		}
		
		var auxiliar = moverRuedota.bind(this); 
		this.addEventListener("tick", auxiliar); 
		
		function capturarRueda(e) {
			puntoGanado++;
			this.txt_capturados.text = puntoGanado;
			this.mc_ruedota.x = 0;
			this.mc_ruedota.y = Math.random() * 500;
			velocidadRuedota++;
			if (puntoGanado == 15) {
				this.removeEventListener("tick", auxiliar);
				this.gotoAndStop(4);
			}
		}
		
		this.mc_ruedota.addEventListener("click", capturarRueda.bind(this));
	}
	this.frame_3 = function() {
		function volver1(){
			this.gotoAndStop(1);
		}
		
		this.btn_back1.addEventListener("click", volver1.bind(this));
	}
	this.frame_4 = function() {
		function volver2(){
			this.gotoAndStop(1);
		}
		
		this.btn_back2.addEventListener("click", volver2.bind(this));
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1));

	// Interior_del_auto
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D5D7D9").s().p("AjBAZIAAgxIGDAAIAAAxg");
	this.shape.setTransform(704.7616,605.6369,7.192,7.6977);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E4559").s().p("AhxBhQgiAAgXgXQgYgYABghIAAhxIGDAAIAABxQABAhgYAYQgYAXghAAg");
	this.shape_1.setTransform(704.7616,699.5493,7.192,7.6977);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5A3A17").s().p("AhvBwQgtgvgBhBQABhAAtguQAvguBAAAQBCAAAtAuQAvAugBBAQABBBgvAvQgtAthCABQhAgBgvgtgAg5hxQgeAPgSAdQgTAagDAjIAAARQAEAwAiAhQAhAjAwADIARAAIAAAAQAvgDAighQAigiAEgvIAAgLIAAgGIAAAAQgCgigTgeQgTgcgegPQgXgMgYgCIgBAAIgKAAIgGAAIgBAAQgaACgYAMg");
	this.shape_2.setTransform(111.4177,578.1175,7.192,7.6977);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D5D7D9").s().p("AgICAIAEh3QgDgCgBgDIh3AFIAAgRIB3AFQACgEAEgBIgEh3IAGAAIAKAAIgFB5QAEABABAEIB2gFIAAAGIAAALIh4gFQgCACgDABIAGB3g");
	this.shape_3.setTransform(111.4177,578.1175,7.192,7.6977);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5A3A17").s().p("AgJAJQADgPAQgDIAAAOQgEAAgCAEg");
	this.shape_4.setTransform(102.2479,567.7255,7.192,7.6977);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5A3A17").s().p("AgIAFIABgOQAOAEACAPIgNAAQgBgEgDgBg");
	this.shape_5.setTransform(121.6664,568.6877,7.192,7.6977);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#5A3A17").s().p("AgJgEQADgBACgCIANAAQgDANgOACg");
	this.shape_6.setTransform(120.7674,589.2792,7.192,7.6977);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#5A3A17").s().p("AgCADQgFgFgBgGIANgBQABAEADACIAAAMQgHgBgEgFg");
	this.shape_7.setTransform(101.5287,588.5094,7.192,7.6977);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#EAC179").s().p("AgfAgQgNgNAAgTQAAgRAMgNQAMgNASgBQAdAPASAcIAAABQAAATgNANQgNANgTAAQgRAAgOgNg");
	this.shape_8.setTransform(155.469,525.1955,7.192,7.6977);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EAC179").s().p("AgfAgQgOgNAAgTIABgBQATgcAdgPQARABAMANQAMANAAARQAAATgNANQgNANgTAAQgRAAgOgNg");
	this.shape_9.setTransform(67.1866,525.1955,7.192,7.6977);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FBE565").s().p("AheAWQgHgBgGgEQgGgFgCgHIAAgFQAAgHAGgHQAGgGAJAAIC9AAQAJAAAGAGQAGAHAAAHIAAAFQgCAHgGAFQgGAEgHABg");
	this.shape_10.setTransform(420.8556,578.1175,7.192,7.6977);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D5D7D9").s().p("AhpAkIgKhHQACAHAGAEQAGAFAHAAIC9AAQAHAAAGgFQAGgEACgHIgKBHg");
	this.shape_11.setTransform(420.8556,610.2555,7.192,7.6977);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2E3131").s().p("AhIB2IghjrIDTAAIghDrg");
	this.shape_12.setTransform(420.8556,728.9931,7.192,7.6977);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#203240").s().p("Ag8ArIAEhpIABAAQAYACAXAMQgSABgMANQgMANAAASQAAASAOANQANAOATAAQARAAAOgOQANgNAAgSIAAgCQATAdACAiIAAAAIhoAEQgBgPgQgEg");
	this.shape_13.setTransform(159.4246,528.0822,7.192,7.6977);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#203240").s().p("AA5A+QgwgEgggiQgigggEgwIBpgFQABAHAEAFQAGAFAHACIgFBog");
	this.shape_14.setTransform(63.5906,629.115,7.192,7.6977);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#203240").s().p("Ag4A9IgFhoQAPgDAEgOIBoAEIAAABQgEAvgiAgQghAhgvAEg");
	this.shape_15.setTransform(158.7054,629.8848,7.192,7.6977);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#203240").s().p("Ag+A5QAEgjASgZIgBABQAAASAOANQAOAOARAAQATAAANgOQANgNAAgSQAAgSgMgNQgMgNgRgBQAYgMAZgCIABAAIAFBoQgRADgDAQg");
	this.shape_16.setTransform(64.3098,527.3124,7.192,7.6977);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#203240").s().p("EhJvBB8QhkAAhMhNQhIhNAAhvMAAAgqOQAAiSB2hNQA6grBIAAIKTAAQBLi4B9iiMgZ2hKUIEOhVMAZIBINQFDj6GaAAQAvAAAWAEIBdAIQCiAXB6A2QGaClDjGUQAnBGAkBYMBQnAAAMAcqhRWID8BRIAIAAIAHADMgcOBQCIMtAAQBWAABIBCQBaBNAAB7MAAAAqOQAABvhIBNQhHBNhpAAgApWV7QgvAyAABBMAE2AlyIQdAAMAE1glyQgBhBgrgyQgugyhBAAI1SAAQhBAAgrAygEAZfAsuQAAECCpC0QCpC1DtAAIZsAAQDwAACpi1QCqi0gBkCIAAzrMgrtAAAgEg55AKUQlKFmgBH0QABH5FKFiQFOFiHUAAQHXAAFLliQFLliAAn5QAAn0lLlmQlLlinXAAQnUAAlOFig");
	this.shape_17.setTransform(401.8,426.275);

	this.instance = new lib.Path_16();
	this.instance.setTransform(580.9,264.8,7.192,7.6977,0,0,0,14.2,33.9);
	this.instance.alpha = 0.4688;

	this.instance_1 = new lib.Path_17();
	this.instance_1.setTransform(580.9,264.8,7.192,7.6977,0,0,0,14.2,33.9);
	this.instance_1.alpha = 0.0586;

	this.instance_2 = new lib.Path_18();
	this.instance_2.setTransform(580.9,264.8,7.192,7.6977,0,0,0,14.2,33.9);
	this.instance_2.alpha = 0.0586;

	this.instance_3 = new lib.Path_19();
	this.instance_3.setTransform(562.15,265.55,7.192,7.6977,0,0,0,13.6,34);
	this.instance_3.alpha = 0.4688;

	this.instance_4 = new lib.Path_20();
	this.instance_4.setTransform(562.15,265.55,7.192,7.6977,0,0,0,13.6,34);
	this.instance_4.alpha = 0.0586;

	this.instance_5 = new lib.Path_21();
	this.instance_5.setTransform(650.3,265.55,7.192,7.6977,0,0,0,16.6,33.9);
	this.instance_5.alpha = 0.0586;

	this.instance_6 = new lib.Path_22();
	this.instance_6.setTransform(650.3,265.55,7.192,7.6977,0,0,0,16.6,33.9);
	this.instance_6.alpha = 0.4688;

	this.instance_7 = new lib.Path_23();
	this.instance_7.setTransform(650.3,265.55,7.192,7.6977,0,0,0,16.6,33.9);
	this.instance_7.alpha = 0.0586;

	this.instance_8 = new lib.Path_24();
	this.instance_8.setTransform(623.7,265.55,7.192,7.6977,0,0,0,20.2,34);
	this.instance_8.alpha = 0.0586;

	this.instance_9 = new lib.Path_25();
	this.instance_9.setTransform(623.7,265.55,7.192,7.6977,0,0,0,20.2,34);
	this.instance_9.alpha = 0.0586;

	this.instance_10 = new lib.Path_26();
	this.instance_10.setTransform(715.1,3.85,7.192,7.6977,0,0,0,7.8,0.5);
	this.instance_10.alpha = 0.0586;

	this.instance_11 = new lib.Path_27();
	this.instance_11.setTransform(677.6,265.55,7.192,7.6977,0,0,0,19.9,34);
	this.instance_11.alpha = 0.4688;

	this.instance_12 = new lib.Path_28();
	this.instance_12.setTransform(677.6,265.55,7.192,7.6977,0,0,0,19.9,34);
	this.instance_12.alpha = 0.0586;

	this.instance_13 = new lib.Path_29();
	this.instance_13.setTransform(810.75,5.35,7.192,7.6977,0,0,0,0.1,0.3);
	this.instance_13.alpha = 0.4688;

	this.instance_14 = new lib.Path_30();
	this.instance_14.setTransform(194.85,265.55,7.192,7.6977,0,0,0,9.7,34);
	this.instance_14.alpha = 0.5586;

	this.instance_15 = new lib.Path_31();
	this.instance_15.setTransform(194.85,265.55,7.192,7.6977,0,0,0,9.7,34);
	this.instance_15.alpha = 0.0586;

	this.instance_16 = new lib.Path_32();
	this.instance_16.setTransform(65.7,230.15,7.192,7.6977,0,0,0,12.5,29);
	this.instance_16.alpha = 0.0586;

	this.instance_17 = new lib.Path_33();
	this.instance_17.setTransform(65.7,230.15,7.192,7.6977,0,0,0,12.5,29);
	this.instance_17.alpha = 0.5586;

	this.instance_18 = new lib.Path_34();
	this.instance_18.setTransform(65.7,230.15,7.192,7.6977,0,0,0,12.5,29);
	this.instance_18.alpha = 0.0586;

	this.instance_19 = new lib.Path_35();
	this.instance_19.setTransform(30.1,226.7,7.192,7.6977,0,0,0,13.6,28.6);
	this.instance_19.alpha = 0.0586;

	this.instance_20 = new lib.Path_36();
	this.instance_20.setTransform(30.1,226.7,7.192,7.6977,0,0,0,13.6,28.6);
	this.instance_20.alpha = 0.0586;

	this.instance_21 = new lib.Path_37();
	this.instance_21.setTransform(121.8,258.6,7.192,7.6977,0,0,0,20.3,32.7);
	this.instance_21.alpha = 0.5586;

	this.instance_22 = new lib.Path_38();
	this.instance_22.setTransform(121.8,258.6,7.192,7.6977,0,0,0,20.3,32.7);
	this.instance_22.alpha = 0.0586;

	this.instance_23 = new lib.Path_39();
	this.instance_23.setTransform(861.85,272.85,7.192,7.6977,0,0,0,12.7,33.7);
	this.instance_23.alpha = 0.0586;

	this.instance_24 = new lib.Path_40();
	this.instance_24.setTransform(-67,270.95,7.192,7.6977,0,0,0,11.7,33.6);
	this.instance_24.alpha = 0.0586;

	this.instance_25 = new lib.Path_41();
	this.instance_25.setTransform(59.95,265.55,7.192,7.6977,0,0,0,25.6,34);
	this.instance_25.alpha = 0.0586;

	this.instance_26 = new lib.Path_42();
	this.instance_26.setTransform(465.8,524,7.192,7.6977,0,0,0,0.2,0.3);
	this.instance_26.alpha = 0.0586;

	this.instance_27 = new lib.Path_43();
	this.instance_27.setTransform(391.95,265.55,7.192,7.6977,0,0,0,32.5,34);
	this.instance_27.alpha = 0.0586;

	this.instance_28 = new lib.Path_44();
	this.instance_28.setTransform(784.9,6.15,7.192,7.6977,0,0,0,2.5,0.3);
	this.instance_28.alpha = 0.0586;

	this.instance_29 = new lib.Path_45();
	this.instance_29.setTransform(756.4,265.55,7.192,7.6977,0,0,0,23.5,34);
	this.instance_29.alpha = 0.0586;

	this.instance_30 = new lib.Path();
	this.instance_30.setTransform(952.5,9.2,7.1938,7.6994,0,0,0,0.1,0.1);
	this.instance_30.alpha = 0.0586;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},2).wait(3));

	// Contadores
	this.txt_capturados = new cjs.Text("N°", "bold 28px 'Arial'", "#A3195B");
	this.txt_capturados.name = "txt_capturados";
	this.txt_capturados.lineHeight = 33;
	this.txt_capturados.lineWidth = 32;
	this.txt_capturados.parent = this;
	this.txt_capturados.setTransform(177.45,32.2);

	this.txt_perdidos = new cjs.Text("N°", "bold 28px 'Arial'", "#A3195B");
	this.txt_perdidos.name = "txt_perdidos";
	this.txt_perdidos.lineHeight = 33;
	this.txt_perdidos.lineWidth = 32;
	this.txt_perdidos.parent = this;
	this.txt_perdidos.setTransform(690.4,32.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2D2D2D").s().p("AgdAqQgMgHgDgOIAZgEQACAHAFAFQAFADAIAAQAKAAAFgDQADgDAAgEQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQgCgCgHgBQgegHgIgGQgMgHAAgOQAAgMAKgJQAKgIAVAAQATAAAKAGQAJAHAEAMIgYAEQgCgFgEgDQgFgDgHAAQgKAAgEACQgDACAAAEQAAADADABQADADAUAFQAUAEAIAHQAIAGAAAMQAAANgLAKQgLAJgWAAQgTABgLgJg");
	this.shape_18.setTransform(669.875,55.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2D2D2D").s().p("AgkAqQgJgHABgNQgBgIAEgHQAFgGAHgDQAGgDAOgCQARgEAHgCIAAgDQAAgIgEgDQgEgDgIAAQgIAAgDADQgEACgCAHIgYgEQAEgOAKgHQAKgGASAAQARAAAIADQAIAFADAGQAEAGAAARIAAAcIABATQABAGADAIIgZAAIgCgIIgBgDQgHAHgHADQgHACgIAAQgPABgJgJgAAAAGQgKACgEADQgEADAAAGQAAAFADAEQAFADAFAAQAGAAAHgEQAEgDACgFQABgEAAgJIAAgFIgPAEg");
	this.shape_19.setTransform(659.75,55.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2D2D2D").s().p("AgiA3QgMgOAAgYQAAgYALgMQAMgNASAAQAPAAAMANIAAgwIAZAAIAACFIgXAAIAAgOQgGAIgIAEQgIAEgIAAQgQAAgMgNgAgOgFQgGAGAAAOQAAAQAEAHQAHAKAKAAQAJAAAGgIQAGgHAAgPQAAgRgGgGQgGgIgJAAQgJAAgGAIg");
	this.shape_20.setTransform(648.625,53.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2D2D2D").s().p("AgMBDIAAhgIAZAAIAABggAgMgqIAAgYIAZAAIAAAYg");
	this.shape_21.setTransform(640.575,53.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2D2D2D").s().p("AgiA3QgMgOAAgYQAAgYALgMQAMgNASAAQAPAAAMANIAAgwIAZAAIAACFIgXAAIAAgOQgGAIgIAEQgIAEgIAAQgQAAgMgNgAgOgFQgGAGAAAOQAAAQAEAHQAHAKAKAAQAJAAAGgIQAGgHAAgPQAAgRgGgGQgGgIgJAAQgJAAgGAIg");
	this.shape_22.setTransform(632.025,53.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2D2D2D").s().p("AgeAyIAAhhIAXAAIAAAPQAGgLAEgDQAFgCAGAAQAJAAAIAEIgIAXQgGgEgGgBQgFABgEADQgDADgCAHQgCAIAAAYIAAAeg");
	this.shape_23.setTransform(623.675,55.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2D2D2D").s().p("AgjAiQgJgNAAgUQAAgYAMgNQANgNATAAQAVAAAMAOQANAOgBAcIg/AAQAAAMAGAGQAGAGAIABQAGAAAEgDQAEgEACgIIAaAFQgFAOgLAHQgKAIgQgBQgZAAgMgQgAgMgYQgGAHAAAKIAmAAQgBgLgFgGQgGgGgHAAQgIAAgFAGg");
	this.shape_24.setTransform(614.076,55.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2D2D2D").s().p("AguBEIAAiFIAYAAIAAAOQAEgHAIgEQAIgFAJAAQARAAAMANQALAOAAAXQAAAYgLANQgMANgRAAQgHAAgHgDQgGgDgHgIIAAAxgAgPgoQgGAIAAAOQAAARAHAGQAGAIAJAAQAIAAAGgHQAGgGAAgRQAAgPgGgIQgGgHgJAAQgIAAgHAHg");
	this.shape_25.setTransform(603.525,57.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2D2D2D").s().p("AgdAqQgMgIgDgNIAZgEQACAHAFAEQAFAEAIAAQAKAAAFgEQADgCAAgEQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQgCgCgHgBQgegIgIgFQgMgHAAgOQAAgMAKgJQAKgJAVABQATgBAKAHQAJAGAEANIgYAEQgCgFgEgDQgFgDgHAAQgKAAgEACQgDADAAADQAAACADACQADADAUAFQAUAFAIAGQAIAGAAAMQAAAOgLAJQgLAKgWAAQgTAAgLgJg");
	this.shape_26.setTransform(653.275,33.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2D2D2D").s().p("AgjAqQgJgIAAgMQAAgIADgHQAFgGAGgDQAIgDANgDQARgDAHgCIAAgEQAAgGgEgEQgDgDgKAAQgGAAgEADQgEACgDAHIgWgEQADgOAKgHQAKgHASABQAQAAAJADQAIAEAEAHQADAGAAARIAAAcIABATQABAHAEAHIgaAAIgCgIIgBgDQgGAGgIAEQgHADgIAAQgPAAgIgJgAAAAGQgLACgCACQgFAEgBAFQABAGAEADQAEAFAFAAQAGgBAGgEQAGgDABgGQABgDAAgJIAAgFIgPAEg");
	this.shape_27.setTransform(643.15,33.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2D2D2D").s().p("AgiA3QgMgOAAgYQAAgYALgMQAMgNASAAQAPAAAMANIAAgwIAZAAIAACFIgXAAIAAgOQgGAIgIAEQgIAEgIAAQgQAAgMgNgAgOgFQgGAGAAAOQAAAQAEAHQAHAKAKAAQAJAAAGgIQAGgHAAgPQAAgRgGgGQgGgIgJAAQgJAAgGAIg");
	this.shape_28.setTransform(632.025,31.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2D2D2D").s().p("AgjAiQgJgNAAgUQAAgXAMgOQANgNATAAQAVAAAMAOQANAOgBAcIg/AAQAAAMAGAGQAGAGAIABQAGAAAEgEQAEgDACgIIAaAFQgFAOgLAHQgKAIgQAAQgZAAgMgRgAgMgYQgGAGAAALIAmAAQgBgMgFgFQgGgGgHAAQgIAAgFAGg");
	this.shape_29.setTransform(621.326,33.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2D2D2D").s().p("AgcAtQgIgEgEgIQgDgHAAgOIAAg8IAaAAIAAAsQgBAUACAEQACAFADACQAEADAGAAQAFAAAGgEQAEgDADgGQACgEAAgVIAAgoIAZAAIAABgIgYAAIAAgPQgFAIgIAEQgIAEgKABQgKAAgHgFg");
	this.shape_30.setTransform(610.5,33.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2D2D2D").s().p("AgeAyIAAhgIAXAAIAAANQAGgJAEgDQAFgDAGAAQAJAAAIAEIgIAXQgGgFgGAAQgFAAgEAEQgDADgCAHQgCAIAAAXIAAAfg");
	this.shape_31.setTransform(601.925,33);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2D2D2D").s().p("AgdAqQgMgHgDgOIAZgEQACAHAFAFQAFADAIAAQAKAAAFgDQADgDAAgEQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQgCgCgHgBQgegHgIgGQgMgHAAgOQAAgMAKgJQAKgIAVAAQATAAAKAGQAJAHAEAMIgYAEQgCgFgEgDQgFgDgHAAQgKAAgEACQgDACAAAEQAAADADABQADADAUAFQAUAEAIAHQAIAGAAAMQAAANgLAKQgLAJgWAAQgTABgLgJg");
	this.shape_32.setTransform(155.875,55.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2D2D2D").s().p("AgjAqQgKgHABgNQAAgIADgHQAFgGAHgDQAGgDAOgCQARgEAHgCIAAgDQAAgIgEgDQgEgDgIAAQgIAAgDADQgEACgCAHIgYgEQAEgOAKgHQAJgGATAAQARAAAIADQAIAFADAGQAEAGAAARIAAAcIABATQABAGAEAIIgaAAIgCgIIgBgDQgHAHgHADQgGACgJAAQgPABgIgJgAAAAGQgKACgEADQgEADAAAGQAAAFADAEQAFADAFAAQAGAAAHgEQAEgDACgFQABgEAAgJIAAgFIgPAEg");
	this.shape_33.setTransform(145.75,55.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2D2D2D").s().p("AgiA3QgMgOAAgYQAAgYALgMQAMgNASAAQAPAAAMANIAAgwIAZAAIAACFIgXAAIAAgOQgGAIgIAEQgIAEgIAAQgQAAgMgNgAgOgFQgGAGAAAOQAAAQAEAHQAHAKAKAAQAJAAAGgIQAGgHAAgPQAAgRgGgGQgGgIgJAAQgJAAgGAIg");
	this.shape_34.setTransform(134.625,53.625);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2D2D2D").s().p("AgkAqQgIgHgBgNQAAgIAFgHQADgGAIgDQAGgDAOgCQARgEAHgCIAAgDQAAgIgEgDQgDgDgKAAQgGAAgEADQgEACgDAHIgWgEQADgOAKgHQAJgGATAAQAQAAAJADQAIAFADAGQAEAGAAARIAAAcIABATQABAGADAIIgZAAIgCgIIgBgDQgGAHgIADQgGACgJAAQgPABgJgJgAAAAGQgLACgCADQgGADAAAGQAAAFAFAEQADADAHAAQAGAAAFgEQAFgDACgFQABgEAAgJIAAgFIgPAEg");
	this.shape_35.setTransform(124,55.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2D2D2D").s().p("AgeAyIAAhhIAXAAIAAAPQAGgLAEgDQAFgCAGAAQAJAAAIAEIgIAXQgGgEgGgBQgFABgEADQgDADgCAHQgCAIAAAYIAAAeg");
	this.shape_36.setTransform(115.875,55.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2D2D2D").s().p("AgdAuQgHgFgEgIQgDgHAAgOIAAg9IAaAAIAAAtQAAATABAFQACAFADADQAEACAFAAQAGAAAGgDQAEgEACgFQADgGAAgTIAAgqIAZAAIAABhIgYAAIAAgPQgFAIgJAEQgIAEgJAAQgJAAgJgDg");
	this.shape_37.setTransform(105.85,55.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2D2D2D").s().p("AgEBBQgFgDgDgEQgCgDgBgHQgBgEAAgOIAAgpIgLAAIAAgVIALAAIAAgTIAZgPIAAAiIASAAIAAAVIgSAAIAAAmIABAOIABADQABAAABABQAAAAABAAQAAAAABAAQAAABABAAQADgBAHgCIADAUQgKADgLAAQgHAAgFgBg");
	this.shape_38.setTransform(97.05,53.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2D2D2D").s().p("AguBEIAAiFIAYAAIAAAOQAEgHAIgEQAIgFAJAAQARAAAMANQALAOAAAXQAAAYgLANQgMANgRAAQgHAAgHgDQgGgDgHgIIAAAxgAgPgoQgGAIAAAOQAAARAHAGQAGAIAJAAQAIAAAGgHQAGgGAAgRQAAgPgGgIQgGgHgJAAQgIAAgHAHg");
	this.shape_39.setTransform(88.525,57.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2D2D2D").s().p("AgjAqQgKgHABgNQAAgIADgHQAFgGAHgDQAGgDAOgCQARgEAHgCIAAgDQAAgIgEgDQgEgDgIAAQgIAAgDADQgEACgCAHIgYgEQAEgOAKgHQAJgGATAAQARAAAIADQAIAFAEAGQADAGAAARIAAAcIABATQABAGAEAIIgaAAIgCgIIgBgDQgHAHgHADQgGACgJAAQgPABgIgJgAAAAGQgKACgEADQgEADAAAGQAAAFADAEQAFADAFAAQAGAAAHgEQAEgDACgFQABgEAAgJIAAgFIgPAEg");
	this.shape_40.setTransform(77.35,55.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2D2D2D").s().p("AggAmQgMgOAAgYQAAgXAMgNQANgNAUAAQASAAALAHQAKAIAFAPIgaAFQgBgHgFgEQgEgFgHAAQgJAAgGAIQgFAGgBAPQABARAFAGQAGAIAJAAQAHAAAFgFQAFgDACgKIAZADQgFASgLAJQgKAIgTAAQgUABgNgNg");
	this.shape_41.setTransform(67.15,55.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2D2D2D").s().p("AgdAqQgMgIgDgNIAZgEQACAHAFAEQAFAEAIAAQAKAAAFgEQADgCAAgEQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQgCgCgHgBQgegIgIgFQgMgHAAgOQAAgMAKgJQAKgJAVABQATgBAKAHQAJAGAEANIgYAEQgCgFgEgDQgFgDgHAAQgKAAgEACQgDADAAADQAAACADACQADADAUAFQAUAFAIAGQAIAGAAAMQAAAOgLAJQgLAKgWAAQgTAAgLgJg");
	this.shape_42.setTransform(117.525,33.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2D2D2D").s().p("AgjAqQgKgIABgMQAAgIADgHQAFgGAGgDQAIgDANgDQARgDAHgCIAAgEQAAgGgEgEQgEgDgIAAQgIAAgDADQgEACgCAHIgYgEQAEgOAKgHQAJgHATABQAQAAAJADQAIAEAEAHQADAGAAARIAAAcIABATQABAHAEAHIgaAAIgCgIIgBgDQgHAGgHAEQgGADgJAAQgPAAgIgJgAAAAGQgLACgDACQgEAEAAAFQAAAGADADQAEAFAGAAQAHgBAGgEQAFgDABgGQABgDAAgJIAAgFIgPAEg");
	this.shape_43.setTransform(107.4,33.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2D2D2D").s().p("AgiA3QgMgOAAgYQAAgYALgMQAMgNASAAQAPAAAMANIAAgwIAZAAIAACFIgXAAIAAgOQgGAIgIAEQgIAEgIAAQgQAAgMgNgAgOgFQgGAGAAAOQAAAQAEAHQAHAKAKAAQAJAAAGgIQAGgHAAgPQAAgRgGgGQgGgIgJAAQgJAAgGAIg");
	this.shape_44.setTransform(96.275,31.375);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2D2D2D").s().p("AgjAiQgJgNAAgUQAAgXAMgOQANgNATAAQAVAAAMAOQANAOgBAcIg/AAQAAAMAGAGQAGAGAIABQAGAAAEgEQAEgDACgIIAaAFQgFAOgLAHQgKAIgQAAQgZAAgMgRgAgMgYQgGAGAAALIAmAAQgBgMgFgFQgGgGgHAAQgIAAgFAGg");
	this.shape_45.setTransform(85.576,33.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2D2D2D").s().p("AgcAtQgIgEgDgIQgEgHAAgOIAAg8IAaAAIAAAsQAAAUABAEQACAFADACQAEADAGAAQAFAAAFgEQAFgDADgGQABgEAAgVIAAgoIAaAAIAABgIgYAAIAAgPQgFAIgIAEQgJAEgJABQgJAAgIgFg");
	this.shape_46.setTransform(74.75,33.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2D2D2D").s().p("AgeAyIAAhgIAXAAIAAANQAGgJAEgDQAFgDAGAAQAJAAAIAEIgIAXQgGgFgGAAQgFAAgEAEQgDADgCAHQgCAIAAAXIAAAfg");
	this.shape_47.setTransform(66.175,33);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.txt_perdidos},{t:this.txt_capturados}]},2).wait(3));

	// Texto
	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFBF6").s().p("AgJBGQgDgEgBgFQABgGADgEQAEgEAFAAQAGAAAEAEQAEAEAAAGQAAAFgEAEQgEAEgGABQgFgBgEgEgAgCAZIgDhjIANAAIgDBjg");
	this.shape_48.setTransform(658.875,216.8);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFBF6").s().p("AAZAvIgCgJQgFAIgHAEQgHAFgJABQgKgBgGgEQgIgFgCgHQgEgIAAgJQAAgLAEgIQADgIAHgFQAIgGALABQAFAAAHACIANAEQAAgUgFgJQgFgJgNAAQgGAAgGACIgMAFIgDgIIAPgFQAGgCAHAAQAPAAAIAKQAIAJAAASIgBArQgBAIACAIIAEANIgJACIgCgJgAgPgDQgGAEgCAGQgDAHAAAJQAAAFADAGQACAGAEAEQAFAEAHAAQAGAAAEgEQAGgCAEgGIAHgKIAAgbIgLgEQgGgCgGgBQgIAAgGAFg");
	this.shape_49.setTransform(646.55,218.6);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFBF6").s().p("AAdA6QgFAJgHAFQgHAEgKAAQgFAAgIgCQgHgDgHgHQgFgHgFgLQgDgLAAgPQAAgQAEgKQAEgLAHgGQAHgGAHgDQAHgCAFAAQAHAAAHACQAHACAFAFIAAgzIAKAAIAABwQAAAKABAKIADATIgIABgAgGgYQgGABgGAGQgGAFgDAJQgEAIAAAPQAAAOADAJQADAJAGAGQAFAFAFADQAGADADgBQAHAAAGgDQAEgDAFgEIAFgLIAAg/QgFgEgGgDQgGgDgGAAQgFAAgFACg");
	this.shape_50.setTransform(634.4,216.55);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFBF6").s().p("AgRAzQgJgEgFgJQgEgHgDgKQgCgKgBgKQABgKACgKQADgKAEgIQAGgIAIgFQAJgFALAAQAJAAAJAFQAJAFAGANQAFANAAAVIhIAAQABASAFAKQAFAKAHAEQAIAEAHAAQAKAAAIgDQAJgDAHgFIAEAJIgTAHQgJADgKAAQgLAAgIgFgAgQgoQgHAGgEAJQgEAKAAAJIA/AAQABgHgDgHQgBgHgEgGQgEgGgGgEQgGgEgIAAQgKAAgHAHg");
	this.shape_51.setTransform(622.45,218.5979);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFBF6").s().p("AgbAxQgGgEgCgIQgCgIAAgIIAAhLIAKAAIAABGQAAAPADAIQAEAIAJAAQAIAAAHgGQAJgGAGgNQAFgNABgUIAAgrIAJAAIAAA1IABAaQAAAOADANIgJAAIgEgeQgCAIgGAIQgGAHgIAFQgHAEgIABQgKgBgFgFg");
	this.shape_52.setTransform(610.5,218.7);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFBF6").s().p("AgfA3IAAhJIgEgjIAJAAIADAfIAJgPQAGgHAGgFQAGgFAJAAQAJAAAGAFQAEAFACAIQACAHAAAIIgJAAIgCgLQAAgGgDgEQgDgEgHAAQgEAAgFAEQgGADgFAHQgGAHgDALQgFALAAAOIAAAsg");
	this.shape_53.setTransform(598.6,218.475);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFBF6").s().p("AAZAvIgBgJQgGAIgHAEQgHAFgJABQgKgBgGgEQgIgFgCgHQgEgIAAgJQAAgLAEgIQADgIAIgFQAHgGALABQAFAAAHACIANAEQAAgUgFgJQgEgJgOAAQgFAAgGACIgOAFIgCgIIAPgFQAGgCAHAAQAPAAAIAKQAIAJAAASIgBArQAAAIACAIIADANIgJACIgCgJgAgPgDQgGAEgCAGQgCAHgBAJQABAFACAGQACAGAEAEQAFAEAHAAQAFAAAGgEQAFgCAEgGIAHgKIAAgbIgLgEQgGgCgGgBQgJAAgFAFg");
	this.shape_54.setTransform(573.45,218.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFBF6").s().p("AALBLIAAiNIgfAAIAAgIIApAAIAACVg");
	this.shape_55.setTransform(560.075,216.425);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFBF6").s().p("AgfA3IAAhJIgEgjIAJAAIADAfIAJgPQAFgHAIgFQAGgFAIAAQAKAAAFAFQAEAFACAIQACAHAAAIIgJAAIgBgLQgBgGgDgEQgDgEgHAAQgDAAgHAEQgEADgGAHQgGAHgDALQgEALgBAOIAAAsg");
	this.shape_56.setTransform(537.7,218.475);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFBF6").s().p("AAZAvIgBgJQgGAIgHAEQgHAFgJABQgKgBgGgEQgHgFgEgHQgDgIAAgJQAAgLAEgIQADgIAIgFQAHgGALABQAFAAAHACIANAEQAAgUgFgJQgEgJgOAAQgFAAgGACIgOAFIgCgIIAPgFQAGgCAHAAQAPAAAIAKQAJAJgBASIgBArQgBAIADAIIADANIgJACIgCgJgAgPgDQgGAEgCAGQgCAHgBAJQABAFACAGQACAGAEAEQAFAEAHAAQAFAAAGgEQAFgCAEgGIAHgKIAAgbIgLgEQgGgCgFgBQgKAAgFAFg");
	this.shape_57.setTransform(524.75,218.6);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFBF6").s().p("AgkBMIAAhwIgBgTQgBgKgCgJIAJgBIADARQAFgIAHgFQAIgEAIAAQAHAAAHADQAIACAFAHQAHAHAEALQAEAKgBAQQAAAQgEAKQgEALgHAGQgHAGgHADQgHADgFAAQgHAAgGgDQgIgCgFgFIAAAygAgLhAQgFADgEAFQgEAEgCAGIAAA/QAFAEAGADQAGADAHAAQAEABAFgDQAHgCAFgFQAFgFAFgJQADgJAAgOQAAgOgDgKQgEgJgEgFQgGgGgFgCQgFgCgFAAQgGAAgFADg");
	this.shape_58.setTransform(512.9,220.625);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFBF6").s().p("AAZAvIgCgJQgFAIgHAEQgHAFgJABQgKgBgHgEQgHgFgCgHQgEgIAAgJQAAgLAEgIQAEgIAGgFQAIgGAKABQAGAAAHACIAMAEQABgUgEgJQgFgJgNAAQgGAAgHACIgMAFIgDgIIAOgFQAIgCAGAAQAPAAAIAKQAIAJAAASIgBArQgBAIACAIIAEANIgIACIgDgJgAgPgDQgGAEgCAGQgCAHAAAJQAAAFACAGQACAGAFAEQAEAEAHAAQAGAAAEgEQAGgCADgGIAIgKIAAgbIgLgEQgGgCgGgBQgIAAgGAFg");
	this.shape_59.setTransform(500.4,218.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFBF6").s().p("AgfA3IAAhJIgEgjIAJAAIADAfIAJgPQAFgHAIgFQAGgFAIAAQAJAAAGAFQAEAFACAIQACAHAAAIIgJAAIgBgLQgBgGgDgEQgDgEgHAAQgDAAgHAEQgEADgGAHQgGAHgDALQgFALAAAOIAAAsg");
	this.shape_60.setTransform(489,218.475);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFBF6").s().p("AgEBFQgGgDgDgHQgFgHAAgOIAAhCIgYAAIAAgJIAYAAIAAgiIAKAAIAAAiIAnAAIAAAJIgnAAIAABIQAAAFABAFQACAEAEADQADADAGAAQAJAAAHgGQAFgFAEgIIAKACQgEAHgFAGQgFAFgGAEQgHADgIAAQgHAAgFgDg");
	this.shape_61.setTransform(476.25,216.975);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFBF6").s().p("AAZAvIgCgJQgFAIgHAEQgHAFgJABQgKgBgGgEQgIgFgCgHQgEgIAAgJQAAgLAEgIQAEgIAGgFQAIgGAKABQAGAAAHACIANAEQAAgUgFgJQgFgJgNAAQgGAAgFACIgNAFIgDgIIAPgFQAGgCAHAAQAPAAAIAKQAIAJAAASIgBArQgBAIADAIIADANIgJACIgCgJgAgPgDQgFAEgDAGQgDAHAAAJQAAAFADAGQACAGAEAEQAFAEAHAAQAGAAAEgEQAGgCADgGIAIgKIAAgbIgLgEQgGgCgGgBQgIAAgGAFg");
	this.shape_62.setTransform(463.85,218.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFBF6").s().p("AAZAvIgCgJQgFAIgHAEQgHAFgJABQgKgBgHgEQgHgFgDgHQgDgIAAgJQAAgLAEgIQAEgIAGgFQAIgGAKABQAGAAAHACIAMAEQABgUgEgJQgFgJgNAAQgHAAgGACIgNAFIgBgIIANgFQAIgCAGAAQAPAAAIAKQAJAJgBASIgBArQAAAIABAIIAEANIgIACIgDgJgAgPgDQgGAEgCAGQgDAHABAJQgBAFADAGQACAGAFAEQAEAEAHAAQAFAAAFgEQAGgCADgGIAIgKIAAgbIgLgEQgGgCgFgBQgKAAgFAFg");
	this.shape_63.setTransform(439.5,218.6);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFBF6").s().p("AgEBFQgGgDgEgHQgEgHAAgOIAAhCIgYAAIAAgJIAYAAIAAgiIAKAAIAAAiIAmAAIAAAJIgmAAIAABIQAAAFABAFQACAEAEADQADADAGAAQAJAAAHgGQAFgFAEgIIAKACQgEAHgFAGQgFAFgGAEQgHADgIAAQgIAAgEgDg");
	this.shape_64.setTransform(427.55,216.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFBF6").s().p("AAdA3IAAhHQAAgHgBgGQgBgHgEgFQgDgFgIAAQgIAAgIAGQgHAFgGANQgGANgBATIAAAtIgJAAIAAg2IAAgaQgCgOgCgOIAIAAIAFAfIAAAAQACgIAGgHQAGgIAHgEQAIgFAIAAQAKAAAGAFQAFAFACAHQACAIAAAIIAABMg");
	this.shape_65.setTransform(415.1,218.475);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFBF6").s().p("AgSAzQgIgEgFgJQgEgHgDgKQgDgKABgKQgBgKADgKQADgKAEgIQAGgIAIgFQAJgFALAAQAIAAAKAFQAIAFAGANQAHANgBAVIhIAAQABASAFAKQAFAKAIAEQAHAEAHAAQAKAAAIgDQAIgDAIgFIAEAJIgSAHQgKADgKAAQgLAAgJgFgAgQgoQgHAGgEAJQgEAKAAAJIA/AAQABgHgCgHQgCgHgEgGQgEgGgGgEQgGgEgIAAQgJAAgIAHg");
	this.shape_66.setTransform(403.2,218.5979);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFBF6").s().p("AgEBFQgGgDgEgHQgDgHAAgOIAAhCIgZAAIAAgJIAZAAIAAgiIAJAAIAAAiIAmAAIAAAJIgmAAIAABIQAAAFABAFQACAEAEADQACADAHAAQAJAAAHgGQAGgFADgIIAKACQgEAHgFAGQgFAFgHAEQgGADgIAAQgHAAgFgDg");
	this.shape_67.setTransform(391,216.975);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFBF6").s().p("AAcA3IAAhHQABgHgBgGQgBgHgDgFQgEgFgIAAQgIAAgHAGQgIAFgHANQgFANgBATIAAAtIgJAAIAAg2IgBgaQAAgOgDgOIAJAAIADAfIABAAQACgIAGgHQAFgIAJgEQAGgFAJAAQAKAAAFAFQAGAFACAHQACAIAAAIIAABMg");
	this.shape_68.setTransform(378.6,218.475);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFBF6").s().p("AAIBKIAAhiIgeAAIAAgIIAnAAIAABqgAAFg3QgDgDAAgFQAAgFADgDQADgCAEAAQAFAAADACQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_69.setTransform(365.625,216.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFBF6").s().p("AgNAOQAFgBAFgDQADgDACgFIgCABIgBAAQgFAAgEgDQgDgDAAgGQAAgGAEgDQAEgEAFAAQAEAAADADQADACACAEQACAEAAAEQgBAGgEAGQgEAGgFAEQgGAEgHACg");
	this.shape_70.setTransform(342.525,223.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFBF6").s().p("AgNA1QgHgDgHgGQgFgGgEgLQgEgLAAgQQAAgUAGgMQAGgMAJgGQAKgFAJAAQAGAAAIACQAHADAGAGQAGAHAEAKQAEALAAAQQAAAQgEALQgDAKgHAHQgGAGgHADQgHADgHAAQgGAAgHgDgAgPgqQgGAEgEAHQgDAHgBAJIgBAPIABAQQABAIADAIQAEAGAGAFQAGAFAJAAQAKAAAGgFQAGgFADgGQAEgIACgIIABgQIgBgPQgCgJgEgHQgDgHgGgEQgGgFgKAAQgJAAgGAFg");
	this.shape_71.setTransform(330.1,218.6);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFBF6").s().p("AgEBFQgGgDgDgHQgFgHAAgOIAAhCIgXAAIAAgJIAXAAIAAgiIAKAAIAAAiIAnAAIAAAJIgnAAIAABIQAAAFABAFQACAEAEADQACADAHAAQAJAAAHgGQAFgFAEgIIAJACQgDAHgFAGQgFAFgGAEQgHADgIAAQgHAAgFgDg");
	this.shape_72.setTransform(317.95,216.975);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFBF6").s().p("AAcA3IAAhHQABgHgBgGQgBgHgDgFQgEgFgIAAQgIAAgIAGQgIAFgFANQgGANgBATIAAAtIgJAAIAAg2IgBgaQgBgOgCgOIAJAAIADAfIABAAQACgIAGgHQAFgIAJgEQAGgFAJAAQAKAAAFAFQAGAFACAHQACAIAAAIIAABMg");
	this.shape_73.setTransform(305.5,218.475);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFBF6").s().p("AAZAvIgBgJQgGAIgHAEQgHAFgJABQgKgBgHgEQgGgFgEgHQgDgIAAgJQAAgLAEgIQADgIAIgFQAHgGALABQAFAAAHACIAMAEQABgUgFgJQgEgJgOAAQgGAAgFACIgOAFIgBgIIANgFQAIgCAGAAQAPAAAIAKQAJAJgBASIgBArQgBAIADAIIADANIgIACIgDgJgAgPgDQgGAEgCAGQgCAHgBAJQABAFACAGQACAGAFAEQAEAEAHAAQAFAAAGgEQAFgCAEgGIAHgKIAAgbIgLgEQgGgCgFgBQgKAAgFAFg");
	this.shape_74.setTransform(293.35,218.6);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFBF6").s().p("AgEBFQgGgDgDgHQgFgHAAgOIAAhCIgYAAIAAgJIAYAAIAAgiIAKAAIAAAiIAnAAIAAAJIgnAAIAABIQAAAFABAFQACAEAEADQADADAGAAQAJAAAHgGQAFgFAEgIIAKACQgEAHgFAGQgFAFgGAEQgHADgIAAQgHAAgFgDg");
	this.shape_75.setTransform(281.4,216.975);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFBF6").s().p("AgJA1QgIgCgHgEIgLgIIAFgIQAHAHAJAEQAKAFAIABQAGAAAFgDQAFgCAEgEQACgFABgGQgBgIgDgFQgEgFgFgDIgNgEIgOgGQgHgEgFgGQgFgGAAgKQAAgHAFgGQAEgGAHgDQAHgEAIAAQAJAAAIADQAIADAHAFIgEAIQgHgFgHgDQgHgDgIAAQgEAAgFACQgFADgDAEQgDAFAAAFQAAAHAEAEQAEAEAFADIAJAFIAQAFQAIAFAFAGQAFAGAAAKQAAAKgFAFQgEAHgHADQgIAEgIAAIgNgDg");
	this.shape_76.setTransform(256.775,218.6);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFBF6").s().p("AAZAvIgBgJQgGAIgHAEQgHAFgJABQgKgBgGgEQgIgFgCgHQgEgIAAgJQAAgLAEgIQADgIAIgFQAHgGALABQAFAAAHACIANAEQAAgUgFgJQgFgJgNAAQgGAAgFACIgOAFIgCgIIAPgFQAGgCAHAAQAPAAAIAKQAIAJAAASIgBArQAAAIACAIIADANIgJACIgCgJgAgPgDQgFAEgDAGQgDAHAAAJQAAAFADAGQACAGAEAEQAFAEAHAAQAGAAAFgEQAFgCAEgGIAHgKIAAgbIgLgEQgGgCgGgBQgJAAgFAFg");
	this.shape_77.setTransform(244.6,218.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFBF6").s().p("AgfA3IAAhJIgEgjIAJAAIAEAfIAIgPQAFgHAIgFQAFgFAKAAQAIAAAFAFQAFAFACAIQACAHAAAIIgKAAIAAgLQgBgGgDgEQgDgEgGAAQgFAAgGAEQgFADgFAHQgGAHgEALQgDALAAAOIAAAsg");
	this.shape_78.setTransform(233.25,218.475);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFBF6").s().p("AgEBFQgGgDgDgHQgEgHgBgOIAAhCIgXAAIAAgJIAXAAIAAgiIAKAAIAAAiIAnAAIAAAJIgnAAIAABIQAAAFACAFQABAEAEADQACADAHAAQAJAAAGgGQAGgFAEgIIAJACQgDAHgFAGQgFAFgGAEQgHADgIAAQgIAAgEgDg");
	this.shape_79.setTransform(220.5,216.975);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFBF6").s().p("AAcA3IAAhHQABgHgBgGQgBgHgDgFQgEgFgIAAQgIAAgHAGQgIAFgHANQgFANgBATIAAAtIgJAAIAAg2IgBgaQAAgOgDgOIAJAAIADAfIABAAQACgIAGgHQAFgIAJgEQAGgFAJAAQAKAAAFAFQAGAFACAHQACAIAAAIIAABMg");
	this.shape_80.setTransform(208.05,218.475);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFBF6").s().p("AgRAzQgJgEgFgJQgFgHgCgKQgDgKAAgKQAAgKADgKQACgKAFgIQAGgIAIgFQAIgFALAAQAKAAAIAFQAJAFAHANQAFANABAVIhJAAQABASAFAKQAFAKAHAEQAIAEAHAAQAJAAAJgDQAIgDAIgFIAEAJIgTAHQgJADgLAAQgKAAgIgFgAgQgoQgHAGgEAJQgEAKAAAJIA/AAQAAgHgCgHQgBgHgEgGQgEgGgGgEQgGgEgIAAQgKAAgHAHg");
	this.shape_81.setTransform(196.15,218.5979);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFBF6").s().p("AAIBKIAAhiIgeAAIAAgIIAnAAIAABqgAAFg3QgDgDAAgFQAAgFADgDQADgCAEAAQAFAAADACQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_82.setTransform(182.925,216.5);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFBF6").s().p("AAnA3IAAhWQAAgIgDgEQgEgDgFAAQgHAAgFAEQgFAEgDAGIAABXIgJAAIAAhSIgBgIQAAgFgDgDQgCgDgFAAQgHAAgGAFQgFAFgDAGIAABVIgKAAIAAhKIgBgTIgDgQIAKAAIADAOQAEgGAGgEQAHgEAIAAQAGAAAEAEQADADACAGQAFgFAFgEQAFgEAIAAQAKAAAGAGQAEAGAAALIAABWg");
	this.shape_83.setTransform(171.75,218.475);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFBF6").s().p("AgFBKIAChjIAHAAIAEBjgAgJgyQgDgEgBgGQABgFADgFQAEgDAFAAQAGAAAEADQAEAFAAAFQAAAGgEAEQgEADgGABQgFgBgEgDg");
	this.shape_84.setTransform(159.525,216.5);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFBF6").s().p("AgdA9QgOgIgJgQQgIgPAAgWQAAgVAIgPQAJgPAOgJQANgIAQAAQARAAANAIQAOAJAJAPQAIAPAAAVQAAAWgIAPQgJAQgOAIQgNAIgRAAQgQAAgNgIgAgTgrQgJAGgEALQgFAMAAAOQAAAXALAOQAKANAQABQASgBAKgNQAKgOAAgXQAAgOgEgMQgGgLgIgGQgJgHgLABQgLgBgIAHg");
	this.shape_85.setTransform(608.25,170.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFBF6").s().p("AgLBaQgGgHAAgOIAAimIAVAAIAACnQAAAGACACQACACADAAIABAAIADgBIADARIgFACIgHAAQgMAAgFgIg");
	this.shape_86.setTransform(597.9981,167.9);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFBF6").s().p("AgjBDIAAiDIASAAIACAYIABAAQAGgMAJgHQAKgHALgBIAIABIAGACIgEAUIgGgCIgHgBQgIABgJAGQgIAIgHAQIAABTg");
	this.shape_87.setTransform(590.425,170.65);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFBF6").s().p("AgYA9QgOgIgIgQQgJgPAAgWQAAgUAJgQQAIgPANgIQAOgJAOAAQAZAAAOAQQANARABAcIgBAHIAAAFIhYAAQABAWAMAMQALAMATAAQAJAAAIgCQAJgEAHgEIAIAOQgJAGgKAEQgLAEgNAAQgRAAgPgIgAAkgJQAAgUgJgKQgHgLgQAAQgIAAgJAEQgIAFgGAKQgFAJgCANIBGAAIAAAAg");
	this.shape_88.setTransform(577.95,170.8);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFBF6").s().p("AgMBCIgviDIAXAAIAZBKIAGATIAFAUIABAAIAGgUIAGgTIAZhKIAWAAIgvCDg");
	this.shape_89.setTransform(564.75,170.8);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFBF6").s().p("AgLBaQgGgHAAgOIAAimIAVAAIAACnQAAAGACACQACACADAAIABAAIADgBIADARIgFACIgHAAQgMAAgFgIg");
	this.shape_90.setTransform(555.5481,167.9);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFBF6").s().p("AgdA9QgOgIgIgQQgJgPAAgWQAAgVAJgPQAIgPAOgJQAOgIAPAAQAQAAAPAIQANAJAIAPQAJAPAAAVQAAAWgJAPQgIAQgNAIQgPAIgQAAQgPAAgOgIgAgTgrQgIAGgFALQgFAMAAAOQAAAXALAOQAKANAQABQARgBALgNQAKgOAAgXQAAgOgFgMQgEgLgJgGQgIgHgMABQgKgBgJAHg");
	this.shape_91.setTransform(544.15,170.8);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFBF6").s().p("AgZBAQgNgFgKgIIALgPQAJAHAJAFQAKAEAKAAQANAAAHgGQAGgGAAgIQAAgIgEgEQgFgFgHgDIgNgGIgSgHQgJgEgGgHQgGgIAAgKQAAgMAFgHQAGgJAKgFQAKgFANAAQANAAAKAEQALAEAHAHIgKAOIgOgIQgIgDgIAAQgMgBgGAGQgGAFAAAJQAAAFAFAFQAEADAGAEIAOAFIASAIQAKADAGAIQAGAHAAANQAAAKgGAKQgFAIgLAFQgLAGgQAAQgNAAgMgFg");
	this.shape_92.setTransform(531.025,170.8);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFBF6").s().p("AgYA9QgOgIgIgQQgJgPAAgWQAAgUAJgQQAIgPANgIQAOgJAOAAQAaAAANAQQAOARAAAcIgBAHIAAAFIhYAAQABAWAMAMQALAMATAAQAJAAAIgCQAJgEAHgEIAIAOQgJAGgLAEQgKAEgNAAQgSAAgOgIgAAlgJQgBgUgJgKQgHgLgRAAQgHAAgJAEQgIAFgFAKQgGAJgCANIBHAAIAAAAg");
	this.shape_93.setTransform(518.8,170.8);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFBF6").s().p("AgjBDIAAiDIASAAIACAYIABAAQAGgMAJgHQAKgHALgBIAIABIAGACIgEAUIgGgCIgHgBQgIABgJAGQgIAIgHAQIAABTg");
	this.shape_94.setTransform(508.425,170.65);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFBF6").s().p("AAeBDIAAhPQAAgTgGgIQgGgJgNAAQgIABgJAFQgIAFgKAKIAABeIgWAAIAAiDIASAAIACAUIABAAQAJgKALgGQALgGAMgBQAVABAKANQAKAMAAAaIAABSg");
	this.shape_95.setTransform(489.725,170.65);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFBF6").s().p("AgYA9QgOgIgIgQQgJgPAAgWQAAgUAJgQQAIgPANgIQAOgJAOAAQAaAAANAQQAOARAAAcIgBAHIAAAFIhYAAQABAWAMAMQALAMATAAQAJAAAJgCQAIgEAHgEIAIAOQgJAGgLAEQgKAEgNAAQgSAAgOgIgAAkgJQAAgUgIgKQgIgLgRAAQgHAAgJAEQgIAFgFAKQgGAJgCANIBGAAIAAAAg");
	this.shape_96.setTransform(475.6,170.8);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFBF6").s().p("AgdA9QgOgIgJgQQgIgPAAgWQAAgVAIgPQAJgPAOgJQANgIAQAAQAQAAAOAIQAOAJAJAPQAIAPAAAVQAAAWgIAPQgJAQgOAIQgOAIgQAAQgQAAgNgIgAgTgrQgIAGgFALQgFAMAAAOQAAAXAKAOQALANAQABQARgBAKgNQALgOAAgXQAAgOgEgMQgGgLgIgGQgJgHgLABQgKgBgJAHg");
	this.shape_97.setTransform(455.9,170.8);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFBF6").s().p("Ag4BfIAAi6IASAAIACAPIABAAQAJgIAKgFQALgFALAAQAQAAAMAIQALAIAHAPQAFAPAAAVQAAAWgHAPQgIAQgNAIQgNAJgQAAQgIAAgJgEQgJgEgJgHIAAAXIAAAsgAgQhHQgJAFgKAIIAABEQAKAIAIADQAIADAHAAQAPAAALgOQAKgMABgZQAAgWgJgNQgIgNgSgBQgIAAgIAFg");
	this.shape_98.setTransform(441.5,173.425);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFBF6").s().p("ABFBDIAAhPQAAgTgHgIQgFgJgNAAQgIAAgIAGQgIAFgJAKIAABeIgVAAIAAhPQAAgTgGgIQgHgJgMAAQgIAAgHAGQgJAFgJAKIAABeIgWAAIAAiDIASAAIACAUIABAAQAJgKAKgGQAKgGAMgBQAPABAJAGQAHAHAEAMQAKgMALgGQALgIAMAAQAUABAKANQAKAMAAAaIAABSg");
	this.shape_99.setTransform(422.35,170.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFBF6").s().p("AgYA9QgOgIgIgQQgJgPAAgWQAAgUAJgQQAIgPAOgIQANgJAOAAQAaAAANAQQAOARAAAcIgBAHIAAAFIhYAAQACAWALAMQAMAMASAAQAJAAAJgCQAHgEAIgEIAHAOQgIAGgLAEQgKAEgNAAQgSAAgOgIgAAlgJQgBgUgIgKQgJgLgQAAQgHAAgJAEQgIAFgFAKQgGAJgCANIBHAAIAAAAg");
	this.shape_100.setTransform(404.4,170.8);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFBF6").s().p("AgKBeIAAiDIAVAAIAACDgAgKhEQgEgEAAgHQAAgGAEgEQAFgEAFAAQAHAAAEAEQAFAEgBAGQABAHgFAEQgEAEgHAAQgFAAgFgEg");
	this.shape_101.setTransform(394.2,168);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFBF6").s().p("AgMBKQgIgMAAgUIAAhIIgUAAIAAgRIAVgBIADglIARAAIAAAlIAkAAIAAASIgkAAIAABIQAAANAFAGQAFAHALAAIAHgBIAIgDIAEARIgMADIgMACQgUAAgJgMg");
	this.shape_102.setTransform(386.425,169.125);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFBF6").s().p("AAeBDIAAhPQAAgTgGgIQgGgJgNAAQgIABgJAFQgIAFgKAKIAABeIgWAAIAAiDIASAAIACAUIABAAQAJgKALgGQALgGAMgBQAVABAKANQAKAMAAAaIAABSg");
	this.shape_103.setTransform(368.875,170.65);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFBF6").s().p("AgqA2QgJgNAAgZIAAhTIAWAAIAABQQAAASAGAJQAFAJANgBQAKABAHgGQAJgFAJgMIAAhdIAXAAIAACDIgTAAIgCgUIgBAAQgJALgLAGQgKAHgMgBQgVAAgKgNg");
	this.shape_104.setTransform(353.9,170.95);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFBF6").s().p("AgZBAQgNgFgKgIIALgPQAJAHAJAFQAKAEAKAAQANAAAHgGQAGgGAAgIQAAgIgEgEQgFgFgHgDIgNgGIgSgHQgJgEgGgHQgGgIAAgKQAAgMAFgHQAGgJAKgFQAKgFANAAQANAAAKAEQALAEAHAHIgKAOIgOgIQgIgDgIAAQgMgBgGAGQgGAFAAAJQAAAFAFAFQAEADAGAEIAOAFIASAIQAKADAGAIQAGAHAAANQAAAKgGAKQgFAIgLAFQgLAGgQAAQgNAAgMgFg");
	this.shape_105.setTransform(335.375,170.8);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFBF6").s().p("AgdA9QgOgIgIgQQgJgPAAgWQAAgVAJgPQAIgPAOgJQAOgIAPAAQAQAAAOAIQAOAJAJAPQAIAPAAAVQAAAWgIAPQgJAQgOAIQgOAIgQAAQgPAAgOgIgAgTgrQgJAGgEALQgFAMAAAOQAAAXALAOQAKANAQABQASgBAKgNQAKgOAAgXQAAgOgFgMQgEgLgJgGQgIgHgMABQgKgBgJAHg");
	this.shape_106.setTransform(322.4,170.8);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFBF6").s().p("ABFBDIAAhPQAAgTgHgIQgGgJgMAAQgHAAgJAGQgIAFgJAKIAABeIgVAAIAAhPQAAgTgGgIQgHgJgMAAQgIAAgIAGQgIAFgJAKIAABeIgWAAIAAiDIASAAIACAUIABAAQAJgKAKgGQAKgGAMgBQAPABAJAGQAHAHAEAMQAKgMALgGQALgIAMAAQAUABAKANQAKAMAAAaIAABSg");
	this.shape_107.setTransform(303.9,170.65);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFBF6").s().p("AgYA9QgOgIgJgQQgIgPAAgWQAAgUAIgQQAJgPAOgIQANgJAOAAQAZAAAOAQQANARABAcIAAAHIgBAFIhYAAQACAWALAMQAMAMASAAQAJAAAJgCQAHgEAIgEIAHAOQgIAGgLAEQgLAEgMAAQgSAAgOgIgAAlgJQgBgUgIgKQgJgLgQAAQgIAAgIAEQgIAFgFAKQgGAJgBANIBGAAIAAAAg");
	this.shape_108.setTransform(285.95,170.8);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFBF6").s().p("AgjBDIAAiDIASAAIACAYIABAAQAGgMAJgHQAKgHALgBIAIABIAGACIgEAUIgGgCIgHgBQgIABgJAGQgIAIgHAQIAABTg");
	this.shape_109.setTransform(275.575,170.65);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFBF6").s().p("AggBAQgJgEgFgIQgFgJAAgLQAAgVATgMQAUgLApgFQAAgIgCgHQgDgIgFgFQgGgFgLABQgLgBgKAFQgKAEgHAFIgJgPQAJgGANgGQANgEAQgBQAYAAALAPQALAOgBAZIAABQIgSAAIgCgQIgBAAQgJAIgLAFQgKAGgMAAQgLAAgJgFgAgFAFQgNAEgGAGQgFAGAAAJQAAALAHAFQAGAGAKgBQAIAAAJgEQAJgEAJgKIAAgjQgWACgMAFg");
	this.shape_110.setTransform(262.5505,170.8);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFBF6").s().p("AgqBQQgPgRAAgiQAAgVAJgPQAHgPANgIQANgJAPAAQALAAAIAEQAJAEAIAHIgBgWIAAgzIAXAAIAADAIgSAAIgDgPIgBAAQgHAHgLAFQgJAGgLAAQgZAAgPgSgAgPgOQgJAHgEAJQgFAMgBAPQAAAYAKANQAJAOAQAAQAKgBAIgEQAJgEAHgJIAAhFQgIgHgIgDQgIgEgHABQgKAAgJAGg");
	this.shape_111.setTransform(247.75,167.9);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFBF6").s().p("AgjBDIAAiDIASAAIACAYIABAAQAGgMAJgHQAKgHALgBIAIABIAGACIgEAUIgGgCIgHgBQgIABgJAGQgIAIgHAQIAABTg");
	this.shape_112.setTransform(237.175,170.65);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFBF6").s().p("AggBAQgJgEgFgIQgFgJAAgLQAAgVATgMQAUgLApgFQAAgIgCgHQgDgIgFgFQgGgFgLABQgLgBgKAFQgKAEgHAFIgJgPQAJgGANgGQANgEAQgBQAYAAALAPQALAOgBAZIAABQIgSAAIgCgQIgBAAQgJAIgLAFQgKAGgMAAQgLAAgJgFgAgFAFQgNAEgGAGQgFAGAAAJQAAALAHAFQAGAGAKgBQAIAAAJgEQAJgEAJgKIAAgjQgWACgMAFg");
	this.shape_113.setTransform(224.1505,170.8);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFBF6").s().p("AgKBZIAAieIg2AAIAAgTICBAAIAAATIg2AAIAACeg");
	this.shape_114.setTransform(210.225,168.5);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFBF6").s().p("AAXEvIAAimIidAAIAAhLIChlsIBKAAIAAFvIAiAAIAABIIghAAIgBABIAAClgAAWiTIheDUIBgAAIAAjVg");
	this.shape_115.setTransform(605.5,89.125);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFBF6").s().p("AhRERQgggigLg7QgLg8AAiJQAAh5ANg1QANg1AegfQAdgfAyAAIAAAAQBFAAAhBAQAiBBAACwQAACPgPA2QgPA3gdAcQgeAcgvAAQgyAAgfgigAgpjEQgKAnAABaIAAATIAAAUIAAAVIAAAyIAAAPQAABgAJAoQAKAqAgAAQAVAAAKgSQAMgRADgkQADgkAAiCIAAgZIACgZIAAgVQgBhGgDgYQgDgYgNgWQgMgXgTAAQgeAAgLAng");
	this.shape_116.setTransform(570.55,89.375);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFBF6").s().p("AAXEvIAAimIidAAIAAhLIChlsIBKAAIAAFvIAiAAIAABIIghAAIgBABIAAClgAAWiTIheDUIBgAAIAAjVg");
	this.shape_117.setTransform(535.4,89.125);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFBF6").s().p("AhXDQIAAmYIBOAAIAAA8IACAAQAghDA6AAIAFABIAABCQg1ABgWATQgWASAABCIAAD0g");
	this.shape_118.setTransform(488.15,98.6);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFBF6").s().p("AhhCgQghgzAAhqQAAiBAlgqQAmgqA3AAIACAAQA6AAAkAsQAjAtAAB/QAAB4glArQglAqg2AAQhDAAghgzgAglh4QgKAbAAA/QAAB8AMAbQALAcAaAAQAcAAAKgcQAKgcAAhEQAAhogKgiQgKgigdAAQgbAAgLAbg");
	this.shape_119.setTransform(456.725,98.85);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFBF6").s().p("AhXDQIAAmYIBOAAIAAA8IACAAQAhhDA5AAIAFABIAABCQg1ABgXATQgVASAABCIAAD0g");
	this.shape_120.setTransform(427.1,98.6);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFBF6").s().p("AhXDQIAAmYIBOAAIAAA8IACAAQAghDA6AAIAFABIAABCQg1ABgWATQgWASAABCIAAD0g");
	this.shape_121.setTransform(401.1,98.6);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFBF6").s().p("AhrErIAApVIDUAAIAABFIiEAAIAAC9IB5AAIAABCIh5AAIAADOICHAAIAABDg");
	this.shape_122.setTransform(373,89.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFBF6").s().p("AgeEhQgNgNAAgSQAAgSANgNQANgNARAAQASgBANANQANANAAATQAAASgNANQgNANgSAAQgRAAgNgNgAgnCcIAAnJIBOAAIAAHJg");
	this.shape_123.setTransform(329.95,89.6);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFBF6").s().p("AhZDCIAAg/QArARAeAAQAVAAAMgMQAMgMAAgUQAAgTgQgVQgQgVgpghQg6guAAg+QAAgwAgggQAgggAvAAQAdAAAtAPIAAA+QgjgOgaAAQgXAAgOAMQgPAMAAAVQAAARAMARQAMARAmAhQAnAhAQAaQAQAbAAAfQAAAxghAgQghAfgxAAQghAAgsgRg");
	this.shape_124.setTransform(306.675,98.725);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFBF6").s().p("Ah/ErIAApOIBLAAIAAAtIACAAQATgbASgMQAQgNAYAAQA3AAAXAxQAXAxAABuQAAB8gYAtQgZAtgzAAQgXAAgOgKQgQgKgXgfIgCAAIAADigAgpjLQgKAdAABHQAABXAIAlQAIAlAfAAQAbAAALggQAMgfAAhIQAAhVgLgjQgLgjgcAAQgbAAgKAdg");
	this.shape_125.setTransform(273.675,107.675);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFBF6").s().p("AiMCaIAAnHIBQAAIAAGlQAABEAMAaQAMAaAmAAQAnAAAKgbQAKgcAAhGIAAmgIBPAAIAAHGQAACViGAAQiSAAAAiUg");
	this.shape_126.setTransform(235.45,90.025);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFBF6").s().p("AgmEsIAAnHIBLAAIAAHHgAgdjiQgNgMAAgSQAAgSANgMQALgNASAAQASAAANANQAMAMAAARQAAASgMAMQgNANgRAAQgTAAgLgMg");
	this.shape_127.setTransform(206.35,97.3);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2D2D2D").s().p("AhVDGQgxgagcgzQgdgxAAhIQABhEAdgyQAcgzAugbQAugbAzgBQA9ABAoAbQApAbAUAuQAUAuAAA7QAAASgBANIgEAVIj/AAQAJAxAdAXQAeAXAqgBQAYAAAXgHQAWgHAYgPIAqBNQgiAXgoANQgnAMgnAAQg9AAgxgagAgohqQgWAUgIArICaAAQABglgSgXQgQgYgmAAQgeAAgXAVg");
	this.shape_128.setTransform(533.875,137.95);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2D2D2D").s().p("AgdD/QghgUgOgmQgPglAAgxIAAitIg6AAIAAheIBAgFIAQhyIBoAAIAAByIBnAAIAABjIhnAAIAACrQAAAkAPAQQAPAQAZAAQALAAALgDQAKgCAIgEIAUBdQgQAFgXAFQgYAFgfAAQg1AAgggVg");
	this.shape_129.setTransform(495,132.775);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2D2D2D").s().p("AhcDQQgsgQghgbIA5hPQAdAWAbALQAbAMAbAAQAcAAANgKQANgKAAgRQgBgOgMgKQgMgKgUgIIgpgRQgbgJgagQQgagPgRgYQgRgZgBgkQABg8AsgkQAsglBLgBQAwABAmAQQAlAQAcAWIg5BMQgYgRgWgJQgWgKgXAAQgYAAgLAJQgMAIAAARQAAANAMAJQALAJASAIIApAPQAcAJAbAPQAaAPARAZQASAZAAAnQAAAngUAfQgUAfgnASQgoASg4AAQgrAAgsgQg");
	this.shape_130.setTransform(458.975,137.95);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2D2D2D").s().p("Ag+E4IAAmsIB+AAIAAGsgAg0jFQgTgTgBgdQABgeATgSQAVgRAfgBQAhABAUARQAUASABAeQgBAdgUATQgUASghAAQgfAAgVgSg");
	this.shape_131.setTransform(428.25,128.225);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2D2D2D").s().p("AiaD4Qgvg7gBhpQABhGAZgyQAZgyApgbQAogbAuAAQAiAAAZAMQAYAMAWAWIgGhCIAAiTIB/AAIAAJdIhnAAIgJgqIgEAAQgWAWgeAPQgeAPgeAAQhRgBgvg7gAgwgHQgXAcAAA9QAAA/AUAeQAUAeAkgBQAVABARgKQARgIAPgVIAAivQgQgPgTgGQgSgHgSABIgBAAQgdAAgWAdg");
	this.shape_132.setTransform(390.45,129.6);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2D2D2D").s().p("AiPDbIAAmrIBoAAIAIBMIADAAQAZgsAfgVQAggVAhgBQATAAALADQANADAIADIgUBuIgXgFQgLgCgNAAQgZAAgaASQgZASgRAqIAAD4g");
	this.shape_133.setTransform(352.425,137.45);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2D2D2D").s().p("AhVDGQgxgagcgzQgdgxAAhIQABhEAdgyQAcgzAugbQAugbAzgBQA9ABAoAbQApAbAUAuQAUAuAAA7QAAASgBANIgEAVIj/AAQAJAxAdAXQAeAXAqgBQAYAAAXgHQAWgHAYgPIAqBNQgiAXgoANQgnAMgnAAQg9AAgxgagAgohqQgWAUgIArICaAAQABglgSgXQgQgYgmAAQgeAAgXAVg");
	this.shape_134.setTransform(309.925,137.95);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2D2D2D").s().p("AjUEaIAAozIDOAAQA9AAAxARQAyARAdAoQAdAoABBEQgBBCgeApQgeArgxAUQgyAUg7AAIhOAAIAAC/gAhUgJIBGAAQAzAAAagXQAZgXAAgsQAAgsgagSQgagTgyABIhGAAg");
	this.shape_135.setTransform(263.175,131.225);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2D2D2D").s().p("AgdD/QghgUgPgmQgOglAAgxIAAitIg7AAIAAheIBBgFIAPhyIBpAAIAAByIBnAAIAABjIhnAAIAACrQAAAkAPAQQAPAQAZAAQALAAAKgDQAMgCAHgEIAVBdQgRAFgYAFQgXAFggAAQg0AAgggVg");
	this.shape_136.setTransform(490.9,132.775);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2D2D2D").s().p("Ah8DPQgcgRgQgdQgPgdAAgkQgBhDA6gmQA6gmB9gNQgCgdgPgQQgQgQghgBQgbAAgdAKQgcALgfASIgshUQAogZAugQQAugPAygBQBSAAAsAxQAsAvAABjIAADzIhoAAIgJgsIgCAAQgcAYgfAQQgeAOgkAAQgnAAgdgRgAgkArQgbASABAZQAAAUANAKQANAKAXAAQAVAAAQgKQARgJAQgRIAAhLQhCAJgbATg");
	this.shape_137.setTransform(412.3742,137.95);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2D2D2D").s().p("ABCDbIAAj5QAAgtgMgSQgNgSgbAAQgXAAgSALQgSALgUAUIAAEgIh/AAIAAmrIBoAAIAIA3IADAAQAbgcAigSQAhgSArgCQBGACAgAtQAgAtgBBRIAAEJg");
	this.shape_138.setTransform(365.4254,137.45);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2D2D2D").s().p("Ah8DPQgcgRgQgdQgPgdAAgkQgBhDA6gmQA6gmB9gNQgCgdgPgQQgQgQghgBQgbAAgdAKQgcALgfASIgshUQAogZAugQQAugPAygBQBSAAAsAxQAsAvAABjIAADzIhoAAIgJgsIgCAAQgcAYgfAQQgeAOgkAAQgnAAgdgRgAgkArQgbASABAZQAAAUANAKQANAKAXAAQAVAAAQgKQARgJAQgRIAAhLQhCAJgbATg");
	this.shape_139.setTransform(316.8242,137.95);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2D2D2D").s().p("AhgEDQg9ghgkhAQglhAAAhfQAAhcAmhCQAlhCA+gjQA/giBMgBQA8ABAsAWQArAVAcAeIhFBOQgVgTgYgMQgYgLgjAAQgsAAggAWQgiAVgTApQgTApAAA4QAABWAoAwQAnAwBPAAQARAAAQgEQAQgFALgIIAAhhIheAAIAAhnIDPAAIAAEDQgfAbgxAUQgyAUg7ABQhMAAg+ghg");
	this.shape_140.setTransform(266.425,131.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48}]}).to({state:[]},2).to({state:[{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130,p:{x:458.975}},{t:this.shape_129},{t:this.shape_128,p:{x:533.875}}]},1).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_130,p:{x:454.875}},{t:this.shape_136},{t:this.shape_128,p:{x:529.775}}]},1).wait(1));

	// Botones
	this.btn_rueda = new lib.Símbolo3();
	this.btn_rueda.name = "btn_rueda";
	this.btn_rueda.setTransform(397.65,291.6,1,1,0,0,0,41.7,41.7);
	new cjs.ButtonHelper(this.btn_rueda, 0, 1, 2, false, new lib.Símbolo3(), 3);

	this.btn_back1 = new lib.Símbolo4();
	this.btn_back1.name = "btn_back1";
	this.btn_back1.setTransform(395.85,343,1,1,0,0,0,110,17.7);
	new cjs.ButtonHelper(this.btn_back1, 0, 1, 2, false, new lib.Símbolo4(), 3);

	this.btn_back2 = new lib.Símbolo12();
	this.btn_back2.name = "btn_back2";
	this.btn_back2.setTransform(395.85,343,1,1,0,0,0,110,17.7);
	new cjs.ButtonHelper(this.btn_back2, 0, 1, 2, false, new lib.Símbolo12(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn_rueda}]}).to({state:[]},2).to({state:[{t:this.btn_back1}]},1).to({state:[{t:this.btn_back2}]},1).wait(1));

	// Rueda
	this.mc_ruedota = new lib.Símbolo10();
	this.mc_ruedota.name = "mc_ruedota";
	this.mc_ruedota.setTransform(-100.05,295.45,1,1,0,0,0,85.4,85.5);
	this.mc_ruedota._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_ruedota).wait(2).to({_off:false},0).wait(3));

	// Pantalla
	this.mc_pantalla = new lib.Símbolo1();
	this.mc_pantalla.name = "mc_pantalla";
	this.mc_pantalla.setTransform(401.5,297.85,1,1,0,0,0,365.3,302.1);
	this.mc_pantalla._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mc_pantalla).wait(2).to({_off:false},0).wait(3));

	// Señales
	this.mc_right = new lib.Símbolo9();
	this.mc_right.name = "mc_right";
	this.mc_right.setTransform(453.75,441.25,1,1,0,0,0,14.4,31.7);

	this.mc_left = new lib.Símbolo8();
	this.mc_left.name = "mc_left";
	this.mc_left.setTransform(342.25,441.25,1,1,0,0,0,14.3,31.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.mc_left},{t:this.mc_right}]}).to({state:[]},2).wait(3));

	// Auto_carretera
	this.mc_autito = new lib.Símbolo5();
	this.mc_autito.name = "mc_autito";
	this.mc_autito.setTransform(-40.9,515.05,1,1,0,0,0,33.9,22.2);

	this.timeline.addTween(cjs.Tween.get(this.mc_autito).to({_off:true},2).wait(3));

	// Escenario
	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_141.setTransform(791.469,516.257,0.5743,0.0964);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_142.setTransform(766.169,516.257,0.5743,0.0964);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_143.setTransform(740.869,516.257,0.5743,0.0964);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_144.setTransform(715.569,516.257,0.5743,0.0964);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_145.setTransform(690.269,516.257,0.5743,0.0964);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_146.setTransform(664.969,516.257,0.5743,0.0964);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_147.setTransform(639.669,516.257,0.5743,0.0964);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_148.setTransform(614.369,516.257,0.5743,0.0964);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_149.setTransform(589.069,516.257,0.5743,0.0964);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_150.setTransform(563.769,516.257,0.5743,0.0964);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_151.setTransform(538.469,516.257,0.5743,0.0964);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_152.setTransform(513.169,516.257,0.5743,0.0964);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_153.setTransform(487.869,516.257,0.5743,0.0964);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_154.setTransform(462.569,516.257,0.5743,0.0964);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_155.setTransform(437.269,516.257,0.5743,0.0964);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_156.setTransform(411.969,516.257,0.5743,0.0964);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_157.setTransform(386.669,516.257,0.5743,0.0964);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_158.setTransform(361.369,516.257,0.5743,0.0964);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_159.setTransform(336.069,516.257,0.5743,0.0964);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_160.setTransform(310.769,516.257,0.5743,0.0964);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_161.setTransform(285.469,516.257,0.5743,0.0964);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_162.setTransform(260.169,516.257,0.5743,0.0964);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_163.setTransform(234.869,516.257,0.5743,0.0964);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_164.setTransform(209.569,516.257,0.5743,0.0964);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_165.setTransform(184.269,516.257,0.5743,0.0964);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_166.setTransform(158.969,516.257,0.5743,0.0964);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_167.setTransform(133.669,516.257,0.5743,0.0964);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_168.setTransform(108.369,516.257,0.5743,0.0964);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_169.setTransform(83.069,516.257,0.5743,0.0964);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_170.setTransform(57.769,516.257,0.5743,0.0964);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_171.setTransform(32.469,516.257,0.5743,0.0964);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FAE653").s().p("Ah7B8IAAj4ID4AAIAAD4g");
	this.shape_172.setTransform(7.169,516.257,0.5743,0.0964);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2D2D2D").s().p("Eg+ZAE1IAAppMB8zAAAIAAJpg");
	this.shape_173.setTransform(400.65,516.65);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_174.setTransform(774.7757,419.969,0.2366,0.2366);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_175.setTransform(774.8408,414.5264,0.2366,0.2366);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_176.setTransform(774.8408,412.6866,0.2366,0.2366);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_177.setTransform(774.8408,410.2611,0.2366,0.2366);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_178.setTransform(744.478,419.9714,0.2366,0.2366);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_179.setTransform(744.5431,414.5285,0.2366,0.2366);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_180.setTransform(744.5431,412.6886,0.2366,0.2366);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_181.setTransform(744.5431,410.2629,0.2366,0.2366);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_182.setTransform(710.9303,419.9739,0.2367,0.2367);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_183.setTransform(710.9954,414.5306,0.2367,0.2367);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_184.setTransform(710.9954,412.6905,0.2367,0.2367);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_185.setTransform(710.9954,410.2647,0.2367,0.2367);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_186.setTransform(678.2326,419.9763,0.2367,0.2367);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_187.setTransform(678.2977,414.5327,0.2367,0.2367);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_188.setTransform(678.2977,412.6925,0.2367,0.2367);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_189.setTransform(678.2977,410.2666,0.2367,0.2367);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_190.setTransform(646.5849,419.9788,0.2367,0.2367);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_191.setTransform(646.65,414.5348,0.2367,0.2367);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_192.setTransform(646.65,412.6945,0.2367,0.2367);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_193.setTransform(646.65,410.2684,0.2367,0.2367);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_194.setTransform(613.3372,419.9813,0.2367,0.2367);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_195.setTransform(613.4023,414.5369,0.2367,0.2367);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_196.setTransform(613.4023,412.6965,0.2367,0.2367);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_197.setTransform(613.4023,410.2702,0.2367,0.2367);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_198.setTransform(580.8895,419.9837,0.2367,0.2367);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_199.setTransform(580.9546,414.539,0.2367,0.2367);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_200.setTransform(580.9546,412.6985,0.2367,0.2367);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_201.setTransform(580.9546,410.2721,0.2367,0.2367);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_202.setTransform(547.6418,419.9862,0.2367,0.2367);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_203.setTransform(547.7069,414.5412,0.2367,0.2367);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_204.setTransform(547.7069,412.7005,0.2367,0.2367);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_205.setTransform(547.7069,410.2739,0.2367,0.2367);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_206.setTransform(514.5941,419.9886,0.2368,0.2368);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_207.setTransform(514.6592,414.5433,0.2368,0.2368);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_208.setTransform(514.6592,412.7025,0.2368,0.2368);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_209.setTransform(514.6592,410.2758,0.2368,0.2368);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_210.setTransform(482.3964,419.9911,0.2368,0.2368);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_211.setTransform(482.4616,414.5454,0.2368,0.2368);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_212.setTransform(482.4616,412.7045,0.2368,0.2368);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_213.setTransform(482.4616,410.2776,0.2368,0.2368);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_214.setTransform(449.6487,419.9936,0.2368,0.2368);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_215.setTransform(449.7139,414.5475,0.2368,0.2368);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_216.setTransform(449.7139,412.7065,0.2368,0.2368);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_217.setTransform(449.7139,410.2794,0.2368,0.2368);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_218.setTransform(416.9034,419.9985,0.2368,0.2368);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_219.setTransform(416.9685,414.5517,0.2368,0.2368);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_220.setTransform(416.9685,412.7105,0.2368,0.2368);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_221.setTransform(416.9685,410.2831,0.2368,0.2368);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_222.setTransform(383.6057,420.0009,0.2368,0.2368);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_223.setTransform(383.6708,414.5538,0.2368,0.2368);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_224.setTransform(383.6708,412.7125,0.2368,0.2368);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_225.setTransform(383.6708,410.2849,0.2368,0.2368);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_226.setTransform(351.158,420.0034,0.2368,0.2368);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_227.setTransform(351.2231,414.5559,0.2368,0.2368);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_228.setTransform(351.2231,412.7144,0.2368,0.2368);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_229.setTransform(351.2231,410.2868,0.2368,0.2368);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_230.setTransform(318.7103,420.0059,0.2369,0.2369);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_231.setTransform(318.7754,414.558,0.2369,0.2369);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_232.setTransform(318.7754,412.7164,0.2369,0.2369);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_233.setTransform(318.7754,410.2886,0.2369,0.2369);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_234.setTransform(284.9126,420.0083,0.2369,0.2369);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_235.setTransform(284.9777,414.5602,0.2369,0.2369);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_236.setTransform(284.9777,412.7184,0.2369,0.2369);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_237.setTransform(284.9777,410.2904,0.2369,0.2369);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_238.setTransform(252.0649,421.1108,0.2369,0.2369);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_239.setTransform(252.13,415.6623,0.2369,0.2369);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_240.setTransform(252.13,413.8204,0.2369,0.2369);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_241.setTransform(252.13,411.3923,0.2369,0.2369);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_242.setTransform(219.6672,421.1133,0.2369,0.2369);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_243.setTransform(219.7323,415.6644,0.2369,0.2369);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_244.setTransform(219.7323,413.8224,0.2369,0.2369);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_245.setTransform(219.7323,411.3941,0.2369,0.2369);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_246.setTransform(187.1695,421.1157,0.2369,0.2369);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_247.setTransform(187.2346,415.6665,0.2369,0.2369);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_248.setTransform(187.2346,413.8244,0.2369,0.2369);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_249.setTransform(187.2346,411.3959,0.2369,0.2369);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_250.setTransform(153.5718,421.1182,0.2369,0.2369);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_251.setTransform(153.6369,415.6686,0.2369,0.2369);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_252.setTransform(153.6369,413.8264,0.2369,0.2369);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_253.setTransform(153.6369,411.3978,0.2369,0.2369);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_254.setTransform(120.8741,421.1206,0.237,0.237);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_255.setTransform(120.9393,415.6707,0.237,0.237);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_256.setTransform(120.9393,413.8284,0.237,0.237);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_257.setTransform(120.9393,411.3996,0.237,0.237);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_258.setTransform(88.5264,421.1231,0.237,0.237);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_259.setTransform(88.5916,415.6728,0.237,0.237);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_260.setTransform(88.5916,413.8304,0.237,0.237);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_261.setTransform(88.5916,411.4014,0.237,0.237);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_262.setTransform(55.6787,421.1256,0.237,0.237);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_263.setTransform(55.7439,415.6749,0.237,0.237);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_264.setTransform(55.7439,413.8324,0.237,0.237);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_265.setTransform(55.7439,411.4033,0.237,0.237);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_266.setTransform(22.281,421.128,0.237,0.237);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_267.setTransform(22.3462,415.677,0.237,0.237);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_268.setTransform(22.3462,413.8344,0.237,0.237);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_269.setTransform(22.3462,411.4051,0.237,0.237);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_270.setTransform(792.9572,419.4622,0.3249,0.3249);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_271.setTransform(793.0466,411.9886,0.3249,0.3249);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_272.setTransform(793.0466,409.4623,0.3249,0.3249);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_273.setTransform(793.0466,406.1317,0.3249,0.3249);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_274.setTransform(760.2095,419.4646,0.325,0.325);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_275.setTransform(760.2989,411.9907,0.325,0.325);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_276.setTransform(760.2989,409.4643,0.325,0.325);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_277.setTransform(760.2989,406.1335,0.325,0.325);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_278.setTransform(727.4618,419.4671,0.325,0.325);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_279.setTransform(727.5512,411.9929,0.325,0.325);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_280.setTransform(727.5512,409.4662,0.325,0.325);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_281.setTransform(727.5512,406.1353,0.325,0.325);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_282.setTransform(694.7141,419.4695,0.325,0.325);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_283.setTransform(694.8035,411.995,0.325,0.325);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_284.setTransform(694.8035,409.4682,0.325,0.325);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_285.setTransform(694.8035,406.1372,0.325,0.325);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_286.setTransform(661.9664,419.472,0.325,0.325);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_287.setTransform(662.0558,411.9971,0.325,0.325);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_288.setTransform(662.0558,409.4702,0.325,0.325);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_289.setTransform(662.0558,406.139,0.325,0.325);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_290.setTransform(629.2187,419.4745,0.325,0.325);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_291.setTransform(629.3081,411.9992,0.325,0.325);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_292.setTransform(629.3081,409.4722,0.325,0.325);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_293.setTransform(629.3081,406.1408,0.325,0.325);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_294.setTransform(596.471,419.4769,0.325,0.325);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_295.setTransform(596.5604,412.0013,0.325,0.325);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_296.setTransform(596.5604,409.4742,0.325,0.325);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_297.setTransform(596.5604,406.1427,0.325,0.325);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_298.setTransform(563.7233,419.4794,0.325,0.325);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_299.setTransform(563.8127,412.0034,0.325,0.325);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_300.setTransform(563.8127,409.4762,0.325,0.325);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_301.setTransform(563.8127,406.1445,0.325,0.325);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_302.setTransform(530.9756,419.4819,0.3251,0.3251);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_303.setTransform(531.065,412.0055,0.3251,0.3251);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_304.setTransform(531.065,409.4782,0.3251,0.3251);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_305.setTransform(531.065,406.1463,0.3251,0.3251);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_306.setTransform(498.2279,419.4843,0.3251,0.3251);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_307.setTransform(498.3173,412.0076,0.3251,0.3251);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_308.setTransform(498.3173,409.4802,0.3251,0.3251);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_309.setTransform(498.3173,406.1482,0.3251,0.3251);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_310.setTransform(465.4802,419.4868,0.3251,0.3251);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_311.setTransform(465.5696,412.0097,0.3251,0.3251);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_312.setTransform(465.5696,409.4822,0.3251,0.3251);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_313.setTransform(465.5696,406.15,0.3251,0.3251);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_314.setTransform(432.6825,419.4892,0.3251,0.3251);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_315.setTransform(432.7719,412.0118,0.3251,0.3251);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_316.setTransform(432.7719,409.4842,0.3251,0.3251);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_317.setTransform(432.7719,406.1519,0.3251,0.3251);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_318.setTransform(399.8848,419.4917,0.3251,0.3251);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_319.setTransform(399.9743,412.014,0.3251,0.3251);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_320.setTransform(399.9743,409.4862,0.3251,0.3251);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_321.setTransform(399.9743,406.1537,0.3251,0.3251);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_322.setTransform(367.0871,419.4942,0.3251,0.3251);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_323.setTransform(367.1766,412.0161,0.3251,0.3251);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_324.setTransform(367.1766,409.4882,0.3251,0.3251);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_325.setTransform(367.1766,406.1555,0.3251,0.3251);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_326.setTransform(334.2895,419.4966,0.3251,0.3251);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_327.setTransform(334.3789,412.0182,0.3251,0.3251);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_328.setTransform(334.3789,409.4901,0.3251,0.3251);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_329.setTransform(334.3789,406.1574,0.3251,0.3251);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_330.setTransform(301.4918,419.4991,0.3252,0.3252);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_331.setTransform(301.5812,412.0203,0.3252,0.3252);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_332.setTransform(301.5812,409.4921,0.3252,0.3252);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_333.setTransform(301.5812,406.1592,0.3252,0.3252);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_334.setTransform(268.6941,420.7015,0.3252,0.3252);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_335.setTransform(268.7835,413.2224,0.3252,0.3252);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_336.setTransform(268.7835,410.6941,0.3252,0.3252);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_337.setTransform(268.7835,407.361,0.3252,0.3252);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_338.setTransform(235.8964,420.654,0.3252,0.3252);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_339.setTransform(235.9858,413.1745,0.3252,0.3252);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_340.setTransform(235.9858,410.6461,0.3252,0.3252);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_341.setTransform(235.9858,407.3129,0.3252,0.3252);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_342.setTransform(203.0987,420.6565,0.3252,0.3252);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_343.setTransform(203.1881,413.1766,0.3252,0.3252);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_344.setTransform(203.1881,410.6481,0.3252,0.3252);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_345.setTransform(203.1881,407.3147,0.3252,0.3252);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_346.setTransform(170.301,420.6589,0.3252,0.3252);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_347.setTransform(170.3904,413.1787,0.3252,0.3252);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_348.setTransform(170.3904,410.6501,0.3252,0.3252);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_349.setTransform(170.3904,407.3165,0.3252,0.3252);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_350.setTransform(137.5033,420.6614,0.3252,0.3252);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_351.setTransform(137.5927,413.1808,0.3252,0.3252);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_352.setTransform(137.5927,410.6521,0.3252,0.3252);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_353.setTransform(137.5927,407.3184,0.3252,0.3252);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_354.setTransform(104.7056,420.6638,0.3253,0.3253);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_355.setTransform(104.795,413.183,0.3253,0.3253);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_356.setTransform(104.795,410.6541,0.3253,0.3253);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_357.setTransform(104.795,407.3202,0.3253,0.3253);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_358.setTransform(71.9079,420.6663,0.3253,0.3253);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_359.setTransform(71.9973,413.1851,0.3253,0.3253);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_360.setTransform(71.9973,410.6561,0.3253,0.3253);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_361.setTransform(71.9973,407.322,0.3253,0.3253);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_362.setTransform(39.1102,420.6688,0.3253,0.3253);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_363.setTransform(39.1996,413.1872,0.3253,0.3253);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_364.setTransform(39.1996,410.6581,0.3253,0.3253);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_365.setTransform(39.1996,407.3239,0.3253,0.3253);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#150D08").s().p("AghA6IAAh0IBDAAIAAB0g");
	this.shape_366.setTransform(6.3125,420.6712,0.3253,0.3253);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#203240").s().p("AjFCrIDFlWIDGFWg");
	this.shape_367.setTransform(6.4019,413.1893,0.3253,0.3253);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#203240").s().p("AihCMIChkXICiEXg");
	this.shape_368.setTransform(6.4019,410.6601,0.3253,0.3253);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#203240").s().p("AhZBOIBZibIBaCbg");
	this.shape_369.setTransform(6.4019,407.3257,0.3253,0.3253);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_370.setTransform(612.4386,418.4363,0.331,0.3228,0,0,180);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_371.setTransform(614.2758,418.4363,0.331,0.3228,0,0,180);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_372.setTransform(616.0964,418.4363,0.331,0.3228,0,0,180);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_373.setTransform(617.9171,418.4363,0.331,0.3228,0,0,180);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_374.setTransform(612.4386,414.9657,0.331,0.3228,0,0,180);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_375.setTransform(614.2758,414.9657,0.331,0.3228,0,0,180);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_376.setTransform(616.0964,414.9657,0.331,0.3228,0,0,180);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_377.setTransform(617.9171,414.9657,0.331,0.3228,0,0,180);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_378.setTransform(612.4386,411.479,0.331,0.3228,0,0,180);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_379.setTransform(614.2758,411.479,0.331,0.3228,0,0,180);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_380.setTransform(616.0964,411.479,0.331,0.3228,0,0,180);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_381.setTransform(617.9171,411.479,0.331,0.3228,0,0,180);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#1C213E").s().p("Ah/DCIAAmDID/AAIAAGDg");
	this.shape_382.setTransform(615.1778,415.9746,0.331,0.3228,0,0,180);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_383.setTransform(622.088,416.8947,0.331,0.3228,0,0,180);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_384.setTransform(622.088,413.069,0.331,0.3228,0,0,180);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_385.setTransform(622.088,409.2433,0.331,0.3228,0,0,180);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_386.setTransform(622.088,405.4176,0.331,0.3228,0,0,180);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_387.setTransform(625.9775,416.8947,0.331,0.3228,0,0,180);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_388.setTransform(625.9775,413.069,0.331,0.3228,0,0,180);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_389.setTransform(625.9775,409.2433,0.331,0.3228,0,0,180);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_390.setTransform(625.9775,405.4176,0.331,0.3228,0,0,180);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#1C213E").s().p("AhwEyIAApiIDgAAIAAJig");
	this.shape_391.setTransform(623.9748,412.3668,0.331,0.3228,0,0,180);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_392.setTransform(605.0154,416.5638,0.331,0.3228,0,0,180);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#F9E999").s().p("AgRAZIAAgwIAjAAIAAAwg");
	this.shape_393.setTransform(605.0154,413.0771,0.331,0.3228,0,0,180);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_394.setTransform(605.0154,409.5742,0.331,0.3228,0,0,180);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#F9E999").s().p("AgRAYIAAgwIAjAAIAAAwg");
	this.shape_395.setTransform(608.1353,416.5477,0.331,0.3228,0,0,180);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#F9E999").s().p("AgRAZIAAgxIAjAAIAAAxg");
	this.shape_396.setTransform(608.1353,413.0448,0.331,0.3228,0,0,180);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_397.setTransform(608.1353,409.5419,0.331,0.3228,0,0,180);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#1C213E").s().p("AhdDqIAAnTIC7AAIAAHTg");
	this.shape_398.setTransform(606.5878,414.9577,0.331,0.3228,0,0,180);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_399.setTransform(645.5973,416.4532,0.4967,0.4844,0,0,180);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_400.setTransform(648.354,416.4532,0.4967,0.4844,0,0,180);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_401.setTransform(651.0857,416.4532,0.4967,0.4844,0,0,180);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_402.setTransform(653.8175,416.4532,0.4967,0.4844,0,0,180);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_403.setTransform(645.5973,411.2457,0.4967,0.4844,0,0,180);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_404.setTransform(648.354,411.2457,0.4967,0.4844,0,0,180);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_405.setTransform(651.0857,411.2457,0.4967,0.4844,0,0,180);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_406.setTransform(653.8175,411.2457,0.4967,0.4844,0,0,180);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_407.setTransform(645.5973,406.0139,0.4967,0.4844,0,0,180);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_408.setTransform(648.354,406.0139,0.4967,0.4844,0,0,180);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_409.setTransform(651.0857,406.0139,0.4967,0.4844,0,0,180);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_410.setTransform(653.8175,406.0139,0.4967,0.4844,0,0,180);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#1C213E").s().p("Ah/DCIAAmDID/AAIAAGDg");
	this.shape_411.setTransform(649.7074,412.7595,0.4967,0.4844,0,0,180);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_412.setTransform(660.0758,414.1401,0.4967,0.4844,0,0,180);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_413.setTransform(660.0758,408.3997,0.4967,0.4844,0,0,180);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_414.setTransform(660.0758,402.6593,0.4967,0.4844,0,0,180);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_415.setTransform(660.0758,396.9189,0.4967,0.4844,0,0,180);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_416.setTransform(665.9119,414.1401,0.4967,0.4844,0,0,180);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_417.setTransform(665.9119,408.3997,0.4967,0.4844,0,0,180);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_418.setTransform(665.9119,402.6593,0.4967,0.4844,0,0,180);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_419.setTransform(665.9119,396.9189,0.4967,0.4844,0,0,180);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#1C213E").s().p("AhwEyIAApiIDgAAIAAJig");
	this.shape_420.setTransform(662.9069,407.3461,0.4967,0.4844,0,0,180);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_421.setTransform(634.4591,413.6436,0.4967,0.4844,0,0,180);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#F9E999").s().p("AgRAZIAAgwIAjAAIAAAwg");
	this.shape_422.setTransform(634.4591,408.4118,0.4967,0.4844,0,0,180);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_423.setTransform(634.4591,403.1559,0.4967,0.4844,0,0,180);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#F9E999").s().p("AgRAYIAAgwIAjAAIAAAwg");
	this.shape_424.setTransform(639.1404,413.6193,0.4967,0.4844,0,0,180);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#F9E999").s().p("AgRAZIAAgxIAjAAIAAAxg");
	this.shape_425.setTransform(639.1404,408.3634,0.4967,0.4844,0,0,180);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_426.setTransform(639.1404,403.1074,0.4967,0.4844,0,0,180);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#1C213E").s().p("AhdDqIAAnTIC7AAIAAHTg");
	this.shape_427.setTransform(636.8184,411.2336,0.4967,0.4844,0,0,180);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_428.setTransform(701.3286,414.4201,0.646,0.646);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_429.setTransform(697.7433,414.4201,0.646,0.646);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_430.setTransform(694.1903,414.4201,0.646,0.646);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_431.setTransform(690.6374,414.4201,0.646,0.646);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_432.setTransform(701.3286,407.4756,0.646,0.646);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_433.setTransform(697.7433,407.4756,0.646,0.646);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_434.setTransform(694.1903,407.4756,0.646,0.646);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_435.setTransform(690.6374,407.4756,0.646,0.646);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_436.setTransform(701.3286,400.4989,0.646,0.646);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_437.setTransform(697.7433,400.4989,0.646,0.646);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_438.setTransform(694.1903,400.4989,0.646,0.646);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_439.setTransform(690.6374,400.4989,0.646,0.646);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#1C213E").s().p("Ah/DCIAAmDID/AAIAAGDg");
	this.shape_440.setTransform(695.983,409.4944,0.646,0.646);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_441.setTransform(682.4978,411.3355,0.646,0.646);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_442.setTransform(682.4978,403.6804,0.646,0.646);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_443.setTransform(682.4978,396.0254,0.646,0.646);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_444.setTransform(682.4978,388.3703,0.646,0.646);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_445.setTransform(674.9073,411.3355,0.646,0.646);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_446.setTransform(674.9073,403.6804,0.646,0.646);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_447.setTransform(674.9073,396.0254,0.646,0.646);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_448.setTransform(674.9073,388.3703,0.646,0.646);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#1C213E").s().p("AhwEyIAApiIDgAAIAAJig");
	this.shape_449.setTransform(678.8156,402.2754,0.646,0.646);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_450.setTransform(715.8151,410.6733,0.646,0.646);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#F9E999").s().p("AgRAZIAAgwIAjAAIAAAwg");
	this.shape_451.setTransform(715.8151,403.6966,0.646,0.646);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_452.setTransform(715.8151,396.6875,0.646,0.646);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#F9E999").s().p("AgRAYIAAgwIAjAAIAAAwg");
	this.shape_453.setTransform(709.7265,410.641,0.646,0.646);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#F9E999").s().p("AgRAZIAAgxIAjAAIAAAxg");
	this.shape_454.setTransform(709.7265,403.632,0.646,0.646);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_455.setTransform(709.7265,396.6229,0.646,0.646);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#1C213E").s().p("AhdDqIAAnTIC7AAIAAHTg");
	this.shape_456.setTransform(712.7466,407.4595,0.646,0.646);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_457.setTransform(767.5,409.95);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_458.setTransform(761.95,409.95);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_459.setTransform(756.45,409.95);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_460.setTransform(750.95,409.95);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_461.setTransform(767.5,399.2);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_462.setTransform(761.95,399.2);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_463.setTransform(756.45,399.2);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_464.setTransform(750.95,399.2);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_465.setTransform(767.5,388.4);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_466.setTransform(761.95,388.4);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_467.setTransform(756.45,388.4);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#F5CB7E").s().p("AgRASIAAgjIAjAAIAAAjg");
	this.shape_468.setTransform(750.95,388.4);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#1C213E").s().p("Ah/DCIAAmDID/AAIAAGDg");
	this.shape_469.setTransform(759.225,402.325);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_470.setTransform(738.35,405.175);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_471.setTransform(738.35,393.325);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_472.setTransform(738.35,381.475);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_473.setTransform(738.35,369.625);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_474.setTransform(726.6,405.175);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_475.setTransform(726.6,393.325);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_476.setTransform(726.6,381.475);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#FBE565").s().p("AgTAbIAAg1IAnAAIAAA1g");
	this.shape_477.setTransform(726.6,369.625);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#1C213E").s().p("AhwEyIAApiIDgAAIAAJig");
	this.shape_478.setTransform(732.65,391.15);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_479.setTransform(789.925,404.15);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#F9E999").s().p("AgRAZIAAgwIAjAAIAAAwg");
	this.shape_480.setTransform(789.925,393.35);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_481.setTransform(789.925,382.5);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#F9E999").s().p("AgRAYIAAgwIAjAAIAAAwg");
	this.shape_482.setTransform(780.5,404.1);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#F9E999").s().p("AgRAZIAAgxIAjAAIAAAxg");
	this.shape_483.setTransform(780.5,393.25);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#F9E999").s().p("AgRAYIAAgvIAjAAIAAAvg");
	this.shape_484.setTransform(780.5,382.4);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#1C213E").s().p("AhdDqIAAnTIC7AAIAAHTg");
	this.shape_485.setTransform(785.175,399.175);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#1C213E").s().p("AgDjlIEGHHIoFAEg");
	this.shape_486.setTransform(211.5543,414.0321,0.4115,0.3639);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#1C213E").s().p("AAAh2ICGDrIkMACg");
	this.shape_487.setTransform(220.5143,417.9891,0.4115,0.3639);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#1C213E").s().p("AgCi5IDYFwImrADg");
	this.shape_488.setTransform(183.8305,415.7604,0.4115,0.3639);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#1C213E").s().p("AgBhgIBwC/IjdACg");
	this.shape_489.setTransform(176.4238,419.0261,0.4115,0.3639);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#29325B").s().p("AgDkNIEzIWIpfAFg");
	this.shape_490.setTransform(200.9245,412.532,0.4116,0.364);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#434A70").s().p("AgCjRIEyGeIpfAFg");
	this.shape_491.setTransform(189.5329,414.8707,0.4116,0.364);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#1C213E").s().p("AgDjlIEGHHIoFAEg");
	this.shape_492.setTransform(256.1158,414.0364,0.4115,0.3639);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#1C213E").s().p("AAAh2ICGDrIkMACg");
	this.shape_493.setTransform(265.0765,417.9938,0.4115,0.3639);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#1C213E").s().p("AgCi5IDYFwImrADg");
	this.shape_494.setTransform(228.39,415.7649,0.4115,0.3639);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#1C213E").s().p("AgBhgIBwC/IjdACg");
	this.shape_495.setTransform(220.9827,419.0308,0.4115,0.3639);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#29325B").s().p("AgDkNIEzIWIpfAFg");
	this.shape_496.setTransform(245.4799,412.5341,0.4116,0.364);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#434A70").s().p("AgCjRIEyGeIpfAFg");
	this.shape_497.setTransform(234.0879,414.8729,0.4116,0.364);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#1C213E").s().p("AgDjlIEGHHIoFAEg");
	this.shape_498.setTransform(177.0234,404.7424,0.8612,0.7616);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#1C213E").s().p("AAAh2ICGDrIkMACg");
	this.shape_499.setTransform(195.7752,413.0242,0.8612,0.7616);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#1C213E").s().p("AgCi5IDYFwImrADg");
	this.shape_500.setTransform(119.0027,408.3597,0.8612,0.7616);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#1C213E").s().p("AgBhgIBwC/IjdACg");
	this.shape_501.setTransform(103.5019,415.1946,0.8612,0.7616);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#29325B").s().p("AgDkNIEzIWIpfAFg");
	this.shape_502.setTransform(154.7407,401.584,0.8613,0.7617);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#434A70").s().p("AgCjRIEyGeIpfAFg");
	this.shape_503.setTransform(130.903,406.478,0.8613,0.7617);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#1C213E").s().p("AgDjlIEGHHIoFAEg");
	this.shape_504.setTransform(241.2773,414.0408,0.4115,0.3639);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#1C213E").s().p("AAAh2ICGDrIkMACg");
	this.shape_505.setTransform(250.2387,417.9984,0.4115,0.3639);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#1C213E").s().p("AgCi5IDYFwImrADg");
	this.shape_506.setTransform(213.5495,415.7694,0.4115,0.3639);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#1C213E").s().p("AgBhgIBwC/IjdACg");
	this.shape_507.setTransform(206.1417,419.0356,0.4115,0.3639);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#29325B").s().p("AgDkNIEzIWIpfAFg");
	this.shape_508.setTransform(230.6353,412.5362,0.4117,0.364);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#434A70").s().p("AgCjRIEyGeIpfAFg");
	this.shape_509.setTransform(219.2428,414.8751,0.4117,0.364);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#1C213E").s().p("AgDjlIEGHHIoFAEg");
	this.shape_510.setTransform(94.925,399.225);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#1C213E").s().p("AAAh2ICGDrIkMACg");
	this.shape_511.setTransform(116.7,410.1);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#1C213E").s().p("AgCi5IDYFwImrADg");
	this.shape_512.setTransform(27.55,403.975);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#1C213E").s().p("AgBhgIBwC/IjdACg");
	this.shape_513.setTransform(9.55,412.95);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#29325B").s().p("AgDkNIEzIWIpfAFg");
	this.shape_514.setTransform(68.975,395.05);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#434A70").s().p("AgCjRIEyGeIpfAFg");
	this.shape_515.setTransform(41.3,401.475);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#1E1C3C").s().p("Eg+vAOTIAA8lMB9fAAAIAAclg");
	this.shape_516.setTransform(400.025,512.875);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.lf(["#A3195B","#1E1C3C"],[0,1],0,401.6,0,-401.5).s().p("Eg+vAvVMAAAhepMB9fAAAMAAABepg");
	this.shape_517.setTransform(400.025,301.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141}]}).wait(5));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(206.2,295.8,747.0999999999999,552.5);
// library properties:
lib.properties = {
	id: '1279757D8C632241BBFAB7A11DF3FE84',
	width: 800,
	height: 600,
	fps: 24,
	color: "#404040",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['1279757D8C632241BBFAB7A11DF3FE84'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;