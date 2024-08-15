//Diabetes Predictor
document.getElementById('multiplePrediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var diabAge = document.querySelector('input[name="strokeAge"]').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var hypertension = document.querySelector('input[name="hypertension"]:checked').value;
    var disease = document.querySelector('input[name="disease"]:checked').value;
    var smokingStatus = document.querySelector('input[name="smoker"]:checked').value;
    var bgl = document.querySelector('input[name="bgl"]:checked').value;

    if (diabAge && gender && hypertension && disease && smokingStatus && bgl) {
        fetch('diabetes_prediction_dataset3.csv') // method to read csv file
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    var data = results.data;
                    var probabilityOfDiabetes = calculateDiabetesProbability(data, gender, hypertension, disease, smokingStatus, bgl)
                    var probabilityPercentage = (probabilityOfDiabetes * 100).toFixed(2) + "%";
                    
                    var resultElement = document.getElementById('diabresult');
                    resultElement.innerText = probabilityPercentage;
                    
                    // Set the color based on the probability (low, average high risk)
                    if (probabilityOfDiabetes < 0.3) {
                        resultElement.style.color = "#00FF00";
                    } else if (probabilityOfDiabetes < 0.6) {
                        resultElement.style.color = "orange";
                    } else {
                        resultElement.style.color = "red";
                    }
                    document.getElementById('finalresult').scrollIntoView({ behavior: 'smooth'});; // scroll behavior autoscroll to results

                }
            });
        });
    } else {
        document.getElementById('diabresult').innerText = "Parameter missing.";
    }
});

function calculateDiabetesProbability(data, gender, hypertension, disease, smokingStatus, bgl){

var total = data.length;

var diabCount = 0;
var noDiabCount = 0;

// Counts for gender, hypertension, smoking status, disease, Blood Glucose Level
var diabWithGender = 0;
var diabWithHypertension = 0;
var diabWithSmokingStatus = 0;
var diabWithDisease = 0;
var diabWithBgl = 0;
var noDiabWithGender = 0;
var noDiabWithHypertension = 0;
var noDiabWithSmokingStatus = 0;
var noDiabWithDisease = 0;
var noDiabWithBgl = 0;

data.forEach(function(row) {
    if (row.diabetes == 1) {
        diabCount++;
        if (row.gender == gender && gender != "Prefer") {
            diabWithGender++;
        }
        if (row.hypertension == hypertension && hypertension != "Prefer"){
            diabWithHypertension++;
        }
        if (row.smoking_history == smokingStatus && smokingStatus != "Prefer") {
            diabWithSmokingStatus++;
        }
        if (row.heart_disease == disease && disease != "Prefer") {
            diabWithDisease++;
        }
        if (row.blood_glucose_level <= 100 && bgl == "Normal") { //normal
            diabWithBgl++;
        }
        if (row.blood_glucose_level > 100 && row.blood_glucose_level <= 125 && bgl == "Borderline"){
            diabWithBgl++;
        }
        if (row.blood_glucose_level > 125 && bgl == "High") {
            diabWithBgl++;
        }
    } else {
        noDiabCount++;
        if (row.gender == gender && gender != "Prefer") {
            noDiabWithGender++;
        }
        if (row.hypertension == hypertension && hypertension != "Prefer") {
            noDiabWithHypertension++;
        }
        if (row.smoking_history == smokingStatus && smokingStatus != "Prefer") {
            noDiabWithSmokingStatus++;
        }
        if (row.heart_disease == disease && disease != "Prefer") {
            noDiabWithDisease++;
        }
        if (row.blood_glucose_level <= 140 && bgl == "Normal") { //normal
            noDiabWithBgl++;
        }
        if (row.blood_glucose_level > 140 && row.blood_glucose_level <= 199 && bgl == "Borderline"){
            noDiabWithBgl++;
        }
        if (row.blood_glucose_level > 199 && bgl == "High") {
            noDiabWithBgl++;
        }
    }
});

//Probability of having diabetes
var pDiab = diabCount / total;
var pNoDiab = noDiabCount / total;

//Conditional Probabilities
var pGenderGivenDiab = diabWithGender / diabCount;
if (diabWithGender == 0) {
    pGenderGivenDiab = 0.5;
}
var pHypertensionGivenDiab = diabWithHypertension / diabCount;
if (diabWithHypertension == 0) {
    pHypertensionGivenDiab = 0.5;
}
var pSmokingStatusGivenDiab = diabWithSmokingStatus / diabCount;
if (diabWithSmokingStatus == 0) {
    pSmokingStatusGivenDiab = 0.5;
}
var pDiseaseGivenDiab = diabWithDisease / diabCount;
if (diabWithDisease == 0) {
    pDiseaseGivenDiab = 0.5;
}
var pBglGivenDiab = diabWithBgl / diabCount;
if (diabWithBgl == 0) {
    pBglGivenDiab = 0.5;
}
var pGenderGivenNoDiab = noDiabWithGender / noDiabCount;
if (noDiabWithGender == 0) {
    pGenderGivenNoDiab = 0.5;
}
var pHypertensionGivenNoDiab = noDiabWithHypertension / noDiabCount;
if (noDiabWithHypertension == 0) {
    pHypertensionGivenNoDiab = 0.5;
}
var pSmokingStatusGivenNoDiab = noDiabWithSmokingStatus / noDiabCount;
if (noDiabWithSmokingStatus == 0) {
    pSmokingStatusGivenNoDiab = 0.5;
}
var pDiseaseGivenNoDiab = noDiabWithDisease / noDiabCount;
if (noDiabWithDisease == 0) {
    pDiseaseGivenNoDiab = 0.5;
}
var pBglGivenNoDiab = noDiabWithBgl / noDiabCount;
if (noDiabWithBgl == 0) {
    pBglGivenNoDiab = 0.5;
}

//applying naive bayes
var pDiabGivenConditions = pGenderGivenDiab * pHypertensionGivenDiab * pSmokingStatusGivenDiab * pDiseaseGivenDiab * pBglGivenDiab * pDiab;
var pNoDiabGivenConditions = pGenderGivenNoDiab * pHypertensionGivenNoDiab * pSmokingStatusGivenNoDiab * pDiseaseGivenNoDiab * pBglGivenNoDiab * pNoDiab;

//final probability calculation
var finalProbabilityOfDiab = pDiabGivenConditions / (pDiabGivenConditions + pNoDiabGivenConditions);

return finalProbabilityOfDiab;

}



