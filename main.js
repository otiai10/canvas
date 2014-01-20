var my = {
    canvas: null,
    context: null
};
var draw = function(e){
    /*
    var x = e.clientX;
    var y = e.clientY;
    */
    var x = e.offsetX;
    var y = e.offsetY;
    //var canvas = document.getElementById("myCanvas");
    my.context.fillStyle = "rgba(255,0,0,1)";
    my.context.fillRect(x,y,1,1);
};
var flag = false;
var start = null;
var end   = null;

var drawRect = function(start, end){
    my.context.fillStyle = "rgba(37,37,37,1)";
    my.context.fillRect(
            start.x,
            start.y,
            end.x - start.x,
            end.y - start.y
    );
};
var cancelRect = function(){
    if (end   == null) return;
    my.context.clearRect(
            start.x,
            start.y,
            end.x - start.x,
            end.y - start.y
    );
};

var initImage = function(img){
    my.context.drawImage(img, 0, 0);
};

$(function(){

    var originalImage = new Image();
    originalImage.src = imageURI;

    my.canvas = document.getElementById('canvas');
    my.canvas.setAttribute('width', originalImage.width);
    my.canvas.setAttribute('height',originalImage.height);

    my.context = my.canvas.getContext("2d");

    initImage(originalImage);

    my.canvas.addEventListener('mousemove',function(ev){
        if (start == null) return;
        cancelRect();

        end = {
            x : ev.offsetX,
            y : ev.offsetY
        };

        drawRect(start, end);
    });
    my.canvas.addEventListener('mousedown',function(ev){

        flag = true;

        if (start != null) return;


        start =  {
            x : ev.offsetX,
            y : ev.offsetY
        };
    });
    my.canvas.addEventListener('mouseup',function(ev){

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

    $('#download').on('click',function(){

        var jpegURI = my.canvas.toDataURL("image/jpeg");

        var a = document.createElement('a');
        a.download = 'pic.jpeg';
        a.href     = jpegURI;
        a.click();
    });
});
