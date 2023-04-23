/*
Old JS, might need this for whitelisting later

var svgs = new Array();
var convo = document.querySelector("[aria-label='Timeline: Conversation']")

const observer = new MutationObserver(refreshSVGs);
observer.observe(convo, {childList: true, subtree: true});

function refreshSVGs() {
    svgs = Array.from(document.querySelectorAll("[data-testid=icon-verified]"));
    console.log(svgs);
    highlight();
}

function highlight() {
    for(let i=0, iLength=svgs.length; i<iLength; i++) {
            svgs[i].style.color = "red";
    }
}
*/
let domChangeTimeout = false;

const observer = new MutationObserver(domChanged);
observer.observe(document.body, {childList: true, subtree: true});

function domChanged() {
    if(!domChangeTimeout) {
        domChangeTimeout = true;
        setTimeout(() => {domChangeTimeout = false}, 5000); //only refreshes every 5sec
        //console.log("DOM changed");

        let twtBlueTweets = document.querySelectorAll("span:has(svg[data-testid=icon-verified] > g > path:not([fill]))");//Lists all hidden tweets
        //console.log(`detected ${twtBlueTweets.length} elements.`)
        //console.log(twtBlueTweets)
        for(let i=0; i<1; i++) {//iterates through all whitelisted usernames
            let usernameHits = document.querySelectorAll("div[data-testid=cellInnerDiv]:has(a[href='/xQc'])");//xQc as only placeholder

            for(let j=0,jLength=usernameHits.length; j<jLength; j++) {//iterates through all tweets of whitelisted user
                usernameHits[j].style.display = "initial"
            }
        }
    }

}