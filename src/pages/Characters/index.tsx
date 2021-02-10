import React, { useState, useEffect, useCallback} from 'react';
import './styles.css';
import axios from 'axios';
import {
  Planet, 
  Film, 
  Specie,
  Vehicle,
  Starship
} from '../../atributes';
import {
  FiFilm,
  FiTruck,
  FiZap,
  FiStar,
  FiTrash2
} from 'react-icons/fi';

function App() {
  const [data, setData] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  
  useEffect(()=>{
    axios.get('https://swapi.dev/api/people/').then(response => {
      setData(response.data);
    })
    if(localStorage){
      const favString = localStorage.getItem('favsSW');
      if (favString) {
        setFavorites(JSON.parse(favString));
      }
    }
  }, []);

  useEffect(() => {
   if (localStorage) {
      const favStrings = JSON.stringify(favorites);
      localStorage.setItem('favsSW', favStrings);
    }
  },
  [favorites]);

  const handleFavorite = useCallback(
    (newFavorite: string) => {
      if (favorites.indexOf(newFavorite) < 0) {
        setFavorites(
          (favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite]
        )
      } else {
        const getFav = (newFav: any) => {
          return newFav !== newFavorite;
        }
        let newArr: any[] = favorites.filter(getFav);
       setFavorites(newArr);
      }
    },
    [favorites]
  );

  return(
    <div className="container">
      <div className="title">
        Characters
        {data.length === 0 && <> <br/> Loading... </>}
      </div>

      <div className="favorite-box">
        <div>
          <span>Favorites:</span>
          {
            favorites.length !== 0 ? (
              favorites.join(', ')
            ) : (
              ' - '
            )
          }
          {favorites.length !== 0 && 
            <button 
              type="button" 
              className="delete-button" 
              onClick= {
                () => setFavorites([])
              }
              ><FiTrash2></FiTrash2></button>
          }
          
        </div>
      </div>

      {data.length !== 0 &&  
          <div className="page-buttons">
            {
                <button onClick={
                  () => {
                    axios.get(data.previous).then(response => {
                    setData(response.data);
                    })
                }} disabled={!data.previous}>Previous</button>
            }
            <button onClick={() => {
                axios.get(data.next).then(response => {
                setData(response.data);
                })
            }} disabled={!data.next}>Next</button>
          </div>    
        }        
      <div className="people-box">
        {
          data.results && data.results.map((p: any) =>
            <div className="people" key={p.name}>
          {  
            favorites.indexOf(p.name) < 0 &&
            <button
              className="favorite-button"
              type="button"
              onClick={
                () => {handleFavorite(p.name); }
              }
            >
              <FiStar></FiStar>    
            </button>
          }
          {
            favorites.indexOf(p.name) >= 0 &&
            <button
              className="favorite-button-activated"
              type="button"
              onClick={
                () => {handleFavorite(p.name); }
              }
            >
              <FiStar></FiStar>    
            </button>
          }
          
          <div className="people-name">
            <span>Name:</span> {p.name} 
          </div>

          <div className="people-atribute">
            <span>Height:</span> {p.height}
          </div>

          <div className="people-atribute">
            <span>Mass:</span> {p.mass}
          </div>

          <div className="people-atribute">
            <span>Hair Color:</span> {p.hair_color}
          </div>
          
          <div className="people-atribute">
            <span>Skin Color:</span> {p.skin_color}
          </div>

          <div className="people-atribute">
            <span>Eye Color:</span> {p.eye_color}
          </div>
          
          <div className="people-atribute">
            <span>Birth Year:</span> {p.birth_year}
          </div>
    
          <div className="people-atribute">
            <span>Gender: </span> {p.gender}
          </div>
          
          <div className="people-atribute">
           <span>Homeworld: </span> <Planet link={p.homeworld}/>
          </div>

              <div className="people-atribute">
            <span>Specie: </span> {p.species.length === 0? 'Human'
            :<Specie link={p.species}/>}
          </div>

          <div className="people-itens-list">
            <span><FiFilm/>Films:</span>
            {p.films.length === 0 && 
              <div>Nothing</div>
            }
            {p.films.map((film: any) =>
             <Film key={film} link={film}/>
            )}
          </div>
          
          <div className="people-itens-list">
            <span><FiTruck/>Vehicles:</span>
            {p.vehicles.length === 0 && <div>Nothing</div>}
            {p.vehicles.map((vehicle: any) =>
              <Vehicle key={vehicle} link={vehicle}/>
            )}
          </div>
    
          <div className="people-itens-list">
            <span><FiZap/>Starships</span>
            {p.starships.length === 0 &&<div>Nothing</div>}
            {p.starships.map((starship: any) =>
              <Starship key={starship} link={starship}/>
            )}
          </div>
        </div>)}
       </div>
       {data.length !== 0 &&  
          <div className="page-buttons">
            {
                <button onClick={() => {
                    axios.get(data.previous).then(response => {
                    setData(response.data);
                    })
                }} disabled={!data.previous}>Previous</button>
            }
            <button onClick={() => {
                axios.get(data.next).then(response => {
                setData(response.data);
                })
            }} disabled={!data.next}>Next</button>
          </div>    
        }  
        
    </div>
  );
}

export default App;