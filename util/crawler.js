const axios = require('axios').default;
const cheerio = require('cheerio')

/**
 * 获取网站的html源码
 * @param {*} url 
 */
async function getHtml(url) {
    const html = await axios.get(url);
    return html.data
}


async function getLink() {
    const url = 'https://www.qifeiye.com/%e5%93%8d%e5%ba%94%e5%bc%8f%e7%bd%91%e7%ab%99%e6%a8%a1%e6%9d%bf-%e5%93%8d%e5%ba%94%e5%bc%8f%e6%a8%a1%e6%9d%bf-h5%e6%a8%a1%e6%9d%bf/'
    const html = await getHtml(url);
    console.log(html);
    const $ = cheerio.load(html);
    const elements = $('.qfyanimate .bitImageAhover')
    let hrefs = elements.map((i, ele) => {  //获取详情页地址
        return ele.attribs['href'];
    }).get()
    return hrefs;
}

getLink().then(e => { console.log(e); })
