import React from "react";

import { useSelector } from "react-redux";

import { useNavigate, Navigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const isAuth = useSelector(selectIsAuth);

  const [text, setText] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      console.log(data)

      setImageUrl(data.url);

    } catch (err) {
      console.warn(err);
      alert('Failed to upload the file!');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl, 
        tags, 
        text,
      };

      const { data } = isEditing 
      ? await axios.patch(`/posts/${id}`, fields)
      : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);

    } catch (err) {
      console.warn(err);
      alert(
        'Failed to create or update the post content!\n\n' +
        'Possible issue:\n' +  
        'Title and text must have at least 3 and 5 symbols!'
      );
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(', '));
        setImageUrl(data.imageUrl);
      }).catch(err => {
        console.warn(err);
        alert('Failed to get the post content!');
      });
    }
    // eslint-disable-next-line
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Your text",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Upload post image
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete post image
          </Button>
          <img
            className={styles.image}
            src={imageUrl}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Update' : 'Submit' }
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
