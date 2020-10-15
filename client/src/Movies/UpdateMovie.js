import React, { useState, useEffect } from "react";
import {useParams,useHistory} from "react-router-dom"
import axios from 'axios';

const initialState={
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

const UpdateMovie = props => {
    const [movie,setMovie] =useState(initialState)
    const params = useParams();
    const history= useHistory();

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setMovie(...props.movies,res.data))
          .catch((err) => console.log(err.response))
          .finally();
}; 

    useEffect(() => {
        fetchMovie(params.id);
      }, [params.id]);

    const changeHandler=(e)=>{
        e.persist();
        setMovie({...movie,[e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
        .put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then((res) => props.movies(...props.movies,movie))
        .catch(err => console.log(err))
        .finally(history.push(`/movies/${movie.id}`))
      };

      const deleteMovie = e=>{
        e.preventDefault()
        axios
        .delete(`http://localhost:5000/api/movies/${params.id}`)
          .then((res) => setMovie(...props.movies,res.data))
          .catch(err => console.log(err))
          .finally(history.push(`/`))
       }  
       
       const addMovie = e=>{
        e.preventDefault()
        history.push(`/add-movie`)
      } 

    return(
        
            <div>
              <h2>Update Film</h2>
                
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
                <button>Update</button>
              </form>
              <button onClick={deleteMovie}>Delete</button>
              <button onClick={addMovie}>AddMovie</button>

            </div>
          );

};

export default UpdateMovie