import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {TableHead, TableBody, Button} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Link from "next/link";
import {useAuth} from "@/lib/auth";

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {
    const {user} = useAuth();
    const classes = useStyles2();


    const {data, error} = useSWR(`/suppliers`, fetcher)
    if (error) return <div>No se pudo cargar los proveedores </div>
    if (!data) return <div>Cargando proveedores</div>
    // const tableFiltered = data.filter(product=>user.id===product.user_id)
    // console.log('tableFiltered', tableFiltered)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Identificacion</StyledTableCell>
                        <StyledTableCell align="right">Nombre</StyledTableCell>
                        <StyledTableCell align="right">Registrado por</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.name}
                                </TableCell>
                                {/*<TableCell style={{width: 160}} align="right">*/}
                                {/*    {row.price}*/}
                                {/*</TableCell>*/}
                                <TableCell style={{width: 300}} align="right">
                                    {row.registered_by}
                                </TableCell>

                            </TableRow>
                        ))}

                </TableBody>

            </Table>
        </TableContainer>
    );
}
