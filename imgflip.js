const axios = require('axios');
const ApiUrl = 'https://api.imgflip.com';
const url = 'https://imgflip.com';
const searchPath = `/ajax_meme_search_new`;
const imageUrl = 'https://imgflip.com/s/meme/';
async function getMemes() {
    try {
        axios(url + '/get_memes', function (err, res, body) {
            console.log(body);
        });
    }
    catch (e) {
        console.log(e);
    }
};
async function searchMemes(searchTerm) {
    try {
        const response = await axios.get(`${url}${searchPath}`, {
            params: {
                q: searchTerm,
                transparent_only: 0,
                include_nsfw: 1
            }
        });
        let results = '';
        for (let i = 0; i < response.data.results.length; i++) {
            results = results.concat(`${response.data.results[i].name}\t\t\t`);
            results = results.concat(`ID: ${response.data.results[i].id}\n`);
        }
        return results;
    }
    catch (e) {
        console.log(e);
    }
};
async function showPreview(searchTerm) {
    // TODO
    /*
        I'm not sure that the preview links are always correct
        example: Bad Luck Brian Headless
    */
    let p = {
        q: searchTerm.replace(/,/g, '+'),
        transparent_only: 0,
        include_nsfw: 1
    }
    try {
        const response = await axios.get(`${url}${searchPath}`, {
            params: p
        });
        console.log(p);
        let results = '';
        for (let i = 0; i < response.data.results.length; i++) {
            results = results.concat(`${imageUrl}${response.data.results[i].name.replace(/\s/g, '-')}.jpg\n`);
        }
        return results;
    }
    catch (e) {
        console.log(e);
    }
};

async function captionImage(id, topText, bottomText) {
    const formData = {
        template_id: '160583',
        text0: 'top text test',
        text1: 'bottom text test'
    }
    try {
        axios.post(
            {
                url: `${url}${searchPath}`,
                form: formData
            },
            function (err, res, body) {
                console.log(body);
            });
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = {
    getMemes,
    searchMemes,
    captionImage,
    showPreview
}