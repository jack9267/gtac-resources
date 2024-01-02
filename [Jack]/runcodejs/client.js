"use strict";

function outputChatBoxR(text)
{
	return message(text, 0xFFC8FAC8);
}

function runString(commandstring)
{
	outputChatBoxR("Executing client-side js command: " + commandstring)
	try {
		let result = eval(commandstring);
		outputChatBoxR("Command results: " + result)
		outputChatBoxR("Command executed!")
	}
	catch(error) {
		outputChatBoxR("Error: " + error.message)
	}
}

addNetworkHandler("doCrun_js", (commandString) => {
	if (commandString != undefined)
		runString(commandString);
});
