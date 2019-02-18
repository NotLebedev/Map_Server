import {addNewImage} from "./map.js";

let editorButton = document.getElementById("toggleEditor");
let editorBar = document.getElementById("editBar");

let editorChanges = null;
editorButton.addEventListener("click", function () {
    editorBar.style.display = editorBar.style.display === "none" ? "block" : "none";

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
        console.log("saving");
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
    }

}

let entityStorage = [];

export function addEntity(entity) {
    entityStorage.push(entity);
}