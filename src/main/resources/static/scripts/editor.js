import {addNewImage} from "./map.js";
import {httpPostAddNewEntitiesAsync} from "./web.js";

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

        document.getElementById("save").addEventListener("click", this.saveAll);
        document.getElementById("addImage").addEventListener("click", this.newImage);
    }

    saveAll() {

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

        httpPostAddNewEntitiesAsync(images);

    }

    newImage() {
        const url = document.getElementById("newImageSrc").value.toString();

        addNewImage(url, e => {
            editorChanges.addedKonvaImages.push(e);
        });
    }

}

export class ImageEntity {

    constructor(id, konvaImage) {
        this.id = id;
        this.konvaImage = konvaImage;
        this.active = false;
    }

    enterEditMode() {
        this.konvaImage.off("click");
        this.konvaImage.off("mouseout");
        this.konvaImage.on("click", this.click.bind(this));
        this.konvaImage.on("mouseout", this.mouseOut.bind(this));
    }

    exitEditMode() {
        this.konvaImage.off("click");
        this.konvaImage.off("mouseout");
        this.konvaImage.on("click", e => {});
        this.konvaImage.on("mouseout", e => {});
    }

    click() {

        this.active = !this.active;

        if(this.active) {
            this.konvaImage.draggable(true);
        }else {
            this.konvaImage.draggable(false);
        }

    }

    mouseOut() {
        this.active = false;
        this.konvaImage.draggable(false);
    }

}

let entityStorage = [];

export function addEntity(entity) {
    entityStorage.push(entity);
}