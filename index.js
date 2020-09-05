'use strict';

let config = {
	HOST_API: "http://qldt.actvn.edu.vn"
}

const setConfig = (param, value) => {
	config[param] = value || ""
}

const getConfig = (param) => {
	return config[param]
}

const login = (username, password) => {
	return require('./modules/login')(username, password, config)
}

const studentProfile = (cookie) => {
	return require('./modules/studentProfile')(cookie, config)
}

const listSemesters = (cookie) => {
	return require('./modules/listSemesters')(cookie, config)
}

const showTimeTable = (cookie, drpSemester) => {
	return require('./modules/showTimeTable')(cookie, drpSemester, config)
}

module.exports = {
	setConfig,
	getConfig,
	login,
	studentProfile,
	listSemesters,
	showTimeTable
};