var items = [
{
	id: "1",
	company: "MTN",
	type: "Full-Time",
	location: "Lagos, Nigeria",
	category: "Telecoms",
	position: "BTS Engineer",
	description: "Servicing Base Stations..",
	poster: "egaleme",
	deadLine: "Sun Dec 25 2016"
},
{
	id: "2",
	company: "Glo",
	type: "Full-Time",
	location: "Benin city, Nigeria",
	category: "Telecoms",
	position: "Network Engineer",
	description: "Servicing Base Stations..",
	poster: "egaleme",
	deadLine: "Mon Dec 19 2016"
},
{
	id: "3",
	company: "UBA",
	type: "Full-Time",
	location: "Warri, Nigeria",
	category: "Banking/Finance",
	position: "Operations Manager",
	description: "Managing our Warri branch",
	poster: "egaleme",
	deadLine: "Wed Jan 04 2017"
},
{
	id: "4",
	company: "IITA",
	type: "Part-Time",
	location: "Ibadan, Nigeria",
	category: "Others",
	position: "Agric Officer II",
	description: "Help to maintain cassava farm",
	poster: "egaleme",
	deadLine: "Wed Feb 1 2017"
},
{
	id: "5",
	company: "Vixa Pharma",
	type: "Full-Time",
	location: "Lagos, Nigeria",
	category: "Medicals",
	position: "Medical Rep",
	description: "Sales of pharmaciticual products",
	poster: "egaleme",
	deadLine: "Tue Jan 17 2017"
},
{
	id: "6",
	company: "Swift Networkw Ltd",
	type: "Full-Time",
	location: "Lagos, Nigeria",
	category: "IT",
	position: "WLAN Engineer",
	description: "Support of WLAN infracstructure",
	poster: "egaleme",
	deadLine: "Tue Jan 24 2017"
}
]

var users = [
{
	id: "1",
	username: "egaleme",
	password: "2016"
},
{
	id: "2",
	username: "kele2016",
	password: "2016"
}]

function getJobs() {
	return new Promise(function(resolve, reject) {
		resolve(items)
	})
}

function login(username, password) {
	var data
	users.forEach(function(user) {
		if (user.username === username && user.password === password) {
			data = user
		}
	})
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve(data)
		}, 0)
	})
}

module.exports = {
	login,
	getJobs
}
