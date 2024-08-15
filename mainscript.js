/* These are all the variables used to calculate the predictions for heart disease.
Probabilities calculated using Excel filtering techniques. */
var pDisease = 0.05; // taken from stroke csv
var pNoDisease = 0.96; // taken from stroke csv

var pMale = 0.41; //taken from stroke csv
var pFemale = 0.59; // taken from stroke csv

var pMaleGivenDisease = 0.59; // taken from stroke heart disease csv
var pFemaleGivenDisease = 0.41; // female with disease / everyone disease,,, taken from stroke heart disease csv
var pMaleGivenNoDisease = 0.40; //taken from stroke heart disease csv
var pFemaleGivenNoDisease = 0.60; //taken from stroke heart disease csv

var pAbove50 = 0.66;
var pBelow50 = 0.34;
var pAbove50GivenDisease = 0.75;
var pBelow50GivenDisease = 0.25;
var pAbove50GivenNoDisease = 0.53;
var pBelow50GivenNoDisease = 0.47;

var pClevelandGivenDisease = 0.27;
var pHungaryGivenDisease = 0.21;
var pSwitzerlandGivenDisease = 0.23;
var pVALongBeachGivenDisease = 0.29;

var pClevelandGivenNoDisease = 0.40;
var pHungaryGivenNoDisease = 0.45;
var pSwitzerlandGivenNoDisease = 0.02;
var pVALongBeachGivenNoDisease = 0.12;

var pSmoke = 0.09 ;
var pNoSmoke = 0.91;
var pDrink = 0.05;
var pNoDrink = 0.95;

var pSmokeGivenDisease = 0.08;
var pSmokeGivenNoDisease = 0.09;
var pNoSmokeGivenDisease = 0.92;
var pNoSmokeGivenNoDisease = 0.91;

var pDrinkGivenDisease = 0.05;
var pDrinkGivenNoDisease = 0.06;
var pNoDrinkGivenDisease = 0.95;
var pNoDrinkGivenNoDisease = 0.94;

// function to calculate prediction which is output on probability.html
function calculateProbability(age, gender, place, smokes, drinks){
    var probDisease = 1;
    var probNoDisease = 1;

    if (gender == 'Male'){
        probDisease *= pMaleGivenDisease;
        probNoDisease *= pMaleGivenNoDisease;
    } else if (gender == 'Female') {
        probDisease *= pFemaleGivenDisease;
        probNoDisease *= pFemaleGivenNoDisease;
    }

    if (age >= 51) {
        probDisease *= pAbove50GivenDisease;
        probNoDisease *= pAbove50GivenNoDisease;
    } else {
        probDisease *= pBelow50GivenDisease;
        probNoDisease *= pBelow50GivenNoDisease;
    }

    if (place == 'Cleveland') {
        probDisease *= pClevelandGivenDisease;
        probNoDisease *= pClevelandGivenNoDisease;
    } else if (place == 'Hungary') {
        probDisease *= pHungaryGivenDisease;
        probNoDisease *= pHungaryGivenNoDisease;
    } else if (place == 'Switzerland') {
        probDisease *= pSwitzerlandGivenDisease;
        probNoDisease *= pSwitzerlandGivenNoDisease;
    } else if (place == 'VA Long Beach') {
        probDisease *= pVALongBeachGivenDisease;
        probNoDisease *= pVALongBeachGivenNoDisease;
    }

    if (smokes == 'yes') {
        probDisease *= pSmokeGivenDisease;
        probNoDisease *= pSmokeGivenNoDisease;
    } else {
        probDisease *= pNoSmokeGivenDisease;
        probNoDisease *= pNoSmokeGivenNoDisease;
    }

    if (drinks == 'yes') {
        probDisease *= pDrinkGivenDisease;
        probNoDisease *= pDrinkGivenNoDisease;
    } else {
        probDisease *= pNoDrinkGivenDisease;
        probNoDisease *= pNoDrinkGivenNoDisease;
    }

    var finalProbabilityOfDisease = probDisease / (probDisease + probNoDisease); // Bayes Theorem formula
    return finalProbabilityOfDisease;
}