//Stroke predictor
document.getElementById('multiplePrediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var strokeAge = document.querySelector('input[name="strokeAge"]').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var hypertension = document.querySelector('input[name="hypertension"]:checked').value;
    var disease = document.querySelector('input[name="disease"]:checked').value;
    var married = document.querySelector('input[name="married"]:checked').value;
    var residence = document.querySelector('input[name="residence"]:checked').value;
    var occupation = document.querySelector('input[name="occupation"]:checked').value;
    var smokingStatus = document.querySelector('input[name="smoker"]:checked').value;
    var bgl = document.querySelector('input[name="bgl"]:checked').value;

    if (strokeAge && gender && hypertension && disease && married && residence && occupation && smokingStatus, bgl) {
        fetch('healthcare-dataset-stroke-data3.csv') // method to read csv file
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    complete: function(results) {
                        var data = results.data;
                        var probabilityOfStroke = calculateStrokeProbability(data, strokeAge, gender, hypertension, disease, smokingStatus, married, residence, occupation, bgl);
                        var probabilityPercentage = (probabilityOfStroke * 100).toFixed(2) + "%";
                    
                        var resultElement = document.getElementById('strokeresult');
                        resultElement.innerText = probabilityPercentage;
                        
                        // Set the color based on the probability (low, average high risk)
                        if (probabilityOfStroke < 0.3) {
                            resultElement.style.color = "#00FF00";
                        } else if (probabilityOfStroke < 0.6) {
                            resultElement.style.color = "orange";
                        } else {
                            resultElement.style.color = "red";
                        }

                        //document.getElementById('strokeresult').scrollIntoView({ behavior: 'smooth'}); // scroll behavior autoscroll to results

                        var altResidence = residence === "Urban" ? "Rural" : "Urban";
                        var probabilityOfStrokeAltResidence = calculateStrokeProbability(data, strokeAge, gender, hypertension, disease, smokingStatus, married, altResidence, occupation, bgl);

                        var probabilityDifferenceResidence = ((probabilityOfStrokeAltResidence - probabilityOfStroke) * 100).toFixed(2);
                        var adviceMessageResidence = "If you lived in a " + altResidence + " area, your probability of having a stroke would be " + (probabilityOfStrokeAltResidence * 100).toFixed(2) + "%, that's a " + probabilityDifferenceResidence + "% change!";

                        document.getElementById('residenceAdvice').innerText = adviceMessageResidence;

                        var altSmokingStatus = smokingStatus === "yes" ? "no" : "yes";
                        var probabilityOfStrokeAltSmokingStatus = calculateStrokeProbability(data, strokeAge, gender, hypertension, disease, altSmokingStatus, married, altResidence, occupation, bgl);

                        var probabilityDifferenceSmokingStatus = ((probabilityOfStrokeAltSmokingStatus - probabilityOfStroke) * 100).toFixed(2);
                        var adviceMessageSmoking = "If you changed your answer to " + altSmokingStatus + " for smoking status, your probability of having a stroke would be " + (probabilityOfStrokeAltSmokingStatus * 100).toFixed(2) + "%, that's a " + probabilityDifferenceSmokingStatus + "% change!";
                        
                        document.getElementById('smokingAdvice').innerText = adviceMessageSmoking;
                    }
                });
            });
    } else {
        document.getElementById('strokeresult').innerText = "Parameter missing.";
    }
});

