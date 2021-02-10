import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import axios from 'axios';
import {
  Character, 
  Film,
  Planet
} from '../../atributes';

import {
    FiStar, 
    FiTrash2
  } from 'react-icons/fi';

function App(){
    const [speciesData, setSpeciesData] = useState <any>([]);
    const [favoritesSpecies, setFavoritesSpecies] = useState <any> ([]);

    useEffect(() => {
        axios.get('https://swapi.dev/api/species/').then(response => {
            setSpeciesData(response.data);
        })
        const fav = localStorage.getItem('favsSWSpecies');
        if(fav){
           setFavoritesSpecies(JSON.parse(fav));
        }
    },
    [])

    useEffect(() => {
        if (localStorage) {
            const favSpeciesStrings = JSON.stringify(favoritesSpecies);
            localStorage.setItem('favsSWSpecies', favSpeciesStrings);
          }
    }, [favoritesSpecies]);

    const handleFavorite = useCallback(
        (newFavorite: string) => {
          if (favoritesSpecies.indexOf(newFavorite) < 0) {
            setFavoritesSpecies(
              (favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite]
            )
          } else {
            const getFav = (newFav: any) => {
              return newFav !== newFavorite;
            }
            let newArr: any[] = favoritesSpecies.filter(getFav);
           setFavoritesSpecies(newArr);
          }
        },
        [favoritesSpecies]
      );


    return (
        <div className="container">
            <div className="title">Species</div>
            <div className="favorite-box">
                <span>Favorites: </span> {favoritesSpecies.length === 0 ? <>-</>
                    :
                    <>{favoritesSpecies.join(', ')}</>
                }
                {
                    favoritesSpecies.length !== 0 &&
                    <button onClick={() =>setFavoritesSpecies([])}><FiTrash2></FiTrash2></button>
                }                
            </div>
            {speciesData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(speciesData.previous).then(response => {
                            setSpeciesData(response.data);
                            })
                        }} disabled={!speciesData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(speciesData.next).then(response => {
                        setSpeciesData(response.data);
                        })
                    }} disabled={!speciesData.next}>Next</button>
                </div>    
            }
            <div className="species-container">
                {
                    speciesData.results && speciesData.results.map((s: any) => {
                        return <div className="species"  key={s.name}>
                             {  
                                    favoritesSpecies.indexOf(s.name) < 0 &&
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
                                    favoritesSpecies.indexOf(s.name) >= 0 &&
                                    <button
                                        className="favorite-button-activated"
                                        type="button"
                                        onClick= {
                                            () => {handleFavorite(s.name); }
                                        }
                                        ><FiStar></FiStar>    
                                    </button>
                                    }   
                            <div className="specie-atribute">
                                <span>Name: </span>{s.name}
                            </div>
                            <div className="specie-atribute">
                                <span>Classification: </span>{s.classification}
                            </div>
                            <div className="specie-atribute">
                                <span>Designation: </span>{s.designation}
                            </div>
                            <div className="specie-atribute">
                                <span>Average height: </span>{s.average_height}
                            </div>
                            <div className="specie-atribute">
                                <span>Skin colors: </span>{s.skin_colors}
                            </div>
                            <div className="specie-atribute">
                                <span>Hair colors: </span>{s.hair_colors}
                            </div>
                            <div className="specie-atribute">
                                <span>Eye colors: </span>{s.eye_colors}
                            </div>
                            <div className="specie-atribute">
                                <span>Average lifespan: </span>{s.average_lifespan}
                            </div>
                            <div className="specie-atribute">
                                <span>Homeworld:</span> <Planet link={s.homeworld}/>
                            </div>
                            <div className="specie-atribute">
                                <span>Language: </span>{s.language}
                            </div>

                            <div className="species-atributes-list">
                                    <span>Characters: </span>
                                    {
                                        s.people.length === 0 && <> - None</>
                                    }
                                 {
                                     s.people.map((p: any) =>{
                                        return(
                                            <Character key={p} link={p}/>
                                        );
                                     })
                                 }    
                            </div>
                            <div className="species-atributes-list">
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

                    })
                }
            </div>
            {speciesData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(speciesData.previous).then(response => {
                            setSpeciesData(response.data);
                            })
                        }} disabled={!speciesData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(speciesData.next).then(response => {
                        setSpeciesData(response.data);
                        })
                    }} disabled={!speciesData.next}>Next</button>
                </div>    
            }
        </div>

    );
}

export default App;