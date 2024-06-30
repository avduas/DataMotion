// function randomizeData(dataArray) {
//     return dataArray.map(value => Math.floor(Math.random() * 100)); 
// }

// function updateLabelsEveryHour() {
//     const labels = [
//         "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"
//     ];
//     const currentHour = new Date().getHours(); 

//     const newLabels = labels.slice(currentHour).concat(labels.slice(0, currentHour));

//     return newLabels;
// }

// module.exports = [
//     {
//         id: 0,
//         name: "IOT New Processor",
//         edge: "2",
//         events: "3.01k",
//         bytes: "59 kb",
//         chartData1: {
//             labels: updateLabelsEveryHour(), 
//             datasets: [
//                 {
//                     label: "Sales 2021",
//                     data: randomizeData([65, 59, 80, 81, 56, 55, 40]), 
//                     borderColor: "#1847A6",
//                     backgroundColor: "#1847A6",
//                     fill: true,
//                 },
//             ],
//         },
//         chartData2: {
//             labels: updateLabelsEveryHour(), 
//             datasets: [
//                 {
//                     label: "Sales 2022",
//                     data: randomizeData([45, 39, 60, 61, 46, 35, 50]),
//                     borderColor: "#F47216",
//                     backgroundColor: "#F47216",
//                 },
//             ],
//         },
//     },
//     {
//         id: 1,
//         name: "Smart Meter Readings (Water)",
//         edge: "3",
//         events: "4.02k",
//         bytes: "54 kb",
//         chartData1: {
//             labels: updateLabelsEveryHour(), 
//             datasets: [
//                 {
//                     label: "Sales 2021",
//                     data: randomizeData([90, 23, 41, 51, 56, 55, 40]), 
//                     borderColor: "#1847A6",
//                     backgroundColor: "#1847A6",
//                     fill: true,
//                 },
//             ],
//         },
//         chartData2: {
//             labels: updateLabelsEveryHour(),
//             datasets: [
//                 {
//                     label: "Sales 2022",
//                     data: randomizeData([300, 230, 189, 500, 459, 440, 600]), 
//                     borderColor: "#F47216",
//                     backgroundColor: "#F47216",
//                 },
//             ],
//         },
//     },
//     {
//         id: 2,
//         name: "Consumption Real-Time",
//         edge: "4",
//         events: "1.53k",
//         bytes: "51 kb",
//         chartData1: {
//             labels: updateLabelsEveryHour(), 
//             datasets: [
//                 {
//                     label: "Sales 2021",
//                     data: randomizeData([65, 59, 80, 81, 56, 55, 40]), 
//                     borderColor: "#1847A6",
//                     backgroundColor: "#1847A6",
//                     fill: true,
//                 },
//             ],
//         },
//         chartData2: {
//             labels: updateLabelsEveryHour(), 
//             datasets: [
//                 {
//                     label: "Sales 2022",
//                     data: randomizeData([45, 39, 60, 61, 46, 35, 50]), 
//                     borderColor: "#F47216",
//                     backgroundColor: "#F47216",
//                 },
//             ],
//         },
//     },
//     {
//         id: 3,
//         name: "IOT Reception Quality",
//         edge: "5",
//         events: "6.04k",
//         bytes: "45 kb",
//         chartData1: {
//             labels: updateLabelsEveryHour(),
//             datasets: [
//                 {
//                     label: "Sales 2021",
//                     data: randomizeData([65, 59, 80, 81, 56, 55, 40]),
//                     borderColor: "#1847A6",
//                     backgroundColor: "#1847A6",
//                     fill: true,
//                 },
//             ],
//         },
//         chartData2: {
//             labels: updateLabelsEveryHour(), 
//             datasets: [
//                 {
//                     label: "Sales 2022",
//                     data: randomizeData([45, 39, 60, 61, 46, 35, 50]),
//                     borderColor: "#F47216",
//                     backgroundColor: "#F47216",
//                 },
//             ],
//         },
//     },
// ];