const rp = require('request-promise');
const $ = require('cheerio');

const scraping = async (url, opt = {}) => {
	console.log('Loading Data : ' + opt.selector)		
	try {
			const html = await rp(url);
			const rows = $(opt.selector, html).length;

			let data = [];
			for (let i = 0; i < rows; i++) {
				data.push(
					$(opt.selector, html)[i].attribs['data-data'].split(
						opt.splitPos
					)
				);
			}
			console.log('DONE: ' + opt.selector)		
			return data
				.reduce((arr, el) => {
					return arr.concat(el);
				}, [])
				.filter(value => value !== '')
				.map(el => {
					return el.substr(0, el.lastIndexOf("'"));
				});
		} catch (err) {
		return err
	}
};

module.exports = scraping;
