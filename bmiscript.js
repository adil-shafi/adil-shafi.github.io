//calcualting the BMI
document.querySelector(".calculate").addEventListener("click", BMI)
document.querySelector(".clear").addEventListener("click", clear)

function BMI() {
    const height = document.getElementById ('height').value;
    const weight = document.getElementById ('weight').value;

    //bmi formula
    let index = (weight / (((height / 100) * height) / 100)).toFixed(0);

    //check if height and weight are not 0
    if (height && weight !=0) {
        const output = document.getElementById("output");
        const state = document.getElementById("state");
        output.innerHTML = "Your BMI is " + index;
    } else {
        alert ('Error!')
    }
}

//clear function

function clear() {
    document.getElementById('height').value = "";
    document.getElementById('weight').value = "";
    document.getElementById('output').value = "";
    document.getElementById('state').value = "";


}