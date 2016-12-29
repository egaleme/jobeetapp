var API_URL = require("./Api")
var Observable = require("FuseJS/Observable")
var Backend = require("./Backend")

var jobs = Observable()
var user = Observable()
var isLoggedIn = Observable(false)
var options = ["Banking/Finance", "IT", "Medicals", "Others", "Telecoms"]
var selected = Observable()
var store = Observable()

function expireTracker(updatedAt, deadLine) {
    var color
	var deadLinedate = checkExpiringDateFormat(deadLine)
	var updatedAtdate = checkExpiringDateFormat(updatedAt)

	if (deadLinedate != null || updatedAtdate !=null) {
	if (updatedAtdate > deadLinedate) {

    color = "#fc423e"

	} else {
    var diff = deadLinedate.getTime() - updatedAtdate.getTime()
    diff = Math.floor(diff/(1000*60*60*24))
    if (diff <= 2) {
      color = "#fcb370"

    }else {
      color = "#b2ccf8"
    }
  }


	} else {
    color = "#b2ccf8"

	}
  return color
}

function checkExpiringDateFormat(datestring) {
	var result = datestring.match(/\d/)
	if (result !=null) {
		return new Date(datestring)
	}
	return null

}

function renderDateString(datestring) {
		var result = datestring.match(/\d/)
		if (result != null) {
			return new Date(datestring).toDateString()
		}
		return datestring
}

function getJobs() {
	Backend.getJobs()
	.then(function(data) {
	   	  data.forEach(function(job) {
	   	  	job.expired = Observable()
	   	  	job.updatedAt = new Date(Date.now()).toDateString()
	   	  	job.createdAt = new Date(Date.now()).toDateString()
	   	  	job.firstChar = job.position.charAt(0).toUpperCase()
          job.expired.value = expireTracker(job.updatedAt, job.deadLine)
          store.add(job)
       	  jobs.add(job)

	   	  })

   	}).
   	catch(function(error) {
   		console.log("Couldn't get jobs: " + error)
   	})

	/*
	fetch(`${API_URL}/jobs`, {
			method: "get"
		}).
		then(function(response) {
			return response.json()
		}).
		then(function(responseObject) {
			//store = responseObject
	   	    responseObject.forEach(function(job) {
       		job.expired = Observable()
       		job.firstChar = job.position.charAt(0).toUpperCase()
            job.expired.value = expireTracker(job.updatedAt, job.deadLine)
            store.add(job)
       	    jobs.add(job)

        })
		}).
		catch(function(error) {
			console.log(error)
		})
		*/
}

function getJobsBack() {
	var storeArray = store.toArray()
	jobs.replaceAll(storeArray)
}

function getJobsByCategory(category) {
	var data = []
	store.forEach(function(job) {
		if (user.value) {
			if (job.category === category && job.poster === user.value) {
			data.push(job)
		}
		return
		}
		if (job.category === category) {
			data.push(job)
		}

	})
	jobs.replaceAll(data)
}

function getJobsByPoster(poster) {
	var data = []
	store.forEach(function(job) {

		if (job.poster === poster) {
			data.push(job)
		}

	})
	jobs.replaceAll(data)
}

getJobs()

function postJob(company, type, position, location, category, description, poster, deadLine) {
	var createdAt = new Date(Date.now()).toDateString()
	var updatedAt = new Date(Date.now()).toDateString()
	var deadLine = renderDateString(deadLine)
	var expired = expireTracker(updatedAt, deadLine)
	var firstChar = position.charAt(0).toUpperCase()
	store.add({company: company, firstChar: firstChar, type: type, position: position, location: location,category: category, description: description, poster: poster, createdAt: createdAt, updatedAt: updatedAt, deadLine: deadLine, expired: expired})
/*
	fetch(`${API_URL}/jobs`, {
		method: "post",
		mode: "cors",
		credentials: "same-origin",
		headers: new Headers({"Content-Type": "application/json"}),
		body: JSON.stringify({company: company, type: type, position: position, location: location, category: category, description: description, poster: poster, createdAt: createdAt, updatedAt: updatedAt, deadLine: deadLine
		}).
		then(function(response) {
			if (response.ok) {
				return response.json()
			} else {
				throw new Error("Error posting job. Make sure the required fields are filled")
			}
		}).
		catch(function(error) {
			console.log("could not post job")
		})
	})
*/
}

function updateJob(id, company, type, position, location, category, description, poster, deadLine, updatedAt) {
	for (var i = 0; i < store.length; i++) {
        var item = store.getAt(i)
        if (item.id == id) {
            item.company = company
            item.type = type
            item.position= position
            item.location = location
            item.category = category
            item.description = description
            item.poster = poster
            item.deadLine = renderDateString(deadLine)
            item.updatedAt = renderDateString(updatedAt)
            item.expired = expireTracker(updatedAt, deadLine)
            item.firstChar = position.charAt(0).toUpperCase()
            store.replaceAt(i, item)
            break;
        }
    }
/*
    fetch(`${API_URL}/jobs/${id}`, {
    	method: "put",
    	mode: "cors",
    	credentials: "same-origin",
    	headers: new Headers({"Content-Type": "application/json"}),
    	body: JSON.stringify({company: company, type: type, position: position, location: location, category: category, description: description, deadLine: renderDateString(deadLine), updatedAt: renderDateString(updatedAt)}).
    	then(function(response) {
    		if (response.ok) {
    			return response.json()
    		} else {
    			throw new Error("could not update job. Make sure all fields are filled correctly")
    		}
    	}).
    	catch(function(error) {
    		console.log("could not update job")
    	})

    })
*/
}

function deleteJob(job) {
	store.remove(job)
	/*
	fetch(`${API_URL}/jobs/${item.id}`, {
		method: "delete",
		mode: "cors",
		credentials: "same-origin"
	})
*/
}

function logout() {
	/*
	fetch(`${API_URL}/users/logout`, {
		method: "post",
		mode: "cors",
		credentials: "same-origin"
	})
*/
}

function login(username, password) {
	return Backend.login(username, password)

	/*
	return fetch(`${API_URL}/users/login`, {
		method: "post",
		mode: "cors",
		credentials: "same-origin",
		headers: new Headers({"Content-Type" : "application/json"}),
		body: JSON.stringify({username: username, password: password})
	})
*/
}

function userSignup(username, password, firstname, lastname, email) {
	return fetch(`${API_URL}/users`, {
		method: 'post',
		mode: 'cors',
		credentials: 'same-origin',
		headers: new Headers({"Content-Type": "application/json"}),
		body: JSON.stringify({username: username, password: password, firstname: firstname, lastname: lastname, email: email})
	})
}
selected.onValueChanged(module, function(v) {
	getJobsByCategory(v)
})

user.onValueChanged(module, function(v) {
	getJobsByPoster(v)
})

module.exports = {
	getJobs,
	jobs,
	postJob,
	user,
	updateJob,
	deleteJob,
	logout,
	login,
	selected,
	options,
	userSignup,
	isLoggedIn,
	getJobsBack
}
