/**
 * The Function adds the Sumaries of all the articles in the page in the headlines .
 */

function addSumaries() {

    // get all the articles in the page
    let articles = document.querySelectorAll('article');
    let headingText="";
    let paragraph="";
 
    articles.forEach((art, index) => {
       
        // get heading of articles
        var headings = art.getElementsByTagName("h4");
        // check if there is a h4 tag in the article
        if(headings) {
            headingText=headings[0].innerHTML;
        }
        else {
            headingText="";
        }
        // get the first sentence
        let paragraphs = art.getElementsByTagName("p");
        // check if there is a p tag in the article
        if(paragraphs) {
            paragraph=paragraphs[0].innerHTML;
        }
        else {
            paragraph="";
        }
        //if the heading and the first paragraph are not empty
        if(headingText !=="" && paragraph!=="") {
            // create a new element
            newElement = document.createElement("p");
            // set font style to italic
            newElement.style.fontStyle = 'italic';
            let result=headingText + "..." +paragraph;
            //if the paragraph miss a point.
            if(paragraph !== "") {
                if(paragraph.charAt(paragraph.length-1) !== ".") {
                    result=result + ".";
                }
            }
            // add the summary
            newElement.appendChild(document.createTextNode(result));
            // append to headlines
            document.getElementById("headlines").appendChild(newElement);
        }
 
    });
 }
 
 window.onload= function() {
    addSumaries();
 }