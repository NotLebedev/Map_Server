import {loadElementsAsync} from "./loadController.js";

let width = window.innerWidth;
let height = window.innerHeight;

let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true
});

let layer = new Konva.Layer();
stage.add(layer);

let updateLoad = function () {

    let callback = function (entities) {
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

                layer.batchDraw();
                stage.batchDraw();

            };

            imageObj.src = entity.url;

        }

        oldX = -stage.x();
        oldY = -stage.y();
    };

    loadElementsAsync(-((stage.x() + stage.width()) / stage.scaleX()),  //Extending view three times
        -((stage.y() + stage.height()) / stage.scaleY()),               //seems to be perfect balance
        stage.width() * 3 / stage.scaleX(),                         //between smoothness
        stage.height() * 3/ stage.scaleY(),                         //and performance
        callback);

};

let initLoad = function() {

    updateLoad();

    setTimeout(function () {
        layer.batchDraw();
        stage.batchDraw();}, 100);
};

initLoad();

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
    updateLoad();
    stage.batchDraw();//Necessary because no pictures can be updated and then no redraw is triggerd
});

document.getElementById("zoomIn").addEventListener("click", function () {

    let oldScale = stage.scaleX();

    let newScale = oldScale * scaleBy;
    stage.scale({ x: newScale, y: newScale });
    updateLoad();
    stage.batchDraw();//Necessary because no pictures can be updated and then no redraw is triggerd

});

document.getElementById("zoomOut").addEventListener("click", function () {

    let oldScale = stage.scaleX();

    let newScale = oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });
    updateLoad();
    stage.batchDraw();//Necessary because no pictures can be updated and then no redraw is triggerd

});

let oldX = -stage.x();
let oldY = -stage.y();

stage.on("dragmove", function () {

    if(Math.abs(-stage.x() - oldX) > 100 || Math.abs(-stage.y() - oldY) > 100)
        updateLoad();

});
