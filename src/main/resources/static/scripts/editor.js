let editorButton = document.getElementById("toggleEditor");
let editorBar = document.getElementById("editBar");

editorButton.addEventListener("click", function () {
    editorBar.style.display = editorBar.style.display === "none" ? "block" : "none";
});