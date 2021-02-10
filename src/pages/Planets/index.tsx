import React, { useState, useEffect, useCallback, CSSProperties} from 'react';
import './styles.css';
import axios from 'axios';
import {
  Character, 
  Film, 
  Specie,
  Vehicle,
  Starship
} from '../../atributes';

import {
    FiStar, 
    FiTrash2
  } from 'react-icons/fi';

function App(){
    const [planetsData, setPlanetsData] = useState<any>([]);
    const [favoritesPlanets, setFavoritesPlanets] = useState<any>([]);
    const [top, setTop] = useState <string>('100px');
    const [left, setLeft] = useState <string>('-400px');
    
    useEffect(()=>{
        axios.get('https://swapi.dev/api/planets/').then(response => {
            setPlanetsData(response.data);
        })
        const fav = localStorage.getItem('favsSWPlanets');
        if(fav){
           setFavoritesPlanets(JSON.parse(fav));
        }
    },
    []);

    useEffect(() => {
        if (localStorage) {
           const favPlanetsStrings = JSON.stringify(favoritesPlanets);
           localStorage.setItem('favsSWPlanets', favPlanetsStrings);
         }
       },
    [favoritesPlanets]);

    const handleFavorite = useCallback(
        (newFavorite: string) => {
          if (favoritesPlanets.indexOf(newFavorite) < 0) {
            setFavoritesPlanets(
              (favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite]
            )
          } else {
            const getFav = (newFav: any) => {
              return newFav !== newFavorite;
            }
            let newArr: any[] = favoritesPlanets.filter(getFav);
           setFavoritesPlanets(newArr);
          }
        },
        [favoritesPlanets]
      );
    window.addEventListener('scroll', ev => {
        setTop(100 + window.scrollY/5 + 'px');
        setLeft((-400 + window.scrollY/2) + 'px');
        });
    const imgStyle: CSSProperties = {
        position: 'fixed',
        zIndex: 0,
        top: top,
        left: left         
    }
    return (
        <div className="container">
            <img 
                src="https://www.firefoxccmods.com/enciclopedia/img/cruceros/tector.png"
                style={imgStyle} 
            />

            <div className="title">
                Planets
                {
                    planetsData.length === 0 && <> <br/>Loading...</>
                }
            </div>
            <div className="favorite-box">
                <span>Favorites: </span> {favoritesPlanets.length === 0 ? <>-</>
                    :
                    <>{favoritesPlanets.join(', ')}</>
                }
                {
                    favoritesPlanets.length !== 0 &&
                    <button onClick={() =>setFavoritesPlanets([])}><FiTrash2></FiTrash2></button>
                }
                
            </div>

            {planetsData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(planetsData.previous).then(response => {
                            setPlanetsData(response.data);
                            })
                        }} disabled={!planetsData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(planetsData.next).then(response => {
                        setPlanetsData(response.data);
                        })
                    }} disabled={!planetsData.next}>Next</button>
                </div>    
            }  

            <div className="planets-box">
                    {
                        planetsData.results && planetsData.results.map((p: any) => {
                            return (
                                <div className="planets"  key={p.name}>
                                    {  
                                        favoritesPlanets.indexOf(p.name) < 0 &&
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
                                        favoritesPlanets.indexOf(p.name) >= 0 &&
                                        <button
                                            className="favorite-button-activated"
                                            type="button"
                                            onClick= {
                                                () => {handleFavorite(p.name); }
                                            }
                                        >
                                        <FiStar></FiStar>    
                                        </button>
                                    }                                   
                                    <div className="planet-atribute">
                                        <span>Name: </span> {p.name}    
                                    </div> 
                                    <div className="planet-atribute">
                                        <span>Rotation Period: </span> {p.rotation_period} hours   
                                    </div> 
                                    <div className="planet-atribute">
                                        <span>Orbital Period: </span> {p.orbital_period} days  
                                    </div> 
                                    <div className="planet-atribute">
                                        <span>Diameter: </span> {p.diameter} meters    
                                    </div> 
                                    <div className="planet-atribute">
                                        <span>Climate: </span> {p.climate}   
                                    </div>
                                    <div className="planet-atribute">
                                        <span>Gravity: </span> {p.gravity}    
                                    </div> 
                                    <div className="planet-atribute">
                                        <span>Terrain: </span> {p.terrain}    
                                    </div> 
                                    <div className="planet-atribute">
                                        <span>Surface Water: </span> {p.surface_water}%    
                                    </div>
                                    <div className="planet-atribute">
                                        <span>Population: </span> {p.population}    
                                    </div>
                                    <div className="planets-atributes-list">
                                        <span>Famous residents: </span>
                                        {
                                            p.residents.length === 0 && <div>Nothing</div>                                                
                                        }
                                        {
                                            p.residents.map((people: any) =>
                                            {
                                                return <Character key={people} link={people}/>
                                            })
                                        }
                                    </div>  
                                    <div className="planets-atributes-list">
                                            <span>Films: </span>
                                            {
                                                p.films.length === 0 && <div>Nothing</div>                                                
                                            }
                                            {
                                                p.films.map((film: any) =>
                                                {
                                                    return <Film key={film} link={film}/>
                                                })
                                            }
                                        </div>   
                                </div>
                            );
                        })        }
               
            </div>
            
            {planetsData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(planetsData.previous).then(response => {
                            setPlanetsData(response.data);
                            })
                        }} disabled={!planetsData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(planetsData.next).then(response => {
                        setPlanetsData(response.data);
                        })
                    }} disabled={!planetsData.next}>Next</button>
                </div>    
            }
        </div>
    )
}

export default App;