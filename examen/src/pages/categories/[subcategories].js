import React from 'react';
import Link from "next/link";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid
} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        marginBottom: 40,
    },
    media: {
        height: 350
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
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
    },
});

const Articles = ({subcategory}) => {
    console.log('subcategorias', subcategory)
    const classes = useStyles();
    if (!subcategory) {
        return 'No se pudo obtener una subcategoría'
    }
    return (
        <Grid container direction='row' justify='space-evenly'>
            {
                subcategory.map((subcategory) => (
                        <Card className={classes.root} key={subcategory.id}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    src={`https://picsum.photos/300/350?sig=${subcategory.id}`}
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
                                            <Link href={`/subcategories/${subcategory.id}`}>{subcategory.name}</Link>
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                )
            }
        </Grid>
    )

    // return (
    //     <div>
    //         <ul>
    //             {
    //                 subcategory.map(subcategory => {
    //                     return (
    //                         <li key={subcategory.id}>
    //                             <Link href={`/subcategories/${subcategory.id}`}>{subcategory.name}</Link>
    //                         </li>
    //                     )
    //                 })
    //             }
    //         </ul>
    //     </div>
    // );
};

export default Articles;


export async function getStaticProps(context) {

    const categoryId = parseInt(context.params.subcategories)
    console.log('id de la categoria', categoryId)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subcategories`)
    const data = await response.json()
    // console.log('data', data.data)
    if (!data) {
        return {
            notFound: true,
        }
    }

    const exact = data.data.filter(subcategory => subcategory.category_id === categoryId)

    return {
        props: {
            subcategory: exact
        }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subcategories`)
    const data = await response.json()
    const paths = data.data.map(subcategory => {
        return {params: {subcategories: '' + subcategory.categories_id}}
    })

    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}