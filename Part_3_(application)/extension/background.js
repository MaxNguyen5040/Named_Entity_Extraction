console.log("background running");

chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    let msg = {
        txt:"Entity Extraction code is active!"
    }
    
    chrome.tabs.sendMessage(tab.id, msg)
}