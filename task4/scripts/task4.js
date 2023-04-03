/**
 * The function calculates the age in years taking in account the leap years.
 * Takes as parameters the date of birth and the date of death
 * Calculates the elapsed time in millisecond from birth to death.
 * Calculates then the age in days.
 * Calculates then the age in years.
 * Uses the function floor of Math to round the result.
 */

function calcAge(dob,dod) {
    let birth = new Date(dob);
    let death = new Date(dod);
    if(birth > death) {
        return "Error birth date greater than death date"
    }
    let ageMilliSecs=death.getTime()-birth.getTime();
    ageDays=ageMilliSecs/(1000*3600*24);
    //divides by 365.24 because leap year
    ageYears=Math.floor(ageDays/365.24);
    return ageYears;
}

/**
 * The Function calculates the average of the elements of an array
 * Takes as parameter the array.
 * Returns the average of the elements.
 * Uses the function round of Math to round the result.
 */

function calcAverage(ages) {
    let sumAges=0;
	$.each(ages,(index) => {
		sumAges+=ages[index];
	});
    //check if the sum of the elements is less than 0
    //check if the array is empty
    if(sumAges < 0 || ages.length === 0) {
        return "Impossible calculate average data not valid";
        //check if the sum of the ages is 0
    } else if(sumAges === 0) {
        return 0;
    }
    else {
        return Math.round(sumAges/ages.length);
    }
}


$(document).ready(() => { 
	
	//defines a collection of the input json data
	let residents = [{
        "firstname": "Harold",
        "lastname": "Mullins",
        "birthdate": "07/04/1864",
        "deathdate": "09/11/1891"
    },
    {   "firstname": "Sarah",
        "lastname": "Houseman",
        "birthdate": "09/04/1864",
        "deathdate": "10/04/1866"
    },
    {   "firstname": "Alice",
        "lastname": "Davis",
        "birthdate": "11/12/1864",
        "deathdate": "04/10/1866"
    },
    {   "firstname": "Maud",
        "lastname": "Adams",
        "birthdate": "08/04/1864",
        "deathdate": "09/11/1908"
    },
    {   "firstname": "Seamus",
        "lastname": "O'Brien",
        "birthdate": "10/10/1864",
        "deathdate": "09/07/1900"
    }];

    let age=0;
    let ages = [];
	let dataTable = $("<table><thead><tr><th>First Name</th><th>Last Name</th>"
	+ "<th>Born</th><th>Died</th><th>Age At Death</th></tr></thead></table>");
	$("#censusdata").append(dataTable.attr("id", "cenususdatatable")); // Create table skeleton and insert it into DOM.
    //creates table rows 
	$.each(residents, (index) => {
			dataTable.append( 
			"<tr><td>" + residents[index].firstname + 
			"</td><td>" + residents[index].lastname + 
			"</td><td>" + residents[index].birthdate +
			"</td><td>" + residents[index].deathdate +
            //calculate the age and display it on the screen
            "</td><td>" + (age=calcAge(residents[index].birthdate,residents[index].deathdate)) +
			"</td></tr>");
            //if the age is a valid value insert it into the array
            if(!(isNaN(age))) {
                ages.push(age);
            }
	});
    //calculates the average
	let avgAges=calcAverage(ages);
    $("#averageageatdeath").append("<p>Average age at Death: " + avgAges + "</p>");
});
