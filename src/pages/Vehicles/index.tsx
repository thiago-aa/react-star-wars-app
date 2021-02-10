import React, { useState, useEffect, useCallback} from 'react';
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
    const [vehiclesData, setVehiclesData] = useState <any>([]);
    const [favoritesVehicles, setFavoritesVehicles] = useState <any> ([]);

    useEffect(()=>{
        axios.get('https://swapi.dev/api/vehicles/').then(response => {
            setVehiclesData(response.data);
        })
        const fav = localStorage.getItem('favsSWVehicles');
        if(fav){
           setFavoritesVehicles(JSON.parse(fav));
        }
    },[]);

    useEffect(() => {
        if (localStorage) {
            const favStarshipsStrings = JSON.stringify(favoritesVehicles);
            localStorage.setItem('favsSWVehicles', favStarshipsStrings);
          }
    }, [favoritesVehicles]);

    const handleFavorite = useCallback(
        (newFavorite: string) => {
          if (favoritesVehicles.indexOf(newFavorite) < 0) {
            setFavoritesVehicles(
              (favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite]
            )
          } else {
            const getFav = (newFav: any) => {
              return newFav !== newFavorite;
            }
            let newArr: any[] = favoritesVehicles.filter(getFav);
           setFavoritesVehicles(newArr);
          }
        },
        [favoritesVehicles]
      );

    return (
        <div className="container">
            <div className="title">Vehicles</div>
            <div className="favorite-box">
                <span>Favorites: </span> {favoritesVehicles.length === 0 ? <>-</>
                    :
                    <>{favoritesVehicles.join(', ')}</>
                }
                {
                    favoritesVehicles.length !== 0 &&
                    <button onClick={() =>setFavoritesVehicles([])}><FiTrash2></FiTrash2></button>
                }                
            </div>
            {vehiclesData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(vehiclesData.previous).then(response => {
                            setVehiclesData(response.data);
                            })
                        }} disabled={!vehiclesData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(vehiclesData.next).then(response => {
                        setVehiclesData(response.data);
                        })
                    }} disabled={!vehiclesData.next}>Next</button>
                </div>    
            }
            <div className="vehicles-container">
                {
                    vehiclesData.results && vehiclesData.results.map((v:any) => {
                        return(
                            <div className="vehicles" key={v.name}>
                                {  
                                    favoritesVehicles.indexOf(v.name) < 0 &&
                                    <button
                                    className="favorite-button"
                                    type="button"
                                    onClick={
                                        () => {handleFavorite(v.name); }
                                    }
                                    >
                                    <FiStar></FiStar>    
                                    </button>
                                }
                                {
                                    favoritesVehicles.indexOf(v.name) >= 0 &&
                                    <button
                                        className="favorite-button-activated"
                                        type="button"
                                        onClick= {
                                            () => {handleFavorite(v.name); }
                                        }
                                        ><FiStar></FiStar>    
                                    </button>
                                    }   
                                <div className="vehicles-atribute">
                                    <span>Name: </span>{v.name}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Model: </span>{v.model}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Manufacturer: </span>{v.manufacturer}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Cost in credits: </span>{v.cost_in_credits}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>length: </span>{v.length} m
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Max max atmosphering speed: </span>{v.max_atmosphering_speed} Km/h
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Crew: </span>{v.crew}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Passengers: </span>{v.passengers}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Cargo Capacity: </span>{v.cargo_capacity} Kg
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Consumables: </span>{v.consumables}
                                </div>
                                <div className="vehicles-atribute">
                                    <span>Vehicle class: </span>{v.vehicle_class}
                                </div>
                                <div className="vehicles-atributes-list">
                                    <span>Pilots</span>
                                    {
                                        v.pilots.length === 0 && <> - None</>
                                    }
                                 {
                                     v.pilots.map((p: any) =>{
                                        return(
                                            <Character key={p} link={p}/>
                                        );
                                     })
                                 }    
                                </div>  
                                
                                <div className="vehicles-atributes-list">
                                    <span>Films</span>
                                 {
                                     v.films.map((f: any) =>{
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
            {vehiclesData.length !== 0 &&  
                <div className="page-buttons">
                    {
                        <button onClick={() => {
                            axios.get(vehiclesData.previous).then(response => {
                            setVehiclesData(response.data);
                            })
                        }} disabled={!vehiclesData.previous}>Previous</button>
                    }
                    <button onClick={() => {
                        axios.get(vehiclesData.next).then(response => {
                        setVehiclesData(response.data);
                        })
                    }} disabled={!vehiclesData.next}>Next</button>
                </div>    
            }
        </div>
    );
}

export default App;