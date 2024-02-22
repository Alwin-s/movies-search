import React, { useEffect, useState } from 'react'
import "./search.css"
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import tmdbAxiosInstance from "../src/Components/tmdbAxiosInstance"


function Search({fetchUrl,isPoster}) {
  
const [allmovies,setAllMovies]=useState();
const base_url = "https://image.tmdb.org/t/p/original/";

const fetchData=async()=>{
    const {data}=await tmdbAxiosInstance.get(fetchUrl)
    setAllMovies(data.results)
}


useEffect(()=>{
    fetchData()
   },[]);

  const [movieName, setMovieName] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiKey = "fa1c9c03";

    const searchMovie = () => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "False") {
                    setError("Movie Not Found !!");
                    setMovieData(null);
                } else {
                    setMovieData(data);
                    setError(null);
                }
            })
            .catch(error => {
                setError("Something went wrong. Please try again later.");
                setMovieData(null);
            })
            .finally(() => setLoading(false));
    };

console.log(movieData);




  return (
    <>
 
    {/* <div>
  
  <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cea6768a-2841-42e6-84d2-b32883c7d6da/decsx4s-0fd3a9fc-d074-44a6-969a-f1949f9fa163.png/v1/fill/w_1600,h_900/movie_posters_wallpaper_8k_by_dskstudiosl_decsx4s-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvY2VhNjc2OGEtMjg0MS00MmU2LTg0ZDItYjMyODgzYzdkNmRhXC9kZWNzeDRzLTBmZDNhOWZjLWQwNzQtNDRhNi05NjlhLWYxOTQ5ZjlmYTE2My5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.nqDRS6Z2VZMGfrD3Slp0p5B6OlLELAWd_EvadL60qk8" alt="" className='banner' style={{opacity: (movieData || error) ? 0.2 : 1}} />
  </div> */}
   <MDBNavbar light className='bg'>
        <MDBContainer fluid>
          <MDBNavbarBrand >
            <img
              src='https://www.pinclipart.com/picdir/big/67-677027_film-clipart-news-camera-circle-of-film-icon.png'
              alt=''
              loading='lazy'
              className='hed'
            />
            <div className='as'>
            Search <span className='text-warning'>Movies</span></div>
           
          </MDBNavbarBrand >
          <div className='d-flex navas'>
          <p className=' mt-3 ms-4 fw-bold'>Home</p>
          <p className=' mt-3 ms-5 fw-bold'>About</p>
          <p className=' mt-3 ms-5 fw-bold'>Sign In</p>
          <p className=' mt-3 ms-5 fw-bold'>Features</p>
          </div>
          <div className='inout text-center'>
<input type="text" className='s' placeholder='Movie Name..' value={movieName} onChange={e=>setMovieName(e.target.value)}/>
<button className='btnm ms-2' onClick={searchMovie} disabled={loading}>Search</button>
</div>
      
        </MDBContainer>
      </MDBNavbar>

      



     
<div class="container ">
{loading && <h2 className='text-center fs-3 text-white mt-4'><i class="fa-solid fa-spinner fa-spin"></i></h2>}
            
  <div class="row justify-content-center">
    <div class="col-12" style={{maxWidth:"800px"}}>

      <div className='card mt-4' style={{color:"white",boxShadow:"0 41px 81px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",backgroundColor:" rgb(43, 43, 43)"}}>
      <div className="row cardf" style={{ display: (movieData || error) ? 'flex' : 'none' }}>

          <div class="col-3">
            <img src={movieData && movieData.Poster} alt="" style={{width:"200px",height:"270px"}} className='mt-2'/>
          </div>
          <div class="col-9">
            <div className='ms-5 cv '>
            <h1>{movieData && movieData.Title}</h1>
            {error && <p className='text-warning fs-2 fw-bold'>{error}</p>}
           <br />
         
           <p>Released: <span className='text-warning fw-bold fs-5'>{movieData && movieData.Released}</span></p>
<hr />
           <p>Actors: <span className='text-warning  fw- fs-5'>{ movieData &&  movieData.Actors}</span></p>
         <hr />
       <p><img src="https://assets.stickpng.com/images/613f661716381700041030fc.png" alt="" width="40" /> : <span className='text-danger fw-bold fs-5'>{ movieData && movieData.Ratings.find(rating => rating.Source === 'Internet Movie Database')?.Value }</span></p>

          
    <hr />
    <p>Plot: <span className=' text-warning'>{ movieData && movieData.Plot}</span></p>

           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className='d-flex ' style={{ cursor: "pointer", marginTop: (movieData || error )? "3%" : "0px" }}>

<p className='ll ms-4'>Geners <i class="fa-solid fa-caret-down "></i></p>
<p className='ll ms-4'>Popular <i class="fa-solid fa-caret-down "></i></p>
<p className='ll ms-4'>Top Rated <i class="fa-solid fa-caret-down "></i></p>
<p className='ll ms-4'>Trending <i class="fa-solid fa-caret-down "></i></p>
<p className='ll ms-3 text-success'> All <span className='text-success'>Movies</span> <i class="fa-solid fa-caret-down fa-beat-fade"></i></p>


</div>
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

export default Search