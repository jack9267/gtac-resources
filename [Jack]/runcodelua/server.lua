function outputChatBoxR(message, client)
	if client.console then
		print(message)
	else
		messageClient(message, client, 0xFFC8FAC8)
	end
end

local function runString(commandstring, client)
	outputChatBoxR("Executing server-side lua command: "..commandstring, client)
	local notReturned
	--First we test with return
	local commandFunction,errorMsg = load("return "..commandstring)
	if errorMsg then
		--It failed.  Lets try without "return"
		notReturned = true
		commandFunction, errorMsg = load(commandstring)
	end
	if errorMsg then
		--It still failed.  Print the error message and stop the function
		outputChatBoxR("Error: "..errorMsg, client)
		return
	end
	--Finally, lets execute our function
	results = { pcall(commandFunction) }
	if not results[1] then
		--It failed.
		outputChatBoxR("Error: "..results[2], client)
		return
	end
	if not notReturned then
		local resultsString = ""
		local first = true
		for i = 2, #results do
			if first then
				first = false
			else
				resultsString = resultsString..", "
			end
			local resultType = type(results[i])
			resultsString = resultsString..tostring(results[i]).." ["..resultType.."]"
		end
		outputChatBoxR("Command results: "..resultsString, client)
	elseif not errorMsg then
		outputChatBoxR("Command executed!", client)
	end
end

addCommandHandler("runlua", function(commandName, arguments, client)
	if client.administrator then
		if arguments and arguments ~= "" then
			runString(arguments, client)
		else
			outputChatBoxR("Nothing specified!", client)
		end
	end
end)

addCommandHandler("crunlua", function(commandName, arguments, client)
	if client.administrator then
		if arguments and arguments ~= "" then
			triggerNetworkEvent("doCrun_lua", client, arguments or "")
		else
			outputChatBoxR("Nothing specified!", client)
		end
	end
end)

addCommandHandler("cdolua", function(commandName, arguments, client)
	if client.administrator then
		if arguments and arguments ~= "" then
			triggerNetworkEvent("doCrun_lua", nil, arguments or "")
		else
			outputChatBoxR("Nothing specified!", client)
		end
	end
end)
