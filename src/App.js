import React, { useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';
import Registration from './Registration'

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [admin, setAdmin] = useState('');
  const [newText, setNewText] = useState('');

useEffect(()=>{
  Axios.get('http://localhost:3001/api/get').then((response)=>{
    setNewsList(response.data)
  });
}, []);

  const submitNews = ()=>{
    Axios.post("http://localhost:3001/api/insert", {
      title:title,
      text:text, 
      date:date
    });
      setNewsList([ 
        ...newsList, 
        {title:title, text:text, date:date },
        ]);
    };
    const handlerChangeAdmin = (loginStatus)=>{
      console.log(loginStatus);
      setAdmin(loginStatus)
      Axios.get('http://localhost:3001/api/get').then((response)=>{
        setNewsList(response.data)
      }, []);
    };

   const deleteNews = (titled) => {
    Axios.delete(`http://localhost:3001/api/delete/${titled}`);
    Axios.get('http://localhost:3001/api/get').then((response)=>{
    setNewsList(response.data)
  });

};

    const updateNews = (title) => {
    Axios.put('http://localhost:3001/api/put', {
      title:title,
      text:newText
    });
    setNewText("");
    Axios.get('http://localhost:3001/api/get').then((response)=>{
    setNewsList(
       
        response.data);
  });
   } 
  
  return (
    <React.Fragment>
     <Router>
      <Route path="" exact render={(props) => 
        <Registration onChangeAdmin={handlerChangeAdmin} />} />
      </Router>

    <div className="App">
           <div className="form">
           { 
            admin==="Sara"?
              <div className="formCard">
                     <h2>Add News Post</h2>
                    <label>Title:</label>
                    <input type="text" name="title" onChange={(e)=>{
                      setTitle(e.target.value)
                    }} />
                    <label>Text:</label>
                    <input type="text" name="text" onChange={(e)=>{
                      setText(e.target.value)
                    }} />
                    <label>DateOf:</label>
                    <input type="date" name="date" onChange={(e)=>{
                      setDate(e.target.value)
                    }} />

                    <button onClick = {submitNews}>Submit</button>
              </div>
             :null
             }
                  {newsList.map((val) => {
                    return (
                    <div className="card" key ={val.title}>
                      <h2>{val.title}</h2>
                      <p>{val.text}</p>
                      <p>{val.date}</p>
                        { 
                          admin==="Sara"?
                    <button 
                        onClick={() =>{
                          deleteNews(val.title);
                        }}
                        >
                        Delete
                    </button>
                    :null
                  }
                    </div>
                  );
                  })}
       </div>
    </div>
</ React.Fragment>

  );
}

export default App;

