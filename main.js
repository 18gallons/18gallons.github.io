/*  ______  ___      __  ___  ____    _   __      __ __   ______  ___      ______  ____  _   __  ______     
   / ____/ /   |    /  |/  / / __ \  / | / /     / //_/  / ____/ /   |    /_  __/ /  _/ / | / / / ____/    
  / __/   / /| |   / /|_/ / / / / / /  |/ /     /  ,<   / __/   / /| |     / /    / /  /  |/ / / / __     
 / /___  / ___ |  / /  / / / /_/ / / /|  /     / /| |  / /___  / ___ |    / /   _/ /  / /|  / / /_/ / _  
/_____/ /_/  |_| /_/  /_/  \____/ /_/ |_/     /_/ |_| /_____/ /_/  |_|   /_/   /___/ /_/ |_/  \____/ ( )
                                                                                                        |/
    __  ___  ___      ____    ______      ____    __  __      ____    ___      ____    __  __  ______      __      ____    __      __ 
   /  |/  / /   |    / __ \  / ____/     / __ )   \ \/ /     / __ \  /   |    / __ \  / / / / / ____/     / /     / __ \  / /     / /
  / /|_/ / / /| |   / / / / / __/       / __  |    \  /     / / / / / /| |   / /_/ / / / / / / / __      / /     / / / / / /     / /
 / /  / / / ___ |  / /_/ / / /___      / /_/ /     / /     / /_/ / / ___ |  / ____/ / /_/ / / /_/ / _   / /___  / /_/ / / /___  /_/
/_/  /_/ /_/  |_| /_____/ /_____/     /_____/     /_/     /_____/ /_/  |_| /_/      \____/  \____/ (_) /_____/  \____/ /_____/ (_)
*/


// big main definitions tm tm

var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var mobile = false;
var scroll_amount = document.querySelector("main").scrollTop;
var scroll_height = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
var scroll_percentage = 0;
var thumb_height = 0;
var scrollbar_hide_timeout;
var video_paused = false;
var get_coordinates = ["section2", "section3"]
var section_coordinates = {};
var preview_id = 0;
var custom_quote = false;


// mobile css styling (yes mobile support!! fancy, innit??)
if (windowWidth < windowHeight) {
    // MOBILE!!!
    var node = document.createElement("link");
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("href", `mobile.css`);
    document.head.appendChild(node);
    mobile = true;
}
                                                                                                      



/* __  __  ____    __  __  ______  __  __  ____    ______      ______  __  ___  ____    ______  ____   
   \ \/ / / __ \  / / / / /_  __/ / / / / / __ )  / ____/     / ____/ /  |/  / / __ )  / ____/ / __ \ 
    \  / / / / / / / / /   / /   / / / / / __  | / __/       / __/   / /|_/ / / __  | / __/   / / / /
    / / / /_/ / / /_/ /   / /   / /_/ / / /_/ / / /___      / /___  / /  / / / /_/ / / /___  / /_/ /
   /_/  \____/  \____/   /_/    \____/ /_____/ /_____/     /_____/ /_/  /_/ /_____/ /_____/ /_____/
*/

// https://www.youtube-nocookie.com/embed/XIAM41gKPmk?autoplay=1&mute=1&controls=0&loop=1&rel=0&showinfo=0&enablejsapi=1&playlist=XIAM41gKPmk


// make the embed
if (mobile == false) {
    var node = document.createElement("iframe");
    node.setAttribute("id", "bg-yt");
    node.setAttribute("src", `https://www.youtube-nocookie.com/embed/${config["bg video"]}?autoplay=1&mute=1&controls=0&loop=1&rel=0&showinfo=0&enablejsapi=1&playlist=${config["bg video"]}`);
    node.setAttribute("frameborder", "0");
    document.querySelector("#bg-container").appendChild(node);
} else {
    var node = document.createElement("img");
    node.setAttribute("src", `${config["bg photo"]}`);
    document.querySelector("#bg-container").appendChild(node);
}


