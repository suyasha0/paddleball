var beef;
var garlic;
var onion;
var soysauce;

let targets;
var target;
var targetX, targetY;
var total = 0;
var misses = 0;

var xPos = 685/2 - 50;
var yPos = 500 - 20;

var ballX = 685/2;
var ballY = 500/2;
var Xspeed;
var Yspeed;

var failsound;
var succsound;
var boingsound;

function preload() {
	backgroundGraphic = loadImage("./images/background4.jpg");
	failsound = loadSound("./sounds/fail.mp3");
	succsound = loadSound("./sounds/success.mp3");
	boingsound = loadSound("./sounds/bounce.mp3");
	
	beef = loadImage("./images/beef.png");
	garlic = loadImage("./images/garlic.png");
	onion = loadImage("./images/onion.png");
	soysauce = loadImage("./images/soysauce.png");
	ball = loadImage("./images/ball.png");

	targets = [beef, garlic, onion, soysauce];
}

function setup() {
	createCanvas(685, 500);

	Xspeed = random(3, 5);
	Yspeed = random(3, 5);

	boingsound.setVolume(.4);
	
	target = targets[int(random(4))];
	targetX = random(16, width-16-target.width);
	targetY = random(16, height-200-target.height);

}


function draw() {

	image(backgroundGraphic, 0, 0);
	textFont("Courier New");

	stroke(0);

	textSize(8);
	fill(0);
	text(total, 60, 443);
	
	text("Misses: " + misses, 25, 495);

	//to detect ball-paddle collision
	function handleCollision(){

		let diff = dist(xPos, yPos, ballX, ballY);

		//if ball directly above paddle
		if(ballX+20>=xPos && ballX-20<= xPos+100){

			//if touching paddle
			if(ballY+20>=yPos){

				boingsound.play();

				Yspeed *=-1;
				if(Yspeed<0){
					Yspeed -= random(1, 2); 
				}
				if(Yspeed==0){
					Yspeed += random(.5, 1.5);
				}

				//if on left side
				if(ballX <= xPos+50){
					if(Xspeed>0)
						Xspeed *=-1;
				}

				//if on right side
				else{
					if(Xspeed<0)
						Xspeed *=-1;
				}
			}
		}

	}

	//to detect ball-target collision
	function isCollideTarget(){

		if(ballX>=targetX-20 && ballX<=targetX+target.width+20 && ballY>=targetY-20 && ballY<=targetY+target.height+20){
			return true;
		}
		return false;
	}

	 //ball bounce
	if(ballX<=16+20 || ballX>=width-16-20){
		Xspeed *= -1;
		if(Xspeed>0){
			Xspeed += random(1, 2); 
		}
		else{
			Xspeed -= random(1, 2);;
		}
		stopJitter();
		boingsound.play();
	}
	else if(ballY<=16+20){
		Yspeed *= -1;
		Yspeed += random(1, 2);
		stopJitter();
		boingsound.play();
	}
	else{
		handleCollision();
	}
	if(ballY>=height){

		failsound.play();

		ballX = width/2;
		ballY = height/2;
		Xspeed = random(3, 6);
		Yspeed = random(3, 6);
		misses += 1;
	}

	//border
	fill(82, 0, 0);
	noStroke();
	rect(0, 0, width, 16);
	rect(0, 0, 16, height);
	rect(width-16, 0, 16, height);

	//stuff to avoid random jittering
	function stopJitter(){
		if(Xspeed==0){
			Xspeed += random(.5, 1.5);
		}
		if(Yspeed==0){
			Yspeed += random(.5, 1.5);
		}
	}

	//stop the ball from moving TOO fast
	if(Xspeed>4){
		Xspeed -= random(1, 1.5);
	}
	if(Yspeed>4){
		Yspeed -= random(1, 1.5);
	}

	ballX += Xspeed;
	ballY += Yspeed;


	//paddle
	rect(xPos, yPos, 100, 20);

	if(keyIsDown(65) == true){
		xPos -= 10;
	}
	if(keyIsDown(68) == true){
		xPos += 10;
	}

	if(xPos>685-80-16){
		xPos = 685-80-16-1;
	}
	else if(xPos<16){
		xPos = 17;
	}

	//ball
	fill(random(255), 192, 203, 230);
	ellipse(ballX, ballY, 40, 40);

	//targets
	image(target, targetX, targetY);

	//if ball hits target, new target

	if(isCollideTarget()){

		succsound.play();
		target = targets[int(random(4))];

		targetX = random(16, width-16-target.width);
		targetY = random(16, height-200-target.height);

		total += 1;
	}

	textSize(12);
	stroke(255);
	text("Bulgogi Burger Grocery: Collect ingredients to make a bulgogi burger.", 20, 10);

}

