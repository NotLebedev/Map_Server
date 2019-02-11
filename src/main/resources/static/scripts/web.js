export function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

export function requestEntities(x1, y1, height, width) {

    let response = JSON.parse(httpGet(window.location.toString() +
        "/requestEntities?x=" + x1 + "&y=" + y1 + "&height=" + height + "&width=" + width));

    return response.responseType.toString() === "RequestEntitiesSuccess" ? response : null;

}