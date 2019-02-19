import {loadElementsAsync} from "./loadController.js";
import {ImageEntity, addEntity} from "./editor.js";

const stage = new Konva.Stage({ //Creating new stage
    container: 'container',
    width: window.innerWidth, //Stage should take up all the available space
    height: window.innerHeight,
    draggable: true
});
const layer = new Konva.Layer();
stage.add(layer);
initLoad();

function updateLoad() { //Update map with new entities from server

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

function initLoad() { //Initial loading sequence (when page is just opened)

    updateLoad();

    setTimeout(function () { //For some reason drawing after each image loaded does
        layer.batchDraw();          //not work in this case
        stage.batchDraw();
    }, 100);

}

function rescale(scaleCenter, doZoomIn, scaleFactor) { //Generic rescaling function

    const oldScale = stage.scaleX();
    let newScale =
        doZoomIn ? oldScale * scaleFactor : oldScale / scaleFactor;

    if(newScale > 5) {  //No zooming in more than five times

        if(oldScale !== 5) //If scale is MORE than five make it exactly five
            newScale = 5;  //so no matter what combination of wheel and button zoom
        else               //is used maximum zoom is same
            return; //If exactly five times, than do nothing

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

stage.on('wheel', e => { //Mousewheel scaling

    e.evt.preventDefault();
    rescale(stage.getPointerPosition(), e.evt.deltaY > 0, 1.05);

});

//Button scaling
document.getElementById("zoomIn").addEventListener("click", function () {

    rescale({
        x: stage.width() / 2, //Zoom to center of map
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

    //Stage should be updated once every 100 pixels moved to improve performance
    if(Math.abs((-stage.x() / stage.scaleX()) - oldX) > 100 || Math.abs((-stage.y() / stage.scaleY()) - oldY) > 100)
        updateLoad();

});

let newAddedCounter = 1;
export function addNewImage(url, callback) { //Function for adding images in edit mode

    const imageObj = new Image();
    imageObj.onload = () => {

        const img = new Konva.Image({ //New image is placed in center of screen
            x: (-stage.x() / stage.scaleX()) + (stage.width() / 2 / stage.scaleX()),
            y: (-stage.y() / stage.scaleY()) + (stage.height() / 2 / stage.scaleY()),
            image: imageObj,
            height: imageObj.height,
            width: imageObj.width
        });

        callback(img);

        layer.add(img);

        const ie = new ImageEntity(-newAddedCounter, img); //Newly added images have negative ids
        ie.enterEditMode(); //Newly added image should be in edit mode as well to be editable
        ie.click(); //And active, as it`s new
        addEntity(ie);

        newAddedCounter ++;

        layer.batchDraw();
        stage.batchDraw();

    };

    imageObj.src = url;

}

export function addToLayer(e) {
    layer.add(e);
}
