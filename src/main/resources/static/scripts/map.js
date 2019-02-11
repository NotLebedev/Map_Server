import {requestEntities} from "./web.js";

let entities = requestEntities(-500, -500, 1000, 1000).entities;

let width = window.innerWidth;
let height = window.innerHeight;

let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true
});

let layer = new Konva.Layer();
let rectX = stage.getWidth() / 2 - 50;
let rectY = stage.getHeight() / 2 - 25;

for(var i = 0; i < entities.length; i++) {

    let entity = entities[i];

    let imageObj = new Image();
    imageObj.onload = new function () {

        let img = new Konva.Image({
            x : entity.x1,
            y : entity.y1,
            image : imageObj,
            height : entity.height,
            width : entity.width
        });

        layer.add(img);

        setTimeout(function () {
            layer.batchDraw();
            stage.batchDraw();
            console.log("qwe")}, 100);

    };

    imageObj.src = entity.url;

}

stage.add(layer);

var scaleBy = 1.05;
stage.on('wheel', e => {
    e.evt.preventDefault();
    var oldScale = stage.scaleX();

    var mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    var newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    var newPos = {
        x:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
            newScale,
        y:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
            newScale
    };
    stage.position(newPos);
    stage.batchDraw();
});

var lastDist = 0;

stage.getContent().addEventListener('touchmove', function(evt) {
    var touch1 = evt.touches[0];
    var touch2 = evt.touches[1];

    if(touch1 && touch2) {
        var dist = getDistance({
            x: touch1.clientX,
            y: touch1.clientY
        }, {
            x: touch2.clientX,
            y: touch2.clientY
        });

        if(!lastDist) {
            lastDist = dist;
        }

        var scale = stage.getScaleX() * dist / lastDist;

        stage.scaleX(scale);
        stage.scaleY(scale);
        stage.draw();
        lastDist = dist;
    }
}, false);

stage.getContent().addEventListener('touchend', function() {
    lastDist = 0;
}, false);

/*stage.on("dragmove", function () {
   console.log(stage.x());
});*/
