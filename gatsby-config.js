/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

//import theme from "./src/gatsby-theme-material-ui-top-layout";

module.exports = {
    /* Your site config here */
    pathPrefix: "/assofinder",
    plugins: [
        {
            resolve: "gatsby-theme-material-ui",
            options: {},
        },
    ],
};
