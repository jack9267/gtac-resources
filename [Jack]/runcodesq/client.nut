function outputChatBoxR(text)
{
	message(text, 0xFFC8FAC8);
}

function runString(commandstring)
{
	outputChatBoxR("Executing client-side sq command: " + commandstring)
	try
	{
		local result = compilestring("return " + commandstring)().tostring();
		outputChatBoxR("Command results: " + result)
		outputChatBoxR("Command executed!")
	}
	catch (error)
	{
		outputChatBoxR("Error: " + error);
	}
}

addNetworkHandler("doCrun_sq", function(commandString) {
	if (commandString)
		runString(commandString);
});
