import Vue from "vue";
import App from "./App.vue";
new Vue({
	el: "#popup",
	render: (h) => h(App),
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	chrome.downloads.download({ url: "http:" + request.greeting });
// });
