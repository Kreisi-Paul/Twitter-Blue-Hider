let whitelist = new Array();
refreshWhitelist();

let button = document.querySelector('#userInputButton');
button.addEventListener("click", () => {addUser(document.querySelector('#userInputText').value)}, false);

document.body.addEventListener("click", (e) => {
    if(/wh_user_/.test(e.target.id))
        removeUser(e.target.id.split("_")[2]);
});



function refreshWhitelist() {
    chrome.storage.sync.get(["whitelist"]).then((result) => {
        whitelist = result.whitelist;
        
        let nameList = document.querySelector("#namelist")
        nameList.innerHTML = "";
        console.log(whitelist.length)
        console.log(whitelist)
        for(let i=0, iLength=whitelist.length; i<iLength; i++) {
            nameList.innerHTML += 
            `<tr>
                <td>${whitelist[i]}</td>
                <td><a id="wh_user_${whitelist[i]}">delete</a></td>
            </tr>`
        }
    });
}

function addUser(username) {
    if(whitelist.includes(username) || username.length == 0)
        return;
    else {
        whitelist.push(username);
        whitelist.sort();
        chrome.storage.sync.set({ whitelist: whitelist });
        refreshWhitelist();
    }
    document.querySelector("#userInputText").value = "";
}

function removeUser(username) {
    whitelist.splice(whitelist.indexOf(username), 1);
    chrome.storage.sync.set({ whitelist: whitelist });
    refreshWhitelist();
}