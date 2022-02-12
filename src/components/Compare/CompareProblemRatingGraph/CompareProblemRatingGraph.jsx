import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompareProblemRatingGraph = ({userSubmissions1, userSubmissions2, username1, username2}) => {
    let rating = new Map();
    let rating1 = new Map();
    let id1 = new Map();

    for(let i=0; i<userSubmissions1.length; i++){
        if(userSubmissions1[i].verdict !== "OK"){
            continue;
        }

        let key1 = userSubmissions1[i].contestId + userSubmissions1[i].problem.index;
        if(id1.has(key1)){
            continue;
        }
        id1.set(key1,true);
        let currRating1 = userSubmissions1[i].problem.rating;
        if(currRating1 === undefined){
            continue;
        }
        currRating1 = parseInt(currRating1);

        if(!rating1.has(currRating1)){
            rating1.set(currRating1,1);
        }
        else{
            let prevCnt = rating1.get(currRating1);
            rating1.set(currRating1,prevCnt+1);
        }

        rating.set(currRating1,1);
    }

    let rating2 = new Map();
    let id2 = new Map();

    for (let i = 0; i < userSubmissions2.length; i++) {
        if (userSubmissions2[i].verdict !== "OK") {
            continue;
        }

        let key2 = userSubmissions2[i].contestId + userSubmissions2[i].problem.index;
        if (id2.has(key2)) {
            continue;
        }
        id2.set(key2, true);
        let currRating2 = userSubmissions2[i].problem.rating;
        if (currRating2 === undefined) {
            continue;
        }
        currRating2 = parseInt(currRating2);

        if (!rating2.has(currRating2)) {
            rating2.set(currRating2, 1);
        }
        else {
            let prevCnt = rating2.get(currRating2);
            rating2.set(currRating2, prevCnt + 1);
        }

        rating.set(currRating2, 1);
    }

    let ratingAsc = new Map([...rating.entries()].sort((a, b) => {
        if (parseInt(a) < parseInt(b)) return -1;
        else if (parseInt(b) > parseInt(a)) return 1;
        return 0;
    }));

    const data = {
        labels: [],
        datasets: [
            {
                label: username1,
                data: [],
                backgroundColor: ['red'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
            {
                label: username2,
                data: [],
                backgroundColor: ['blue'],
                borderColor: ['rgb(28, 109, 208, 1)'],
                borderWidth: 1,
            },
        ]
    };

    for(let[key,value] of ratingAsc){
        data.labels.push(key);
        data.datasets[0].data.push(rating1.has(key) ? rating1.get(key) : 0);
        data.datasets[1].data.push(rating2.has(key) ? rating2.get(key) : 0);
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Problem Rating Graph'
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Bar data={data} options={options} height={400} />
        </div>
    )
}

export default CompareProblemRatingGraph;