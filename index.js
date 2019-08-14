const scrap = require('./scraping');
const fs = require('fs');

const getFiles = (dest, body) => {
	return fs.writeFileSync(dest, body);
};

const main = async () => {
	const url =
		'https://www.template-tool.de/user/index.php?&width=1920&height=1080';

	const baseurl = 'https://www.template-tool.de/user/';
	const dest = './downloaded/';
	const ext = '.png';
	const thumb = '.thumb.png';

	const layouts = {
		selector: '#select-template-dir button',
		splitPos: '<button onclick="selectTemplate(\''
	};

	const cliparts = {
		selector: '#select-clipart-dir button',
		splitPos: '<button onclick="addClipart(\''
	};

	let dataLayout = await scrap(url, layouts);
	let dataCliparts = await scrap(url, cliparts);

  let sortedLayout = dataLayout.sort();
	let fullLayout = sortedLayout.map(el => {
		return baseurl + el + ext + '\n';
	});

	let thumbLayout = sortedLayout.map(el => {
		return baseurl + el + thumb + '\n';
	});

	let sortedCliparts = dataCliparts.sort();
	let fullCliparts = sortedCliparts.map(el => {
		return baseurl + el + '\n';
	});

	getFiles(dest + 'fullLayout.txt', fullLayout);
	getFiles(dest + 'thumbLayout.txt', thumbLayout);
	getFiles(dest + 'cliparts.txt', fullCliparts);

};

main();