function calculateStrokeProbability(data, strokeAge, gender, hypertension, disease, smokingStatus, married, residence, occupation, bgl) {
    // Total number of records
    var total = data.length;
    
    // Stroke and no stroke counts
    var strokeCount = 0;
    var noStrokeCount = 0;

    // Counts for age, gender, hypertension, smoking status, residence, occupation, BGL, marriage status. disease
    var strokeWithAge = 0;
    var strokeWithGender = 0;
    var strokeWithHypertension = 0;
    var strokeWithSmokingStatus = 0;
    var strokeWithMarried = 0;
    var strokeWithResidence = 0;
    var strokeWithDisease = 0;
    var strokeWithOccupation = 0;
    var strokeWithBgl = 0;
    var noStrokeWithAge = 0;
    var noStrokeWithGender = 0;
    var noStrokeWithHypertension = 0;
    var noStrokeWithSmokingStatus = 0;
    var noStrokeWithMarried = 0;
    var noStrokeWithResidence = 0;
    var noStrokeWithDisease = 0;
    var noStrokeWithOccupation = 0;
    var noStrokeWithBgl = 0;

    data.forEach(function(row) {
        // Count strokes and non-strokes
        if (row.stroke == 1) {
            strokeCount++;
            if ((strokeAge > 55 && parseInt(row.age) > 55) || (strokeAge <= 55 && parseInt(row.age) <= 55)) { 
                strokeWithAge++;
            }
            if (row.gender == gender && gender != "Prefer") {
                strokeWithGender++;
            }
            if (row.hypertension == hypertension && hypertension != "Prefer") {
                strokeWithHypertension++;
            }
            if (row.smoking_status == smokingStatus && smokingStatus != "Prefer") { // added in the prefer for smoking
                strokeWithSmokingStatus++;
            }
            if (row.ever_married == married && married != "Prefer") {
                strokeWithMarried++;
            }
            if (row.Residence_type == residence && residence != "Prefer") {
                strokeWithResidence++;
            }
            if (row.heart_disease == disease && disease != "Prefer") {
                strokeWithDisease++;
            }
            if (row.work_type == occupation && occupation != "Prefer"){
                strokeWithOccupation++;
            }
            if (row.avg_glucose_level <= 100 && bgl == "Normal") {
                strokeWithBgl++;
            }
            if (row.avg_glucose_level > 100 && row.avg_glucose_level <= 125 && bgl == "Borderline") {
                strokeWithBgl++;
            }
            if (row.avg_glucose_level > 125 && bgl == "High") {
                strokeWithBgl++;
            }
        } else {
            noStrokeCount++;
            if ((strokeAge > 55 && parseInt(row.age) > 55) || (strokeAge <= 55 && parseInt(row.age) <= 55)) {
                noStrokeWithAge++;
            } 
            if (row.gender == gender && gender != "Prefer") {
                noStrokeWithGender++;
            }
            if (row.hypertension == hypertension && hypertension != "Prefer") {
                noStrokeWithHypertension++;
            }
            if (row.smoking_status == smokingStatus && smokingStatus != "Prefer") { // added prefer here too
                noStrokeWithSmokingStatus++;
            }
            if (row.ever_married == married && married != "Prefer") {
                noStrokeWithMarried++;
            }
            if (row.Residence_type == residence && residence != "Prefer") {
                noStrokeWithResidence++;
            }
            if (row.heart_disease == disease && disease != "Prefer") {
                noStrokeWithDisease++;
            }
            if (row.work_type == occupation && occupation != "Prefer") {
                noStrokeWithOccupation++;
            }
            if (row.avg_glucose_level <= 140 && bgl == "Normal") {
                noStrokeWithBgl++;
            }
            if (row.avg_glucose_level > 140 && row.avg_glucose_level <= 199 && bgl == "Borderline") {
                noStrokeWithBgl++;
            }
            if (row.avg_glucose_level > 199 && bgl == "High") {
                noStrokeWithBgl++;
            }
        }
    });
    /* Debugging
    console.log(hypertension);
    console.log(strokeWithHypertension);
    console.log(noStrokeWithHypertension);
    console.log(strokeWithSmokingStatus);
    console.log(noStrokeWithSmokingStatus);
    */


    // Probabilities of having a stroke and not having a stroke
    var pStroke = strokeCount / total;
    var pNoStroke = noStrokeCount / total;

    // Conditional probabilities
    var pAgeGivenStroke = strokeWithAge / strokeCount;
    if (strokeWithAge == 0) {
        pAgeGivenStroke = 0.5;
    }
    var pGenderGivenStroke = strokeWithGender / strokeCount;
    if (strokeWithGender == 0) {
        pGenderGivenStroke = 0.5;
    }
    var pHypertensionGivenStroke = strokeWithHypertension / strokeCount;
    if (strokeWithHypertension == 0) {
        pHypertensionGivenStroke = 0.5;
    }
    var pSmokingStatusGivenStroke = strokeWithSmokingStatus / strokeCount;
    if (strokeWithSmokingStatus == 0) {
        pSmokingStatusGivenStroke = 0.5;
    }
    var pMarriedGivenStroke = strokeWithMarried / strokeCount; //new
    if (strokeWithMarried == 0) {
        pMarriedGivenStroke = 0.5;
    }
    var pResidenceGivenStroke = strokeWithResidence / strokeCount; // new residence update
    if (strokeWithResidence == 0) {
        pResidenceGivenStroke = 0.5;
    }
    var pDiseaseGivenStroke = strokeWithDisease / strokeCount; // new disease update
    if (strokeWithDisease == 0) {
        pDiseaseGivenStroke = 0.5;
    }
    var pOccupationGivenStroke = strokeWithOccupation / strokeCount; // new work type update
    if (strokeWithOccupation == 0) {
        pOccupationGivenStroke = 0.5;
    }
    var pBglGivenStroke = strokeWithBgl / strokeCount;
    if (strokeWithBgl == 0) {
        pBglGivenStroke = 0.5;
    }
    var pAgeGivenNoStroke = noStrokeWithAge / noStrokeCount;
    if (noStrokeWithAge == 0) {
        pAgeGivenNoStroke = 0.5;
    }
    var pGenderGivenNoStroke = noStrokeWithGender / noStrokeCount;
    if (noStrokeWithGender == 0) {
        pGenderGivenNoStroke = 0.5;
    }
    var pHypertensionGivenNoStroke = noStrokeWithHypertension / noStrokeCount;
    if (noStrokeWithHypertension == 0) {
        pHypertensionGivenNoStroke = 0.5;
    }
    var pSmokingStatusGivenNoStroke = noStrokeWithSmokingStatus / noStrokeCount;
    if (noStrokeWithSmokingStatus == 0) {
        pSmokingStatusGivenNoStroke = 0.5;
    }
    var pMarriedGivenNoStroke = noStrokeWithMarried / noStrokeCount; //new
    if (noStrokeWithMarried == 0) {
        pMarriedGivenNoStroke = 0.5;
    }
    var pResidenceGivenNoStroke = noStrokeWithResidence / noStrokeCount; //new residence update
    if (noStrokeWithResidence == 0) {
        pResidenceGivenNoStroke = 0.5;
    }
    var pDiseaseGivenNoStroke = noStrokeWithDisease / noStrokeCount; //new disease update
    if (noStrokeWithDisease == 0) {
        pDiseaseGivenNoStroke = 0.5;
    }
    var pOccupationGivenNoStroke = noStrokeWithOccupation / noStrokeCount; // new work update
    if (noStrokeWithOccupation == 0) {
        pOccupationGivenNoStroke = 0.5;
    }
    var pBglGivenNoStroke = noStrokeWithBgl / noStrokeCount;
    if (noStrokeWithBgl == 0) {
        pBglGivenNoStroke = 0.5;
    }

    // Applying Naive Bayes
    var pStrokeGivenConditions = pAgeGivenStroke * pGenderGivenStroke * pHypertensionGivenStroke * pSmokingStatusGivenStroke * pMarriedGivenStroke * pResidenceGivenStroke * pDiseaseGivenStroke * pOccupationGivenStroke * pBglGivenStroke * pStroke; //updated for marriage and now for residence
    var pNoStrokeGivenConditions = pAgeGivenNoStroke * pGenderGivenNoStroke * pHypertensionGivenNoStroke * pSmokingStatusGivenNoStroke * pMarriedGivenNoStroke * pResidenceGivenNoStroke * pDiseaseGivenNoStroke * pOccupationGivenNoStroke * pBglGivenNoStroke * pNoStroke; //same update
    

    // Final probability calculation
    var finalProbabilityOfStroke = pStrokeGivenConditions / (pStrokeGivenConditions + pNoStrokeGivenConditions);

    return finalProbabilityOfStroke;
}


