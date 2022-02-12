import CustomTable from './CustomTable';

const UserInfo = ({ userInfo}) => {

    //const name = userInfo.firstName + " " + userInfo.lastName;
    let name = userInfo.firstName;
    if(userInfo.lastName){
        name += " " + userInfo.lastName;
    }
    const country = userInfo.country;
    const rating = userInfo.rating + ' (' + userInfo.rank + ')';
    const maxRating = userInfo.maxRating + ' (' + userInfo.maxRank + ')';
    const contribution = userInfo.contribution;

    const rows = [
        { id: 1, name: 'Name', data: name },
        { id: 2, name: 'Country', data: country },
        { id: 3, name: 'Rating', data: rating },
        { id: 4, name: 'Max Rating', data: maxRating },
        { id: 5, name: 'Contribution', data: contribution }
    ]


    return (
        <div>
            <CustomTable rows={rows} TableName='User Info' />
        </div>
    )

}

export default UserInfo;