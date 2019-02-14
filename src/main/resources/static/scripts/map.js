import {loadElementsAsync} from "./loadController.js";

let stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
    draggable: true
});
let layer = new Konva.Layer();
stage.add(layer);
initLoad();

function updateLoad() {

    let callback = function (entities) {
        for (let i = 0; i < entities.length; i++) {

            let entity = entities[i];

            let imageObj = new Image();
            imageObj.onload = () => {

                let img = new Konva.Image({
                    x: entity.x1,
                    y: entity.y1,
                    image: imageObj,
                    height: entity.height,
                    width: entity.width
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
        stage.width() * 3 / stage.scaleX(),                             //between smoothness
        stage.height() * 3 / stage.scaleY(),                            //and performance
        callback);

}

function initLoad() {

    updateLoad();

    setTimeout(function () {
        layer.batchDraw();
        stage.batchDraw();
    }, 100);

}

function rescale(scaleCenter, doZoomIn, scaleFactor) {

    let oldScale = stage.scaleX();

    let mousePointTo = {
        x: scaleCenter.x / oldScale - stage.x() / oldScale,
        y: scaleCenter.y / oldScale - stage.y() / oldScale
    };

    let newScale =
        doZoomIn ? oldScale * scaleFactor : oldScale / scaleFactor;
    stage.scale({x: newScale, y: newScale});

    let newPos = {
        x:
            -(mousePointTo.x - scaleCenter.x / newScale) *
            newScale,
        y:
            -(mousePointTo.y - scaleCenter.y / newScale) *
            newScale
    };
    stage.position(newPos);
    updateLoad();
    stage.batchDraw();//Necessary because no pictures can be updated and then no redraw is triggered


}

stage.on('wheel', e => {

    e.evt.preventDefault();
    rescale(stage.getPointerPosition(), e.evt.deltaY > 0, 1.05);

});

document.getElementById("zoomIn").addEventListener("click", function () {

    rescale({
        x: stage.width() / 2,
        y: stage.height() / 2
    }, true, 1.15);

});

document.getElementById("zoomOut").addEventListener("click", function () {

    rescale({
        x: stage.width() / 2,
        y: stage.height() / 2
    }, false, 1.15);

});

let oldX = -stage.x();
let oldY = -stage.y();
stage.on("dragmove", function () {

    if(Math.abs(-stage.x() - oldX) > 100 || Math.abs(-stage.y() - oldY) > 100)
        updateLoad();

});
