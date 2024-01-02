"use strict";

bindEventHandler("OnResourceStart", thisResource, (event,resource) => {
	setChatWindowEnabled(false);
});

bindEventHandler("OnResourceStop", thisResource, (event,resource) => {
	setChatWindowEnabled(true);
});
