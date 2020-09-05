'use strict';

const axios = require("axios").default;
const cheerio = require("cheerio");

module.exports = async (cookieJar, config) => {

	axios.defaults.jar = cookieJar;
	axios.defaults.withCredentials = true;
	axios.defaults.crossdomain = true;

	let url = `${config.HOST_API}/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx`

	try {
		let res = await axios.get(url)

		const $ = cheerio.load(res.data)

		const semesters = Array.from($('select[name="drpSemester"] > option')).map(e => ({
			value: $(e).attr('value'),
			name: $(e).text()
		}));

		let re = {
			code: 200,
			message: 'Thành Công',
			data: semesters
		}

		return Promise.resolve(re)
	} catch (err) {
		let re = {
			code: 400,
			message: err
		}

		return Promise.reject(re)
	}
}