// the other funny
var tag = document.createElement('script');
tag.id = 'yt-script';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

console.log('yt scripts loaded');
var player;

if (mobile == false) {
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('bg-yt', {
            events: {
                //'onStateChange': onPlayerStateChange
            }
        });
    }
}




var preview_player;

// thank you classic j from glass beach for making this script for the glass beach website (i took it)


function cssvar(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
}
function getheight(elem) {
    return document.querySelector(elem).offsetHeight;
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function rgb_gradient(rgb1, rgb2, steps) {
    var r = ( rgb2["r"] - rgb1["r"] ) / steps;
    var g = ( rgb2["g"] - rgb1["g"] ) / steps;
    var b = ( rgb2["b"] - rgb1["b"] ) / steps;
    return { "r": r, "g": g, "b": b }
}

function scrollto(element) {
    document.querySelector(element).scrollIntoView({ behavior: "smooth"});
}
function image_preview(id) {
    document.querySelector("header").style = "transform: translate(0px, -100%);";
    document.querySelector(".expand-wrapper.video").style.opacity = "0";
    setTimeout( () => {
        document.querySelector(".expand-wrapper.video").style.display = "none";
    }, 250);
    document.querySelector("#expand-image").src = config["portfolio media"][id]["src"];
    document.querySelector(".expand-wrapper.image").style.display = "flex";
    setTimeout( () => {
        document.querySelector(".expand-wrapper.image").style.opacity = "1";

    }, 10);
    preview_id = id;
}
function video_preview(id) {
    document.querySelector("header").style = "transform: translate(0px, -100%);";
    document.querySelector(".expand-wrapper.image").style.opacity = "0";
    setTimeout( () => {
        document.querySelector(".expand-wrapper.image").style.display = "none";
    }, 250);
    document.querySelector("#preview-yt").setAttribute("src", `https://www.youtube-nocookie.com/embed/${config["portfolio media"][id]["src"]}?autoplay=1&enablejsapi=1&rel=0`);

    preview_player = new YT.Player('preview-yt', {
        events: {
            //'onStateChange': onPlayerStateChange
        }
    });

    document.querySelector(".expand-wrapper.video").style.display = "flex";
    setTimeout( () => {
        document.querySelector(".expand-wrapper.video").style.opacity = "1";

    }, 10);
    preview_id = id;
}
function close_preview() {
    document.querySelector("header").style = "transform: translate(0px, 0px);";
    document.querySelector(".expand-wrapper.image").style.opacity = "0";
    document.querySelector(".expand-wrapper.video").style.opacity = "0";
    setTimeout( () => {
        document.querySelector(".expand-wrapper.image").style.display = "none";
        document.querySelector(".expand-wrapper.video").style.display = "none";
    }, 250);
    
}
function gallery_move(direction) {
    var pf = document.querySelector("#portfolio");
    var scroll_amount = direction * pf.offsetWidth
    if (direction > 0 && (pf.scrollLeft + pf.offsetWidth + scroll_amount) >= pf.scrollWidth - 150) {
        scroll_amount += 150;
    } else if (direction < 0 && (pf.scrollLeft + scroll_amount) <= 150) {
        scroll_amount += -150;
    }

    document.querySelector("#portfolio").scrollBy({ top: 0, left: scroll_amount, behavior: "smooth" });
}



function scrollbar_update() {
    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    scroll_height = Math.max( document.querySelector("main").scrollHeight, document.querySelector("main").offsetHeight );
    scroll_amount = document.querySelector("main").scrollTop;

    thumb_height = (windowHeight / scroll_height ) * 1250;

    scroll_percentage = ( scroll_amount / (scroll_height - windowHeight) );

    display_scroll_amount = ( scroll_percentage * (windowHeight - thumb_height ) );

    //console.log("page height", scroll_height, "scroll amount", scroll_amount, "window height", windowHeight, "scroll percentage", scroll_percentage);

    document.querySelector("#scrollbar-thumb").style = `height: ${thumb_height}px; transform: translateY(calc(${display_scroll_amount}px));`;
}

scrollbar_update();
setInterval(scrollbar_update, 1000);


function page_scroll() {
    scroll_amount = document.querySelector("main").scrollTop;
    scrollbar_update();

    document.querySelector("#scrollbar-container").style = `transform: translate(0px);`;

    clearInterval(scrollbar_hide_timeout);
    scrollbar_hide_timeout = setInterval( () => {
        document.querySelector("#scrollbar-container").style = `transform: translate(100%);`;
    }, 1000);


    if (mobile == false) {
        if (scroll_amount > windowHeight + 100) {
            if (video_paused == false) {
                // pause video (to save resources)
                player.pauseVideo();
                video_paused = true;
                console.log("pausing video to save resouces...");
                document.querySelector(".background .frame-container").style.display = "none";
            }
        } else {
            
            if (video_paused == true) {
                // unpause
                player.playVideo();
                video_paused = false;
                console.log("resuming video...");
                document.querySelector(".background .frame-container").style.display = "block";
            }

        }
    }

    /*
    if (scroll_amount >= section_coordinates["section2"] && scroll_amount < section_coordinates["section3"]) {
        var s2 = hexToRgb(cssvar("--section2-bg"));
        var s3 = hexToRgb(cssvar("--section3-bg"));
        var steps = rgb_gradient(s2, s3, getheight("#section2"));
        var r = s2["r"] + ( steps["r"] * ( scroll_amount - section_coordinates["section2"] ) );
        var g = s2["g"] + ( steps["g"] * ( scroll_amount - section_coordinates["section2"] ) );
        var b = s2["b"] + ( steps["b"] * ( scroll_amount - section_coordinates["section2"] ) );
        document.querySelector("#section-bgcol").innerHTML = `.section.bg { background-color: rgb(${r}, ${g}, ${b});}`;
    }
    */

    if (scroll_amount >= section_coordinates["section2"]) {
        document.querySelector("header").style = "transform: translate(0px, 0px);";
    } else {
        document.querySelector("header").style = "transform: translate(0px, -100%);";
    }
}

document.querySelector("main").onscroll = page_scroll;


// PORTFOLIO STUFF

for (i in config["portfolio media"]) {
    var info = config["portfolio media"][i];

    if (info["type"] == 1) { // photo
        var node = document.querySelector("#template-portfolio-photo").cloneNode(true);
        node.classList.remove("hide");
        node.removeAttribute("id");
        node.querySelector("img").setAttribute("src", `${info["src"]}`);
        node.querySelector("img").setAttribute("onclick", `image_preview(${i})`);
        document.querySelector("#portfolio").appendChild(node);
    } else if (info["type"] == 2) { // video
        var node = document.querySelector("#template-portfolio-video").cloneNode(true);
        node.classList.remove("hide");
        node.removeAttribute("id");
        node.querySelector(".thumbnail img").setAttribute("src", `${info["thumbnail"]}`);
        node.querySelector("img").setAttribute("onclick", `video_preview(${i})`);


        document.querySelector("#portfolio").appendChild(node);
    }
    
    
    
    //portfolio_html += `\n<div class="card"><img src="${config["portfolio media"][i]["src"]}" onclick=image_preview(${i})></div>`;
}

var portfolio_loop = setInterval(() => {
    var pf_scroll_width = Math.max( document.querySelector("#portfolio").scrollWidth, document.querySelector("#portfolio").offsetWidth);
    var pf_width = document.querySelector("#portfolio").clientWidth;
    var pf_scroll = document.querySelector("#portfolio").scrollLeft;
    //console.log(pf_scroll_width, pf_width, pf_scroll);
    //console.log(pf_scroll == pf_scroll_width - pf_width);
    var pf_left = document.querySelector("#pf-left");
    var pf_right = document.querySelector("#pf-right");


    if (pf_scroll_width == pf_width) {
        // hide both
        if (pf_left.classList.contains("hide") != true) {
            pf_left.classList.add("hide");
        }
        if (pf_right.classList.contains("hide") != true) {
            pf_right.classList.add("hide");
        }
    } else if (pf_scroll == 0) {
        // hide left
        if (pf_left.classList.contains("hide") != true) {
            pf_left.classList.add("hide");
        }
        if (pf_right.classList.contains("hide") == true) {
            pf_right.classList.remove("hide");
        }
    } else if (pf_scroll == pf_scroll_width - pf_width) {
        // hide right
        if (pf_left.classList.contains("hide") == true) {
            pf_left.classList.remove("hide");
        }
        if (pf_right.classList.contains("hide") != true) {
            pf_right.classList.add("hide");
        }
    } else {
        // show both
        if (pf_left.classList.contains("hide") == true) {
            pf_left.classList.remove("hide");
        }
        if (pf_right.classList.contains("hide") == true) {
            pf_right.classList.remove("hide");
        }
    }


}, 250);

function autopreview(id) {
    if (config["portfolio media"][id]["type"] == 1) {
        // bogo
        console.log("bogo", id)
        image_preview(id);
    } else if (config["portfolio media"][id]["type"] == 2) {
        // vido
        console.log("vido", id)
        video_preview(id);
    }
}

function preview_switch(direction) {
    var next_id;
    if (preview_id + direction > config["portfolio media"].length - 1) {
        // go back to beginning
        next_id = 0;
    } else if (preview_id + direction < 0) {
        // go to end
        next_id = config["portfolio media"].length - 1;
    } else {
        next_id = preview_id + direction;
    }
    console.log(next_id);
    autopreview(next_id);

}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var keyid = event.which;
    // Alert the key name and key code on keydown
    //console.log(keyid)

    if (keyid == 27) {  //escape key
        close_preview();
    }

});