//Heart Disease Predictor

document.getElementById('multiplePrediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var heartAge = document.querySelector('input[name="strokeAge"]').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var chestPain = document.querySelector('input[name="chestPain"]:checked').value;
    /* Debugging
   console.log("Heart Age: ", heartAge);
   console.log("Gender: ", gender ? gender.value : "Not selected");
   console.log("Chest Pain: ", chestPain ? chestPain.value : "Not selected");
    */

    if(heartAge && gender && chestPain) {
        fetch('heart_disease_data_with_features2.csv') // method to read csv file
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    var data = results.data;
                    var probabilityOfHeartDisease = calculateHeartDiseaseProbability(data, heartAge, gender, chestPain);
                    var probabilityPercentage = (probabilityOfHeartDisease * 100).toFixed(2) + "%";
                    
                    var resultElement = document.getElementById('heartresult');
                    resultElement.innerText = probabilityPercentage;
                    
                    // Set the color based on the probability (low, average high risk)
                    if (probabilityOfHeartDisease < 0.3) {
                        resultElement.style.color = "#00FF00";
                    } else if (probabilityOfHeartDisease < 0.6) {
                        resultElement.style.color = "orange";
                    } else {
                        resultElement.style.color = "red";
                    }

                }
            });
        });
    } else {
        document.getElementById('heartresult').innerText = "Parameter missing.";
    }
});

