import {addNewImage} from "./map.js";
import {httpPostAddNewEntitiesAsync} from "./web.js";

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
    }

}

let entityStorage = [];

export function addEntity(entity) {
    entityStorage.push(entity);
}