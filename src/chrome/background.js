/* globals chrome */
// Called when the user clicks on the browser action.

var script_srcs = ['dist/chrome-ruler.min.js'];

chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes('chrome://')) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: script_srcs
		});
	}
});
