"use strict";

addEventHandler("OnProcess",(event) => {
	let Peds = getPeds();
	for (let i=0; i<Peds.length; i++)
	{
		if (Peds[i] != localPlayer && !Peds[i].isType(ELEMENT_PLAYER) && !natives.isPedAMissionPed(Peds[i]))
		{
			natives.setCharWillDoDrivebys(Peds[i], true);
		}
	}
});
