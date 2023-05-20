let domChangeTimeout = false;
let whitelist = new Array();
let originalPost = new String();


if(location.pathname == "/home")
    console.log("home")

if(/\/status\//.test(location.pathname)) {
    originalPost = location.pathname.split("/")[1];
}



const styleEl = document.createElement("style");//create StyleElement to inject
let styleStr = new String();//StyleElement content

chrome.storage.sync.get(["whitelist"]).then((result) => {//gets the whitelist...
    whitelist = result.whitelist;
    whitelist.push(originalPost);//adds OP to whitelist temporarily
    console.log(whitelist)

    for(let i=0, iLength=whitelist.length; i<iLength; i++) {//iterates through all whitelisted usernames
        console.log(i)
        
        styleStr += `
        div[data-testid=cellInnerDiv]:has(a[href="/${whitelist[i]}"]) {
            display: initial !important;
            background-color: initial !important;
        }
        `;
    }

    console.log(styleStr)
    styleEl.innerText = styleStr;
    document.head.appendChild(styleEl);//inject StyleElement
});


