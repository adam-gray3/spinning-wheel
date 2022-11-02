
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const rotationValues = [
  {minDegree: 0, maxDegree: 30, value: 2},
  {minDegree: 31, maxDegree: 90, value: 1},
  {minDegree: 91, maxDegree: 150, value: 6},
  {minDegree: 151, maxDegree: 210, value: 5},
  {minDegree: 211, maxDegree: 270, value: 4},
  {minDegree: 271, maxDegree: 330, value: 3},
  {minDegree: 331, maxDegree: 360, value: 2}
];

//size of each piece
const data = [16,16,16,16,16,16, 16, 16, 16, 16, 16,16];
var pieColors = ["blue", "green", "red", "pink", "yellow", "orange", "black", "violet", "indigo", "lime", "aquamarine", "brown"];
let myChart = new Chart (wheel, {
  //plugin for displaying text
  plugins: [ChartDataLabels],

  type: "pie",
  data: {
    //labels
    labels: ["Driver", "3 Wood", "Hybrid", "4 Iron", "5 Iron", "6 Iron", "7 Iron", "8 Iron", "9 Iron", "S Wedge", "P Wedge", "Putter"],

    //settings for pie
    datasets: [{
      backgroundColor: pieColors,
      data: data
    }]
  },

  options: {
    responsive: true,
    animation: {duration: 0},
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        formatter: (_,context) => context.chart.data.labels[context.dataIndex],
        font: {size: 16}
      }
    }
  }
});


let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();

    if(myChart.options.rotation >= 360){
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if(count > 15 && myChart.options.rotation == randomDegree){
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10)
});