function calculateHeartDiseaseProbability(data, heartAge, gender, chestPain) {

    var total= data.length;

    var heartCount = 0;
    var noHeartCount = 0;

    var heartWithAge = 0;
    var noHeartWithAge = 0;
    var heartWithGender = 0;
    var noHeartWithGender = 0;
    var heartWithChestPain = 0;
    var noHeartWithChestPain = 0;

    data.forEach(function(row) {

        if (row.num > 0) {
            heartCount++;
            if (row.age == heartAge) {
                heartWithAge++;
            }
            if (row.sex == gender && gender != "Prefer") {
                heartWithGender++;
            }
            if (row.cp == 1 && chestPain == "1") {
                heartWithChestPain++;
            }
            if (row.cp == 2 && chestPain == "2") {
                heartWithChestPain++;
            }
            if (row.cp == 3 && chestPain == "3") {
                heartWithChestPain++;
            }
            if (row.cp == 4 && chestPain == "4") {
                heartWithChestPain++;
            }
        } else {
            noHeartCount++; 
            if (row.age == heartAge) {
                noHeartWithAge++;
            }
            if (row.sex == gender && gender != "Prefer") {
                noHeartWithGender++;
            }
            if (row.cp == chestPain && chestPain != "Prefer") {
                noHeartWithChestPain++;
            }
            if (row.cp == 1 && chestPain == "1") {
                noHeartWithChestPain++;
            }
            if (row.cp == 2 && chestPain == "2") {
                noHeartWithChestPain++;
            }
            if (row.cp == 3 && chestPain == "3") {
                noHeartWithChestPain++;
            }
            if (row.cp == 4 && chestPain == "4") {
                noHeartWithChestPain++;
            }
        }
    });


    var pHeartDisease = heartCount / total;
    var pNoHeartDisease = noHeartCount / total;

    var pAgeGivenHeartDisease = heartWithAge / heartCount;
    if (heartWithAge == 0) {
        pAgeGivenHeartDisease = 0.5;
    }
    var pAgeGivenNoHeartDisease = noHeartWithAge / noHeartCount;
    if (noHeartWithAge == 0) {
        pAgeGivenNoHeartDisease = 0.5;
    }
    var pGenderGivenHeartDisease = heartWithGender / heartCount;
    if (heartWithGender == 0) {
        pGenderGivenHeartDisease = 0.5;
    }
    var pGenderGivenNoHeartDisease = noHeartWithGender / noHeartCount;
    if (noHeartWithGender == 0) {
        pGenderGivenNoHeartDisease = 0.5;
    }
    var pChestPainGivenHeartDisease = heartWithChestPain / heartCount;
    if (heartWithChestPain == 0) {
        pChestPainGivenHeartDisease = 0.5;
    }
    var pChestPainGivenNoHeartDisease = noHeartWithChestPain / noHeartCount;
    if (noHeartWithChestPain == 0) {
        pChestPainGivenNoHeartDisease = 0.5;
    }
    
    //Applying Naive bayes 
    var pHeartDiseaseGivenConditions = pAgeGivenHeartDisease * pGenderGivenHeartDisease * pChestPainGivenHeartDisease * pHeartDisease;
    var pNoHeartDiseaseGivenConditions = pAgeGivenNoHeartDisease * pGenderGivenNoHeartDisease * pChestPainGivenNoHeartDisease * pNoHeartDisease;

    var finalProbabilityOfHeartDisease = pHeartDiseaseGivenConditions / (pHeartDiseaseGivenConditions + pNoHeartDiseaseGivenConditions);

    return finalProbabilityOfHeartDisease;
}

//big O
/*
what parameters you have
how long it takes to run can be calculated
for 1 disease = only thing ffecting is no. of attributes. time complexity = Big O of number of attributes ---- also for hard coded only
same thing for one disease by looking dataset = complexity is larger 
*/

