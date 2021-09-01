import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';


const Start = () => {
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");

  const handleChanges = e => {
    setInputText(e.target.value);
  };

  const changeTitle = e => {
    e.preventDefault();
    setTitle(inputText);
    setInputText("");
  };
  if (!title)
    return (

      <div> 
        <h1>Your name is {title}</h1>
        <form onSubmit={changeTitle}>
        <TextField onChange={handleChanges} label="Your Name" variant="filled" value={inputText}/>
        </form> 
      </div>
  );
  else {
    return (
    <div>
      <h1>Your name is {title}</h1>
    </div>
    );
  }
};
export default Start;
