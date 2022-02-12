import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const ProblemTagGraph = ({ userSubmissions }) => {

    let tag = new Map();
    let id = new Map();
    for(let i = 0; i < userSubmissions.length; i++) {
        if(userSubmissions[i].verdict !== "OK"){
            continue;
        }
        let key = userSubmissions[i].contestId + userSubmissions[i].problem.index;
        if(id.has(key)){
            continue;
        }
        id.set(key,true);
        let currTag = userSubmissions[i].problem.tags;

        for(let j = 0; j < currTag.length; j++){
            if(!tag.has(currTag[j])) {
                tag.set(currTag[j], 1);
            }
            else{
                let prevCnt = tag.get(currTag[j]);
                tag.set(currTag[j], prevCnt + 1)
            }
        }
    }

    let tagDsc = new Map([...tag.entries()].sort((a,b) => {
        //console.log(b[1]-a[1]);
        return (b[1]-a[1]);
    }));

    const data = {
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [
                    'rgba(148, 216, 38, 0.8)',
                    'rgba(228, 28, 28, 0.8)',
                    'rgba(4, 119, 198, 0.8)',
                    'rgba(198, 8, 140, 0.8)',
                    'rgba(205, 170, 30, 0.8)',
                    'rgba(62, 20, 136, 0.8)',
                    'rgba(155, 159, 182, 0.8)',
                    'rgba(9, 135, 54, 0.8)',
                    'rgba(255, 92, 91, 0.8)',
                    'rgba(255, 201, 60, 0.8)',
                    'rgba(79, 9, 29, 0.7)',
                    'rgba(63, 167, 150, 0.8)',
                    'rgb(255, 0, 142, 0.8)',
                    'rgba(43, 43, 43, 0.9)',
                    'rgba(81, 234, 234, 0.9)',
                    'rgba(22, 129, 154, 0.9)',
                    'rgba(226, 194, 185, 0.9)',
                    'rgba(252, 250, 112, 0.9)',
                    'rgba(209, 79, 79, 0.9)',
                    'rgba(255, 131, 3, 0.9)',
                    'rgba(88, 0, 255, 0.9)',
                    'rgba(0, 255, 128, 0.9)',
                    'rgba(242, 241, 231, 0.9)',
                    'rgba(100, 53, 121, 0.9)',
                ],
                borderColor: [
                    'rgba(148, 216, 38, 1)',
                    'rgba(228, 28, 28, 1)',
                    'rgba(4, 119, 198, 1)',
                    'rgba(198, 8, 140, 1)',
                    'rgba(205, 170, 30, 1)',
                    'rgba(62, 20, 136, 1)',
                    'rgba(155, 159, 182, 1)',
                    'rgba(9, 135, 54, 1)',
                    'rgba(255, 92, 91, 1)',
                    'rgba(255, 201, 60, 1)',
                    'rgba(79, 9, 29, 1)',
                    'rgba(63, 167, 150, 1)',
                    'rgb(255, 0, 142, 1)',
                    'rgba(43, 43, 43, 1)',
                    'rgba(81, 234, 234, 1)',
                    'rgba(22, 129, 154, 1)',
                    'rgba(226, 194, 185, 1)',
                    'rgba(252, 250, 112, 1)',
                    'rgba(209, 79, 79, 1)',
                    'rgba(255, 131, 3, 1)',
                    'rgba(88, 0, 255, 1)',
                    'rgba(0, 255, 128, 1)',
                    'rgba(242, 241, 231, 1)',
                    'rgba(100, 53, 121, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    for (let [key, value] of tagDsc) {
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }

    const options = {
        plugins: {
            legend: {
                align: 'center'
            },
            title: {
                display: true,
                text: 'Problem Tags'
            }
        },
        // responsive: true,
        maintainAspectRatio: false
    }

    return (
        <div>
            <Doughnut data={data} options={options} height={500} />
        </div>
    )
}

export default ProblemTagGraph

