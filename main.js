const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express')
const app = express()


const originUrl = 'https://www.ajou.ac.kr/kr/ajou/notice.do';

const getHtml = async offset => {
  offset = (offset - 1) * 10;
  const html = await axios.get(
    `https://www.ajou.ac.kr/kr/ajou/notice.do?mode=list&&articleLimit=10&article.offset=${offset}`,
  );
  const $ = cheerio.load(html.data);
  const result = []
  for (let i = 0; i < 20; i++) {
    const title = $(`tr:nth-child(${i}) > td.b-td-left > div > a`)
      .text()
      .replace(/^\s+|\s+$/gm, '');
    const date = $(`tr:nth-child(${i}) > ` + 'td:nth-child(6)')
      .text()
      .replace(/^\s+|\s+$/gm, '');
    let url = $(`tr:nth-child(${i}) > td.b-td-left > div > a`).attr('href')
    url = originUrl + url;
    if (title !== '' && title.indexOf('공지') < 0) {
      result.push({title, date, url});
    }
  }
  return result;
};
app.get('/:page', async function (req, res) {
	res.send(await getHtml(parseInt(req.params.page)));
}); 

app.listen(3000);

