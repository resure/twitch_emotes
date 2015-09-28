
const list = require('./list');
const twitchEmotes = require('./twitch-emotes-api');
const fs = require('fs');
const sharp = require('sharp');

const imagePath = (name) => `./tmp/fetched/${name}.png`;
const resultPath = (name) => `./tmp/resized/${name}.png`;

twitchEmotes.getImagesHash()
    .then(function (images) {
        var idsByName = Object.keys(images).reduce(function (result, id) {
            result[images[id].code] = id;
            return result;
        }, {});

        list.forEach(function (name) {
            twitchEmotes
                .fetchImageById(idsByName[name])
                .pipe(sharp().resize(512, 512))
                .pipe(fs.createWriteStream(imagePath(name), {flags: 'w'}));
        });

    })
    .catch(function (error) {
        console.error(error);
    });
