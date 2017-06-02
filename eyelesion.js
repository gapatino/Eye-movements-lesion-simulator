/*
Javascript file for eyelesion.html, that creates a model of eye movement
and allows to simulate the deficits encountered in the physical exam for
multiple lesion sites.
Author: Gustavo A. Patino
Date started: April 2017
Date finished:
Dependencies: None
*/

// Setup initial values of the different variables
// All anatomical structures set to 1, those with a lesion will later be set to 0

var light=1;


function Light() {
  // Turns light on or off and adjusts pupil size depending on lesion site
  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // toggle light value
  if (light==1) {
    document.getElementById("eyes").style.background='grey';
    light = 0;
  } else {
    document.getElementById("eyes").style.background='white';
    light = 1;
  }
  // make changes in pupil size
  if (light==0) {
    reye.r.baseVal.value = 85;
    if (!(lesionlocus=='lsympathetic' || lesionlocus=='ldilatorpup')) {
      leye.r.baseVal.value = 85;
    }
  } else {
    reye.r.baseVal.value = 50;
    if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii' ||
    lesionlocus=='lconstrictorpup') && !(lesionlocus=='lsympathetic' ||
    lesionlocus=='ldilatorpup')) {
      leye.r.baseVal.value = 50;
    }
  }
}

function Lift() {
  // Removes the ptotic eyelid if present
  document.getElementById("eyelid").style.visibility = "hidden";
}

function SubmitLesion() {
  // Changes eyelid visibility (ptosis) and pupil size depending on lesion site
  // Then calls the Center() function to display eye position in neutral gaze

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Make changes on behavior depending on lesion site
  // Is there ptosis?
  if (lesionlocus=='ltarsal' || lesionlocus=='llevpalp' ||
  lesionlocus=='lcniii' || lesionlocus=='lsympathetic') {
    document.getElementById("eyelid").style.visibility = "visible";
  } else {
    document.getElementById("eyelid").style.visibility = "hidden";
  }
  // Are there changes in pupil size?
  if (lesionlocus=='lconstrictorpup' || lesionlocus=='lcniii' ||
  lesionlocus=='lcniiinuc') {
    leye.r.baseVal.value = 85;
  } else if (lesionlocus=='ldilatorpup' || lesionlocus=='lsympathetic') {
    leye.r.baseVal.value = 25;
  } else {
    if (light==1) {
      leye.r.baseVal.value = 50;
    } else {
      leye.r.baseVal.value = 85;
    }
  }
  // Call the Center function to set pupil position at neutral position
  Center();
}

function Center() {
  // Positions eyes on neutral gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Make sure the nystagmus animation for the right eye is disabled
  document.getElementById("irisanimation").endElement();
  document.getElementById("pupilanimation").endElement();

  // Set x coordinate of left pupil
  if (lesionlocus=='lhemisphere' || lesionlocus=='lmedrect' ||
  lesionlocus=='lcniiinuc' || lesionlocus=='lcniii') {
    // lesions that would shift the pupil left
    document.getElementById("liris").cx.baseVal.value = 870;
    leye.cx.baseVal.value = 870;
  } else if (lesionlocus=='rcnivnuc' || lesionlocus=='lcniv' ||
  lesionlocus=='lsupoblique') {
    // lesions that would shift the pupil right
    document.getElementById("liris").cx.baseVal.value = 670;
    leye.cx.baseVal.value = 670;
  } else {
    // Otherwise there are no lesions affecting this
    document.getElementById("liris").cx.baseVal.value = 750;
    leye.cx.baseVal.value = 750;
  }

  // Set x coordinate of right pupil
  // lesions that would partially shift the pupil left
  if (lesionlocus=='rcnvinuc' || lesionlocus=='rcnvi' ||
  lesionlocus=='rlatrect') {
    document.getElementById("riris").cx.baseVal.value = 290;
    reye.cx.baseVal.value = 290;
  } else if (lesionlocus=='lhemisphere') {
    // This one shifts the pupil completely
    document.getElementById("riris").cx.baseVal.value = 370;
    reye.cx.baseVal.value = 370;
  } else {
    // We don't have lesions that would shift the pupil right
    document.getElementById("riris").cx.baseVal.value = 250;
    reye.cx.baseVal.value = 250;
  }


  // Set y coordinate of right pupil
  // lesions that would shift the pupil down
  if (lesionlocus=='lcniiinuc' || lesionlocus=='rsuprect') {
    document.getElementById("riris").cy.baseVal.value = 200;
    reye.cy.baseVal.value = 200;
  } else {
    // We don't have lesions that would shift the pupil up
    document.getElementById("riris").cy.baseVal.value = 150;
    reye.cy.baseVal.value = 150;
  }


  // Set y coordinate of left pupil
  if (lesionlocus=='lcniiinuc' || lesionlocus=='lcniii' ||
  lesionlocus=='lsuprect' || lesionlocus=='linfoblique') {
    // lesions that would shift the pupil down
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  } else if (lesionlocus=='rcnivnuc' || lesionlocus=='lcniv' ||
  lesionlocus=='lsupoblique' || lesionlocus=='linfrect') {
    // lesions that would shift the pupil up
    document.getElementById("liris").cy.baseVal.value = 130;
    leye.cy.baseVal.value = 130;
  } else {
    // No lesions that shift pupil vertically
    document.getElementById("liris").cy.baseVal.value = 150;
    leye.cy.baseVal.value = 150;
  }

}

