var Context = require("Modules/Context")

function goSignUp() {
	router.goto("signup")
}

function goLogin() {
	router.goto("login")
}

function logout() {
	Context.getJobsBack()
	Context.logout()
	Context.user.clear()
	Context.isLoggedIn.value = false
}

function searchjobs() {
	router.goto("search")
}


module.exports = {
	jobs: Context.jobs,
	goSignUp: goSignUp,
	goLogin: goLogin,
	isLoggedIn: Context.isLoggedIn,
	loggedInUser: Context.user,
	logout: logout,
	searchjobs
}