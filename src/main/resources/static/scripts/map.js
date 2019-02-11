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

    };

    imageObj.src = entity.url;

}

stage.add(layer);

stage.on("dragmove", function () {
   console.log(stage.x());
});
