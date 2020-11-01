import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    Divider,
    Typography,
    Grid,
    makeStyles,
} from "@material-ui/core";
import {
    Language as LanguageIcon,
    Person as PersonIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    layout: {
        paddingTop: "64px", // Hauteur header
    },
    header: {},
    headerActions: {
        width: "auto",
    },
    headerButton: {
        color: "#fff",
    },
    siteName: {
        flex: 1,
    },
}));

export const Layout = ({ children }) => {
    const classes = useStyles();
    const [anchorLanguageEl, setAnchorLanguageEl] = useState(null);
    const [anchorUserEl, setAnchorUserEl] = useState(null);

    const handleLanguageClick = e => {
        setAnchorLanguageEl(e.currentTarget);
    };

    const handleLanguageClose = () => {
        setAnchorLanguageEl(null);
    };

    const handleUserClick = e => {
        setAnchorUserEl(e.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorUserEl(null);
    };

    return (
        <div className={classes.layout}>
            <AppBar className={classes.header}>
                <Toolbar>
                    <Typography className={classes.siteName} variant="h3">
                        Charitappeal
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                        className={classes.headerActions}
                        alignItems="center"
                    >
                        <Grid item>
                            <Button variant="contained" color="secondary">
                                Vous êtes une association
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                aria-controls="language-select"
                                aria-haspopup="true"
                                className={classes.headerButton}
                                onClick={handleLanguageClick}
                            >
                                <LanguageIcon />
                                <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                open={Boolean(anchorLanguageEl)}
                                onClose={handleLanguageClose}
                                id="language-select"
                                anchorEl={anchorLanguageEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                getContentAnchorEl={null}
                            >
                                <MenuItem onClick={handleLanguageClose}>
                                    Français (FR)
                                </MenuItem>
                                <MenuItem onClick={handleLanguageClose}>
                                    € EUR
                                </MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <Button
                                aria-controls="user-select"
                                aria-haspopup="true"
                                className={classes.headerButton}
                                onClick={handleUserClick}
                            >
                                <PersonIcon />
                                <KeyboardArrowDownIcon />
                            </Button>
                            <Menu
                                open={Boolean(anchorUserEl)}
                                onClose={handleUserClose}
                                id="user-select"
                                anchorEl={anchorUserEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                getContentAnchorEl={null}
                            >
                                <MenuItem onClick={handleUserClose}>
                                    Inscription
                                </MenuItem>
                                <MenuItem onClick={handleUserClose}>
                                    Connexion
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleUserClose}>
                                    Aide
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
};
