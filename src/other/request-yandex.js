const request = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');
const fs = require('fs')

const urls = require('./manufactures.json').rows;

(async () => {

    const toSlug = (Text) => Text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    const sleep  = async (ms) =>  new Promise(resolve => setTimeout(resolve, ms));
    const sendRequest = async(url) =>{
        return request({
            url,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
                'cache-control': 'no-cache',
                'cookie': 'clcss=1.181.2:default%3D80; csw=15; cpr=1; cpw=1920; cph=497; cptrid=590x1576828353099; mda=0; yandexuid=8842541111576828347; yandex_gid=162; i=19urdPFFdaeil360NklpPM/ni9jhX5jYmIgqK/IHxbeDAQKbDerZ3yEnTxFbt0pi12jY3K0Wr8zE11qHmZkGYowsAU0=; font_loaded=YSv1; zm=m-white_bender.webp.css-https%3As3home-static_DablS0NQMH4Rg-eLWAtfr4KR3vI%3Al; bltsr=1; engineer=1; yc=1577087551.zen.cach%3A1576831948; yp=1576914748.yu.1930345971576828347#1579420348.ygu.1#1592596351.szm.1:1920x1080:1920x497; my=YwA=',
                'dnt': '1',
                'pragma': 'no-cache',
                'referer': 'https://yandex.kz/',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
            },
            gzip: true
        })
    };
    const donwloadImage = async (url, file) =>{
        return await request({
            url,
            gzip: true
        })
        .pipe(file);
    };

    for(item of urls){

        let url = `https://yandex.kz/images/search?text=${item.description} logo png&isize=large`;
        let content = await sendRequest(url);

        // let $ = cheerio.load(fs.readFileSync('./index.html'));
        let $ = cheerio.load(content);

        // get urls
        tempUrls= [];
        for(el of $('.serp-item').toArray()){
            temp1 = JSON.parse(el.attribs['data-bem']);
            url1 = _.get(temp1, 'serp-item.preview.0.url', '');
            if(/(\.png$)/.test(url1)){
                tempUrls.push(url1);
            }
        }
 


        // console.log(tempUrls);
        // return;

        for(i in tempUrls.splice(0, 3)){
            imgUrl = tempUrls[i];
            fileName = `./images/${item.id}-${i}-${toSlug(item.description)}.png`;
            file = fs.createWriteStream(fileName);
            await donwloadImage(imgUrl, file);
        }

        await sleep(1000);

    }



})();