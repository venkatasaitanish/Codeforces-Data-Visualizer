import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableHead:{
        backgroundColor: 'rgb(62, 132, 212, 0.8)'
    },
    tableBody: {
        backgroundColor: 'rgb(193, 232, 247, 0.9)'
        //backgroundColor: 'rgb(176, 234, 250)'
    },
    cell: {
        borderBottom: 'none'
    }  
});

const CustomTable = ({rows, TableName}) => {
    const classes = useStyles();
    return(
        <div>
            <TableContainer>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.cell} align='center' colSpan={2}><strong>{TableName}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.cell} component='th' scope='row'><strong>{row.name}</strong></TableCell>
                                <TableCell className={classes.cell} align='right'><strong>{row.data}</strong></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CustomTable;