// variables from stroke disease dataset CSV

/*
var pMaleGivenDisease = 0
var pFemaleGivenDisease = 0
var pMaleGivenNoDisease = 0
var pFemaleGivenNoDisease = 0

/*
var pMaleHypertension
var pMaleNoHypertension
var pFemaleHypertension
var pFemaleNoHypertension
*/

//Stroke.js
var pMale = 0.41;
var pFemale = 0.59;

var pStroke = 0.05;
var pNoStroke = 0.95;

var pMaleStroke = 0.43; // male with stroke / evetyone with stroke
var pMaleNoStroke = 0.41;
var pFemaleStroke = 0.57;
var pFemaleNoStroke = 0.59;
var pGenderPrefer = 0.5;

var pHypertensionGivenStroke = 0.27; //66 / 249 = hypertension given stroke / everyone with stroke
var pHypertensionGivenNoStroke = 0.09;
var pNoHypertensionGivenStroke = 0.73;
var pNoHypertensionGivenNoStroke = 0.91;
var pHypertensionPrefer = 0.5;

var pMarried = 0.66;
var pNotMarried = 0.34;

var pMarriedGivenStroke = 0.88;
var pMarriedGivenNoStroke = 0.64;
var pNotMarriedGivenStroke = 0.12;
var pNotMarriedGivenNoStroke = 0.36;
var pMarriedPrefer = 0.5;

var pRuralGivenStroke = 0.46;
var pRuralGivenNoStroke = 0.49;
var pUrbanGivenStroke = 0.54;
var pUrbanGivenNoStroke = 0.51;
var pResidencePrefer = 0.5;

var pAbove55GivenStroke = 0.84; // this is 4 probabilites but 1 attribute
var pAbove55GivenNoStoke = 0.31;
var pBelow55GivenStroke = 0.16;
var pBelow55GivenNoStroke = 0.69; // there are 5 attributesin total for this predictor

function calculateStrokeProbability(strokeAge, gender, hypertension, married, residence) {
    var probStroke = 1;
    var probNoStroke = 1;

    if (strokeAge >= 55) {
        probStroke *= pAbove55GivenStroke;
        probNoStroke *= pAbove55GivenNoStoke;
    } else if (strokeAge < 55){
        probStroke *= pBelow55GivenStroke;
        probNoStroke *= pBelow55GivenNoStroke;
    } 

    if (gender == 'Male') {
        probStroke *= pMaleStroke;
        probNoStroke *= pMaleNoStroke;
    } else if (gender == 'Female') {
        probStroke *= pFemaleStroke;
        probNoStroke *= pFemaleNoStroke;
    } else if (gender == 'Prefer') {
        probStroke *= pGenderPrefer;
        probNoStroke *= pGenderPrefer;
    }

    if (hypertension == 'Yes') {
        probStroke *= pHypertensionGivenStroke;
        probNoStroke *= pHypertensionGivenNoStroke;
    } else if (hypertension == 'No') {
        probStroke *= pNoHypertensionGivenStroke;
        probNoStroke *= pNoHypertensionGivenNoStroke;
    } else if (hypertension == 'Prefer') {
        probStroke *= pHypertensionPrefer;
        probNoStroke *= pHypertensionPrefer;
    }

    if (married == 'Yes') {
        probStroke *= pMarriedGivenStroke;
        probNoStroke *= pMarriedGivenNoStroke;
    } else if (married == 'No') {
        probStroke *= pNotMarriedGivenStroke;
        probNoStroke *= pNotMarriedGivenNoStroke;
    } else if (married == 'Prefer') {
        probStroke *= pMarriedPrefer;
        probNoStroke *= pMarriedPrefer;
    }
    
    if (residence == 'Rural') {
        probStroke *= pRuralGivenStroke;
        probNoStroke *= pRuralGivenNoStroke;
    } else if (residence == 'Urban') {
        probStroke *= pUrbanGivenStroke;
        probNoStroke *= pUrbanGivenNoStroke;
    } else if (residence == 'Prefer') {
        probStroke *= pResidencePrefer;
        probNoStroke *= pResidencePrefer;
    }
    
    var finalProbabilityOfStroke = probStroke / (probStroke + probNoStroke);
    return finalProbabilityOfStroke;
    }

    document.getElementById('strokePrediction-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var strokeAge = document.querySelector('input[name="strokeAge"]').value;
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var hypertension = document.querySelector('input[name="hypertension"]:checked').value;
        var married = document.querySelector('input[name="married"]:checked').value;
        var residence = document.querySelector('input[name="residence"]:checked').value;

        if (strokeAge && gender && hypertension && married && residence) {
            var probabilityOfStroke = calculateStrokeProbability(strokeAge, gender, hypertension, married, residence);
            document.getElementById('strokeresult').innerText = "Probability of having a stroke: " + (probabilityOfStroke * 100).toFixed(2) + "%";
        } else {
            document.getElementById('strokeresult').innerText = "Parameter missing.";
        }
    });