let editorButton = document.getElementById("toggleEditor");
let editorBar = document.getElementById("editBar");

editorButton.addEventListener("click", function () {
    editorBar.style.display = editorBar.style.display === "none" ? "block" : "none";
    console.log(entityStorage);
});

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