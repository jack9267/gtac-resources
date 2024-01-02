"use strict";

bindEventHandler("OnResourceStart", thisResource, (event,resource) => {
	forceSnowing(true);
});

bindEventHandler("OnResourceStop", thisResource, (event,resource) => {
	forceSnowing(false);
});
