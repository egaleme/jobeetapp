var Observable = require("FuseJS/Observable")
var Context = require("Modules/Context")
var username = Observable()
var password = Observable()
var firstname = Observable()
var lastname = Observable()
var email = Observable()
var err = Observable()

function goBack() {
	Context.getJobsBack()
	router.goto("home")
}

function createUser() {
	Context.userSignup(username.value, password.value, firstname.value, lastname.value, email.value).
	then(function(response) {
		if (response.ok) {
			return response.json()
		} else {
			throw new Error("Please make sure all fields are filled !")
		}
	}).
	then(function(data) {
		username.value = ""
		password.value = ""
		firstname.value = ""
		lastname.value = ""
		email.value = ""
		err.value = ""
		Context.user.value = data.username
		Context.isLoggedIn = true
		router.push("home")

	}).
	catch(function(error) {
		err.value = error.message
	})
}

module.exports = {
	username: username,
	password: password,
	firstname: firstname,
	lastname: lastname,
	email: email,
	err: err,
	goBack: goBack,
	createUser: createUser

}