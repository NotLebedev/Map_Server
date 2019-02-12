import {requestEntities} from "./web.js";

var loadedEntitiesId = [];

export function loadElements(x1, y1, width, height) {

    let response = requestEntities(Math.round(x1), Math.round(y1), Math.round(height), Math.round(width));

    if(response == null) {

        console.log("Connectivity issues");
        return [];

    }

    let entities = response.entities;
    let ret = [];

    for(let i = 0; i < entities.length; i++) {

        let entity = entities[i];

        if(!loadedEntitiesId.includes(entity.id)) {
            loadedEntitiesId.push(entity.id);
            ret.push(entity);
        }

    }

    return ret;

}