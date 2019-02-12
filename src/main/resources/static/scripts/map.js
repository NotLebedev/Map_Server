import {loadElements} from "./loadController.js";

let width = window.innerWidth;
let height = window.innerHeight;

let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true
});

let entities = loadElements(-stage.x(), -stage.y(), stage.width(), stage.height());

let layer = new Konva.Layer();

for(let i = 0; i < entities.length; i++) {

    let entity = entities[i];

    let imageObj = new Image();
    imageObj.onload = () => {

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

const scaleBy = 1.05;
stage.on('wheel', e => {
    e.evt.preventDefault();
    let oldScale = stage.scaleX();

    let mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    let newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    let newPos = {
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

    let oldScale = stage.scaleX();

    let newScale = oldScale * scaleBy;
    stage.scale({ x: newScale, y: newScale });
    stage.draw();
    layer.draw();

});

document.getElementById("zoomOut").addEventListener("click", function () {

    let oldScale = stage.scaleX();

    let newScale = oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });
    stage.draw();
    layer.draw();

});



stage.on("dragmove", function () {

    console.log(-(stage.x() / stage.scaleX()));

    for(var i = 0; i < entities.length; i++) {

        let entity = entities[i];

        let imageObj = new Image();
        imageObj.onload = () => {

            let img = new Konva.Image({
                x : entity.x1,
                y : entity.y1,
                image : imageObj,
                height : entity.height,
                width : entity.width
            });

            layer.add(img);

            //setTimeout(function () {
                layer.batchDraw();
                stage.batchDraw();
                //console.log("qwe")}, 100);

        };

        imageObj.src = entity.url;

    }

});
