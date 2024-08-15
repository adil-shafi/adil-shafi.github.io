//diabetes data variables
/*
var pDiabetes = 0;
var pNoDiabetes = 0;

var pMale = 0;
var pFemale = 0;

*/

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

var pNullDiab


//how and when is bmi a factor
var pBmi 


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

        document.getElementById('diabresult').scrollIntoView({ behavior: 'smooth'});; // scroll behavior autoscroll to results

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