//Kidney Predictor
document.getElementById('multiplePrediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var gender = document.querySelector('input[name="gender"]:checked').value;
    var ethnicity = document.querySelector('input[name="ethnicity"]:checked').value;
    var education = document.querySelector('input[name="education"]:checked').value;
    var smoking = document.querySelector('input[name="smoker"]:checked').value;
    var hypertension = document.querySelector('input[name="famHypertension"]:checked').value;
    var diab = document.querySelector('input[name="famDiab"]:checked').value;
    var kidneyFam = document.querySelector('input[name="famKidney"]:checked').value;
    var exercise = document.querySelector('input[name="exercise"]:checked').value;
    var alc = document.querySelector('input[name="alc"]:checked').value;



    if (gender && ethnicity && education && smoking && hypertension && diab && kidneyFam && exercise && alc) {
        fetch('Chronic_Kidney_Dsease_data2.csv') // method to read csv file
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    var data = results.data;
                    var probabilityOfKidney = calculateKidneyProbability(data, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, alc)
                    var probabilityPercentage = (probabilityOfKidney * 100).toFixed(2) + "%";
                    
                    var resultElement = document.getElementById('kidneyresult');
                    resultElement.innerText = probabilityPercentage;
                    
                    // Set the color based on the probability (low, average high risk)
                    if (probabilityOfKidney < 0.3) {
                        resultElement.style.color = "#00FF00";
                    } else if (probabilityOfKidney < 0.6) {
                        resultElement.style.color = "orange";
                    } else {
                        resultElement.style.color = "red";
                    }

                    calculateAlcAdvice(probabilityOfKidney, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, alc, data);
                    calculateExerciseAdvice(probabilityOfKidney, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, alc, data);
                }
            });
        });
    } else {
        document.getElementById('kidneyresult').innerText = "Parameter missing.";
    }
});

function calculateAlcAdvice(probabilityOfKidney, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, alc, data) {
    var altAlc = alc;
    if (alc === "14") {
        altAlc = "11-14";
    } else if (alc === "11-14") {
        altAlc = "8-11";
    } else if (alc === "8-11") {
        altAlc = "5-8";
    } else if (alc === "5-8") {
        altAlc = "2-5";
    } else if (alc === "2-5") {
        altAlc = "0-2";
    } else if (alc === "0-2") {
        altAlc = "0-2"; 
    }

    var probabilityOfKidneyAltAlc = calculateKidneyProbability(data, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, altAlc);

    var probabilityDifferenceAlc = ((probabilityOfKidney - probabilityOfKidneyAltAlc) * 100).toFixed(2);

    var adviceMessageAlc = "If you reduce your alcohol consumption to " + altAlc + " units per week, your probability of kidney disease would be " + (probabilityOfKidneyAltAlc * 100).toFixed(2) + "%, thats a " + probabilityDifferenceAlc + "% change!";

    console.log(adviceMessageAlc);

    document.getElementById('alcAdvice').innerText = adviceMessageAlc;

}

function calculateExerciseAdvice(probabilityOfKidney, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, alc, data) {
    var altExercise = exercise;
    if (exercise === "0-2") {
        altExercise = "2-4";
    } else if (exercise === "2-4") {
        altExercise = "4-6";
    } else if (exercise === "4-6") {
        altExercise = "6-8";
    } else if (exercise === "6-8") {
        altExercise = "8-10";
    } else {
        altExercise = "8-10";
    }

    var probabilityOfKidneyAltExercise = calculateKidneyProbability(data, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, altExercise, alc);

    var probabiltyDifferenceExercise = ((probabilityOfKidney - probabilityOfKidneyAltExercise) * 100).toFixed(2);

    var adviceMessageExercise = "If you increase your exercise to " + altExercise + " hours per week, your probability of kidney disease would be " + (probabilityOfKidneyAltExercise * 100).toFixed(2) + "%, thats a " + probabiltyDifferenceExercise + "% change!";

    console.log(adviceMessageExercise);

    document.getElementById('exerciseAdvice').innerText = adviceMessageExercise;
}


