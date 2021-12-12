chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	// console.log(request.func, request.url);
	switch (request.func) {
		case "download":
			let filename = request.filename.replace(/~/g, " ");
			chrome.downloads.download({ url: request.url, filename: filename });
			break;
		case "openTab":
			chrome.tabs.create({ url: request.url });
			break;
		case "closeCur":
			chrome.tabs.remove(sender.tab.id);
			break;
	}
});
