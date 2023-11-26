
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


// mobile css styling (yes mobile support!! fancy, innit??)
if (windowWidth < windowHeight) {
    // MOBILE!!!
    var node = document.createElement("link");
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("href", `mobile.css`);
    document.head.appendChild(node);
}