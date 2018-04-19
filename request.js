const requestlib = require('request');

const base_path = 'https://platzi.com';


var cookieText = '__cfduid=d9276895b0b21340d58bd0d05d30aae791523376902; _ga=GA1.2.1681277544.1523376915; __lc.visitor_id.9539695=S1523376916.e88d7d8293; ajs_group_id=null; ajs_user_id=%22helmutinp%40gmail.com%22; ajs_anonymous_id=%222a28ed66-8552-4482-81a3-8459825e88ec%22; loki=488902; entry_path="/"; _gid=GA1.2.363724059.1524155541; _gaexp=GAX1.2.Sv0y0q5mTeyH_FjduR32Mg.17727.2; __insp_wid=1550190489; __insp_nv=true; __extfc=1; s=v04ggv1d9hxht0e6odo4ecm3xgzat8jx; csrftoken=9B0UKb2Pu2Iudlkklgi8V0wfx5MSj7QcU37smeUrvdR5dnaPchJM14ZPDNxerLVt; hybrid="cdXJCsrSAWG6qJnHqXhTJiL+Lh1z1i8j5CpunO2Ql3s="; livetokenaccess=6OQBGXA16y32AHQCCPNwfNnFXqaCCX6m; __insp_slim=1524156357660; __insp_targlpu=aHR0cHM6Ly9wbGF0emkuY29tL2NsYXNlcy9naXQtZ2l0aHViL2NvbmNlcHRvL211bHRpcGxlcy1lbnRvcm5vcy1kZS10cmFiYWpvL2dpdC1yZWJhc2UtcmVlc2NyaWJlLWxhLWhpc3RvcmlhLWRlLXR1LXByb3llY3RvL21hdGVyaWFsLw%3D%3D; __insp_targlpt=Z2l0IHJlYmFzZSAoUmVlc2NyaWJlIGxhIGhpc3RvcmlhIGRlIHR1IHByb3llY3RvKSBlbiBDdXJzbyBwcm9mZXNpb25hbCBkZSBHaXQgeSBHaXRIdWI%3D';

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