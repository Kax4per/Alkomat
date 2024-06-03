let totalAlcoholAmount = 0; 

function CalculateAlcohol() {
    const ml = document.getElementById("AmountInMl").value;
    const percentage = document.getElementById("Percentage").value / 100;

    let result = ml * percentage * 0.79;

    totalAlcoholAmount += result;

    document.getElementById("AlcoholAmountResult").innerHTML = result.toFixed(2) + " g";
    document.getElementById("TotalAlcoholAmount").innerHTML = totalAlcoholAmount.toFixed(2) + " g";
}

function Reset() {
    totalAlcoholAmount = 0;
    document.getElementById("genderM").checked = false;
    document.getElementById("genderF").checked = false;
    document.getElementById("AmountInMl").value = '';
    document.getElementById("Percentage").value = '';
    document.getElementById("weight").value = '';
    document.getElementById("height").value = '';
    document.getElementById("hoursSinceLastDrink").value = '';



    document.getElementById("bac").innerHTML = '0';
    document.getElementById("time").innerHTML = '0';
    document.getElementById("bmi").innerHTML = '0';
    document.getElementById("AlcoholAmountResult").innerHTML = '0';
    document.getElementById("TotalAlcoholAmount").innerHTML = '0';

}

function CalculateBAC() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const hoursSinceLastDrink = document.getElementById("hoursSinceLastDrink").value;
    const isMale = document.getElementById("genderM").checked;
    const isFemale = document.getElementById("genderF").checked;

    if (!weight || !height || (!isMale && !isFemale) || isNaN(totalAlcoholAmount) || !hoursSinceLastDrink) {
        alert('Please fill in all fields.');
        return;
    }

    let bodyFluidRatio = isMale ? 0.7 : 0.6;

    let bac = (totalAlcoholAmount / (weight * bodyFluidRatio)).toFixed(2);

    bac = (bac - (0.15 * hoursSinceLastDrink)).toFixed(2);

    if (bac < 0) {
        bac = 0;
    }

    let bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);

    let soberTimeHours = Math.floor(bac / 0.15);
    let soberTimeMinutes = Math.floor(((bac / 0.15) - soberTimeHours) * 60);

    document.getElementById("bac").innerHTML = `${bac} ‰`;

    if (soberTimeHours === 0 && soberTimeMinutes === 0) {
        document.getElementById("time").innerHTML = "You are sober.";
    } else {
        document.getElementById("time").innerHTML = `${soberTimeHours} hours and ${soberTimeMinutes} minutes`;
    }
    
    alert("YOUR BMI IS: "+bmi);
}


