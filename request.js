const requestlib = require('request');

const base_path = 'https://platzi.com';


var cookieText = '__cfduid=d9276895b0b21340d58bd0d05d30aae791523376902; _ga=GA1.2.1681277544.1523376915; _gid=GA1.2.1308314117.1523376915; __lc.visitor_id.9539695=S1523376916.e88d7d8293; ajs_group_id=null; ajs_user_id=%22helmutinp%40gmail.com%22; ajs_anonymous_id=%222a28ed66-8552-4482-81a3-8459825e88ec%22; loki=488902; __insp_wid=1550190489; __insp_nv=true; csrftoken=05KMGAkMMKFNQGNGHDFWUpsz481kYVFphaR5x7nFqMqhiw3SdxKCEqM9pSu4mzFx; s=l5mo05178knjubqgsmmtn9fsr1g5d3ak; hybrid="crxwoYbXWLxv8T0k2Y2y2w/95gSvLZ7JErur6TkGcmc="; __insp_targlpu=aHR0cHM6Ly9wbGF0emkuY29tL2NsYXNlcy9naXQtZ2l0aHViL2NvbmNlcHRvL2ludHJvZHVjY2lvbi1hbC1jdXJzby1kZS1naXQteS1naXRodWIvcXVlLWVzLWdpdDUxNDMvbWF0ZXJpYWwv; __insp_targlpt=wr9RdcOpIGVzIEdpdD8gZW4gQ3Vyc28gcHJvZmVzaW9uYWwgZGUgR2l0IHkgR2l0SHVi; __insp_norec_sess=true; entry_path="/"; _gat_platziPublicES=1; _gat_platziFull=1; __lfcc=1; _gat_platziPlatformES=1; __insp_slim=1523568473289; livetokenaccess=YqzZ0lo8IbARY0MEZHBaFxBkoqZ8E8tM';

function request(url = '', method = 'GET', params = []) {
    return new Promise((resolve, reject) => {
        let options = getOptions(url, method, params);
        //console.log(options.url);
        requestlib(options, (err, res, body) => {
            let statusCode = 200;
            if (!err && (statusCode == 200 || statusCode == 201)) {
                resolve(body);
            } else {
                reject(err, statusCode, body)
            }
        });
    });
}

function getOptions(url, method, params) {
    url = `${base_path}${url}`;
    return {
        url,
        method,
        headers: {
            'Cookie': cookieText,
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    };
}

module.exports = request;