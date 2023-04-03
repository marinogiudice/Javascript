/**
 * The function turns the background-color and the border of the squares to white.
 * More than an animation this function is used to let us specify
 * the amount of time for which the two squares stays white at the beginning.
 * Takes the duration in milliseconds as parameter.
 * returns nothing.
 * Uses the JQuery animate method.
 */

 function stayWhite(duration) {
	$("#square1, #square2").animate({ borderColor: "black", backgroundColor: "white" },duration);
}

/**
 * The function performs the change color animation.
 * takes the duration in milliseconds of the animation
 * returns nothing.
 * Uses the JQuery animate method to modify the css properties.
 */

function changeColor(duration) {
    $("#square1, #square2").animate({ borderColor: "red", backgroundColor: "red" },duration);
}

/**
 *The Function defines the animation used to make the squares join at the center of the screen.
 *Takes the duration in milliseconds of the animation as parameter
 *Returns nothing. 
 *Uses the JQuery animate method to modify the css properties.
 */

function moveBoth(duration) {
    $("#square1").animate({left: $("#square1").parent().width() / 2 - $("#square1").width() / 2},duration);
    $("#square2").animate({right: $("#square2").parent().width() / 2 - $("#square1").width() / 2},duration);
}

/**
 * 
 * The Function defines the animation used to make one of the squares rotate of 45 degrees.
 * Takes the rotation degree, the element to rotate(id) and the duration as parameter. 
 * Return nothing.
 */

function rotate1(degrees,elem,duration) {
    $(elem).animate({deg:degrees},{duration: duration, step: function(now) {$(this).css("transform", "rotate("+now+"deg)")}});
}

/**
 *The Function defines the animation used to make both the squares rotate.
 *It's a helper function used in the functions rotateClockWise and
 *rotateAntiClockWise. 
 *Takes the duration in milliseconds of the animation, the direction of the rotation 
 *as string(+ for clock, - for anti-clock), the speed of rotation as parameter.
 *The speed of rotation is the value in milliseconds used for the setInterval function (higher is slower).
 *Uses the JQuery css method to modify the css properties of the squares,
 *in combination with the setInterval javascript function to periodically modify those properties.
 *Returns Nothing.
 *
 */

function rotateBoth(duration,direction,speed) {
  //square1 rotation angle at the beginning
  let square1=45;
  //square2 rotation angle at the beginning 
  let square2=0;
  let count=0;
  let repeat = setInterval(function () {
    //set the rotate properties for suqre1 and square2
      $("#square1")
        .css("-webkit-transform", "rotate("+direction + square1 + "deg)")
        .css("-moz-transform", "rotate("+direction + square1 + "deg)")
        .css("-ms-transform", "rotate("+direction + square1 + "deg)");
      $("#square2")
        .css("-webkit-transform", "rotate("+direction + square2 + "deg)")
        .css("-moz-transform", "rotate("+direction + square2 + "deg)")
        .css("-ms-transform", "rotate("+direction + square2 + "deg)");
      //increment the angles
      square1 += 10;
      square2 += 10;
      count += speed;
      if (count >= duration) {
        clearInterval(repeat);
      }
  },speed);
}

/**
 * The function uses the helper function rotateBoth to make rotate
 * the squares clockWise.
 * Takes the duration of the animation as parameter.
 * returns nothing.
 */

function rotateClockWise(duration) {
  rotateBoth(duration,"+",25);
}

/**
 * The function uses the helper function rotateBoth to make rotate
 * the squares anti-clockWise.
 * Takes the duration of the animation as parameter.
 * returns nothing.
 */

function rotateAntiClockWise(duration) {
  rotateBoth(duration,"-",50);
}

/**
 * The function is used to make the squares fade-out at the end of the animation.
 * Takes the amount of time for which the squares should fade as parameter.
 * return nothing.
 * Uses the JQuery method fadeout as helper function. 
 */

function fadeOutBoth(fade) {
    $("#square1, #square2").fadeOut(fade);
}

/**
 * The function is used to start the animation.
 * Takes as parameters the duration in milliseconds of:
 *  pause in between the single animations
 *  change of color animation
 *  move both the squares animation
 *  rotate a single square animation
 *  roate both the squares clockwise
 *  rotate both the square anti-clockwise
 *  fadeout
 * 
 * Uses the function setTimeout to manage the transitions between the single animations
 * Uses local variables to calculate the times to manage the transitions.
 */

function run(white,pause,color,move,rotateOne,rotateBothClock,rotateBothAntiClock,fade) {
  let clockWiseStart=white+color+move+rotateOne+pause;
  let antiClockWiseStart=clockWiseStart+rotateBothClock+pause;
  let fadeStart=antiClockWiseStart+rotateBothAntiClock+pause;
  stayWhite(white);
  changeColor(color);
  moveBoth(move);
  rotate1(45,"#square1",rotateOne);
  let time=setTimeout(() => {
    rotateClockWise(rotateBothClock);
  },clockWiseStart);
  time=setTimeout(() => {
    rotateAntiClockWise(rotateBothAntiClock);
  },antiClockWiseStart);
  time=setTimeout(() => {
    fadeOutBoth(fade);
  },fadeStart);
}

$(document).ready(() => {
  run(3000,2000,3000,5000,2000,10000,10000,3000);
});