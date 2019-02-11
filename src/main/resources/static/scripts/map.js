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

document.getElementById("zoomIn").addEventListener("click", function () {

    var oldScale = stage.scaleX();

    var newScale = oldScale * scaleBy;
    stage.scale({ x: newScale, y: newScale });
    stage.draw();
    layer.draw();

});

document.getElementById("zoomOut").addEventListener("click", function () {

    var oldScale = stage.scaleX();

    var newScale = oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });
    stage.draw();
    layer.draw();

});



/*stage.on("dragmove", function () {
   console.log(stage.x());
});*/
