var box = document.querySelector(".box");
var circle = document.querySelector(".circle");
var nested = document.querySelector(".nested");
var modebtn = document.querySelector(".mode");
var sx = box.clientWidth;
var sy = box.clientHeight;
var cx = sx / 2.0;
var cy = sy / 2.0;
var x = cx;
var y = cy;
var px = cx + x;
var py = cy + y;
var rad;
var len;

mode = 0;

function updateDisplay(event) {
    sx = box.clientWidth;
    sy = box.clientHeight;
    cx = sx / 2.0;
    cy = sy / 2.0;
    x = event.pageX - cx;
    y = event.pageY - cy;
    px = cx + x;
    py = cy + y;
    if (sx > sy)
        rad = sy * 0.3;
    else
        rad = sx * 0.3;

    if (mode == 0) {
        len = Math.sqrt(((cx - px) ** 2) + ((cy - py) ** 2));
        if (len <= rad) {
            nested.style.left = px + "px";
            nested.style.top = py + "px";
        }
        else if (len > rad) {
            len = rad / len;
            nested.style.left = cx + x * len + "px";
            nested.style.top = cy + y * len + "px";
        }
    }
}

// Sleep in millisecond
function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

async function Escape() {
    var exp = 0;
    var eyp = 0;

    while (1) {
        if (mode == 1) {
            len = Math.sqrt(((x - exp) ** 2) + ((y - eyp) ** 2)) * 8;
            exp -= (x - exp) / Math.sqrt(len);
            eyp -= (y - eyp) / Math.sqrt(len);
            len = Math.sqrt(((exp) ** 2) + ((eyp) ** 2));
            if (len > rad) {
                len = rad / len;
                exp *= len;
                eyp *= len;
            }
            nested.style.left = cx + exp + "px";
            nested.style.top = cy + eyp + "px";
        }
        if (mode == 0) {
            exp = 0;
            eyp = 0;
        }
        await sleep(16);
    }
}

function ToggleMode() {
    if (mode == 1) {
        mode = 0;
        modebtn.textContent = "Mode: Follow";
    }
    else {
        mode = 1;
        modebtn.textContent = "Mode: Escape";
    }
}

modebtn.addEventListener("click", ToggleMode);
box.addEventListener("mousemove", updateDisplay, false);
box.addEventListener("mouseenter", updateDisplay, false);
box.addEventListener("mouseleave", updateDisplay, false);

Escape();