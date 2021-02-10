import React, { useState, useEffect, useCallback, CSSProperties} from 'react';
import './styles.css';
import axios from 'axios';
import {
  Character, 
  Film
} from '../../atributes';

import {
    FiStar, 
    FiTrash2
  } from 'react-icons/fi';

function App(){
    const [starshipsData, setStarshipsData] = useState <any> ([]);
    const [favoritesStarships, setFavoritesStarships] = useState <any>([]);
    const [top, setTop] = useState <string>('100px');
    const [left, setLeft] = useState <string>('-400px');
    const [width, setWidth] = useState <string>('300px');

    useEffect(() => {
        axios.get('https://swapi.dev/api/starships/').then(response => {
            setStarshipsData(response.data);
        })
        const fav = localStorage.getItem('favsSWStarships');
        if(fav){
           setFavoritesStarships(JSON.parse(fav));
        }
    }, []);

    useEffect(() => {
        if (localStorage) {
           const favStarshipsStrings = JSON.stringify(favoritesStarships);
           localStorage.setItem('favsSWStarships', favStarshipsStrings);
         }
       },
    [favoritesStarships]);

    const handleFavorite = useCallback(
        (newFavorite: string) => {
          if (favoritesStarships.indexOf(newFavorite) < 0) {
            setFavoritesStarships(
              (favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite]
            )
          } else {
            const getFav = (newFav: any) => {
              return newFav !== newFavorite;
            }
            let newArr: any[] = favoritesStarships.filter(getFav);
           setFavoritesStarships(newArr);
          }
        },
        [favoritesStarships]
      );

      window.addEventListener('scroll', ev => {
        setWidth(100 + window.scrollY/7 + 'px');
        setTop(100 + window.scrollY/15 + 'px');
        setLeft((-400 + window.scrollY/2) + 'px');
        });

    const imgStyle: CSSProperties = {
        position: 'fixed',
        zIndex: 0,
        top: top,
        left: left,
        width: width         
    }

    return (
        <div className="container">

            <img 
                src="http://www.olsonindependent.com/millenniumFalcon/images/homeFalcon2.png"
                style={imgStyle} 
            />

            <div className="title">Starships</div>
            <div className="favorite-box">
                <span>Favorites: </span> {favoritesStarships.length === 0 ? <>-</>
                    :
                    <>{favoritesStarships.join(', ')}</>
                }
                {
                    favoritesStarships.length !== 0 &&
                    <button onClick={() =>setFavoritesStarships([])}><FiTrash2></FiTrash2></button>
                }                
            </div>
            {starshipsData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(starshipsData.previous).then(response => {
                            setStarshipsData(response.data);
                            })
                        }} disabled={!starshipsData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(starshipsData.next).then(response => {
                        setStarshipsData(response.data);
                        })
                    }} disabled={!starshipsData.next}>Next</button>
                </div>    
            }
            <div className="starships-container">                
                {
                    starshipsData.results && starshipsData.results.map((s:any) => {
                        return( 
                            <div className="starships" key={s.name}>
                                {  
                                    favoritesStarships.indexOf(s.name) < 0 &&
                                    <button
                                    className="favorite-button"
                                    type="button"
                                    onClick={
                                        () => {handleFavorite(s.name); }
                                    }
                                    >
                                    <FiStar></FiStar>    
                                    </button>
                                }
                                {
                                    favoritesStarships.indexOf(s.name) >= 0 &&
                                    <button
                                        className="favorite-button-activated"
                                        type="button"
                                        onClick= {
                                            () => {handleFavorite(s.name); }
                                        }
                                        ><FiStar></FiStar>    
                                    </button>
                                    }              
                                <div>
                                    <span>Name: </span>{s.name}
                                </div>
                                <div>
                                    <span>Model: </span>{s.model}
                                </div>
                                <div>
                                    <span>Manufacturer: </span>{s.manufacturer}
                                </div>
                                <div>
                                    <span>Cost in credits: </span>{s.cost_in_credits}
                                </div>
                                <div>
                                    <span>Length: </span>{s.length}
                                </div>
                                <div>
                                    <span>Max speed on atmosphere: </span>{s.max_atmosphering_speed} Km/h
                                </div>
                                <div>
                                    <span>Crew: </span>{s.crew}
                                </div>
                                <div>
                                    <span>Passengers: </span>{s.passengers}
                                </div>
                                <div>
                                    <span>Cargo Capacity: </span>{s.cargo_capacity}
                                </div>
                                <div>
                                    <span>Consumables duration: </span>{s.consumables}
                                </div>
                                <div>
                                    <span>Hyperdrive Hating: </span>{s.hyperdrive_rating}
                                </div> 
                                <div>
                                    <span>MGLT: </span>{s.MGLT}
                                </div>
                                <div>
                                    <span>Starship Class: </span>{s.starship_class}
                                </div>

                                <div className="starships-atributes-list">
                                    <span>Pilots</span>
                                    {
                                        s.pilots.length === 0 && <> - None</>
                                    }
                                 {
                                     s.pilots.map((p: any) =>{
                                        return(
                                            <Character key={p} link={p}/>
                                        );
                                     })
                                 }    
                                </div>  
                                
                                <div className="starships-atributes-list">
                                    <span>Films</span>
                                 {
                                     s.films.map((f: any) =>{
                                        return(
                                            <Film key={f} link={f}/>
                                        );
                                     })
                                 }    
                                </div>                             
                            </div>
                        );
                    })
                }        
            </div>
            {starshipsData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(starshipsData.previous).then(response => {
                            setStarshipsData(response.data);
                            })
                        }} disabled={!starshipsData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(starshipsData.next).then(response => {
                        setStarshipsData(response.data);
                        })
                    }} disabled={!starshipsData.next}>Next</button>
                </div>    
            }
        </div>
    );
}

export default App;