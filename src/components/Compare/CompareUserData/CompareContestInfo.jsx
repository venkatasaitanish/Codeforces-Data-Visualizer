import CompareCustomTable from './CompareCustomTable';

const CompareContestInfo = ({ userContests1, userContests2, username1, username2 }) => {

    userContests1 = Array.from(userContests1);

    const bestRank1 = Math.min.apply(null, userContests1.map((data) => {
        return data.rank;
    }))

    const worstRank1 = Math.max.apply(null, userContests1.map((data) => {
        return data.rank;
    }))

    const maxUp1 = Math.max.apply(null, userContests1.map((data) => {
        return data.newRating - data.oldRating;
    }))

    const maxDown1 = Math.min.apply(null, userContests1.map((data) => {
        return data.newRating - data.oldRating;
    }))
    

    userContests2 = Array.from(userContests2);

    const bestRank2 = Math.min.apply(null, userContests2.map((data) => {
        return data.rank;
    }))

    const worstRank2 = Math.max.apply(null, userContests2.map((data) => {
        return data.rank;
    }))

    const maxUp2 = Math.max.apply(null, userContests2.map((data) => {
        return data.newRating - data.oldRating;
    }))

    const maxDown2 = Math.min.apply(null, userContests2.map((data) => {
        return data.newRating - data.oldRating;
    }))

    const rows = [
        { id: 1, name: 'No. of contests', data1: userContests1.length, data2: userContests2.length },
        { id: 2, name: 'Best Rank', data1: bestRank1, data2: bestRank2 },
        { id: 3, name: 'Worst Rank', data1: worstRank1, data2: worstRank2 },
        { id: 4, name: 'Max Rating Up', data1: maxUp1, data2: maxUp2 },
        { id: 5, name: 'Max Rating Down', data1: maxDown1, data2: maxDown2 }
    ]

    return (
        <div>
            <CompareCustomTable rows={rows} TableName='Contest Info' username1={username1} username2={username2} />
        </div>
    )

}

export default CompareContestInfo;