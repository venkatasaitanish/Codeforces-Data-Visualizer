import {Line} from 'react-chartjs-2';
import moment from 'moment';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const ContestRatingGraph = ({userContests}) => {
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Rating',
                data: [],
                // fill: false,
                backgroundColor: ['rgb(28, 109, 208, 0.9)'],
                borderColor: ['rgb(28, 109, 208, 0.4)'],
            }
        ]
    };

    for(let i=0; i<userContests.length; i++){
        let dateSeconds = userContests[i].ratingUpdateTimeSeconds;
        let rating = userContests[i].newRating;
        let date = new Date(null);
        date.setTime(dateSeconds*1000);
        
        let momentDate = moment(date).format('MMM D, YYYY');
        data.datasets[0].data.push({x: momentDate , y: rating});
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Contest Rating'
            },
            legend: {
                display: false
            }
        },
        // responsive: true,
        maintainAspectRatio: false
    }

    return (
        <div>
            <Line data={data} options={options} height={400} />
        </div>
    )
}

export default ContestRatingGraph;