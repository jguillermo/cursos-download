const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const rp = require('request-promise-native');

var cookieText = '';

var options = {
    url: 'https://platzi.com/clases/ia/concepto/introduccion-a-machine-learning/que-es-la-inteligencia-artificial/material/',
    headers: {
        'Cookie': cookieText,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
};

requestss(options, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        const list = body.match(/sidebar_menu.*\s*total_materials: [0-9]+/gmi);
        const menus = eval(`({${list[0]}})`);
        let title_material = menus["sidebar_menu"]["title"];
        title_material = title_material.replace(' ', '-');
        title_material = title_material.replace('Curso-de-', '');
        let cont = 1;
        for (let item of menus["sidebar_menu"]["concepts"]) {
            let title_concept = item["title"];
            for (let material of item["materials"]) {
                let url = `https://platzi.com/${material.link}`;
                let name = `${cont++} ${title_concept} - ${material.name}`;
                getDataVideo(url, name, title_material)
            }
        }
    } else {
        console.log(err);
        console.log(body);
    }
});

function getDataVideo(url, title, title_material) {
    options.url = url;
    request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            const url = body.match(/https:\/\/platzivod\.streaming\.mediaservices\.windows\.net\/[0-9a-z-\/\.]+\(format=mpd-time-csf\)/gm);
            fs.appendFile(`list/${title_material}`, `${url}**${title}\n`)
        } else {
            console.log(err);
            console.log(body);
        }
    });
}