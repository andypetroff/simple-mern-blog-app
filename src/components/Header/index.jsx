import React from 'react';

import { env } from '../../config';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Do you really want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>{env.BLOG_NAME}</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                {/* 
                <div className={styles.welcome}>Welcome, fullName</div> 
                */}
                <Link to="/add-post">
                  <Button variant="contained">Add a new post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="contained">Create an account</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
