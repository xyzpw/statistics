// *TODO* finish when adderall starts kicking in

let divs = Array();

document.addEventListener('DOMContentLoaded', () => {
    divs.push("stdev");
    divs.push("score2p");
    divs.push("binomial");
});

window.addEventListener('keydown', (k) => {
    if (k.key === 'Enter') document.getElementById("calculate-btn").click();
});

document.addEventListener('input', () => {
    if (document.readyState === 'complete') {
        let divOption = document.getElementById("statistics-option").value;
        showOnly(document.getElementById(divOption));
        let divHeight = document.getElementById(divOption).offsetHeight;
        document.getElementById("calculate-btn").style = `margin-top: ${divHeight}px`;
    }
});

function showOnly(divName){
    divs.forEach(element => {
        if (element == divName.id){
            document.getElementById(element).style = 'visibility: visible';
        } else {
            document.getElementById(element).style = 'visibility: hidden';
        }
    });
}

function factorial(n){
    if (n == 0 || n == 1){
        return 1
    } else if (n < 0){
        return NaN
    }
    for (let i = n-1; i >= 1; i--){
        n *= i
    }
    return n;
}

function nCr(n, r){
    let combinations = (factorial(n)) / (factorial(r) * factorial(n - r));
    return combinations
}

function getAverage(numSet){
    total = 0
    numSet.forEach(element => {
        total += element
    });
    let mean = total / numSet.length;
    return mean;
}

function getSum(numSet){
    let sum = 0;
    numSet.forEach(num => {
        sum += num;
    });
    return sum;
}

function getStandardDeviation(numberSet, sample=true){
    let numberSetAverage = getAverage(numberSet);
    let sum = 0;
    numberSet.forEach(num => {
        sum += Number((num - numberSetAverage)**2);
    });
    if (sample){
        let sigma = (sum / (numberSet.length - 1))**.5;
        return sigma;
    } else{
        let sigma = (sum / numberSet.length)**.5;
        return sigma;
    }
}

function getPercentileRank(numberSet, score){
    let numbersAtOrBelowScore = 0;
    numberSet.forEach(num => {
        if (num <= score) {
            ++numbersAtOrBelowScore;
        }
    });
    let percentile = numbersAtOrBelowScore / numberSet.length;
    return percentile;
}

function getBinomial(n, x, p){
    let binomialProbability = nCr(n, x) * p**x * (1-p)**(n - x)
    return binomialProbability
}

function getMedian(numSet){
    numSet = numSet.sort((a,b) => a-b);
    if (numSet.length%2 != 0){
        let middle = Math.floor(numSet.length/2);
        let median = numSet[middle];
        return median;
    } else{
        let middle = Math.floor(numSet.length/2);
        let median = (numSet[middle] + numSet[middle-1]) / 2;
        return median;
    }
}

function calculate(){
    let uiSelect = document.getElementById("statistics-option").value;
    switch (uiSelect){
        case "stdev": {
            let numSet = document.getElementById("stdev-numberset").value;
            numSet = numSet.replace(/ /g, '').split(',').map(i => Number(i));
            let population = document.getElementById("stdev-samplebox").checked;
            let sigma = getStandardDeviation(numSet, population);
            let populationSize = numSet.length;
            let populationMin = Math.min(...numSet);
            let populationMax = Math.max(...numSet);
            let populationMean = getAverage(numSet);
            let populationMedian = getMedian(numSet);
            let resultContent = `Standard Deviation = ${sigma}
            N=${populationSize}
            Average=${populationMean}
            Median=${populationMedian}
            Minimum=${populationMin}, Maximum=${populationMax}`
            document.getElementById("results").innerText = resultContent
            break;
        }
        case "score2p": {
            let numSet = document.getElementById("score2p-numberset").value;
            numSet = numSet.replace(/ /g, '').split(',').map(i => Number(i));
            let score = document.getElementById("score2p-value").value;
            let percentile = getPercentileRank(numSet, score);
            document.getElementById("results").textContent = `Percentile = ${percentile*100}%`;
            break;
        }
        case "binomial": {
            let p = document.getElementById("binomial-probability").value;
            let n = document.getElementById("binomial-events").value;
            let x = document.getElementById("binomial-successes").value;
            let binomialProbability = getBinomial(n, x, p);
            document.getElementById("results").textContent = `P=${binomialProbability*100}%`;
            break;
        }
    }
}

