import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useAuth} from "../lib/auth";
import {Button, CardContent, Grid, Link as MuiLink} from "@material-ui/core";
import Routes from "../constants/routes";
import Link from 'next/link';
import React from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function Home() {
    const {login, user} = useAuth();
    const classes = useStyles();

    return (
        <div className={styles.container}>
            <Head>
                <title>Examen Final</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Examen Final
                </h1>
                <Grid container item xs={12}
                      alignItems='center'
                      direction='column'
                      justify='space-between'
                      style={{minHeight: '50vh'}}
                >
                    <div className={styles.grid}>
                        <Grid container>
                            <Link href='/products'>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <a className={styles.card}>
                                                    Lista de Productos
                                                </a>

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                            <Link href='/'>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <a className={styles.card}>
                                                    Proveedores
                                                </a>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>

                    </div>
                </Grid>

            </main>

        </div>
    )
}