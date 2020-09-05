'use strict';

const axios = require("axios").default;
const cheerio = require("cheerio");

module.exports = async (cookieJar, config) => {

	axios.defaults.jar = cookieJar;
	axios.defaults.withCredentials = true;
	axios.defaults.crossdomain = true;

	let url = `${config.HOST_API}/CMCSoft.IU.Web.Info/StudentProfileNew/HoSoSinhVien.aspx`

	try {
		let res = await axios.get(url)

		const $ = cheerio.load(res.data)
		const displayName = ($('input[name="txtHoDem"]').val() || '') + " " + ($('input[name="txtTen"]').val() || '');
		const studentCode = $('input[name="txtMaSV"]').val() || '';
		const gender = $('select[name="drpGioiTinh"] > option[selected]').text();
		const birthday = $('input[name="txtNgaySinh"]').val() || '';
		const information = {
			displayName,
			studentCode,
			gender,
			birthday,
		}

		let re = {
			code: 200,
			message: 'Thành Công',
			data: information
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