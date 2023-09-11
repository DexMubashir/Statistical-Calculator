document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate");
  const saveAsPDFButton = document.getElementById("saveAsPDF");

  calculateButton.addEventListener("click", calculateStatistics);
  saveAsPDFButton.addEventListener("click", saveAsPDF);

  function calculateStatistics() {
    const numbersInput = document.getElementById("numbers").value;
    const numbers = numbersInput
      .split(",")
      .map((num) => parseFloat(num.trim()));

    if (numbers.some(isNaN)) {
      alert("Please enter valid numbers.");
      return;
    }

    const mean = calculateMean(numbers);
    const median = calculateMedian(numbers);
    const mode = calculateMode(numbers);
    const frequency = calculateFrequency(numbers);
    const stdDev = calculateStdDev(numbers);

    document.getElementById("meanResult").textContent = mean.toFixed(2);
    document.getElementById("medianResult").textContent = median.toFixed(2);
    document.getElementById("modeResult").textContent = mode.join(", ");
    document.getElementById("frequencyResult").textContent =
      JSON.stringify(frequency);
    document.getElementById("stdDevResult").textContent = stdDev.toFixed(2);
  }

  function calculateMean(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }

  function calculateMedian(numbers) {
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
      return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
    } else {
      return sortedNumbers[middle];
    }
  }

  function calculateMode(numbers) {
    const numberCounts = {};

    numbers.forEach((num) => {
      numberCounts[num] = (numberCounts[num] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(numberCounts));

    return Object.keys(numberCounts).filter(
      (num) => numberCounts[num] === maxFrequency
    );
  }
  function calculateFrequency(numbers) {
    const freqMap = {};
    numbers.forEach((num) => {
      freqMap[num] = (freqMap[num] || 0) + 1;
    });
    return freqMap;
  }

  function calculateStdDev(numbers) {
    const mean = calculateMean(numbers);
    const squaredDifferences = numbers.map((num) => Math.pow(num - mean, 2));
    const variance =
      squaredDifferences.reduce((acc, num) => acc + num, 0) / numbers.length;
    return Math.sqrt(variance);
  }

  function saveAsPDF() {
    const results = document.querySelector(".results");
    var opt = {
      margin: 1,
      filename: "output.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(results).set(opt).save();
  }
});
