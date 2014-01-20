var my = {
    can: null,
    context: null
};
var draw = function(e){
    /*
    var x = e.clientX;
    var y = e.clientY;
    */
    var x = e.offsetX;
    var y = e.offsetY;
    //var can = document.getElementById("myCanvas");
    my.context.fillStyle = "rgba(255,0,0,1)";
    my.context.fillRect(x,y,1,1);
};
var flag = false;
var start = null;
var end   = null;

var drawRect = function(start, end){
    my.context.fillStyle = "rgba(0,255,0,0.5)";
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

    my.can = document.getElementById('canvas');
    my.can.setAttribute('width', originalImage.width);
    my.can.setAttribute('height',originalImage.height);

    my.context = my.can.getContext("2d");

    initImage(originalImage);

    my.can.addEventListener('mousemove',function(ev){
        if (start == null) return;
        cancelRect();

        end = {
            x : ev.offsetX,
            y : ev.offsetY
        };

        drawRect(start, end);
    });
    my.can.addEventListener('mousedown',function(ev){

        flag = true;

        if (start != null) return;


        start =  {
            x : ev.offsetX,
            y : ev.offsetY
        };
    });
    my.can.addEventListener('mouseup',function(ev){

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

        var jpegURI = my.can.toDataURL("image/jpeg");

        var a = document.createElement('a');
        a.download = 'pic.jpeg';
        a.href     = jpegURI;
        a.click();
    });
});
