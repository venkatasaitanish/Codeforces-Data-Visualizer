import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, Button, TextField} from '@material-ui/core';

import { CompareUserInfo, CompareContestInfo, CompareContestRatingGraph, CompareProblemIndexGraph, CompareProblemRatingGraph, CompareSubmissionsGraph, CompareCommonContestsChart, CompareCommonContestsTable} from '../components/Compare';
import styles from './Compare.module.css';

const Compare = () => {

    const inp1 = useRef(null);
    //const [currname1, setCurrname1] = useState('');
    const [username1, setUsername1] = useState('');
    const [userInfo1, setUserInfo1] = useState('');
    const [userContests1, setUserContests1] = useState('');
    const [userSubmissions1, setUserSubmissions1] = useState('');

    const inp2 = useRef(null);
    //const [currname2, setCurrname2] = useState('');
    const [username2, setUsername2] = useState('');
    const [userInfo2, setUserInfo2] = useState('');
    const [userContests2, setUserContests2] = useState('');
    const [userSubmissions2, setUserSubmissions2] = useState('');

    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user1 = inp1.current.value;
        let user2 = inp2.current.value;
        setUsername1(user1.toLowerCase());
        setUsername2(user2.toLowerCase());
        //setUsername1(currname1);
        //setUsername2(currname2);
    }

    function renderData() {
        
        // if(userInfo1 && username1 === userInfo1.handle && userInfo2 && username2 === userInfo2.handle){
        if(userInfo1 && userInfo2){
            return (
                <>
                    <div className={styles.narrowOuter}>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item xs={12} sm={12} md={10} lg={8}>
                                <div className={styles.narrowComponent}>
                                    <CompareUserInfo userInfo1={userInfo1} userInfo2={userInfo2} username1={username1} username2={username2} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10} lg={8}>
                                <div className={styles.narrowComponent}>
                                    <CompareContestInfo userContests1={userContests1} userContests2={userContests2} username1={username1} username2={username2} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={styles.broadComponent}>
                        <CompareContestRatingGraph userContests1={userContests1} userContests2={userContests2} username1={username1} username2={username2} maxRating1={userInfo1.maxRating} maxRating2={userInfo2.maxRating} />
                    </div>

                    <div className={styles.broadComponent}>
                        <CompareProblemRatingGraph userSubmissions1={userSubmissions1} userSubmissions2={userSubmissions2} username1={username1} username2={username2} />
                    </div>

                    <div className={styles.broadComponent}>
                        <CompareProblemIndexGraph userSubmissions1={userSubmissions1} userSubmissions2={userSubmissions2} username1={username1} username2={username2} />
                    </div>

                    <div className={styles.narrowOuter}>
                        <Grid container spacing={6} justifyContent="center">
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={styles.narrowComponent}>
                                    <CompareSubmissionsGraph userSubmissions1={userSubmissions1} userSubmissions2={userSubmissions2} username1={username1} username2={username2} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={styles.narrowComponent}>
                                    <CompareCommonContestsChart userContests1={userContests1} userContests2={userContests2} username1={username1} username2={username2} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={styles.broadComponent}>
                        <CompareCommonContestsTable userContests1={userContests1} userContests2={userContests2} username1={username1} username2={username2} />
                    </div>
                </>
            )
        }
        
    }

    function renderError() {
        return (
            <div className={styles.invalid}>
                <Alert severity="error">
                    <AlertTitle> <strong>Oops!</strong> </AlertTitle>
                    It seems like you entered an <strong>invalid username</strong>.
                </Alert>
            </div>
        );
    }

    function renderWarning() {
        return (
            <div className={styles.invalid}>
                <Alert severity="warning">
                    <AlertTitle> <strong>Oops!</strong> </AlertTitle>
                    Please enter 2 different usernames to compare.
                </Alert>
            </div>
        );
    }

    useEffect(() => {

        const fetchData = async () => {

            try {
                const responseUI1 = await axios(`https://codeforces.com/api/user.info?handles=${username1}`);
                console.log(responseUI1.status);
                let user1 = responseUI1.data.result[0];
                setUserInfo1(user1);
                const responseUI2 = await axios(`https://codeforces.com/api/user.info?handles=${username2}`);
                console.log(responseUI2.status);
                let user2 = responseUI2.data.result[0];
                setUserInfo2(user2);
                setError(false);
            } catch (err) {
                setError(true);
            }

            const responseUC1 = await axios(`https://codeforces.com/api/user.rating?handle=${username1}`);
            let user1 = responseUC1.data.result;
            setUserContests1(user1);

            const responseUC2 = await axios(`https://codeforces.com/api/user.rating?handle=${username2}`);
            let user2 = responseUC2.data.result;
            setUserContests2(user2);

            const responseUS1 = await axios(`https://codeforces.com/api/user.status?handle=${username1}`)
            user1 = responseUS1.data.result;
            setUserSubmissions1(user1);

            const responseUS2 = await axios(`https://codeforces.com/api/user.status?handle=${username2}`)
            user2 = responseUS2.data.result;
            setUserSubmissions2(user2);
        }

        if(username1 !== '' && username2 !== ''){
            fetchData();
        }

    }, [username1, username2]);

    return (
        <div>
            <form className={styles.form} noValidate autoComplete="on" onSubmit={handleSubmit} >
                <div className={styles.flexContainer}>
                    <TextField
                        className={styles.textInput}
                        //onChange={(e) => setCurrname1(e.target.value)}
                        label="Codeforces Username 1"
                        variant="outlined"
                        color="primary"
                        inputRef={inp1}
                        required
                    />
                    <TextField
                        className={styles.textInput}
                        //onChange={(e) => setCurrname2(e.target.value)}
                        label="Codeforces Username 2"
                        variant="outlined"
                        color="primary"
                        inputRef={inp2}
                        required
                    />
                    <Button
                        className={styles.btn}
                        type="submit"
                        color="secondary"
                        variant="contained"
                    > Submit </Button>
                </div>

            </form>
            {(username1 !== '' && username2 !== '') ? (error ? renderError() : (username1===username2) ? renderWarning() : renderData()) : null}
        </div>
    )
}

export default Compare;