import {addNewImage} from "./map.js";
import {httpPostModifyAsync} from "./web.js";
import {addToLayer} from "./map.js";

let editorButton = document.getElementById("toggleEditor");
let editorBar = document.getElementById("editBar");

let editorChanges = null;
editorButton.addEventListener("click", function () {
    editorBar.style.display = editorBar.style.display === "none" ? "block" : "none"; //Toggle edit bar

    if(editorBar.style.display === "block") { //If bar is active enter edit mode for all entities
        entityStorage.forEach(e => {e.enterEditMode()});
    }else {
        entityStorage.forEach(e => {e.exitEditMode()});
    }

    if(editorChanges == null) //If no changelist is present create one
        editorChanges = new EditorChanges();

});

class EditorChanges { //Editor mode changelist

    constructor() {
        this.addedKonvaImages = [];
        this.editedKonvaImages = [];
        this.deletedKonvaImages = [];

        document.getElementById("save").addEventListener("click", this.saveAll.bind(this));
        document.getElementById("addImage").addEventListener("click", this.newImage.bind(this));
    }

    saveAll() { //Build entities modify request and POST it to server

        entityStorage.forEach(e => e.deactivate()); //Deactivate all entities to save them

        const added = [];

        for(let i = 0; i < this.addedKonvaImages.length; i++) {

            const image = this.addedKonvaImages[i];

            added.push({
                "type": "image",
                "x1" : image.x(),
                "y1" : image.y(),
                "width" : image.width(),
                "height" : image.height(),
                "url" : image.image().src
            })
        }

        const edited = [];

        for(let i = 0; i < this.editedKonvaImages.length; i++) {

            const image = this.editedKonvaImages[i];

            edited.push({
                "type": "image",
                "id": image.id,
                "x1": image.konvaImage.x(),
                "y1": image.konvaImage.y(),
                "width" : image.konvaImage.width(),
                "height" : image.konvaImage.height(),
                "url" : image.konvaImage.image().src
            })

        }

        httpPostModifyAsync(added, edited);

    }

    newImage() {
        const url = document.getElementById("newImageSrc").value.toString();

        addNewImage(url, e => {
            this.addedKonvaImages.push(e);
        });
    }

    imageModified(image) {

        //If image is not yet in changelist and is not newly added (newly added have id < 0)
        if(!(this.editedKonvaImages.some(e => e.id === image.id) || image.id < 0)) {
            this.editedKonvaImages.push(image);
        }

    }

    imageDeleted(image) {

        if(image.id < 0) { //Remove newly added image from changelist

            this.addedKonvaImages = this.addedKonvaImages.filter(function (value) {
                return value.id !== image.id;
            });

            return;

        }else if(this.editedKonvaImages.some(e => image.id === e.id)){ //If this image has been edited

            //Remove from edited changelist
            this.editedKonvaImages = this.editedKonvaImages.filter(function (value) {
                return value.id !== image.id;
            });

        }

        //If image is not in newly added it should be added to deleted changelist in any case
        this.deletedKonvaImages.push(image);

    }

}

export class ImageEntity {

    constructor(id, konvaImage) {
        this.id = id; //It is actually used, no idea why idea marks it as unused
        this.konvaImage = konvaImage;
        this.active = false;
        this.dragAnchor = null;
        this.deleteAnchor = null;
        this.edited = false;
    }

    enterEditMode() {
        this.konvaImage.off("click"); //Unbind previously assigned listener
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

            let anchor = new Konva.Circle({ //Adding drag anchor
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
                let layer = this.getLayer();
                document.body.style.cursor = 'pointer';
                this.setStrokeWidth(4);
                layer.draw();
            });
            anchor.on('mouseout', function() {
                let layer = this.getLayer();
                document.body.style.cursor = 'default';
                this.setStrokeWidth(2);
                layer.draw();
            });

            const ctx = this;
            anchor.on("dragmove", function () {
               ctx.update(this); //update image in respect to this dragAnchor
            });

            addToLayer(anchor);
            this.dragAnchor = anchor;

            let deleteAnchor = new Konva.Circle({ //Adding drag anchor
                x: this.konvaImage.x() + this.konvaImage.width(),
                y: this.konvaImage.y(),
                stroke: '#750000',
                fill: '#dd0000',
                strokeWidth: 2,
                radius: 8,
                draggable: false,
                dragOnTop: false
            });
            deleteAnchor.on('mouseover', function() {
                let layer = this.getLayer();
                document.body.style.cursor = 'pointer';
                this.setStrokeWidth(4);
                layer.draw();
            });
            deleteAnchor.on('mouseout', function() {
                let layer = this.getLayer();
                document.body.style.cursor = 'default';
                this.setStrokeWidth(2);
                layer.draw();
            });

            deleteAnchor.on("click", function() {
                console.log("Deleting image");
            });

            addToLayer(deleteAnchor);
            this.deleteAnchor = deleteAnchor;
            anchor.getLayer().batchDraw();

        }else {
            if(this.dragAnchor != null) {
                const layer = this.dragAnchor.getLayer();
                this.dragAnchor.destroy();
                layer.batchDraw();
            }

            this.dragAnchor = null;
        }

    }

    deactivate() {
        if(this.dragAnchor != null) {
            const layer = this.dragAnchor.getLayer();
            this.dragAnchor.destroy();
            layer.batchDraw();
        }

        if(this.active && this.edited) //If this image was active and edited upon deactivation add it to changelist
            editorChanges.imageModified(this);

        this.dragAnchor = null;
        this.active = false;
    }

    update(anchor) {
        this.konvaImage.x(anchor.x());
        this.konvaImage.y(anchor.y());

        this.deleteAnchor.x(this.konvaImage.x() + this.konvaImage.width());
        this.deleteAnchor.y(this.konvaImage.y());
        this.edited = true;
    }

}

let entityStorage = []; //Storage of all entities present on map

export function addEntity(entity) {
    entityStorage.push(entity);
}