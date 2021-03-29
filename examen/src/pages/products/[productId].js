import React, {useState} from 'react'
import withAuth from "@/hocs/withAuth";
import useSWR from "swr";
import {fetcher, pusher} from "@/lib/utils";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useAuth} from "@/lib/auth";
import {useRouter} from "next/router";
import {CardContent, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
    buttonWrapper: {
        textAlign: "center",
    },
    padd: {
        paddingLeft: 10
    },
    view: {
        minWidth: '100vh'
    },
    cover: {
        width: 160,
    },
    root: {
        maxWidth: 300,
        height: 200,
        heigth: 150,
        marginLeft: 20,
        marginBottom: 30,
    },
    rootComment: {
        marginBottom: 20
    },

}));

const Capitalized = (word) => {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    return word
}
const userId = (user) => {
    let regex = /\d+/g;
    let userId = parseInt(user.match(regex));
    return userId
}

const ArticleDetails = () => {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const router = useRouter();
    const {productId} = router.query
    const {user} = useAuth();
    console.log('user', user)
    const {data, error} = useSWR(`/products/${productId}`, fetcher)
    if (error) return <div>No se pudo cargar el producto </div>
    if (!data) return <div>Cargando productos </div>
    console.log('data', data)
    return (
        <div>

            <Grid container style={{minHeight: '50vh'}}>
                <Grid container xs={12}>
                    <Grid container xs={8} spacing={3}>
                        <Card className={classes.root}>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="200"
                                title={data.name}
                                className={classes.cover}
                                image='https://picsum.photos/300/350'
                            />
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Usuario: {user.user.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Correo: {user.user.email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                    <Grid container xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <b>Producto</b>: {data.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <b>Stock</b>: {data.status}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <b>Costo</b>: {data.price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <b>Codigo de producto</b>: {data.code}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

        </div>
    )
}
export default withAuth(ArticleDetails);