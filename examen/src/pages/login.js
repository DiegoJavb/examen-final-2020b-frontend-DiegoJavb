import React, {useState} from 'react';
import {Button, Grid, InputAdornment, TextField} from '@material-ui/core'
import {AccountCircle, LockRounded} from '@material-ui/icons'
import Link from 'next/link'
import {useAuth} from "../lib/auth";
import {Article} from "../lib/articles";
import withoutAuth from "@/hocs/withoutAuth";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import makeStyles from "@material-ui/core/styles/makeStyles";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingrese un email válido")
        .required("Ingrese su email."),
    password: yup.string().required("Ingrese su clave"),
});

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
    buttonWrapper: {
        textAlign: "center",
    },
    padd: {
        paddingLeft: 10
    }
}));

const Login = () => {
    const {login} = useAuth();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        setLoading(true);
        console.log('data', data)
        try {
            const userData = await login(data)
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

    };

    // const handleViewComments = async () => {
    //     try {
    //         const articleData = await Article.getById('1');
    //         console.log('articleData', articleData)
    //     } catch (error) {
    //         if (error.response) {
    //             // The request was made and the server responded with a status code
    //             // that falls out of the range of 2xx
    //             console.log(error.response.data);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //             // http.ClientRequest in node.js
    //             console.log(error.request);
    //         } else {
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //     }
    //
    // };


    return (
        <div>
            <Grid container style={{minHeight: '100vh'}}>
                <Grid item xs={12} sm={6}>
                    <img
                        src='https://picsum.photos/300/350'
                        style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            alt: 'brand'
                        }}
                    />
                </Grid>
                <Grid container item xs={12} sm={6}
                      alignItems='center'
                      direction='column'
                      justify='space-between'
                      style={{padding: 10}}
                >
                    <div/>
                    <div style={{display: 'flex', flexDirection: 'column', maxWidth: 300, minWidth: 400}}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid xs={12} item>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Correo electrónico"
                                        inputRef={register}
                                        autoComplete="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Clave"
                                        inputRef={register}
                                        autoComplete="current-password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid>

                                <Grid xs={12} item>
                                    <Button
                                        name="submit"
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={loading}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Grid>
                                <Grid className={classes.padd}>
                                    <p style={{marginTop: 10, marginBottom: 10}}>No tienes cuenta? registrate</p>
                                </Grid>
                                <Grid xs={12} item className={classes.buttonWrapper}>
                                    <Link href={'/register'}>
                                        <Button color='primary' variant='contained'>Registro</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <div/>
                </Grid>
            </Grid>

        </div>
    );
};

export default withoutAuth(Login);