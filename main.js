var can, context;
var draw = function(e){
    /*
    var x = e.clientX;
    var y = e.clientY;
    */
    var x = e.offsetX;
    var y = e.offsetY;
    //var can = document.getElementById("myCanvas");
    context.fillStyle = "rgba(255,0,0,1)";
    context.fillRect(x,y,1,1);
};
var flag = false;
var start = null;
var end   = null;

var drawRect = function(start, end){
    context.fillStyle = "rgba(0,255,0,0.5)";
    context.fillRect(
            start.x,
            start.y,
            end.x - start.x,
            end.y - start.y
    );
};
var cancelRect = function(){
    if (end   == null) return;
    context.clearRect(
            start.x,
            start.y,
            end.x - start.x,
            end.y - start.y
    );
};

var initImage = function(img){
    context.drawImage(img, 0, 0);
};

$(function(){

    var originalImage = new Image();
    originalImage.src = imageURI;

    can = document.getElementById('canvas');
    can.setAttribute('width', originalImage.width);
    can.setAttribute('height',originalImage.height);

    context = can.getContext("2d");

    initImage(originalImage);

    canvas.addEventListener('mousemove',function(ev){
        if (start == null) return;
        cancelRect();

        end = {
            x : ev.offsetX,
            y : ev.offsetY
        };

        drawRect(start, end);
    });
    canvas.addEventListener('mousedown',function(ev){

        flag = true;

        if (start != null) return;


        start =  {
            x : ev.offsetX,
            y : ev.offsetY
        };
    });
    canvas.addEventListener('mouseup',function(ev){

        flag = false;

        if (start == null) return;

        end = {
            x : ev.offsetX,
            y : ev.offsetY
        };

        drawRect(start, end);

        start = null;
        end   = null;
    });
});