// PRICES STUFF

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}

function price_display(price) { // convert a number like 10.9 to 10.90 for displaying the price
    var string_out = "";
    price = money_round(price);
    var price_split = `${price}`.split(".");
    for (i in price_split) {
        if (i == 1) {
            string_out += ".";
            if (`${price_split[i]}`.length == 1) {
                string_out += `${price_split[i]}0`;
            } else {
                string_out += `${price_split[i]}`;
            }
        } else if (i == 0) {
            var wee = `${price_split[i]}`.split("").reverse();
            var hee = [];
            for (e in wee) {
                if (e != 0 && e % 3 == 0) {
                    hee.push(`${wee[e]},`);
                } else {
                    hee.push(`${wee[e]}`);
                }
            }
            hee = hee.reverse();
            string_out += hee.join("");
        } else {
            string_out += `${price_split[i]}`;
        }
    }
    return string_out
}


function generate_prices() {

    for (i in config["packages"]) {
        var info = config["packages"][i]
        var node = document.querySelector("#template-price").cloneNode(true);
        node.classList.remove("hide");
        node.removeAttribute("id");
        node.querySelector(".title").innerHTML = `${info["name"]}`;
        node.querySelector(".desc").innerHTML = `${info["description"]}`;
        for (e in info["features"]) {
            var list_node = document.querySelector("#template-item").cloneNode(true);
            list_node.querySelector("span").innerHTML = info["features"][e];
            list_node.classList.remove("hide");
            list_node.removeAttribute("id");
            node.querySelector(".list-wrapper").appendChild(list_node);
        }
        if (info["price"] == "custom") {    // custom quote stoof
            node.querySelector(".price").classList.add("button");
            node.querySelector(".price").innerHTML = "Open Custom Quote Calculator";
            node.querySelector(".price").setAttribute("onclick", "open_qcalc()");
        } else if (info["price"].length == 1) { // single price
            node.querySelector(".price").innerHTML = `$${price_display(info["price"][0])}`;
        } else { // price range
            var price_string = "";
            for (e in info["price"]) {
                if (e == 1) {
                    price_string += "–"
                }
                price_string += `$${price_display(info["price"][e])}`;
            }
            node.querySelector(".price").innerHTML = price_string;
        }
        document.querySelector("#prices").appendChild(node);




    }


}

