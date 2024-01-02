"use strict";

addEventHandler("OnDrawnHUD",(event) => {
	let screenWidth = gta.width;
	let screenHeight = gta.height;

	if (localPlayer != null && localPlayer.vehicle != null)
	{
		drawing.drawRectangle(null, [499/640*screenWidth,83/480*screenHeight],[109/640*screenWidth,9/480*screenHeight],COLOUR_BLACK,COLOUR_BLACK,COLOUR_BLACK,COLOUR_BLACK,0.0,[0.0,0.0],[0,0],[1,1],[1,1]);
		drawing.drawRectangle(null, [501/640*screenWidth,86/480*screenHeight],[105/640*screenWidth,4/480*screenHeight],toColour(90,12,14),toColour(90,12,14),toColour(90,12,14),toColour(90,12,14),0.0,[0.0,0.0],[0,0],[1,1],[1,1]);

		let carhealth = localPlayer.vehicle.health/1000;
		if (carhealth > 0)
		{
			drawing.drawRectangle(null, [501/640*screenWidth,86/480*screenHeight],[105*carhealth/640*screenWidth,4/480*screenHeight],toColour(180,25,29),toColour(180,25,29),toColour(180,25,29),toColour(180,25,29),0.0,[0.0,0.0],[0,0],[1,1],[1,1]);
		}
	}
});
