class main_functions {
  getPercentile(numberSet, value, atOrBelow=true) {
    const numberSetArray = numberSet.replace(/ /g, '').split(',').map(i => Number(i));
    switch (atOrBelow) {
      case true: {
        let numbersAtOrBelow = 0;
        numberSetArray.forEach(num => {
          if (num <= value) numbersAtOrBelow++;
        });
        const percentileAtOrBelow = numbersAtOrBelow / numberSetArray.length;
        return percentileAtOrBelow*100;
      }
      case false: {
        let numbersBelow = 0;
        numberSetArray.forEach(num => {
          if (num < value) numbersBelow++;
        });
        const percentileBelow = numbersBelow / numberSetArray.length;
        return percentileBelow*100;
      }
    }
  }
  getAverage(numberSet) {
    const numberSetArray = numberSet.replace(/ /g, '').split(',').map(i => Number(i));
    let sum = 0;
    numberSetArray.forEach(num => {
      sum += Number(num);
    });
    let average = sum / numberSetArray.length;
    return average;
  }
  getStandardDeviation(numberSet, sample=true) {
    const numberSetArray = numberSet.replace(/ /g, '').split(',').map(i => Number(i));
    const average = main_functions.prototype.getAverage(numberSetArray.toString());
    let sigma = 0;
    numberSetArray.forEach(num => {
      sigma += Number(( num - average )**2);
    });
    switch (sample) {
      case true: {
        const standardDeviation = ( sigma / (numberSetArray.length-1) )**0.5;
        return standardDeviation;
      }
      case false: {
        const standardDeviation = ( sigma / numberSetArray.length )**0.5;
        return standardDeviation;
      }
    }
  }
}

function showOnly(divName) {
  let statisticOptions = document.getElementById('statistics-select').options;
  for (key in statisticOptions) {
    if (isNaN(key)) break;
    if (divName == statisticOptions[key].value) {
      document.getElementById(statisticOptions[key].value).style.visibility = 'visible';
    } else {
      document.getElementById(statisticOptions[key].value).style.visibility = 'hidden';
    }
  }
  return 0;
}

function calculate() {
  const result = document.getElementById('result');
  const statisticOption = document.getElementById('statistics-select').value;
  switch (statisticOption) {
    case 'percentile': {
      const percentileChecked = document.getElementById('percentile-checkbox').checked,
        numSet = document.getElementById('percentile-number-set').value,
        val = document.getElementById('percentile-value').value;
      result.textContent = `${main_functions.prototype.getPercentile(numSet, val, percentileChecked)} %`;
      break;
    }
    case 'standard-deviation': {
      const standardDeviationChecked = document.getElementById('standard-deviation-checkbox').checked,
        numset = document.getElementById('standard-deviation-number-set').value;
      result.textContent = `Standard deviation: ${main_functions.prototype.getStandardDeviation(numset, standardDeviationChecked)}`;
      break;
    }
  }
}

document.addEventListener('change', () => {
  const statisticSelect = document.getElementById('statistics-select').value;
  showOnly(statisticSelect);
});