generate_prices();


// QUOTE CALCULATOR

function open_qcalc() {
    document.querySelector("#qcalc").classList.remove("hidden");
    custom_quote = true;
}
function close_qcalc() {
    document.querySelector("#qcalc").classList.add("hidden");
    custom_quote = false;
}
function expand_qcalc() {
    document.querySelector("#qcalc").classList.add("expanded");
    document.querySelector("#qcalc .arrow").setAttribute("onclick", "contract_qcalc()");
}
function contract_qcalc() {
    document.querySelector("#qcalc").classList.remove("expanded");
    document.querySelector("#qcalc .arrow").setAttribute("onclick", "expand_qcalc()");
}

var full_option_list = config["packages"].concat(config["quote options"]);  // both packages and quote options
//var full_option_list = config["quote options"];       // just quote options

for (i in full_option_list) {
    if (full_option_list[i]["price"][0] == "custom") {
        full_option_list.splice(i, 1);
    }
    if (typeof full_option_list[i]["min"] == 'undefined') {
        full_option_list[i]["min"] = 0;
    }
    if (typeof full_option_list[i]["max"] == 'undefined') {
        full_option_list[i]["max"] = 1;
    }
    if (typeof full_option_list[i]["placeholder"] == 'undefined') {
        full_option_list[i]["placeholder"] = "Quantity";
    }
}

