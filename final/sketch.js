let ball;
let goal;
let userVoice;
let bot;
let botVoice;

let choice = -1;

let wave;
let toggle = true;
let slider;

let env;

function setup() {
	createCanvas(windowWidth, windowHeight - 50);

	let button = createButton('CLICK TO SPEAK');
	button.style('background-color', color(185, 10, 10));
	button.style('color', 'white');
	button.style('height', '45px');
	button.style('width', '100%');

	ball = new Ball();
	goal = new Goal();

	env = new p5.Env();
	wave = new p5.Oscillator();
	wave.setType('sine');
	wave.start();
	wave.freq(440);
	wave.amp(env);

	botVoice = new p5.Speech();

	bot = new RiveScript();
	bot.loadFile("brain.rive").then(() => {
		bot.sortReplies();
		let username = "local-user";
		bot.reply(username, "Hello, bot!").then(function (reply) {
			console.log("The bot says: " + reply);
		});
	}).catch(error => console.log("Error when loading files: " + error));

	userVoice = new p5.SpeechRec('en-US', () => {
		if (userVoice.resultValue) {
			let input = userVoice.resultString;
			console.log(input);
			bot.sortReplies();
			let username = "local-user";
			bot.reply(username, input).then(function (reply) {

				if (reply == "leftpost") {
					setTimeout(() => {
						botVoice.speak(`Here is the ${reply}`);
						console.log("The bot says: " + reply);
					}, 0);

					choice = 0;

					wave.pan(-1);
					env.setADSR(0.1, 0.1, 0.5, 1);
					env.setRange(0.8, 0);
					wave.amp(env);

					setTimeout(() => env.play(), 1000);
					setTimeout(() => choice = -1, 2000);
				} else if (reply == "rightpost") {
					setTimeout(() => {
						botVoice.speak(`Here is the ${reply}`);
						console.log("The bot says: " + reply);
					}, 0);

					choice = 1;

					wave.pan(1);
					env.setADSR(0.1, 0.1, 0.5, 1);
					env.setRange(0.8, 0);
					wave.amp(env);

					setTimeout(() => env.play(), 1000);
					setTimeout(() => choice = -1, 2000);
				} else if (reply == "crossbar") {
					setTimeout(() => {
						botVoice.speak(`Here is the ${reply}`);
						console.log("The bot says: " + reply);
					}, 0);

					choice = 2;

					wave.pan(0);
					env.setADSR(0.2, 0.01, 0.5, 1);
					env.setRange(0.3, 0);
					wave.amp(env);

					setTimeout(() => env.play(), 1000);
					setTimeout(() => choice = -1, 2000);
				} else if (reply == "ball") {
					setTimeout(() => {
						botVoice.speak(`Here is the ${reply}`);
						console.log("The bot says: " + reply);
					}, 0);

					choice = 3;

					wave.pan(0);
					env.setADSR(1, 1, 1, 1);
					env.setRange(1, 0);
					wave.amp(env);

					setTimeout(() => env.play(), 1000);
					setTimeout(() => choice = -1, 2000);
				} else {
					botVoice.speak(reply);
				}
			});
		}
	});

	button.mousePressed(() => {
		userVoice.start();
	});
}

function draw() {
	background(135, 206, 235);

	fill(49, 99, 0);
	rect(0, height / 2, width, height / 2);

	ball.show();
	goal.showCross();
	goal.showLeft();
	goal.showRight();
}

class Ball {
	constructor() {
		this.x = width / 2;
		this.y = height / 2 + 100;
		this.r = 100;
	}

	show() {
		if (choice == 3) {
			fill(40, 225, 30);
		} else {
			fill(255);
		}
		noStroke();
		ellipse(this.x, this.y, this.r, this.r);
	}
}

class Goal {
	constructor() {
		this.x = width / 2;
		this.y = height / 2 - 50;
		this.w = 400;
		this.h = 150;
		this.t = 20;
	}

	showCross() {
		if (choice == 2) {
			fill(40, 225, 30);
		} else {
			fill(255);
		}
		noStroke();
		rect(this.x - this.w / 2, this.y - this.h / 2 - this.t / 2, this.w, this.t);
	}

	showLeft() {
		if (choice == 0) {
			fill(40, 225, 30);
		} else {
			fill(255);
		}
		noStroke();
		rect(this.x - this.w / 2, this.y - this.h / 2 - this.t / 2, this.t, this.h);
	}

	showRight() {
		if (choice == 1) {
			fill(40, 225, 30);
		} else {
			fill(255);
		}
		noStroke();
		rect(this.x + this.w / 2, this.y - this.h / 2 - this.t / 2, this.t, this.h);
	}
}