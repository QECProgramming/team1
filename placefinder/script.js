const onlyOpenNow = true;
var places =[];

function tester(){
	var adress = document.getElementById("adressFeild").value;
	var dist = document.getElementById("distanceFeild").value;
	getPizza(adress,dist);
}

function getPizza(address, dist) {
	console.clear();
	//----------- adress to cordinates 
	//update satus indicator
	var latlong = "";
	document.getElementById("request done").innerHTML = "Converting Adress...";
	
	//comment this out to use array parameters
	//var adress = document.getElementById("adressFeild").value;
	
	var arequest = new XMLHttpRequest();
	//build the url 
	var arequestURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='.concat(address.replace(" ","+")).concat('&key=AIzaSyCH1gwmx060_FuOKOkbgKyAtEjGtEt0YDc');
	//open the request 
	arequest.open('GET', arequestURL , true);
	//send it 
	arequest.send();
	//when it comes back 
	arequest.onload = function () {
		if (arequest.status >= 200 && arequest.status < 400) {
			//update satus indicator
			document.getElementById("request done").innerHTML = "Converted to lat long!";
			var data = JSON.parse(this.response);
			latlong = data.results[0].geometry.location.lat.toString().concat(',').concat(data.results[0].geometry.location.lng.toString());
			//latlong.concat(data.results[0].geometry.location.lng.toString());
			console.log(latlong);
			//------------------ get pizzas 
			//update satus indicator
			document.getElementById("request done").innerHTML = "Finding Pizza places...";
			// get distance 
			//coment this out ot use parameters 
			//var dist = document.getElementById("distanceFeild").value;
			// open request object
			var prequest = new XMLHttpRequest();
			//build the url 
			//var prequestURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.227978,-76.493010&radius='.concat(dist).concat('&type=food&keyword=pizza&key=AIzaSyCH1gwmx060_FuOKOkbgKyAtEjGtEt0YDc');
			var prequestURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.concat(latlong).concat('&radius=').concat(dist).concat('&type=food&keyword=pizza&key=AIzaSyCH1gwmx060_FuOKOkbgKyAtEjGtEt0YDc');
			//open the request 
			prequest.open('GET', prequestURL , true);
			//send it 
			prequest.send();
			//weh nit comes back 
			prequest.onload = function () {
				if (prequest.status >= 200 && prequest.status < 400) {
					//update satus indicator
					document.getElementById("request done").innerHTML = "Found Pizza Places!";
					//turn json into java objects
					var data = JSON.parse(this.response);
					//go through each
					data.results.forEach(loc => {
						
						//print to console 
						console.log(loc.name);
						if(onlyOpenNow){
							if(loc.opening_hours != null){
								if(loc.opening_hours.open_now == true){
									console.log('    is open');
									places.push(loc.name);
								}else{
									console.log('    is closed');
								}
							}else{
								console.log('    no opening hours availible');
							}
						}
						//console.log(loc.
						
					});
					console.log(places.toString);
				}else{
					//update satus indicator
					document.getElementById("request done").innerHTML = "Something whent wrong!";
				}
				
			
			}
				}else{
					//update satus indicator
					document.getElementById("request done").innerHTML = "Something whent wrong!";
				}
			}
	
}
	




//https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
//https://stackoverflow.com/questions/20035101/why-does-my-javascript-get-a-no-access-control-allow-origin-header-is-present
//https://stackoverflow.com/questions/10842841/accessing-json-elements-from-javascript
//https://codeburst.io/javascript-the-difference-between-foreach-and-for-in-992db038e4c2
//https://www.w3schools.com/jsref/met_document_createelement.asp
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_createelement2
//https://www.w3schools.com/jsref/jsref_function.asp
//https://stackoverflow.com/questions/11563638/how-do-i-get-the-value-of-text-input-field-using-javascript
//https://www.w3schools.com/html/html_forms.asp
