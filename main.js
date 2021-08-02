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

    if (mode == 0) {
        if (sx > sy)
            rad = sy * 0.3;
        else
            rad = sx * 0.3;
        len = Math.sqrt(((cx - px) ** 2) + ((cy - py) ** 2));
        if (len <= rad) {
            nested.style.left = px + "px";
            nested.style.top = py + "px";
        }
        else if (len > rad) {
            len = rad / len;
            if (sx > sy) {
                nested.style.left = cx + x * len + "px";
                nested.style.top = cy + y * len + "px";
            }
            else if (sy >= sx) {
                nested.style.left = cx + x * len + "px";
                nested.style.top = cy + y * len + "px";
            }
        }
    }
}

// Sleep in millisecond
function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

async function Escape() {
    var exp = px;
    var eyp = py;

    while (1) {
        if (mode == 1) {
            if (sx > sy) {
                exp += 1;
                eyp += 1;
            }
            else if (sy >= sx) {
                exp += 1;
                eyp += 1;
            }
            len = Math.sqrt(((cx - exp) ** 2) + ((cy - eyp) ** 2));
            if (len > rad) {
                len = rad / len;
                if (sx > sy) {
                    exp = cx + x * len;
                    eyp = cy + y * len;
                }
                else if (sy >= sx) {
                    exp = cx + x * len;
                    eyp = cy + y * len;
                }
            }
            nested.style.left = exp + "px";
            nested.style.top = eyp + "px";
        }
        if (mode == 0) {
            exp = px;
            eyp = py;
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