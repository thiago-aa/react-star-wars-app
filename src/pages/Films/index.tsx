import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {
  Planet, 
  Specie,
  Vehicle,
  Starship,
  Character
} from '../../atributes';
function App(){
    const [films, setFilms] = useState <any>([]);
    
    useEffect(() => {
        axios.get('https://swapi.dev/api/films/').then(response => {
            setFilms(response.data.results);
        })
    }, []);
    function getFilm(epNum: number){
        if(epNum >= 0){     
            return <div className="star-wars">
                <div className="crawl">
                    <div className="film-title">
                        {films[epNum].title}
                    </div>
                    {films[epNum].opening_crawl}
                </div>
                <div className="film-box">
                    <div className="film">
                        <div>
                            <span>Director: </span> {films[epNum].director}
                        </div>
                        <div>
                            <span>Producer: </span> {films[epNum].producer}
                        </div>
                        <div>
                            <span>Release Date: </span> {films[epNum].release_date}
                        </div>
                        <div className="list">
                            <span>Characters: </span>
                            {                      
                            films[epNum].characters.map((c: any) => {
                                return (    
                                <Character key={c} link={c}/>
                                );
                            })                            
                            }
                        </div>
                        <div className="list">
                            <span>Planets: </span>
                            {                      
                            films[epNum].planets.map ((c: any) => {
                                return <Planet key={c} link={c}/>
                            })                            
                            }
                        </div>
                        <div className="list">
                            <span>Starships: </span>
                            {                      
                            films[epNum].starships.map((s: any) => {
                                return <Starship key={s} link={s}/>
                            })                            
                            }
                        </div>
                        <div className="list">
                            <span>Vehicles: </span>
                            {                      
                            films[epNum].vehicles.map((v: any) => {
                                return <Vehicle key={v} link={v}/>
                            })                            
                            }
                        </div>
                        <div className="list">
                            <span>Species: </span>
                            {                      
                            films[epNum].species.map((s: any) => {
                                return <Specie key={s} link={s}/>
                            })                            
                            }
                        </div>
                    </div>
                </div>
            </div>   
        }else{
            return (
            <div className="initial-text">
                A long time ago in a galaxy far,<br/>far away....
            </div>
        );        
                
        }
    }
    return (
        <div className="container">
            {
                films.length !== 0 &&
                <BrowserRouter> 
                    <div className="titles-container">
                        {
                            films.map((f: any) => {
                                return <Link key={f.title} to={`/films/${f.title}`}>{f.title}</Link>
                            })
                        }
                    </div>
                    <div>
                        <Switch>
                            <Route path={`/films/${films[0].title}`} component={() => getFilm(0)}/>
                            <Route path={`/films/${films[1].title}`} component={() => getFilm(1)}/>
                            <Route path={`/films/${films[2].title}`} component={() => getFilm(2)}/>
                            <Route path={`/films/${films[3].title}`} component={() => getFilm(3)}/>
                            <Route path={`/films/${films[4].title}`} component={() => getFilm(4)}/>
                            <Route path={`/films/${films[5].title}`} component={() => getFilm(5)}/>
                            <Route path={`/`} component={() => getFilm(-1)}/>
                        </Switch>
                    </div>
                </BrowserRouter>                
            }
        </div>
    );
}

export default App;