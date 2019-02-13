export function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

export function requestEntities(x1, y1, height, width) {

    let response = JSON.parse(httpGet(window.location.toString() +
        "/requestEntities?x=" + x1 + "&y=" + y1 + "&height=" + height + "&width=" + width));

    return response.responseType.toString() === "RequestEntitiesSuccess" ? response : null;

}

export function requestEntitiesAsync(x1, y1, height, width, callback) {

    let f = function (response) {

        let parse = JSON.parse(response);
        if(response.responseType.toString() === "RequestEntitiesSuccess") {
            callback(parse);
        }

    };

    httpGetAsync(window.location.toString() +
        "/requestEntities?x=" + x1 + "&y=" + y1 + "&height=" + height + "&width=" + width,
        f);

}