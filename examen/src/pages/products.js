import React, {useState} from 'react'
import Table from "../components/Table"
import withAuth from "@/hocs/withAuth";
import {useAuth} from "@/lib/auth";
import Link from "next/link";
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Modal,
    TextField,
    Button
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from '../styles/Home.module.css'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import api from "@/lib/api";

const schema = yup.object().shape({
    name: yup.string().required('Ingrese el nombre'),
    code: yup
        .string()
        .required("Ingrese el código"),
    price: yup
        .string()
        .required("Ingrese el precio."),

});

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    modal: {
        position: "absolute",
        width: 500,
        backgroundColor: 'white',
        borderColor: '#000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3, 4),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
}));

const Products = () => {
    const {user} = useAuth();
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    })
    const abrirCerrarModal = () => {
        setModal(!modal)
    };
    const onSubmit = async (data) => {
        setLoading(true);
        console.log('data', data)
        try {
            const response = await api.post('/products', data)
            console.log('response',response )
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
        abrirCerrarModal();
    }

    const body = (
        <div className={classes.modal}>
            <div align='center'>
                <h2>Registro producto</h2>
            </div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id='name'
                    name='name'
                    type='name'
                    label='Nombre'
                    inputRef={register}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                /><br/><br/>
                <TextField
                    id='code'
                    name='code'
                    type='string'
                    label='Codigo'
                    inputRef={register}
                    error={!!errors.code}
                    helperText={errors.code?.message}
                /><br/><br/>
                <TextField
                    id='price'
                    name='price'
                    type='string'
                    label='Precio'
                    inputRef={register}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                /><br/><br/>
                <div align='right'>
                    <Button
                        name="submit"
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={loading}
                    >
                        Registrar
                    </Button>
                </div>
            </form>

        </div>
    )

    return (
        <>
            <Modal
                open={modal}
                onClose={abrirCerrarModal}
            >
                {body}
            </Modal>
            <div>
                <h1>
                    Usuario: {user.user.name}
                </h1>
            </div>
            <Button onClick={() => abrirCerrarModal()}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <a className={styles.card}>
                                    Agregar Producto
                                </a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Button>
            <Table/>
        </>
    )


}
export default withAuth(Products);