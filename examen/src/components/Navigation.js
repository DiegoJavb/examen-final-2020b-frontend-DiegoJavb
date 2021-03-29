import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import {Menu, Link as MuiLink} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useAuth} from "@/lib/auth";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const {user, logout} = useAuth()
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{marginBottom: 40}}>
                <Toolbar >
                    <Link href='/' passHref>
                        <Button>
                            <h2 style={{color: 'white'}}>Inicio</h2>
                        </Button>
                    </Link>
                    <div className={classes.grow}/>
                    <div>
                        {
                            user === false ? (
                                <Link href='/login' passHref>
                                    <Button style={{color: 'white'}}>
                                        <Typography className={classes.title} variant="h7">Iniciar Sesion</Typography>
                                    </Button>
                                </Link>

                            ) : (
                                <Link href='/' passHref>
                                    <Button style={{color: 'white'}} onClick={handleLogout}>
                                        <Typography className={classes.title} variant="h7">Salir</Typography>
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
