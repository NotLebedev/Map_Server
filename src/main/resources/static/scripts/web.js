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

function httpPostAsync(theUrl, data, callback) {

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = callback;
    xmlHttp.open("POST", theUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(data);

}

export function httpPostModifyAsync(added) {

    const body = JSON.stringify({"added" : added});
    httpPostAsync(window.location.toString() + "/addEntities",
        body, null);

}