const axios = require("axios");
const cheerio = require("cheerio");
var HTML = require('html-parse-stringify')
const log = console.log;

const request = require('request');

const url = "https://m.search.naver.com/p/csearch/content/qapirender.nhn?pkid=360&where=nexearch&key=exhibitionsByPage&q=%EC%84%9C%EC%9A%B8%EC%A0%84%EC%8B%9C%ED%9A%8C&start=49&display=6&_=1578644135685";
var html1

request(url, (error, response, body) => {
  if (error) throw error;

  var data_list = JSON.parse(body)
  html = data_list.listView.htmls

  // this html:
var html1 = html[0];
 console.log(html1)
// becomes this AST:
var ast = HTML.parse(html1);

  console.log(ast)
});

// const getHtml = async () => {
// 	try {
// 	  return await axios.get("https://www.yna.co.kr/sports/all");
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   };
  
//   getHtml()
// 	.then(html => {
// 	  let ulList = [];
// 	  const $ = cheerio.load(html1.data);
// 	  const $bodyList = $("div.headline-list ul").children("li.section02");
  
// 	  $bodyList.each(function(i, elem) {
// 		ulList[i] = {
// 			title: $(this).find('strong.news-tl a').text(),
// 			url: $(this).find('strong.news-tl a').attr('href'),
// 			image_url: $(this).find('p.poto a img').attr('src'),
// 			image_alt: $(this).find('p.poto a img').attr('alt'),
// 			summary: $(this).find('p.lead').text().slice(0, -11),
// 			date: $(this).find('span.p-time').text()
// 		};
// 	  });
  
// 	  const data = ulList.filter(n => n.title);
// 	  return data;
// 	})
// 	.then(res => log(res));

//html = $('https://m.search.naver.com/p/csearch/content/qapirender.nhn?callback=jQuery1124012443144441781473_1578644135675&pkid=360&where=nexearch&key=exhibitionsByPage&q=%EC%84%9C%EC%9A%B8%EC%A0%84%EC%8B%9C%ED%9A%8C&start=49&display=6&_=1578644135685')
// const getHtml = async () => {
//   try {
//     return await axios.get("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EC%84%9C%EC%9A%B8+%EC%A0%84%EC%8B%9C%ED%9A%8C");
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml()
//   .then(html => {
//     let ulList = [];
//     const $ = cheerio.load(html.data);
//     const $bodyList = $("div._list_base ul").children("li.list_item");

//     $bodyList.each(function(i, elem) {
//       ulList[i] = {
//           title: $(this).find('div.item_box dd a').text(),
//         //   url: $(this).find('strong.news-tl a').attr('href'),
//         //   image_url: $(this).find('p.poto a img').attr('src'),
//         //   image_alt: $(this).find('p.poto a img').attr('alt'),
//         //   summary: $(this).find('p.lead').text().slice(0, -11),
//         //   date: $(this).find('span.p-time').text()
//       };
//     });

//     const data = ulList.filter(n => n.title);
//     return data;
//   })
//   .then(res => log(res));