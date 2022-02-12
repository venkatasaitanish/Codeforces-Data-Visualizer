import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompareSubmissions = ({username1, username2, userSubmissions1, userSubmissions2}) => {

    let tried1 = new Map();
    let solved1 = new Map();

    for(let i=0; i<userSubmissions1.length; i++){
        let key1 = userSubmissions1[i].contestId + userSubmissions1[i].problem.index;
        let verdict1 = userSubmissions1[i].verdict;

        if(!tried1.has(key1)){
            tried1.set(key1,1);
        }
        if(!solved1.has(key1) && verdict1==="OK"){
            solved1.set(key1,1);
        }
    }

    let tried2 = new Map();
    let solved2 = new Map();

    for(let i=0; i<userSubmissions2.length; i++) {
        let key2 = userSubmissions2[i].contestId + userSubmissions2[i].problem.index;
        let verdict2 = userSubmissions2[i].verdict;

        if (!tried2.has(key2)) {
            tried2.set(key2, 1);
        }
        if (!solved2.has(key2) && verdict2 === "OK") {
            solved2.set(key2, 1);
        }
    }

    const data = {
        labels: ['Tried', 'Solved', 'Submissions'],
        datasets: [
            {
                label: username1,
                data: [tried1.size, solved1.size, userSubmissions1.length],
                backgroundColor: ['red'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            },
            {
                label: username2,
                data: [tried2.size, solved2.size, userSubmissions2.length],
                backgroundColor: ['blue'],
                borderColor: ['rgb(28, 109, 208, 1)'],
                borderWidth: 1
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                text: 'Submissions'
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div>
            <Bar data={data} options={options} height={400}/>
        </div>
    )

}

export default CompareSubmissions;