function Up() {
  // Positions eyes on upward gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set y coordinate of right pupil
  // check lesions that would impede pupil going up
  if (lesionlocus=='lcniiinuc' || lesionlocus=='rsuprect') {
    document.getElementById("riris").cy.baseVal.value = 130;
    reye.cy.baseVal.value = 130;
  } else {
    // if not then normal upward excursion
    // as long as it is not L frontal lobe lesion
    document.getElementById("riris").cy.baseVal.value = 100;
    reye.cy.baseVal.value = 100;
  }

  // Set y coordinate of left pupil
  // lesions that would partially impede pupil going up
  if (lesionlocus=='lsuprect' || lesionlocus=='linfoblique') {
    document.getElementById("liris").cy.baseVal.value = 130;
    leye.cy.baseVal.value = 130;
  } else if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii')) {
    // One of these lesions wouldn't allow upward excursion
    // if it is not one of these lesions then normal excursion
    document.getElementById("liris").cy.baseVal.value = 100;
    leye.cy.baseVal.value = 100;
  }
  // Otherwise leave the pupils where they are

}

function Down() {
  // Positions eyes on downward gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set y coordinate of right pupil
  // There are no lesions that would impide that
  document.getElementById("riris").cy.baseVal.value = 200;
  reye.cy.baseVal.value = 200;

  // Set y coordinate of left pupil
  // lesions that would partially impede pupil going down
  if (lesionlocus=='rcnivnuc' || lesionlocus=='lcniv' ||
  lesionlocus=='lsupoblique' || lesionlocus=='linfrect') {
    // paresis of left superior oblique allow limited downward movement
    document.getElementById("liris").cy.baseVal.value = 170;
    leye.cy.baseVal.value = 170;
  } else {
    // as long as it is not L frontal lobe lesion
    // if none of other lesions present then normal excursion
    // lesion of left CN III or its nucleus is already hypotropic
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  }

}

function Right() {
  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set x coordinate of left pupil
  // check for lesions that would impede rightward movement,
  // otherwise normal excursion
  if (!(lesionlocus=='lhemisphere' || lesionlocus=='rcnvinuc' ||
  lesionlocus=='lmlf' || lesionlocus=='lmedrect' || lesionlocus=='lcniiinuc' ||
  lesionlocus=='lcniii')) {
    document.getElementById("liris").cx.baseVal.value = 630;
    leye.cx.baseVal.value = 630;
  }
  // if none of those lesions present then leave eyes where they are

  // Set x coordinate of right pupil
  // check for lesions that would impede rightward movement,
  // otherwise normal excursion
  if (!(lesionlocus=='lhemisphere' || lesionlocus=='rcnvinuc' ||
  lesionlocus=='rcnvi' || lesionlocus=='rlatrect')) {
    document.getElementById("riris").cx.baseVal.value = 130;
    reye.cx.baseVal.value = 130;
  }
  // if none of those lesions present then leave eyes where they are

  // if lesion is in the L MLF enable the nystagmus animation for the R eye
  // Make sure the nystagmus animation for the right eye is disabled
  if (lesionlocus=='lmlf') {
    // document.getElementById("irisanimation").setAttribute("xlink:href", "riris");
    // document.getElementById("pupilanimation").setAttribute("xlink:href", "rpupil");
    document.getElementById("irisanimation").beginElement();
    document.getElementById("pupilanimation").beginElement();
  }

}

