function httpGetAsync(theUrl, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

export function requestEntitiesAsync(x1, y1, height, width, callback) {

    const f = function (response) {

        const parse = JSON.parse(response);
        if(parse.responseType.toString() === "RequestEntitiesSuccess") {
            callback(parse);
        }

    };

    httpGetAsync(window.location.toString() +
        "/requestEntities?x=" + x1 + "&y=" + y1 + "&height=" + height + "&width=" + width,
        f);

}