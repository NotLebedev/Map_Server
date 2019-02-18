import {addNewImage} from "./map.js";
import {httpPostModifyAsync} from "./web.js";
import {addToLayer} from "./map.js";

let editorButton = document.getElementById("toggleEditor");
let editorBar = document.getElementById("editBar");

let editorChanges = null;
editorButton.addEventListener("click", function () {
    editorBar.style.display = editorBar.style.display === "none" ? "block" : "none";

    if(editorBar.style.display === "block") {
        entityStorage.forEach(e => {e.enterEditMode()});
    }else {
        entityStorage.forEach(e => {e.exitEditMode()});
    }

    if(editorChanges == null)
        editorChanges = new EditorChanges();

});

class EditorChanges {

    constructor() {
        this.addedKonvaImages = [];
        this.modifiedKonvaImages = [];

        document.getElementById("save").addEventListener("click", this.saveAll);
        document.getElementById("addImage").addEventListener("click", this.newImage);
    }

    saveAll() {

        entityStorage.forEach(e => e.deactivate());

        const images = [];

        for(let i = 0; i < editorChanges.addedKonvaImages.length; i++) {

            const image = editorChanges.addedKonvaImages[i];

            images.push({
                "type": "image",
                "x1" : image.x(),
                "y1" : image.y(),
                "width" : image.width(),
                "height" : image.height(),
                "url" : image.image().src
            })
        }

        httpPostModifyAsync(images);

    }

    newImage() {
        const url = document.getElementById("newImageSrc").value.toString();

        addNewImage(url, e => {
            editorChanges.addedKonvaImages.push(e);
        });
    }

    imageModified(image) {

        if(!this.modifiedKonvaImages.some(e => e.id === image.id)) {
            this.modifiedKonvaImages.push(image);
            console.log("new image modified");
        }

    }

}

export class ImageEntity {

    constructor(id, konvaImage) {
        this.id = id;
        this.konvaImage = konvaImage;
        this.active = false;
        this.anchor = null;
        this.edited = false;
    }

    enterEditMode() {
        this.konvaImage.off("click");
        this.konvaImage.on("click", this.click.bind(this));
    }

    exitEditMode() {
        this.deactivate();
        this.konvaImage.off("click");
        this.konvaImage.on("click", e => {});
    }

    click() {

        entityStorage.forEach(e => e.deactivate());

        this.active = !this.active;

        if(this.active) {

            let anchor = new Konva.Circle({
                x: this.konvaImage.x(),
                y: this.konvaImage.y(),
                stroke: '#666',
                fill: '#ddd',
                strokeWidth: 2,
                radius: 8,
                draggable: true,
                dragOnTop: false
            });
            anchor.on('mouseover', function() {
                var layer = this.getLayer();
                document.body.style.cursor = 'pointer';
                this.setStrokeWidth(4);
                layer.draw();
            });
            anchor.on('mouseout', function() {
                var layer = this.getLayer();
                document.body.style.cursor = 'default';
                this.setStrokeWidth(2);
                layer.draw();
            });

            const ctx = this;
            anchor.on("dragmove", function () {
               ctx.update(this);
            });

            addToLayer(anchor);
            anchor.getLayer().batchDraw();
            this.anchor = anchor;

        }else {
            if(this.anchor != null) {
                const layer = this.anchor.getLayer();
                this.anchor.destroy();
                layer.batchDraw();
            }

            this.anchor = null;
            layer.batchDraw();
        }

    }

    deactivate() {
        if(this.anchor != null) {
            const layer = this.anchor.getLayer();
            this.anchor.destroy();
            layer.batchDraw();
        }

        if(this.active && this.edited)
            editorChanges.imageModified(this);

        this.anchor = null;
        this.active = false;
    }

    update(anchor) {
        this.konvaImage.x(anchor.x());
        this.konvaImage.y(anchor.y());
        this.edited = true;
    }

}

let entityStorage = [];

export function addEntity(entity) {
    entityStorage.push(entity);
}