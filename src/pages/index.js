import React, { useState, useCallback } from "react";
import {
    Typography,
    Container,
    Grid,
    TextField,
    Card,
    CardContent,
    CardMedia,
    makeStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { debounce } from "throttle-debounce";
import { Helmet } from "react-helmet";
import { Layout } from "../components/layout";

const useStyles = makeStyles(theme => ({
    hero: {
        backgroundColor: "#444",
        backgroundSize: "cover",
        color: "#fff",
        height: "500px",
        display: "flex",
        alignItems: "center",
    },
    cardImage: {
        height: "150px",
    },
    title: {
        marginTop: "30px",
    },
    link: {
        color: "#fff",
    },
    input: {
        background: "#fff",
        width: "300px",
    },
    assoSearchSection: {
        marginTop: "50px",
    },
    searchBar: {
        borderRadius: "4px",
        marginTop: "20px",
    },
    associationsCount: {
        marginTop: "20px",
    },
    associationsList: {
        marginTop: "20px",
    },
}));

export default function Home() {
    const classes = useStyles();
    const [associationsNum, setAssociationsNum] = useState(0);
    const [associations, setAssociations] = useState([]);

    const cleanAssoTitle = title => {
        const words = title.split(" ");

        const wordsReduced = words.reduce((accumulator, currentVal) => {
            if (typeof accumulator === "string") {
                return [accumulator];
            }

            if (accumulator.some(x => x === currentVal)) {
                return [...accumulator];
            }

            return [...accumulator, currentVal];
        });

        if (typeof wordsReduced === "string") {
            return wordsReduced;
        }

        return wordsReduced.join(" ");
    };

    const getAssociations = useCallback(
        debounce(500, false, (event, newValue) => {
            if (!newValue) return;
            (async () => {
                const response = await fetch(
                    `https://entreprise.data.gouv.fr/api/rna/v1/full_text/${newValue}`
                );
                const data = await response.json();
                if (!data.association) return;
                const associations = data.association
                    .filter(x => x.titre_court || x.titre)
                    .map(x => {
                        if (x.titre_court) {
                            x.titre_court = cleanAssoTitle(x.titre_court);
                        } else {
                            x.titre = cleanAssoTitle(x.titre);
                        }

                        return x;
                    });
                setAssociationsNum(data.total_results);
                setAssociations(associations);
            })();
        }),
        []
    );

    return (
        <>
            <Helmet>
                <title>Charitappeal</title>
            </Helmet>
            <Layout>
                <section className={classes.hero}>
                    <Container>
                        <Typography variant="h3">
                            Un répertoire d'associations pour vous permettre de
                            donner à ceux qui en ont besoin. <br />
                            Une communauté active.
                        </Typography>
                    </Container>
                </section>
                <Container>
                    <section className={classes.assoSearchSection}>
                        <Typography className={classes.title} variant="h4">
                            Trouver une association
                        </Typography>

                        <Grid
                            container
                            alignItems="stretch"
                            className={classes.searchBar}
                            spacing={1}
                        >
                            <Grid item>
                                <Autocomplete
                                    onInputChange={getAssociations}
                                    options={associations}
                                    getOptionLabel={option =>
                                        option.titre_court || option.titre
                                    }
                                    classes={{
                                        inputRoot: classes.input,
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            className={classes.field}
                                            label="Nom de l'association"
                                            placeholder="Quelle association ?"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    options={[]}
                                    getOptionLabel={option => option.title}
                                    classes={{
                                        inputRoot: classes.input,
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Localisation"
                                            placeholder="Où ça ?"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    options={[]}
                                    getOptionLabel={option => option.title}
                                    classes={{
                                        inputRoot: classes.input,
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Thème"
                                            placeholder="Dans quel domaine ?"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        {associationsNum > 0 && (
                            <Typography className={classes.associationsCount}>
                                {associationsNum} associations à découvrir
                            </Typography>
                        )}
                        <Grid
                            className={classes.associationsList}
                            container
                            spacing={3}
                        >
                            {associations.map(x => (
                                <Grid item sm={4} key={x.id}>
                                    <Card>
                                        <CardMedia
                                            className={classes.cardImage}
                                            image="https://via.placeholder.com/400x150/?text=Image+association"
                                        />
                                        <CardContent>
                                            <Typography variant="h5">
                                                {x.titre_court || x.titre}
                                            </Typography>
                                            <p>{x.adresse_libelle_commune}</p>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </section>
                </Container>
            </Layout>
        </>
    );
}
