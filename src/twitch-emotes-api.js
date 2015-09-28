
var got = require('got');

const imagesList = 'https://twitchemotes.com/api_cache/v2/images.json';
const imageUrlById = (id) => `https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0`;

module.exports = {
    getImagesHash: function () {
        return new Promise(function (resolve, reject) {
            return got('https://twitchemotes.com/api_cache/v2/images.json')
                .then(response => resolve(JSON.parse(response.body).images))
                .catch(error => reject(error));
        });
    },

    /**
     * @param {Number|String} id
     *
     * @returns {Object} - stream
     */
    fetchImageById: function (id) {
        return got.stream(imageUrlById(id));
    }
};
