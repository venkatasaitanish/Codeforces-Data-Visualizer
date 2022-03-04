import React, { useState, useEffect, useRef} from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Grid, TextField, Button} from '@material-ui/core';

import {UserInfo, ContestInfo, ContestRatingGraph, ProblemTagGraph, ProblemVerdictChart, ProblemLanguageChart, ProblemRatingGraph, ProblemIndexGraph, SubmissionsGraph } from '../components/SingleUser';
import styles from './SingleUser.module.css';

const SingleUser = () => {

    const inp = useRef(null);
    //const [currname, setCurrname] = useState('');
    const [username, setUsername] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [userContests, setUserContests] = useState('');
    const [userSubmissions, setUserSubmissions] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsername(inp.current.value);
        //setUsername(currname);
        //fetchData();
    }

    function renderData() {

        if (userInfo) {
            return (
                <>
                    <div className={styles.narrowOuter}>
                        <Grid container spacing={6} justifyContent='center'>
                            <Grid item xs={12} sm={8} md={6} lg={6}>
                                <div className={styles.narrowComponent}>
                                    <UserInfo userInfo={userInfo} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8} md={6} lg={6}>
                                <div className={styles.narrowComponent}>
                                    <ContestInfo userContests={userContests} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={styles.broadComponent} >
                        <ContestRatingGraph userContests={userContests} maxRating={userInfo.maxRating} />
                    </div>

                    <div className={styles.broadComponent}>
                        <ProblemTagGraph userSubmissions={userSubmissions} />
                    </div>

                    <div className={styles.narrowOuter}>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <div className={styles.narrowComponent}>
                                    <ProblemVerdictChart userSubmissions={userSubmissions} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <div className={styles.narrowComponent}>
                                    <ProblemLanguageChart userSubmissions={userSubmissions} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4}>
                                <div className={styles.narrowComponent}>
                                    <SubmissionsGraph userSubmissions={userSubmissions} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={styles.broadComponent}>
                        <ProblemRatingGraph userSubmissions={userSubmissions} />
                    </div>
                    <div className={styles.broadComponent}>
                        <ProblemIndexGraph userSubmissions={userSubmissions} />
                    </div>

                    {/* <Footer /> */}
                </>
            )
        }
    }

    function renderError(){
        return (
            <div className={styles.invalid}>
                <Alert severity="error">
                    <AlertTitle> <strong>Oops!</strong> </AlertTitle>
                    It seems like you entered an <strong>invalid username</strong>.
                </Alert>
            </div>
        );
    }

    useEffect(() => {

        const fetchData = async () => {
            // console.log(username);

            try {
                const responseUI = await axios(`https://codeforces.com/api/user.info?handles=${username}`);
                console.log(responseUI.status);
                let user = responseUI.data.result[0];
                setUserInfo(user);
                setError(false);
            } catch (error) {
                setError(true);
            }

            // const responseUI = await axios(`https://codeforces.com/api/user.info?handles=${username}`);
            // if (responseUI.status === 404) {
            //     setError(true);
            // }
            const responseUC = await axios(`https://codeforces.com/api/user.rating?handle=${username}`);
            let user = responseUC.data.result;
            setUserContests(user);

            const responseUS = await axios(`https://codeforces.com/api/user.status?handle=${username}`)
            user = responseUS.data.result;
            setUserSubmissions(user);
        }

        if(username !== ''){
            fetchData();
        }
    }, [username]);

    return (
        <div>
            <form className={styles.form} noValidate autoComplete="on" onSubmit={handleSubmit} >
                <div className={styles.flexContainer}>
                    <TextField
                        className={styles.textInput}
                        //onChange={(e) => setCurrname(e.target.value)}
                        label="Codeforces Username"
                        variant="outlined"
                        color="primary"
                        inputRef={inp}
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
            {username !== '' ? (error ? renderError(): renderData()) : null}
        </div>
    )
}

export default SingleUser;