console.log(full_option_list);

function generate_options() {
    for (i in full_option_list) {
        info = full_option_list[i];
        var node = document.querySelector("#template-option").cloneNode(true);
        node.classList.remove("hide");
        node.removeAttribute("id");
        node.setAttribute("option", `${i}`);
        node.querySelector(".title").innerHTML = `${info["name"]}`;
        node.querySelector(".desc").innerHTML = `${info["description"]}`;
        if (info["price"].length == 1) { // single price
            node.querySelector(".price").innerHTML = `$${price_display(info["price"][0])}`;
        } else { // price range
            var price_string = "";
            for (e in info["price"]) {
                if (e == 1) {
                    price_string += "–"
                }
                price_string += `$${price_display(info["price"][e])}`;
            }
            node.querySelector(".price").innerHTML = price_string;
        }

        node.querySelector("input").setAttribute("min", info["min"]);
        node.querySelector("input").setAttribute("placeholder", info["placeholder"]);
        if (info["max"] == 1) {
            node.querySelector("input").setAttribute("max", "1")
        } else {
            node.querySelector("input").setAttribute("max", info["max"]);
            node.querySelector(".price").innerHTML += `<span> × ${info["placeholder"].toLowerCase()}</span>`;
        }

        node.querySelector("input").addEventListener("keyup", (event) => {
            var idtm = parseInt(event.srcElement.getAttribute("option"));
            var value = parseInt(event.srcElement.value);
            if (value < parseInt(event.srcElement.getAttribute("min"))) {
                event.srcElement.value = parseInt(event.srcElement.getAttribute("min"));
            } else if (value > parseInt(event.srcElement.getAttribute("max") ) ) {
                event.srcElement.value = parseInt(event.srcElement.getAttribute("max") );
            } else {
                event.srcElement.value = parseInt(event.srcElement.value);
            }
        });

        node.querySelector("svg").setAttribute("option", `${i}`);
        node.querySelector("svg").addEventListener("click", (event) => {
            console.log(event.srcElement.classList.contains("checked"));
            if (event.srcElement.classList.contains("checked")) {
                // make it not checked
                event.srcElement.classList.remove("checked");
                event.srcElement.querySelector(".l1").classList.remove("checked");
                setTimeout(() => {
                    console.log(event)
                    event.srcElement.querySelector(".l2").classList.remove("checked");
                }, 100, event) // if you change this, remember to change it in css!!!!!!!!
            } else {
                // make it checked
                event.srcElement.classList.add("checked");
                event.srcElement.querySelector(".l2").classList.add("checked");
                setTimeout(() => {
                    console.log(event)
                    event.srcElement.querySelector(".l1").classList.add("checked");
                }, 100, event) // if you change this, remember to change it in css!!!!!!!!
            }
        });

        if (info["max"] == 1) {
            node.querySelector("input").remove();
        } else {
            node.querySelector("svg").remove();
        }

        document.querySelector("#qcalc-options").appendChild(node);

    }
}
generate_options();

