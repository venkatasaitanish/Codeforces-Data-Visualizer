import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableHead: {
        backgroundColor: 'rgb(62, 132, 212, 0.8)'
    },
    tableBody: {
        backgroundColor: 'rgb(193, 232, 247)'
    },
    cell: {
        borderBottom: 'none'
    }
});

const CustomTable = ({ rows, TableName, username1, username2 }) => {
    const classes = useStyles();
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.cell}><strong>{TableName}</strong></TableCell>
                            <TableCell className={classes.cell} align='right'><strong>{username1}</strong></TableCell>
                            <TableCell className={classes.cell} align='right'><strong>{username2}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.cell} component='th' scope='row'><strong>{row.name}</strong></TableCell>
                                <TableCell className={classes.cell} align='right'><strong>{row.data1}</strong></TableCell>
                                <TableCell className={classes.cell} align='right'><strong>{row.data2}</strong></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CustomTable;