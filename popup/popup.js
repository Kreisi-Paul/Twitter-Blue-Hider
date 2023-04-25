let whitelist = new Array();
refreshWhitelist();
registerButton();

function registerButton() {
    let button = document.querySelector('#userInputButton');
    button.addEventListener("click", () => {addUser(document.querySelector('#userInputText').value)}, false);
}

function refreshWhitelist() {
    chrome.storage.sync.get(["whitelist"]).then((result) => {
        whitelist = result.whitelist;
        
        let nameList = document.querySelector("#namelist")
        nameList.innerHTML = "";
        console.log(whitelist.length)
        console.log(whitelist)
        for(let i=0, iLength=whitelist.length; i<iLength; i++) {
            console.log(whitelist[i])
            nameList.innerHTML += `<li>${whitelist[i]}</li>`
        }
    });
}

function addUser(username) {
    whitelist.push(username);
    chrome.storage.sync.set({ whitelist: whitelist });
    refreshWhitelist();
}
