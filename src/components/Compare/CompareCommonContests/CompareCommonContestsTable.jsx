import { useState } from 'react';
import { Link, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TablePagination, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableHead1: {
        backgroundColor: 'rgb(62, 132, 212, 0.8)'
    },
    tableHead2: {
        backgroundColor: 'rgb(193, 232, 247)'
    },
});

const contest_url = 'https://codeforces.com/contest/';

const CompareCommonContestsTable = ({ userContests1, userContests2, username1, username2 }) => {
    const classes = useStyles();

    let contest1 = new Map();
    for(let i=0; i<userContests1.length; i++) {
        contest1.set(userContests1[i].contestId, userContests1[i]);
    }

    let rows = [];
    for(let i=0; i<userContests2.length; i++){
        if(!contest1.has(userContests2[i].contestId)){
            continue;
        }

        rows.push({
            name: userContests2[i].contestName,
            url: `${contest_url}/${userContests2[i].contestId}`,
            rank1: contest1.get(userContests2[i].contestId).rank,
            rank2: userContests2[i].rank,
            diff: contest1.get(userContests2[i].contestId).rank - userContests2[i].rank,
        })
    }

    rows = rows.reverse();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <TableContainer component = {Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead1} align='center' colSpan={4}><strong>Common Contests Comparision</strong></TableCell>
                        </TableRow>
                        <TableRow className={classes.tableHead2}>
                            <TableCell>Contest</TableCell>
                            <TableCell align='right'>{username1}</TableCell>
                            <TableCell align='right'>{username2}</TableCell>
                            <TableCell align='right'>Difference</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
                            .map((row) => {
                            return(
                                <TableRow key={row.name} style={ row.diff === 0 ? { backgroundColor: 'rgba(255, 206, 86, 0.4)' } : row.diff>0 ? { backgroundColor: 'rgba(28, 109, 208, 0.4)' } : { backgroundColor: 'rgba(255, 99, 132, 0.4)' } }>
                                    <TableCell component='th' scope='row'><Link href={row.url} underline='hover' target='_blank'>{row.name}</Link></TableCell>
                                    <TableCell align='right'>{row.rank1}</TableCell>
                                    <TableCell align='right'>{row.rank2}</TableCell>
                                    <TableCell align='right'>{Math.abs(row.diff)}</TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                //className={classes.tableHead1}
                rowsPerPageOptions={[10, 25, 50]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )

}

export default CompareCommonContestsTable;
