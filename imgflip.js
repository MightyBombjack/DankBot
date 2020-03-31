/*
URL: https://api.imgflip.com/get_memes
Method: GET
https://imgflip.com/s/meme/Bad-Luck-Brian.jpg
URL: https://api.imgflip.com/caption_image
https://imgflip.com/ajax_meme_search_new?q=kid&transparent_only=0&include_nsfw=1


const formData = {
   client_id:     '0123456789abcdef', 
   client_secret: 'secret', 
   code:          'abcdef'
};

request.post(
  {
    url: 'https://todoist.com/oauth/access_token',
    form: formData
  },
  function (err, httpResponse, body) {
    console.log(err, body);
  }
);


key	value
template_id	A template ID as returned by the get_memes response. Any ID that was ever returned from the get_memes response should work for this parameter. For custom template uploads, the template ID can be found in the memegenerator URL, e.g. https://imgflip.com/memegenerator/14859329/Charlie-Sheen-DERP. Also, here is a list of the top 100 Imgflip meme IDs.
username	username of a valid imgflip account. This is used to track where API requests are coming from.
password	password for the imgflip account. As always, make sure password (and all the other parameters) are in the body of the POST request, not in the request url.
text0	Top text for the meme (do not use this parameter if you are using the boxes parameter below)
text1	Bottom text for the meme (do not use this parameter if you are using the boxes parameter below)
font	[optional] The font family to use for the text. Current options are "impact" and "arial". Defaults to impact.
max_font_size	[optional] Maximum font size in pixels. Defaults to 50px.
Method: POST
[
    {
        "text": "One does not simply",
        "x": 10,
        "y": 10,
        "width": 548,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    },
    {
        "text": "Make custom memes on the web via imgflip API",
        "x": 10,
        "y": 225,
        "width": 548,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    }
]
*/

const axios = require('axios');
const ApiUrl = 'https://api.imgflip.com';
const url = 'https://imgflip.com';
//const searchPath = (searchTerm) => `ajax_meme_search_new?q=${searchterm}&transparent_only=0&include_nsfw=1`;
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
//https://imgflip.com/ajax_meme_search_new?q=kid&transparent_only=0&include_nsfw=1
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