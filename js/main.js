
//Week forecast doughnut chart
const chartData = {
    labels: ["Sunny days","Rain/Snow days"],
    data: [10, 6],
};

const myChart = document.querySelector(".my-chart");
const ul=document.querySelector(".weather-last-week .details ul");

new Chart(myChart, {
    type:"doughnut",
    data:{
        labels: chartData.labels,
        datasets:[
        {
            label:"Last Week",
            data: chartData.data,
        },
        ],
    },
    options:{
        borderWidth:5,
        borderRadius:2,
        hoverBorderWidth:0,
        plugins:{
            legend:{
                display:false,
            },
        },
    },
});

const populateUl = () => {
    chartData.labels.forEach((l, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${l}:<span class='weatherStatus'>${chartData.data[i]}</span>`;
        ul.appendChild(li);
    });
};

populateUl();
//Week forecast doughnut chart End