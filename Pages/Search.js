var Context = require("Modules/Context")
var Observable = require("FuseJS/Observable")

var category = Observable()
var searchedItems = Observable()
function search() {
	searchedItems.clear()
	Context.jobs.forEach(function(job) {
		if(job.category === category.value) {
			searchedItems.add(job)
			console.log(category.value)
		}
		
	})
}
function goBack() {
	router.goto("home")
}

module.exports = {
	search: search,
	jobs: searchedItems,
	goBack: goBack,
	category
}