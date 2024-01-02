function outputChatBoxR(text, client)
{
	if (client.console)
		print(text);
	else
		messageClient(text, client, 0xFFC8FAC8);
}

function runString(commandstring, client)
{
	outputChatBoxR("Executing client-side sq command: " + commandstring, client)
	try
	{
		local result = compilestring("return " + commandstring)().tostring();
		outputChatBoxR("Command results: " + result, client);
		outputChatBoxR("Command executed!", client);
	}
	catch (error)
	{
		outputChatBoxR("Error: " + error, client);
	}
}

addCommandHandler("runsq", function(commandName, args, client) {
	if (client.administrator)
	{
		if (args != null && args != "")
			runString(args, client);
		else
			outputChatBoxR("Nothing specified!", client);
	}
});

addCommandHandler("crunsq", function(commandName, args, client) {
	if (client.administrator)
	{
		if (args != null && args != "")
			triggerNetworkEvent("doCrun_sq", client, args);
		else
			outputChatBoxR("Nothing specified!", client);
	}
});

addCommandHandler("cdosq", function(commandName, args, client) {
	if (client.administrator)
	{
		if (args != null && args != "")
			triggerNetworkEvent("doCrun_sq", null, args);
		else
			outputChatBoxR("Nothing specified!", client);
	}
});
