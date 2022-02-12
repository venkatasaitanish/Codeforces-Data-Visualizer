import CompareCustomTable from './CompareCustomTable';

const CompareUserInfo = ({ userInfo1, userInfo2, username1, username2 }) => {

    //const name1 = userInfo1.firstName + " " + userInfo1.lastName;
    let name1 = userInfo1.firstName;
    if (userInfo1.lastName) {
        name1 += " " + userInfo1.lastName;
    }
    const country1 = userInfo1.country;
    const rating1 = userInfo1.rating + ' (' + userInfo1.rank + ')';
    const maxRating1 = userInfo1.maxRating + ' (' + userInfo1.maxRank + ')';
    const contribution1 = userInfo1.contribution;

    //const name2 = userInfo2.firstName + " " + userInfo2.lastName;
    let name2 = userInfo2.firstName;
    if (userInfo2.lastName) {
        name2 += " " + userInfo2.lastName;
    }
    const country2 = userInfo2.country;
    const rating2 = userInfo2.rating + ' (' + userInfo2.rank + ')';
    const maxRating2 = userInfo2.maxRating + ' (' + userInfo2.maxRank + ')';
    const contribution2 = userInfo2.contribution;

    const rows = [
        { id: 1, name: 'Name', data1: name1, data2: name2 },
        { id: 2, name: 'Country', data1: country1, data2: country2 },
        { id: 3, name: 'Rating', data1: rating1, data2: rating2 },
        { id: 4, name: 'Max Rating', data1: maxRating1, data2: maxRating2 },
        { id: 5, name: 'Contribution', data1: contribution1, data2: contribution2 }
    ]


    return (
        <div>
            <CompareCustomTable rows={rows} TableName='User Info' username1={username1} username2={username2} />
        </div>
    )

}

export default CompareUserInfo;