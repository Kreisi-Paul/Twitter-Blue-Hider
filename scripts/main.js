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