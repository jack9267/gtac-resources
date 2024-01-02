"use strict";

function outputChatBoxR(text, client)
{
	if (client.console)
		console.log(text);
	else
		messageClient(text, client, 0xFFC8FAC8);
}

function runString(commandstring, client)
{
	outputChatBoxR("Executing server-side js command: " + commandstring, client)
	try {
		let result = eval(commandstring);
		outputChatBoxR("Command results: " + result, client)
		outputChatBoxR("Command executed!", client)
	}
	catch(error) {
		outputChatBoxR("Error: " + error.message, client)
	}
}

addCommandHandler("run", (commandName, args, client) => {
	if (client.administrator)
	{
		if (args != null && args != "")
			runString(args, client);
		else
			outputChatBoxR("Nothing specified!", client);
	}
});

addCommandHandler("crun", (commandName, args, client) => {
	if (client.administrator)
	{
		if (args != null && args != "")
			triggerNetworkEvent("doCrun_js", client, args);
		else
			outputChatBoxR("Nothing specified!", client);
	}
});

addCommandHandler("cdo", (commandName, args, client) => {
	if (client.administrator)
	{
		if (args != null && args != "")
			triggerNetworkEvent("doCrun_js", null, args);
		else
			outputChatBoxR("Nothing specified!", client);
	}
});
