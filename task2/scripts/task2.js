/**
 * The Function is used to get The currencies data.
 *  returns a map containing the currenies and the exchange rates.
 * 
 */

function getData() {
    //defines a Map to store the exchange rates against the US Dollar for a set of currencies
	let currencies =new Map([['UK Pounds',0.72], ['Euros', 0.83], ['Yen',108.95], ['Yuan',6.50 ], ['Swiss Francs',0.92 ], ['Canadian Dollars', 1.25]]);
    return currencies;
}

/**
 * The function returns The message to display in the html page.
 * The function takes as parameters currency that is the selected value selected from the user in the html dropbox
 * and the currencies input data.
 * A Message containing the information about the exchange rate for the selected currency is
 * returned.
 * 
 */

function getExchangeRate(data,currency) { 
    //check if the selected currency is present in the map.
	if(data.has(currency)) {
        return "One US Dollar buys you "+data.get(currency)+" "+ currency;
    }
    else {
        return "Currency not in the database"
    }
}

window.onload = () => {
  //get the dropbox from the html page.
	let currencies = document.getElementById("currencies");
  //set a listener on the dropbox for the event change. Defines also the event handler function.
	currencies.addEventListener("change", 
	() => {
		//gets the paragraph with id exchangerate
		    let currency = currencies.options[currencies.selectedIndex].value;
		    let result = document.getElementById("exchangerate");
			//inject the result in the innerhtml of the paragraph.
			result.innerHTML=getExchangeRate(getData(),currency);			
	}, false);
}

