console.log("hello");

var currentChart;
document.getElementById("renderBtn").addEventListener("click", fetchData);

async function fetchData() {
  let countryCode = document.getElementById("country").value;
  const indicatorCode = "SP.POP.TOTL";
  const baseUrl = "https://api.worldbank.org/v2/country/";
  const url =
    baseUrl + countryCode + "/indicator/" + indicatorCode + "?format=json";
  console.log("Fetching data from URL: " + url);

  let response = await fetch(url);

  if (response.status == 200) {
    let fetchedData = await response.json();
    console.log(fetchedData);

    let data = getValues(fetchedData);
    let labels = getLabels(fetchedData);
    let countryName = getCountryName(fetchedData);
    renderChart(data, labels, countryName);
  }
}

function getValues(data) {
  let vals = data[1].sort((a, b) => a.date - b.date).map((item) => item.value);
  return vals;
}

function getLabels(data) {
  let labels = data[1].sort((a, b) => a.date - b.date).map((item) => item.date);
  return labels;
}

function getCountryName(data) {
  let countryName = data[1][0].country.value;
  return countryName;
}

function renderChart(data, labels, countryName) {
  let ctx = document.getElementById("myChart").getContext("2d");

  if (currentChart) {
    // Clear the previous chart if it exists
    currentChart.destroy();
  }

  // Draw new chart
  currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Population, " + countryName,
          data: data,
          borderColor: " rgb(1, 75, 96)",
          backgroundColor: " rgb(8, 176, 187, 0.8)",
          color: "rgb(0,0,0)",
        },
      ],
    },
    options: {
      animation: {
        duration: 5000,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