function UpRight(){
  // Positions eyes on up-right gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set coordinates for right pupil
  // Lesion in the R superior rectus muscle or L CN III nucleus
  // causes the right eye to abduct but doesn't elevate
  if (lesionlocus=='rsuprect' || lesionlocus=='lcniiinuc') {
    // x coordinate
    document.getElementById("riris").cx.baseVal.value = 130;
    reye.cx.baseVal.value = 130;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 130;
    reye.cy.baseVal.value = 130;
  } else if (lesionlocus=='rlatrect' || lesionlocus=='rcnvi' ||
  lesionlocus=='rcnvinuc') {
    // Lesion in the R lateral rectus causes limited abduction
    // but normal elevation
    document.getElementById("riris").cx.baseVal.value = 170;
    reye.cx.baseVal.value = 170;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 100;
    reye.cy.baseVal.value = 100;
  } else if (lesionlocus=='lhemisphere') {
    // L frontal lobe lesion impedes horizontal but not vertical eye movement
    document.getElementById("riris").cy.baseVal.value = 100;
    reye.cy.baseVal.value = 100;
  } else {
    // Otherwise normal movement
    // x coordinate
    document.getElementById("riris").cx.baseVal.value = 130;
    reye.cx.baseVal.value = 130;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 100;
    reye.cy.baseVal.value = 100;
  }

  // Set coordinates for left pupil
  if (lesionlocus=='linfoblique') {
    // if lesion is in L inferior oblique there is limited adduction
    // and superior version
    // x coordinate
    document.getElementById("liris").cx.baseVal.value = 670;
    leye.cx.baseVal.value = 670;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 130;
    leye.cy.baseVal.value = 130;
  } else if (lesionlocus=='lhemisphere') {
    // This lesion causes horizontal impairment but not vertical
    document.getElementById("liris").cy.baseVal.value = 100;
    leye.cy.baseVal.value = 100;
  } else if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii')) {
    // Otherwise, unless the lesion is in the CN III or its nucleus
    // (in which case no movement takes place) excursion is normal
    document.getElementById("liris").cx.baseVal.value = 630;
    leye.cx.baseVal.value = 630;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 100;
    leye.cy.baseVal.value = 100;
  }

}

function DownRight(){
  // Positions eyes on down-right gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set coordinates for right pupil
  // Only lesion that impedes the movement of the right eye is
  // R Lateral rectus palsy
  if (lesionlocus=='rlatrect' || lesionlocus=='rcnvi' ||
  lesionlocus=='rcnvinuc') {
    // Causes limited abduction but normal depression
    document.getElementById("riris").cx.baseVal.value = 170;
    reye.cx.baseVal.value = 170;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 200;
    reye.cy.baseVal.value = 200;
  } else if (lesionlocus=='lhemisphere') {
    // This limits movement horizontally but not vertically
    document.getElementById("riris").cy.baseVal.value = 200;
    reye.cy.baseVal.value = 200;
  } else {
    // as long as it is not L frontal lobe lesion
    // Otherwise normal movement
    // x coordinate
    document.getElementById("riris").cx.baseVal.value = 130;
    reye.cx.baseVal.value = 130;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 200;
    reye.cy.baseVal.value = 200;
  }

  // Set coordinates for left pupil
  if (lesionlocus=='lsupoblique' || lesionlocus=='rcnivnuc' ||
  lesionlocus=='lcniv') {
    // if lesion is in L superior oblique, CN Iv, or its nucleus there is
    // limited adduction and inferior version
    // x coordinate
    document.getElementById("liris").cx.baseVal.value = 670;
    leye.cx.baseVal.value = 670;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 170;
    leye.cy.baseVal.value = 170;
  } else if (lesionlocus=='lhemisphere') {
    // This lesion limits horizontal but not vertical movement
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  } else if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii')) {
    // Otherwise, unless the lesion is in the CN III or its nucleus or
    // (in which case no movement takes place) excursion is normal
    document.getElementById("liris").cx.baseVal.value = 630;
    leye.cx.baseVal.value = 630;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  }

}

function Left(){
  // Positions eyes on leftward gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set x coordinate of left pupil
  // We don't have lesions that impede leftward movement of left eye
  // left lateral rectus can't be damaged and lesion of CN III or its nucleus
  // already causes the eye to be abducted
  document.getElementById("liris").cx.baseVal.value = 870;
  leye.cx.baseVal.value = 870;

  // Set x coordinate for right pupil
  // Again, no lesions that would impede leftward movement of the right eye
  document.getElementById("riris").cx.baseVal.value = 370;
  reye.cx.baseVal.value = 370;

}

function UpLeft(){
  // Positions eyes on up-left gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set coordinates for right pupil
  // No lesions impede up-left excursion of right eye
  if (lesionlocus=='lhemisphere') {
    // except this one which only limits horizontally but not vertically
    document.getElementById("riris").cy.baseVal.value = 100;
    reye.cy.baseVal.value = 100;
  } else {
    // as long as it is not L frontal lobe lesion
    // x coordinate
    document.getElementById("riris").cx.baseVal.value = 370;
    reye.cx.baseVal.value = 370;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 100;
    reye.cy.baseVal.value = 100;
  }

  // Set coordinates for left pupil
  if (lesionlocus=='lsuprect') {
    // if lesion is in L superior rectus the eye abducts but doesn't elevate
    // x coordinate
    document.getElementById("liris").cx.baseVal.value = 870;
    leye.cx.baseVal.value = 870;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 150;
    leye.cy.baseVal.value = 150;
  } else if (lesionlocus=='lhemisphere') {
    // if lesion of the L frontal lobe there is horizontal
    // but not vertical movement
    document.getElementById("liris").cy.baseVal.value = 100;
    leye.cy.baseVal.value = 100;
  } else if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii')) {
    // Otherwise, unless the lesion is in the CN III or its nucleus (in
    // which case no movement takes place) excursion is normal
    document.getElementById("liris").cx.baseVal.value = 870;
    leye.cx.baseVal.value = 870;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 100;
    leye.cy.baseVal.value = 100;
  }
}