generate_reciept = setInterval(() => {
    if (custom_quote == true) {
        // makey reciept
        receipt_html = "";
        var total_money = [ ...config["fees"][0]["price"] ];

        if (config["fees"][0]["price"][0] == config["fees"][0]["price"][1]) { // no range
            receipt_html += `\n<tr> <td>Base price</td> <td></td> <td>$${price_display(config["fees"][0]["price"])}</td> </tr>`
        } else {    // range
            receipt_html += `\n<tr> <td>Base price</td> <td></td> <td>$${price_display(config["fees"][0]["price"][0])}–$${price_display(config["fees"][0]["price"][1])}</td> </tr>`
        }

        function make_price_line(name, quantity, price) {
            var final_price = "";
            var display_quantity = quantity;
            if (quantity == "") {
                quantity = 1;
            }
            if (price.length == 1) {
                total_money[0] += quantity * price[0];
                total_money[1] += quantity * price[0];
                final_price = `$${price_display(quantity * price[0])}`;
            } else {
                total_money[0] += quantity * price[0];
                total_money[1] += quantity * price[1];
                final_price = `$${price_display(quantity * price[0])}–$${price_display(quantity * price[1])}`;
            }
            return `\n<tr> <td>${name}</td> <td>${display_quantity}</td> <td>${final_price}</td> </tr>`
            
        }

        for (i in full_option_list) {
            var info = full_option_list[i];
            var quantity = document.querySelector(`.card-wrapper[option="${i}"] .quantity`).value;
            if (quantity == '') {
                quantity = 0;
            }
            if ( document.querySelector(`.card-wrapper[option="${i}"] .quantity`).classList.contains("checkbox")) {
                quantity = document.querySelector(`.card-wrapper[option="${i}"] .quantity`).classList.contains("checked");
                if (quantity == true) {
                    quantity = 1;
                } else {
                    quantity = 0;
                }
            }
            quantity = parseInt(quantity);

            if (quantity != 0) {
                receipt_html += make_price_line(info["name"], quantity, info["price"]);
            }
        }

        for (i in config["fees"]){
            if (i != 0) {
                receipt_html += make_price_line(config["fees"][i]["name"], "", config["fees"][i]["price"]);
            }
        }


        // total
        if (total_money[0] == total_money[1]) { // no range
            receipt_html += `\n<tr> <td>Total</td> <td></td> <td>$${price_display(total_money[0])}</td> </tr>`
        } else {    // range
            receipt_html += `\n<tr> <td>Total</td> <td></td> <td>$${price_display(total_money[0])}–$${price_display(total_money[1])}</td> </tr>`
        }


        document.querySelector(".quote .list").innerHTML = receipt_html;
    }
}, 500);




for (i in get_coordinates) {
    section_coordinates[get_coordinates[i]] = document.getElementById(get_coordinates[i]).getBoundingClientRect().top;
    section_coordinates[document.getElementById(get_coordinates[i]).getBoundingClientRect().top] = get_coordinates[i];
}