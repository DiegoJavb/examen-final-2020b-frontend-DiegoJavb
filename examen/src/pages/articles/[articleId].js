import React, {useState} from 'react'
import withAuth from "@/hocs/withAuth";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useAuth} from "@/lib/auth";
import {useRouter} from "next/router";
import {CardContent, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

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
    }

}));

const Capitalized = (word) => {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    return word
}

const ArticleDetails = () => {
    const classes = useStyles();
    const {user} = useAuth();
    console.log('user', user)
    const router = useRouter();
    const {articleId} = router.query
    const {data, error} = useSWR(`/articles/${articleId}`, fetcher)
    const [loading, setLoading] = useState(false);
    console.log('data', data)
    return (
        <div>

            <Grid container style={{minHeight: '70vh'}}>
                <Grid container xs={8}>
                    <Grid container xs={12}>

                        sds
                        {/*{*/}
                        {/*    data.images.map(image => {*/}
                        {/*        return (*/}
                        {/*            <Card>*/}
                        {/*                <CardMedia>{image}</CardMedia>*/}
                        {/*            </Card>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </Grid>
                    <Grid xs={12}>
                        tyty
                    </Grid>
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
                            <Typography variant="body2" color="textSecondary" component="p">
                                Teléfono: {user.user.phone}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Provincia: {Capitalized(user.user.province)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Sector: {Capitalized(user.user.sector)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Hacer Petición</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
export default withAuth(ArticleDetails);