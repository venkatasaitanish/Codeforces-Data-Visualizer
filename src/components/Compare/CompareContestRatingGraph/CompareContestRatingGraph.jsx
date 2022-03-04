import { Line } from 'react-chartjs-2';
import moment from 'moment';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompareContestRatingGraph = ({userContests1, userContests2, username1, username2, maxRating1, maxRating2}) => {
    let pointBackgroundColors1 = [];
    let pointBackgroundColors2 = [];
    const data = {
        labels: [],
        datasets: [
            {
                label: username1,
                data: [],
                fill: false,
                backgroundColor: 'red',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                pointBackgroundColor: pointBackgroundColors1,
            },
            {
                label: username2,
                data: [],
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'rgba(28, 109, 208, 0.5)',
                pointBackgroundColor: pointBackgroundColors2,
            }
        ]
    };

    let datesMap = new Map();
    let datesMap1 = new Map();
    let datesMap2 = new Map();

    userContests1 = Array.from(userContests1);
    for(let i=0; i<userContests1.length; i++){
        let dateSeconds1 = userContests1[i].ratingUpdateTimeSeconds;
        let rating1 = userContests1[i].newRating;

        datesMap.set(dateSeconds1, 1);
        datesMap1.set(dateSeconds1, rating1);
    }

    userContests2 = Array.from(userContests2);
    for (let i=0; i<userContests2.length; i++) {
        let dateSeconds2 = userContests2[i].ratingUpdateTimeSeconds;
        let rating2 = userContests2[i].newRating;

        datesMap.set(dateSeconds2, 1);
        datesMap2.set(dateSeconds2, rating2);
    }

    let datesMapAsc = new Map([...datesMap.entries()].sort());

    for(let[key, value] of datesMapAsc){
        let date = new Date(null);
        date.setTime(key * 1000);
        let momentDate = moment(date).format('MMM D, YYYY');
        data.labels.push(momentDate);
        if(datesMap1.has(key)) {
            let rating = datesMap1.get(key);
            data.datasets[0].data.push(rating);
        }
        else{
            data.datasets[0].data.push(null);
        }
        if(datesMap2.has(key)){
            let rating = datesMap2.get(key);
            data.datasets[1].data.push(rating);
        }
        else{
            data.datasets[1].data.push(null);
        }
    }

    for(let i=0; i<data.datasets[0].data.length; i++) {
        if(data.datasets[0].data[i] === maxRating1){
            pointBackgroundColors1.push('white');
        }
        else{
            pointBackgroundColors1.push('red');
        }
    }

    for(let i=0; i<data.datasets[1].data.length; i++){
        if(data.datasets[1].data[i] === maxRating2){
            pointBackgroundColors2.push('white');
        }
        else{
            pointBackgroundColors2.push('blue');
        }
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Rating Graph'
            }
        },
        maintainAspectRatio: false,
        spanGaps: true
    }

    return (
        <div>
            <Line data={data} options={options} height={400}/>
        </div>
    )
}

export default CompareContestRatingGraph;