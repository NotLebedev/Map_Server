import {requestEntitiesAsync} from "./web.js";

let loadedEntitiesId = [];

export function loadElementsAsync(x1, y1, width, height, callback) {

    let f = function (response) {

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

        callback(ret);

    };

    requestEntitiesAsync(Math.round(x1), Math.round(y1), Math.round(height), Math.round(width), f);

}
