import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SubmissionsGraph = ({userSubmissions}) => {
    let tried = new Map();
    let solved = new Map();

    for (let i=0; i < userSubmissions.length; i++) {
        let key = userSubmissions[i].contestId + userSubmissions[i].problem.index;
        let verdict = userSubmissions[i].verdict;

        if (!tried.has(key)) {
            tried.set(key, 1);
        }
        if (!solved.has(key) && verdict === "OK") {
            solved.set(key, 1);
        }
    }

    const data = {
        labels: ['Tried', 'Solved', 'Submissions'],
        datasets: [
            {
                label: 'Count',
                data: [tried.size, solved.size, userSubmissions.length],
                backgroundColor: ['rgb(28, 109, 208, 0.8)'],
                borderColor: ['rgb(28, 109, 208, 0.9)'],
                borderWidth: 1
            },
        ]
    };

    const options = {
        indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                text: 'Submissions'
            },
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div>
            <Bar data={data} options={options} height={400} />
        </div>
    )
}

export default SubmissionsGraph;