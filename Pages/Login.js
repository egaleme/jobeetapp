var Context = require("Modules/Context")
var Observable = require("FuseJS/Observable")
var API_URL = require("Modules/Api")

var username = Observable()
var password = Observable()
var err= Observable()

function login() {
	Context.login(username.value, password.value).
  then(function(response) {
    username.value = ''
    password.value = ''
    err.value = ''
    Context.user.value = response.username
    Context.isLoggedIn.value = true
    router.goto("home")
  })
  /*
	then(function(response) {
        if (response.ok) {
          return response.json()
        } else {
          username.value="";
          password.value="";
          throw new Error("Username/Password is not correct");
        }
      }).
      then(function(data) {
        
        fetch(`${API_URL}/users/${data.uid}`, {
          method: 'get'
        }).
        then(function(response) {
          return response.json()
        }).
        then(function(data) {
          username.value=""
          password.value=""
          err.value= ""
		  Context.user.value = data.username
		  Context.isLoggedIn.value = true
		  router.goto('home')
        });
      }).
      catch(function(error) {
        err.value = error.message
      });
*/
}

function goBack() {
  Context.getJobsBack()
	router.goto("home")
}

module.exports = {
	login,
	username,
	password,
	goBack
}