const cheerio = require('cheerio');
const fs = require('fs');
const request = require('./request');

async function getSource() {
    let body = await request("/cursos/");
    const $ = cheerio.load(body);
    $("a.CareerCourse").each(function(i, elem) {
        let url = $(this).attr('href');
        getItemUrl(url)
    });
    //let url = $("a.CareerCourse").first().attr('href');
    //getItemUrl(url)
}

async function getItemUrl(url) {
    let body = await request(url);
    const $ = cheerio.load(body);
    let firstUrl = $("a.Material-link").first().attr('href');
    body = await request(firstUrl);

    const list = body.match(/sidebar_menu.*\s*total_materials: [0-9]+/gmi);
    const menus = eval(`({${list[0]}})`);
    let title_material = menus["sidebar_menu"]["title"];
    title_material = title_material.trim();
    title_material = title_material.replace(/ /g, '-');
    title_material = title_material.replace('Curso-profesional-de-', '');
    title_material = title_material.replace('Curso-de-', '');
    let cont = 1;
    for (let item of menus["sidebar_menu"]["concepts"]) {
        let title_concept = item["title"];
        for (let material of item["materials"]) {
            let url = `${material.link}`;
            let name = `${cont++} ${title_concept} - ${material.name}`;
            getDataVideo(url, name, title_material)
        }
    }
}

async function getDataVideo(url, title, title_material) {
    let body = await request(url);
    const url_video = body.match(/https:\/\/platzivod\.streaming\.mediaservices\.windows\.net\/[0-9a-z-\/\.]+\(format=mpd-time-csf\)/gm);
    fs.appendFile(`list/${title_material}`, `${url_video}**${title}\n`);
}

getSource();