let domChangeTimeout = false;
let whitelist = new Array();
let originalPost = new String();


if(location.pathname == "/home")
    console.log("home")

if(/\/status\//.test(location.pathname)) {
    originalPost = location.pathname.split("/")[1];
}

const observer = new MutationObserver(domChanged);
observer.observe(document.body, {childList: true, subtree: true});

function domChanged() {
    if(!domChangeTimeout) {
        domChangeTimeout = true;
        setTimeout(() => {domChangeTimeout = false}, 500); //only refreshes every 500ms
        //console.log("DOM changed");

        let twtBlueTweets = document.querySelectorAll("span:has(svg[data-testid=icon-verified] > g > path:not([fill]))");//Lists all hidden tweets
        console.log(`detected ${twtBlueTweets.length} elements.`)
        //console.log(twtBlueTweets)

        chrome.storage.sync.get(["whitelist"]).then((result) => {//gets the whitelist...
            whitelist = result.whitelist;
            whitelist.push(originalPost);//adds OP to whitelist temporarily
        });

        for(let i=0, iLength=whitelist.length; i<iLength; i++) {//iterates through all whitelisted usernames
            let usernameHits = document.querySelectorAll(`div[data-testid=cellInnerDiv]:has(a[href="/${whitelist[i]}"])`);

            for(let j=0,jLength=usernameHits.length; j<jLength; j++) {//iterates through all tweets of whitelisted user
                usernameHits[j].style.display = "initial"
                //usernameHits[j].style.background = "initial" //for debug
            }
        }
    }

}