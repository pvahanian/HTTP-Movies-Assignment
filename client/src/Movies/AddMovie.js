import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import axios from 'axios';
const initialState={
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

const AddMovie = props => {
    //const { title, director, metascore, stars } 
    const [movie,setMovie] =useState(initialState)
    const history= useHistory();

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     // make a PUT request to edit the item
    //     axios
    //     .put(`http://localhost:5000/api/movies/${params.id}`, movie)
    //     .then((res) => 
    //        setMovie(...props.movies,res.data))
    //     .catch(err => console.log(err))
    //     .finally(history.push(`/movies/${movie.id}`))
    //   };

    const changeHandler=(e)=>{
        e.persist();
        setMovie({...movie,[e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies/`, movie)
          .then(res => props.setMovieList(res.data))
          .catch(err => console.log(err))
          .finally(history.push(`/`))
      };
    return(
              <div>
              <h2>Add Film</h2>
                
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  value={movie.title}
                />{" "}
                <br /> <br />
                <input
                  type="text"
                  name="director"
                   onChange={changeHandler}
                  value={movie.director}
                />{" "}
                <br /> <br />
                <input
                  type="number"
                  name="metascore"
                 onChange={changeHandler}
                  value={movie.metascore}
                />{" "}
                <br /> <br />
                <input
                  type="string"
                  name="starone"
                 onChange={changeHandler}
                  value={movie.stars[0]}
                />{" "}
                <br /> <br /> 
             <input
                  type="string"
                  name="startwo"
                     onChange={changeHandler}
                  value={movie.stars[1]}
                />{" "}
                <br /> <br />  <input
                  type="string"
                  name="starthree"
                  onChange={changeHandler}
                  value={movie.stars[2]}
                />{" "}
                <br /> <br />
                <button>Create</button>
              </form>
            </div>
          );

};

export default AddMovie