import React, { useEffect, useState } from 'react'
import tmdbAxiosInstance from "./tmdbAxiosInstance"

function Row({fetchUrl,isPoster}) {

const [allmovies,setAllMovies]=useState();
const base_url = "https://image.tmdb.org/t/p/original/";

const fetchData=async()=>{
    const {data}=await tmdbAxiosInstance.get(fetchUrl)
    setAllMovies(data.results)
}


useEffect(()=>{
    fetchData()
   },[]);

  return (
    <>
    <p style={{marginTop:"-3%"}} className='ll ms-4'>Top Rated <i class="fa-solid fa-caret-down "></i></p>
     <div className="movies-row p-4 " style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',}}>
  
  {
  
    allmovies?.map(item => (
     
      <img style={{width:"90%",marginBottom:"15%",marginTop:"-5%",cursor:"pointer",borderRadius:"10px"}} key={item.id}  className={`${isPoster && 'movie-poster'} movies`} src={`${base_url}/${isPoster ? item.poster_path : item?.backdrop_path}`} alt=""  />
    ))
  }
</div>


    </>
  )
}

export default Row