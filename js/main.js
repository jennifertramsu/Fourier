// Fourier Transform Art in Javascript

/* To-Do:
    - How to draw in javascript
    - How to draw plots in javascript
    - How to animate plots in javascript
*/

// testing
/*
context.strokeStyle="black";
context.moveTo(30, 40);
context.lineTo(145, 120);
context.stroke();
*/

// drawing

function draw() {
    // accessing canvas element
    var canvas = document.getElementById("Canvas");
    var context = canvas.getContext("2d");

    var axes = {};
    axes.x0 = .5 + .5*canvas.clientWidth;
    axes.y0 = .5 + .5*canvas.height;
    axes.scale = 40;
    axes.doNegativeX = true;

    showAxes(context, axes);
    plot(context, axes, fun1, "black", 2);
}

function fun1(x) {
    return Math.cos(x);
}

function plot(context, axes, func, colour, thick) {
    var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
    var iMax = Math.round((context.canvas.width-x0)/dx);
    var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
    context.beginPath();
    context.lineWidth = thick;
    context.strokeStyle = colour;

    function frame() {
        for (var i=iMin; i<=iMax; i++) {
            xx = dx*i;
            yy = scale*func(xx/scale);
            if (i==iMin) {
                context.moveTo(x0+xx, y0-yy);
            }
            else {
                context.lineTo(x0+xx, y0-yy);
                context.stroke();  
            }
        }
    }
}

function showAxes(context, axes) {
    var x0 = axes.x0, w = context.canvas.width;
    var y0 = axes.y0;
    var xmin = axes.doNegativeX ? 0 : x0;

    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(xmin, y0); context.lineTo(w, y0);

    context.stroke();
}