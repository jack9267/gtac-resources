"use strict";

let speedometerTexture = null;
let speedometerKnotsTexture = null;
let speedometerNeedleTexture = null;

function getVehicleSpeedometerType(vehicle)
{
	let speedometer = {};
	speedometer.minRotation = -1.814;
	speedometer.maxRotation = 1.814;
	speedometer.minSpeed = 0;
	speedometer.maxSpeed = 160;
	speedometer.knots = vehicle.subType == VEHICLESUBTYPE_BOAT;
	if (speedometer.knots)
		speedometer.texture = speedometerKnotsTexture;
	else
		speedometer.texture = speedometerTexture;
	speedometer.needleTexture = speedometerNeedleTexture;
	speedometer.colour = COLOUR_WHITE;
	speedometer.needleColour = COLOUR_RED;
	return speedometer;
}

function getVehicleDisplaySpeedRotation(vehicle)
{
	let speedometer = getVehicleSpeedometerType(vehicle);
	let displaySpeedRotation = vehicle.getData("displaySpeedRotation");
	if (displaySpeedRotation == null)
		displaySpeedRotation = speedometer.minRotation;
	return displaySpeedRotation;
}

function getDotProduct(x,y,z,x2,y2,z2)
{
	return x*x2 + y*y2 + z*z2;
}

function getLength(x,y,z)
{
	return Math.sqrt(getDotProduct(x,y,z,x,y,z));
}

function extract(n,l,h)
{
	return (((n)-(l))/((h)-(l)));
}

function processSpeedometer(vehicle,timeStep)
{
	let speedometer = getVehicleSpeedometerType(vehicle);
	if (speedometer == null)
		return;
	let matrix = vehicle.matrix;
	let frontSpeed = true;
	let displaySpeedRotation = getVehicleDisplaySpeedRotation(vehicle);
	let targetRotation;
	let vecMoveSpeed = vehicle.velocity;
	let speed;
	if (frontSpeed)
		speed = getDotProduct(vecMoveSpeed[0],vecMoveSpeed[1],vecMoveSpeed[2],matrix.getElement(1*4+0),matrix.getElement(1*4+1),matrix.getElement(1*4+2));
	else
		speed = getLength(vecMoveSpeed[0],vecMoveSpeed[1],vecMoveSpeed[2]);
	if (gta.game == GAME_GTA_IV)
		speed /= 40.0;
	speed = speed*90;
	speed = Math.abs(speed);
	targetRotation = speedometer.minRotation+extract(speed,speedometer.minSpeed,speedometer.maxSpeed)*(speedometer.maxRotation-speedometer.minRotation);
	displaySpeedRotation = displaySpeedRotation+(targetRotation-displaySpeedRotation)/5*timeStep;
	displaySpeedRotation = Math.max(displaySpeedRotation,speedometer.minRotation);
	displaySpeedRotation = Math.min(displaySpeedRotation,speedometer.maxRotation);
	vehicle.setData("displaySpeedRotation",displaySpeedRotation);
}

bindEventHandler("OnResourceReady", thisResource, (event,resource) => {
	let stream = openFile("Speedometer.png");
	if (stream != null)
	{
		speedometerTexture = drawing.loadPNG(stream);
		stream.close();
	}

	stream = openFile("SpeedometerKnots.png");
	if (stream != null)
	{
		speedometerKnotsTexture = drawing.loadPNG(stream);
		stream.close();
	}

	stream = openFile("SpeedometerNeedle.png");
	if (stream != null)
	{
		speedometerNeedleTexture = drawing.loadPNG(stream);
		stream.close();
	}
});

addEventHandler("OnProcess",(event,deltaTime) => {
	if (localPlayer == null)
		return;
	let vehicle = localPlayer.vehicle;
	if (vehicle == null)
		return;
	processSpeedometer(vehicle,game.timeStep);
});

addEventHandler("OnDrawnHUD",(event) => {
	if (localPlayer == null)
		return;
	let vehicle = localPlayer.vehicle;
	if (vehicle == null)
		return;
	let speedometer = getVehicleSpeedometerType(vehicle);
	if (speedometer == null)
		return;
	let widthMultiplier = game.width/game.height/game.aspectRatio;
	let rightGap = 27.0/1024.0*game.width;
	let bottomGap = -25.0/768.0*game.height;
	let size = 350.0/768.0*game.height;
	let dropShadow = 1.5;
	let sizeX = size;
	let sizeY = size;
	let scaleX = 1*widthMultiplier;
	let scaleY = 1;
	let posX = game.width-sizeX*scaleX/2-rightGap*scaleX;
	let posY = game.height-sizeY*scaleY/2-bottomGap*scaleY;
	let displaySpeedRotation = getVehicleDisplaySpeedRotation(vehicle);
	drawing.drawRectangle(speedometer.texture,[posX,posY],[sizeX,sizeY],COLOUR_BLACK,COLOUR_BLACK,COLOUR_BLACK,COLOUR_BLACK,0.0,[0.5,0.5],[0,0],[1,1],[scaleX,scaleY]);
	drawing.drawRectangle(speedometer.needleTexture,[posX,posY],[sizeX,sizeY],COLOUR_BLACK,COLOUR_BLACK,COLOUR_BLACK,COLOUR_BLACK,displaySpeedRotation,[0.5,0.5],[0,0],[1,1],[scaleX,scaleY]);
	drawing.drawRectangle(speedometer.texture,[posX-dropShadow,posY-dropShadow],[sizeX,sizeY],COLOUR_WHITE,COLOUR_WHITE,COLOUR_WHITE,COLOUR_WHITE,0.0,[0.5,0.5],[0,0],[1,1],[scaleX,scaleY]);
	drawing.drawRectangle(speedometer.needleTexture,[posX-dropShadow,posY-dropShadow],[sizeX,sizeY],speedometer.needleColour,speedometer.needleColour,speedometer.needleColour,speedometer.needleColour,displaySpeedRotation,[0.5,0.5],[0,0],[1,1],[scaleX,scaleY]);
});
