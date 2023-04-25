let whitelist = new Array();
refreshWhitelist();
registerButton();

function registerButton() {
    let button = document.querySelector('#userInputButton');
    button.addEventListener("click", () => {addUser(document.querySelector('#userInputText').value)}, false);
}

function refreshWhitelist() {
    chrome.storage.sync.get(["whitelist"]).then((result) => {
        console.log(result);
        //console.log(result.whitelist)
        whitelist = Array.from(result);
    });
}

function addUser(username) {
    console.log(username);
    whitelist.push(username);
    chrome.storage.sync.set({ whitelist: whitelist });
    refreshWhitelist();
}
