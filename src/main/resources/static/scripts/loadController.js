import {requestEntities} from "./web.js";

var loadedEntitiesId = [];

export function loadElements(x1, y1, width, height) {

    let response = requestEntities(x1, y1, height, width);

    if(response == null) {

        console.log("Connectivity issues");
        return [];

    }

    let entities = response.entities;
    var ret = [];

    for(var i = 0; i < entities.length; i++) {

        let entity = entities[i];

        if(!loadedEntitiesId.includes(entity.id)) {
            loadedEntitiesId.push(entity.id);
            ret.push(entity);
        }

    }

    return ret;

}