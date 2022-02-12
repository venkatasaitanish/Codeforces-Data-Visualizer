import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import {styles} from './Header.module.css';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
    header: {
        // background: 'rgb(50, 8, 11)',
        background: 'rgba(44, 44, 44, 0.9)'
    },
    btn: {
        color: 'white',
        marginRight: 16,
    },
    navLink: {
        textDecoration: 'none',
    }
});

const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.header} position='static'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Codeforces Visualizer
                    </Typography>
                    {/* <img className={styles.logo} src={logo} alt="logo" /> */}
                    
                    <Link to="/" className={classes.navLink}>
                        <Button color="inherit" className={classes.btn}>
                            <PersonIcon />
                            Single User
                        </Button>
                    </Link>

                    <Link to="/compare" className={classes.navLink}>
                        <Button color="inherit" className={classes.btn}>
                            <PeopleIcon />
                            Compare
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