function calculateKidneyProbability(data, gender, ethnicity, education, smoking, hypertension, diab, kidneyFam, exercise, alc) {

    var total = data.length;

    var kidneyCount = 0;
    var noKidneyCount = 0;

    //Counts for factors
    var kidneyWithGender = 0;
    var noKidneyWithGender = 0;
    var kidneyWithEthnicity = 0;
    var noKidneyWithEthnicity = 0;
    var kidneyWithEducation = 0;
    var noKidneyWithEducation = 0;
    var kidneyWithSmoking = 0;
    var noKidneyWithSmoking = 0;
    var kidneyWithHypertension = 0;
    var noKidneyWithHypertension = 0;
    var kidneyWithDiab = 0;
    var noKidneyWithDiab = 0;
    var kidneyWithFam = 0;
    var noKidneyWithFam = 0;
    var kidneyWithExercise = 0;
    var noKidneyWithExercise = 0;
    var kidneyWithAlc = 0;
    var noKidneyWithAlc = 0;

    data.forEach(function(row) {
        if (row.Diagnosis == 1) {
            kidneyCount++;
            if (row.Gender == gender && gender != "Prefer") {
                kidneyWithGender++;
            }
            if (row.Ethnicity == 0 && ethnicity == "0") {
                kidneyWithEthnicity++;
            }
            if (row.Ethnicity == 1 && ethnicity == "1") {
                kidneyWithEthnicity++;
            }
            if (row.Ethnicity == 2 && ethnicity == "2") {
                kidneyWithEthnicity++;
            }
            if (row.Ethnicity == 3 && ethnicity == "3") {
                kidneyWithEthnicity++;
            }
            if (row.EducationLevel == 0 && education == "0"){
                kidneyWithEducation++;
            }
            if (row.EducationLevel == 1 && education == "1"){
                kidneyWithEducation++;
            }
            if (row.EducationLevel == 2 && education == "2"){
                kidneyWithEducation++;
            }
            if (row.EducationLevel == 3 && education == "3"){
                kidneyWithEducation++;
            }
            if (row.Smoking == smoking && smoking != "Prefer") {
                kidneyWithSmoking++;
            }
            if (row.FamilyHistoryHypertension == hypertension && hypertension != "Prefer") {
                kidneyWithHypertension++;
            }
            if (row.FamilyHistoryDiabetes == diab && diab != "Prefer") {
                kidneyWithDiab++;
            }
            if (row.FamilyHistoryKidneyDisease == kidneyFam && kidneyFam !="Prefer") {
                kidneyWithFam++;
            }
            if (row.PhysicalActivity < 2 && exercise == "0-2") {
                kidneyWithExercise++;
            }
            if (row.PhysicalActivity > 2 && row.PhysicalActivity <= 4 && exercise == "2-4") {
                kidneyWithExercise++;
            }
            if (row.PhysicalActivity > 4 && row.PhysicalActivity <= 6 && exercise == "4-6") {
                kidneyWithExercise++;
            }
            if (row.PhysicalActivity > 6 && row.PhysicalActivity <= 8 && exercise == "6-8") {
                kidneyWithExercise++;
            }
            if (row.PhysicalActivity > 8 && row.PhysicalActivity <= 10 && exercise == "8-10") {
                kidneyWithExercise++;
            }
            if (row.AlcoholConsumption <= 2 && alc == "0-2"){
                kidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 2 && row.AlcoholConsumption <= 5 && alc == "2-5"){
                kidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 5 && row.AlcoholConsumption <= 8 && alc == "5-8"){
                kidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 8 && row.AlcoholConsumption <= 11 && alc == "8-11"){
                kidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 11 && row.AlcoholConsumption <= 14 && alc == "11-14"){
                kidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 14 && alc == "14"){
                kidneyWithAlc++;
            }
        } else {
            noKidneyCount++;
            if(row.Gender == gender && gender !="Prefer") {
                noKidneyWithGender++;
            }
            if (row.Ethnicity == 0 && ethnicity == "0") {
                noKidneyWithEthnicity++;
            }
            if (row.Ethnicity == 1 && ethnicity == "1") {
                noKidneyWithEthnicity++;
            }
            if (row.Ethnicity == 2 && ethnicity == "2") {
                noKidneyWithEthnicity++;
            }
            if (row.Ethnicity == 3 && ethnicity == "3") {
                noKidneyWithEthnicity++;
            }
            if (row.EducationLevel == 0 && education == "0"){
                noKidneyWithEducation++;
            }
            if (row.EducationLevel == 1 && education == "1"){
                noKidneyWithEducation++;
            }
            if (row.EducationLevel == 2 && education == "2"){
                noKidneyWithEducation++;
            }
            if (row.EducationLevel == 3 && education == "3"){
                noKidneyWithEducation++;
            }
            if (row.Smoking == smoking && smoking != "Prefer") {
                noKidneyWithSmoking++;
            }
            if (row.FamilyHistoryHypertension == hypertension && hypertension != "Prefer") {
                noKidneyWithHypertension++;
            }
            if (row.FamilyHistoryDiabetes == diab && diab != "Prefer") {
                noKidneyWithDiab++;
            }
            if (row.FamilyHistoryKidneyDisease == kidneyFam && kidneyFam !="Prefer") {
                noKidneyWithFam++;
            }
            if (row.PhysicalActivity < 2 && exercise == "0-2") {
                noKidneyWithExercise++;
            }
            if (row.PhysicalActivity > 2 && row.PhysicalActivity <= 4 && exercise == "2-4") {
                noKidneyWithExercise++;
            }
            if (row.PhysicalActivity > 4 && row.PhysicalActivity <= 6 && exercise == "4-6") {
                noKidneyWithExercise++;
            }
            if (row.PhysicalActivity > 6 && row.PhysicalActivity <= 8 && exercise == "6-8") {
                noKidneyWithExercise++;
            }
            if (row.PhysicalActivity > 8 && row.PhysicalActivity <= 10 && exercise == "8-10") {
                noKidneyWithExercise++;
            }
            if (row.AlcoholConsumption <= 2 && alc == "0-2"){
                noKidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 2 && row.AlcoholConsumption <= 5 && alc == "2-5"){
                noKidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 5 && row.AlcoholConsumption <= 8 && alc == "5-8"){
                noKidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 8 && row.AlcoholConsumption <= 11 && alc == "8-11"){
                noKidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 11 && row.AlcoholConsumption <= 14 && alc == "11-14"){
                noKidneyWithAlc++;
            }
            if (row.AlcoholConsumption > 14 && alc == "14"){
                noKidneyWithAlc++;
            }
        }
    });

    //Probability of having kidney disease
    var pKidney = kidneyCount / total;
    var pNoKidney = noKidneyCount / total;

    //conditonal Probabilities
    var pGenderGivenKidney = kidneyWithGender / kidneyCount;
    if (kidneyWithGender == 0) {
        pGenderGivenKidney = 0.5;
    }
    var pEthnicityGivenKidney = kidneyWithEthnicity / kidneyCount;
    if (kidneyWithEthnicity == 0) {
        pEthnicityGivenKidney = 0.5;
    }
    var pEducationGivenKidney = kidneyWithEducation / kidneyCount;
    if (kidneyWithEducation == 0) {
        pEducationGivenKidney = 0.5;
    }
    var pSmokingGivenKidney = kidneyWithSmoking / kidneyCount;
    if (kidneyWithSmoking == 0) {
        pSmokingGivenKidney = 0.5;
    }
    var pHypertensionGivenKidney = kidneyWithHypertension / kidneyCount;
    if (kidneyWithHypertension == 0) {
        pHypertensionGivenKidney = 0.5;
    }
    var pDiabGivenKidney = kidneyWithDiab / kidneyCount;
    if (kidneyWithDiab == 0) {
        pDiabGivenKidney = 0.5;
    }
    var pExerciseGivenKidney = kidneyWithExercise / kidneyCount;
    if (kidneyWithExercise == 0) {
        pExerciseGivenKidney = 0.5;
    } 
    var pFamGivenKidney = kidneyWithFam / kidneyCount;
    if (kidneyWithFam == 0) {
        pFamGivenKidney = 0.5;
    }
    var pAlcGivenKidney = kidneyWithAlc / kidneyCount;
    if (kidneyWithAlc == 0) {
        pAlcGivenKidney = 0.5;
    } // noKidney
    var pGenderGivenNoKidney = noKidneyWithGender / noKidneyCount;
    if (noKidneyWithGender == 0) {
        pGenderGivenNoKidney = 0.5;
    }
    var pEthnicityGivenNoKidney = noKidneyWithEthnicity / noKidneyCount;
    if (noKidneyWithEthnicity == 0) {
        pEthnicityGivenNoKidney = 0.5;
    }
    var pEducationGivenNoKidney = noKidneyWithEducation / noKidneyCount;
    if (noKidneyWithEducation == 0) {
        pEducationGivenNoKidney = 0.5;
    }
    var pSmokingGivenNoKidney = noKidneyWithSmoking / noKidneyCount;
    if (noKidneyWithSmoking == 0) {
        pSmokingGivenNoKidney = 0.5;
    }
    var pHypertensionGivenNoKidney = noKidneyWithHypertension / noKidneyCount;
    if (noKidneyWithHypertension == 0) {
        pHypertensionGivenNoKidney = 0.5;
    }
    var pDiabGivenNoKidney = noKidneyWithDiab / noKidneyCount;
    if (noKidneyWithDiab == 0) {
        pDiabGivenNoKidney = 0.5;
    }
    var pExerciseGivenNoKidney = noKidneyWithExercise / noKidneyCount;
    if (noKidneyWithExercise == 0) {
        pExerciseGivenNoKidney = 0.5;
    }
    var pFamGivenNoKidney = noKidneyWithFam / noKidneyCount;
    if (noKidneyWithFam == 0) {
        pFamGivenNoKidney = 0.5;
    }
    var pAlcGivenNoKidney = noKidneyWithAlc / noKidneyCount;
    if (noKidneyWithAlc == 0) {
        pAlcGivenNoKidney = 0.5;
    }

    //Applying Naive Bayes
    var pKidneyGivenConditions = pGenderGivenKidney * pEthnicityGivenKidney * pEducationGivenKidney * pSmokingGivenKidney * pHypertensionGivenKidney * pDiabGivenKidney * pExerciseGivenKidney * pFamGivenKidney * pAlcGivenKidney * pKidney;
    var pNoKidneyGivenConditions = pGenderGivenNoKidney * pEthnicityGivenNoKidney * pEducationGivenNoKidney * pSmokingGivenNoKidney * pHypertensionGivenNoKidney * pDiabGivenNoKidney * pExerciseGivenNoKidney * pFamGivenNoKidney * pAlcGivenNoKidney * pNoKidney;

    //Final Probabilites calculation
    var finalProbabilityOfKidney = pKidneyGivenConditions / (pKidneyGivenConditions + pNoKidneyGivenConditions);

    return finalProbabilityOfKidney;
}
