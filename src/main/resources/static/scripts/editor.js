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
        this.addedEntities = [];

        document.getElementById("save").addEventListener("click", this.saveAll);
    }

    saveAll() {
        console.log("saving");
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