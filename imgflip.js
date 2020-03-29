/*
URL: https://api.imgflip.com/get_memes
Method: GET

URL: https://api.imgflip.com/caption_image

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

require('request');
const url = 'https://api.imgflip.com'
exports.module = {
    getMemes: () => {
        request(url + '/get_memes', function (err, res, body) {
            console.log(body);
        });
    }
}