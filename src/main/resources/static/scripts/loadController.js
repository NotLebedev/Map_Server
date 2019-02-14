import {requestEntitiesAsync} from "./web.js";

const loadedEntitiesId = [];
const visitedPositions = [];

export function loadElementsAsync(x1, y1, width, height, callback) {

    const position = new MapPosition(x1, y1, width, height);

    if(!visitedPositions.some(e => position.equals(e))) {

        const f = function (response) {

            if (response == null) {

                console.log("Connectivity issues");
                return [];

            }

            visitedPositions.push(position);

            const entities = response.entities;
            const ret = [];

            for (let i = 0; i < entities.length; i++) {

                const entity = entities[i];

                if (!loadedEntitiesId.includes(entity.id)) {
                    loadedEntitiesId.push(entity.id);
                    ret.push(entity);
                }

            }

            callback(ret);

        };

        requestEntitiesAsync(Math.round(x1), Math.round(y1), Math.round(height), Math.round(width), f);

    }

}

class MapPosition {

    constructor(x1, y1, width, height) {
        this.x1 = Math.floor(x1/100);
        this.y1 = Math.floor(y1/100);
        this.width = Math.floor(width/100);
        this.height = Math.floor(height/100);
    }

    equals(position) {

        return this.x1 === position.x1 && this.y1 === position.y1 &&
            this.width === position.width && this.height === position.height;

    }

}
