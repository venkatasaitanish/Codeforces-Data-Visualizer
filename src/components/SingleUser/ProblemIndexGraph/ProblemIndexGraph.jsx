import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProblemIndexGraph = ({ userSubmissions }) => {
    let index = new Map();
    let id = new Map();

    for(let i=0; i<userSubmissions.length; i++){
        if(userSubmissions[i].verdict !== "OK"){
            continue;
        }
        let key = userSubmissions[i].contestId + userSubmissions[i].problem.index;
        if(id.has(key)){
            continue;
        }
        id.set(key,true);

        let currIndex = userSubmissions[i].problem.index[0];
        if(currIndex < 'A' || currIndex > 'Z'){
            continue;
        }
        if(!index.has(currIndex)){
            index.set(currIndex,1);
        }
        else{
            let prevCnt = index.get(currIndex);
            index.set(currIndex,prevCnt+1);
        }
    }

    var indexAsc = new Map([...index.entries()].sort());
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Problem Count',
                data: [],
                backgroundColor: ['rgb(28, 109, 208, 0.8)'],
                borderColor: ['rgb(28, 109, 208, 0.9)'],
                borderWidth: 1
            },
        ],
    };

    for (let [key, value] of indexAsc) {
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Problem vs Index'
            },
            legend: {
                display: false
            }
        },
        // responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Bar data={data} options={options} height={400} />
        </div>
    )
}

export default ProblemIndexGraph
