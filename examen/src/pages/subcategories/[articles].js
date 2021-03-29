import React, {useState, useEffect} from 'react'
import Link from "next/link";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Modal,
    TextField
} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles";
import Comments from "@/components/Comments";
import {useAuth} from "@/lib/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
        marginBottom: 40,
    },
    media: {
        height: 200
    },
    center: {
        justifyContent: 'center'
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    modal: {
        position: 'absolute',
        width: 1000,
        height: 700,
        backgroundColor: 'white',
        border: '0px #000',
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    textfields: {
        width: '100%'
    }
}));

const Articles = ({articles}) => {
    console.log('articles', articles)
    const {user} = useAuth()
    console.log('user', user)

    if (!articles) {
        return 'No se pudo obtener un artículo'
    }
    const classes = useStyles();
    const [modal, setModal] = useState(false)
    const [articleId, setArticleId] = useState(null)

    const handleCloseModal = () => {
        setModal(false)
    }
    const handleOpenModal = () => {
        // console.log('id del articulo', id)
        setModal(true)
        //setArticleId(id)
    }

    const body = (
        <div className={classes.modal}>
            <div align='center'>
                <h2>Articulo</h2>
            </div>
            <TextField label="Nombre" className={classes.textfields}/>
            <br/>
            {/*{*/}
            {/*    <Comments articleId={articleId}/>*/}
            {/*}*/}
            <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        </div>
    )

    return (<>
            {
                <Modal
                    open={modal}
                    onClose={() => handleCloseModal()}
                >
                    {body}
                </Modal>
            }
            <Grid container direction='row' justify='space-evenly'>
                {
                    articles.map(article => (
                            <Card className={classes.root} key={article.id}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        src={`https://picsum.photos/300/350?sig=${article.id}`}
                                        title={classes.title}
                                    />
                                    <CardContent>
                                        <div style={{textAlign: 'center'}}>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                                className={classes.title}
                                            >
                                                {article.name}
                                            </Typography>
                                        </div>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                            className={classes.body}
                                        >
                                            {article.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                                <CardActions className={classes.center}>
                                    {
                                        user === false ? (
                                            <>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    disabled={true}
                                                >
                                                    Obtener
                                                </Button>
                                                <p>
                                                    Inicie sesion
                                                </p>
                                            </>


                                        ) : (
                                            <Link href={`/articles/${article.id}`} passHref>
                                                < Button
                                                    size="small"
                                                    color="primary"
                                                >
                                                    Obtener
                                                </Button>
                                            </Link>

                                        )
                                    }
                                </CardActions>
                            </Card>
                        )
                    )
                }
            </Grid>
        </>
    )
}
export default Articles;

export async function getStaticProps(context) {

    const subcategoryId = parseInt(context.params.articles)
    console.log('id de la categoria', subcategoryId);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`);
    const data = await response.json();

    console.log('data', data);

    if (!data) {
        return {
            notFound: true,
        }
    }
    const exact = data.data.filter(article => article.subCategory_id === subcategoryId)
    console.log('exact', exact)
    return {
        props: {
            articles: exact
        }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`)
    const data = await response.json()

    const paths = data.data.map(article => {
        return {params: {articles: '' + article.subCategory_id}}
    })

    return {
        paths,
        fallback: false // See the "fallback" section below
    };
}