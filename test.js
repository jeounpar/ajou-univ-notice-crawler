const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://www.ajou.ac.kr/kr/ajou/notice.do';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const notices = $('.bbs-list > li');

    notices.each((index, element) => {
      const title = $(element).find('.bbs-title').text();
      const date = $(element).find('.bbs-date').text();

      console.log(`제목: ${title}, 날짜: ${date}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
