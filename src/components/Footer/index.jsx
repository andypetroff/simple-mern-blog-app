import React from "react";

import { env } from "../../config";

import styles from "./Footer.module.scss";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export const Footer = () => {
  return (
    <footer className={styles.root}>
      <Container maxWidth="lg">

        <Grid
          container
          direction="row"
          columnSpacing={2}
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={7} sm={4} md={3} justify="center">
            <h4>What's MERN Stack?</h4>
            <ul className="list-style">
              <li>
                <a href="https://www.mongodb.com/">Mango DB</a>
              </li>
              <li>
                <a href="https://expressjs.com/">Express</a>
              </li>
              <li>
                <a href="https://reactjs.org/">React</a>
              </li>
              <li>
                <a href="https://nodejs.org/">Node</a>
              </li>
            </ul>
          </Grid>

          <Grid item xs={7} sm={4} md={3}>
            <h4>Additional toolkits</h4>
            <ul className="list-style">
              <li>
                <a href="https://axios-http.com/">Axios</a>
              </li>
              <li>
                <a href="https://redux.js.org/">Redux</a>
              </li>
              <li>
                <a href="https://openbase.com/js/bcrypt/">bcrypt</a>
              </li>
              <li>
                <a href="https://jwt.io/">JWT</a>
              </li>
              <li>
                <a href="https://easy-markdown-editor.tk/">EasyMDE</a>
              </li>
              <li>
                <a href="https://mui.com/">Material UI</a>
              </li>
            </ul>
          </Grid>

          <Grid item xs={7} sm={4} md={3}>
            <h4>Cloud service providers</h4>
            <ul className="list-style">
              <li>
                <a href="https://heroku.com/">Heroku</a>
              </li>
              <li>
                <a href="https://vercel.com/">Vercel</a>
              </li>
              <li>
                <a href="https://cloudinary.com/">Cloudinary</a>
              </li>
              <li>
                <a href="https://github.com/">Github</a>
              </li>
            </ul>
          </Grid>
        </Grid>

        <hr />

        <div className={styles.inner}>
          <div className={styles.copyright}>
              {env.BLOG_NAME} &reg; {new Date().getFullYear()}
          </div>
        </div>
      </Container>
    </footer>
  );
};
