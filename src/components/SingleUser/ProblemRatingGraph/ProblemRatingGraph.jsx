import {Bar} from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProblemRatingGraph = ({userSubmissions}) => {
    let rating = new Map();
    let id = new Map();

    for(let i=0; i<userSubmissions.length; i++){
        if(userSubmissions[i].verdict !== "OK"){
            continue;
        }
        let key = userSubmissions[i].contestId + userSubmissions[i].problem.index;
        if (id.has(key)) {
            continue;
        }
        id.set(key, true);

        let currRating = userSubmissions[i].problem.rating;
        if(currRating === undefined){
            continue;
        }
        currRating = parseInt(currRating);
        
        if(!rating.has(currRating)){
            rating.set(currRating,1);
        }
        else{
            let prevCnt = rating.get(currRating);
            rating.set(currRating,prevCnt+1);
        }
    }

    let ratingAsc = new Map([...rating.entries()].sort((a,b) => {
        if(parseInt(a) < parseInt(b)) return -1;
        else if(parseInt(b) > parseInt(a)) return 1;
        return 0;
    }));

    const data = {
        labels: [],
        datasets: [
            {
                label: 'Problem Count',
                data: [],
                backgroundColor: ['rgb(28, 109, 208, 0.8)'],
                borderColor: ['rgb(28, 109, 208, 0.9)'],
                borderWidth: 1
            }
        ]
    };

    for (let [key, value] of ratingAsc) {
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Problem vs Rating'
            },
            legend: {
                display: false
            }
        },
        // responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div>
            <Bar data={data} options={options} height={400} />
        </div>
    )
}

export default ProblemRatingGraph;