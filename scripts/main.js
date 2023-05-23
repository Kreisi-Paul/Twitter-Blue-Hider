let domChangeTimeout = false;
let whitelist = new Array();
let originalPost = new String();
const styleEl = document.createElement("style");//create StyleElement to inject
let styleStr =`
a[aria-label="Verified Organizations"], a[aria-label="Twitter Blue"] {
    /*hides twitter blue ads*/
    display: none;
}
svg[data-testid=icon-verified] {
    /*keep this for whitelisting*/
    color: rgb(244, 33, 46);
}
`;//StyleElement content, adds basic filters

console.log(location.pathname)
if(location.pathname == "/home") {
    chrome.storage.sync.get(["hideHome"]).then((result) => {
        console.log(result)
        if(result.hideHome === true)
            hideContent();//applies blocking filters
        else
            applyFilters();//applies basic filters

        if(typeof result.hideHome != Boolean)
            chrome.storage.sync.set({"hideHome":true});//sets `hideHome` to the default value upon first init
    });
}
else
    hideContent();


function hideContent() {

    styleStr += `
    div[data-testid=cellInnerDiv]:has(span > svg[data-testid=icon-verified] > g > path:not([fill])) {
        /*hides articles that contain a verified Icon*/
        /*background-color: darkred;*/
        display: none;
    }
    div[data-testid=cellInnerDiv]:has(span > svg[data-testid=icon-verified] > g > path:not([fill])) + div:not(:has(article)) {
        /*hides response dropdowns*/
        /*background-color: greenyellow;*/
        display: none;
    }
    `;//adds universal blocking filters

    chrome.storage.sync.get(["whitelist"]).then((result) => {//gets the whitelist...
        whitelist = result.whitelist;
        if(/\/status\//.test(location.pathname)) {
            console.log("/status")
            originalPost = location.pathname.split("/")[1];
            if(!whitelist.includes(originalPost))
                whitelist.push(originalPost);//adds OP to whitelist temporarily
        }
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
        applyFilters();
    });

}


function applyFilters() {
    console.log(styleStr)
    styleEl.innerText = styleStr;
    document.head.appendChild(styleEl);//inject StyleElement
}