function DownLeft(){
  // Positions eyes on down-left gaze depending on lesion site

  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set coordinates for right pupil
  // No lesions impede down-left excursion of right eye
  if (lesionlocus=='lhemisphere') {
    // as long as it is not L frontal lobe lesion
    // in which case there is horizontal but not vertical movement
    document.getElementById("riris").cy.baseVal.value = 200;
    reye.cy.baseVal.value = 200;
  } else {
    // x coordinate
    document.getElementById("riris").cx.baseVal.value = 370;
    reye.cx.baseVal.value = 370;
    // y coordinate
    document.getElementById("riris").cy.baseVal.value = 200;
    reye.cy.baseVal.value = 200;
  }


  // Set coordinates for left pupil
  if (lesionlocus=='linfrect') {
    // if lesion is in L inferior rectus both adduction and depression
    // are limited
    document.getElementById("liris").cx.baseVal.value = 790;
    leye.cx.baseVal.value = 790;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 170;
    leye.cy.baseVal.value = 170;
  } else if (lesionlocus=='lhemisphere') {
    // lesion in L frontal lobe causes horizontal but not vertical limitation
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  } else if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii')) {
    // Otherwise, unless the lesion is in the CN III or its nucleus (in
    // which case no movement takes place) excursion is normal
    document.getElementById("liris").cx.baseVal.value = 870;
    leye.cx.baseVal.value = 870;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  }
}

function TipNose() {
  // This is a mix of down-left for right eye and down-right for left eye
  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set coordinates for right pupil
  // No lesions impede down-left excursion of right eye
  // x coordinate
  document.getElementById("riris").cx.baseVal.value = 370;
  reye.cx.baseVal.value = 370;
  // y coordinate
  document.getElementById("riris").cy.baseVal.value = 200;
  reye.cy.baseVal.value = 200;

  // Set coordinates for left pupil
  if (lesionlocus=='lsupoblique' || lesionlocus=='rcnivnuc' ||
  lesionlocus=='lcniv') {
    // if lesion is in L superior oblique, CN Iv, or its nucleus there is
    // limited adduction and inferior version
    // x coordinate
    document.getElementById("liris").cx.baseVal.value = 670;
    leye.cx.baseVal.value = 670;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 170;
    leye.cy.baseVal.value = 170;
  } else if (lesionlocus=='lhemisphere') {
    // In this case there is horizontal but not vertical limitation
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  } else if (!(lesionlocus=='lcniiinuc' || lesionlocus=='lcniii')) {
    // Otherwise, unless the lesion is in the CN III or its nucleus (in
    // which case no movement takes place) or L frontal lobe
    // excursion is normal
    document.getElementById("liris").cx.baseVal.value = 630;
    leye.cx.baseVal.value = 630;
    // y coordinate
    document.getElementById("liris").cy.baseVal.value = 200;
    leye.cy.baseVal.value = 200;
  }

}

function Medial() {
  // This is a mix of right for left eye (without lesions at or before MLF) and
  // left for right eye
  // Variables that hold the info about the location of left and right pupils
  var reye = document.getElementById("rpupil");
  var leye = document.getElementById("lpupil");
  // Variable that holds where the lesion is
  var lesionlocus = document.getElementById("lesionlocus").value;

  // Start with eyes centered
  Center();

  // Set x coordinate of left pupil
  // check for lesions that would impede rightward movement,
  // otherwise normal excursion
  if (!(lesionlocus=='lmedrect' || lesionlocus=='lcniiinuc' ||
  lesionlocus=='lcniii' || lesionlocus=='lhemisphere')) {
    document.getElementById("liris").cx.baseVal.value = 630;
    leye.cx.baseVal.value = 630;
  }
  // if none of those lesions present then leave eyes where they are

  // Set x coordinate for right pupil
  // Again, no lesions that would impede leftward movement of the right eye
  if (!(lesionlocus=='lhemisphere')) {
    // as long as it is not L frontal lobe lesion
    document.getElementById("riris").cx.baseVal.value = 370;
    reye.cx.baseVal.value = 370;
  }

}
