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

var pAbove55GivenStroke = 0.84;
var pAbove55GivenNoStoke = 0.31;
var pBelow55GivenStroke = 0.16;
var pBelow55GivenNoStroke = 0.69;

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









var pMaleGivenDiab = 0.48; // male with diab / everyone with diab
var pFemaleGivenDiab = 0.52;
var pMaleGivenNoDiab = 0.41;
var pFemaleGivenNoDiab = 0.59;

//var age

//Hypertension Binary
var pHypertension
var pNoHypertension
var pHypertensionGivenDiab = 0.25; // hypertension with diab /  everyone with diab
var pHypertensionGivenNoDiab = 0.06;
var pNoHypertensionGivenDiab = 0.75;
var pNoHypertensionGivenNoDiab = 0.94;

//Smoking, Never, Other or No Info
var pSmokeGivenDiab = 0.44;
var pSmokeGivenNoDiab = 0.28;
var pNoSmokeGivenDiab = 0.39;
var pNoSmokeGivenNoDiab = 0.35;

//var pNullDiab


//how and when is bmi a factor
//var pBmi 


//Blood glucose level
//var pBloodGLAbove... Below...
//var pBGLLowGivenDiab
var pBGLNormalGivenDiab = 0;
var pBGLBorderGivenDiab = 0.54;
var pBGLHighGivenDiab = 0.46;

//var pBGLLowGivenNoDiab
var pBGLNormalGivenNoDiab = 0.31;
var pBGLBorderGivenNoDiab = 0.62;
var pBGLHighGivenNoDiab = 0.08;



function calculateDiabetesProbability (gender, hypertension, smoke, bgl) {
    var probDiab = 1;
    var probNoDiab = 1;

    if (gender == 'Male') {
        probDiab *= pMaleGivenDiab;
        probNoDiab *= pMaleGivenNoDiab;
    } else if (gender == 'Female') {
        probDiab *= pFemaleGivenDiab;
        probNoDiab *= pFemaleGivenNoDiab;
    }

    if (hypertension == 'Yes') {
        probDiab *= pHypertensionGivenDiab;
        probNoDiab *= pHypertensionGivenNoDiab;
    } else if (hypertension == 'No') {
        probDiab *= pNoHypertensionGivenDiab;
        probNoDiab *= pNoHypertensionGivenNoDiab;
    }

    if (smoke == 'Yes') {
        probDiab *= pSmokeGivenDiab;
        probNoDiab *= pSmokeGivenNoDiab;
    } else if (smoke == 'No') {
        probDiab *= pNoSmokeGivenDiab;
        probNoDiab *= pNoSmokeGivenNoDiab;
    }

    if (bgl == 'Normal') {
        probDiab *= pBGLNormalGivenDiab;
        probNoDiab *= pBGLNormalGivenNoDiab;
    } else if (bgl == 'Borderline') {
        probDiab *= pBGLBorderGivenDiab;
        probNoDiab *= pBGLBorderGivenNoDiab;
    } else if (bgl == 'High') {
        probDiab *= pBGLHighGivenDiab;
        probNoDiab *= pBGLHighGivenNoDiab;
    }

    var finalProbabilityOfDiab = probDiab / (probDiab + probNoDiab);
    return finalProbabilityOfDiab;
}

document.getElementById('diabetesPrediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var gender = document.querySelector('input[name="gender"]:checked').value;
    var hypertension = document.querySelector('input[name="hypertension"]:checked').value;
    var smoke = document.querySelector('input[name="smoke"]:checked').value;
    var bgl = document.querySelector('input[name="bgl"]:checked').value;

    if (gender && hypertension && smoke && bgl) {
        var probabilityOfDiab = calculateDiabetesProbability(gender, hypertension, smoke, bgl);
        document.getElementById('diabresult').innerText = "Probability of Diabetes: " + (probabilityOfDiab * 100).toFixed(2) + "%";
    } else {
        document.getElementById('diabresult').innerText = "Parameter missing.";
    
    }
});

function showInfo() {
    alert(
        "Blood Glucose Levels:\n\n" +
        "1. Normal: Blood glucose levels are within the normal range which is from ~70 to 108 mg/dl.\n" +
        "2. Borderline: Blood glucose levels are higher than normal but not yet at diabetic levels. ~120 - 180 mg/dl.\n" +
        "3. High: Blood glucose levels are significantly elevated and may indicate diabetes or prediabetes. ~180 - 315+ mg/dl."
    );
}

