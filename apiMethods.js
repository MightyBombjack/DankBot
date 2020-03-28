const https = require('https');
const url = 'api.imgflip.com';
//const url = '104.18.64.15';
const getMemesPath = '/get_memes'
const captionImagesPath = '/caption_image'
/*
https://api.imgflip.com/get_memes Method: GET
https://api.imgflip.com/caption_image Method: POST


Example "boxes" array:
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
*/
module.exports = {
    getMemes: function () {
        let memeList;
        const options = {
            hostname: url,
            port: 443,
            path: getMemesPath,
            method: 'GET'
        }
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                process.stdout.write(d)
                memeList = d;
            })
        })

        req.on('error', error => {
            console.error(error)
        })
        req.end()
        return memeList;


    }
}