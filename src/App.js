import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Header, Footer } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe } from './redux/slices/auth';

import Container from "@mui/material/Container";
import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<FullPost />} />
              <Route path="/posts/:id/edit" element={<AddPost />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
