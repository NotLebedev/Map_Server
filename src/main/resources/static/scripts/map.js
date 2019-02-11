import {requestEntities} from "./web.js";

let result = requestEntities(-500, -500, 1000, 1000);

for(var i = 0; i < result.entities.length; i++) {
    console.log(result.entities[i].url.toString());
}

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

let box = new Konva.Rect({
    x: rectX,
    y: rectY,
    width: 100,
    height: 50,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
});

let box2 = new Konva.Rect({
    x: rectX + 100,
    y: rectY + 100,
    width: 100,
    height: 50,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
});



layer.add(box);
layer.add(box2);
stage.add(layer);