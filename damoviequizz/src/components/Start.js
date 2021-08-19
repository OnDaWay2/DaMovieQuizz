import React, { useState } from 'react';

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

    return (
        <div className="Wrapper">
          <h1 className="Title">Your name is {title}</h1>
          <form onSubmit={changeTitle}>
            <div className="Input">
              <input className="Input-text" id="input" name="inputText" onChange={handleChanges} type="text" value={inputText}/>
              <label htmlFor="input"/>
            </div>
          </form>
        </div>
    );
};
export default Start;