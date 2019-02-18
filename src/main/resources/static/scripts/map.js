import {loadElementsAsync} from "./loadController.js";
import {ImageEntity, addEntity} from "./editor.js";

const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
    draggable: true
});
const layer = new Konva.Layer();
stage.add(layer);
initLoad();

function updateLoad() {

    const callback = function (entities) {
        for (let i = 0; i < entities.length; i++) {

            const entity = entities[i];

            const imageObj = new Image();
            imageObj.onload = () => {

                const img = new Konva.Image({
                    x: entity.x1,
                    y: entity.y1,
                    image: imageObj,
                    height: entity.height,
                    width: entity.width
                });

                layer.add(img);
                addEntity(new ImageEntity(entity.id, img));

                layer.batchDraw();
                stage.batchDraw();

            };

            imageObj.src = entity.url;

        }

        oldX = -stage.x() / stage.scaleX();
        oldY = -stage.y() / stage.scaleY();
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

    const oldScale = stage.scaleX();
    let newScale =
        doZoomIn ? oldScale * scaleFactor : oldScale / scaleFactor;

    if(newScale > 5) {  //No zooming in more than five times

        if(oldScale !== 5)
            newScale = 5;
        else
            return;

    }

    const mousePointTo = {
        x: scaleCenter.x / oldScale - stage.x() / oldScale,
        y: scaleCenter.y / oldScale - stage.y() / oldScale
    };

    stage.scale({x: newScale, y: newScale});

    const newPos = {
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

    if(Math.abs((-stage.x() / stage.scaleX()) - oldX) > 100 || Math.abs((-stage.y() / stage.scaleY()) - oldY) > 100)
        updateLoad();

});

export function addNewImage(url, callback) {

    const imageObj = new Image();
    imageObj.onload = () => {

        const img = new Konva.Image({
            x: (-stage.x() / stage.scaleX()) + (stage.width() / 2 / stage.scaleX()),
            y: (-stage.y() / stage.scaleY()) + (stage.height() / 2 / stage.scaleY()),
            image: imageObj,
            height: imageObj.height,
            width: imageObj.width,
            draggable: true
        });

        callback(img);

        layer.add(img);
        addEntity(new ImageEntity(-1, img));

        layer.batchDraw();
        stage.batchDraw();

    };

    imageObj.src = url;

}
