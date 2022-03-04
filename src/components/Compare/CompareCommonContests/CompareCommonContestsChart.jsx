import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const CompareCommonContestsChart = ({userContests1, userContests2, username1, username2}) => {
    let contest1 = new Map();
    let w1=0, w2=0, tie=0;

    for(let i=0; i < userContests1.length; i++){
        contest1.set(userContests1[i].contestId, userContests1[i]);
    }
    
    for (let i=0; i < userContests2.length; i++) {
        if (!contest1.has(userContests2[i].contestId)) {
            continue;
        }
        let diff = contest1.get(userContests2[i].contestId).rank - userContests2[i].rank;
        if(diff<0){
            w1++;
        }
        else if(diff>0){
            w2++;
        }
        else{
            tie++;
        }
    }

    const data = {
        labels: [username1, username2, 'Tie'],
        datasets: [
            {
                label: '',
                data: [w1, w2, tie],
                backgroundColor: ['red', 'blue', 'orange'],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgb(28, 109, 208, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Head-to-Head Contests'
            }
        },
        maintainAspectRatio: false,
    };


    return (
        <div>
            <Pie data={data} options={options} height={400} />
        </div>
    )
}

export default CompareCommonContestsChart;