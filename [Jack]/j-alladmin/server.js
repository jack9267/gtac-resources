"use strict";

bindEventHandler("OnResourceStart", thisResource, (event,resource) => {
	let clients = getClients();
	for (let i=0; i<clients.length; i++)
	{
		if (!clients[i].console)
		{
			clients[i].administrator = true;
		}
	}
});

bindEventHandler("OnResourceStop", thisResource, (event,resource) => {
	let clients = getClients();
	for (let i=0; i<clients.length; i++)
	{
		if (!clients[i].console)
		{
			clients[i].administrator = false;
		}
	}
});

addEventHandler("OnPlayerJoined", (event, client) => {
	client.administrator = true;
});
