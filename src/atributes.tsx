import React, { useState, useEffect} from 'react';
import axios from 'axios';

export function Planet(props: any) {
    const [planet, setPlanet] = useState <string>();
    useEffect(()=>{
        if (props.link) {
            axios.get(props.link).then(response => {
                setPlanet(response.data.name)
              });
        }
      }, [props.link]);
    return (
        planet ? <div>{planet}</div> : <>n/a</>      
    );
}

export function Film (props: any) {
  const [film, setFilm] = useState <string>();
  const [episode, setEpisode] = useState <string>();
  useEffect(() =>{
    if(props.link) {
      axios.get(props.link).then(response => {
        setFilm(response.data.title);
        setEpisode(response.data.episode_id);
      })
    }
  }, [props.link])
  return (
    episode && film ?
    <div>{`Episode ${episode}: ${film}`}</div>
    : <> <br/>Loading...</>
    );
}

export function Specie (props: any) {
  const [specie, setSpecie] = useState <string>();
  useEffect(() => {
    if(props.link) {
      axios.get(props.link).then(response => {
        setSpecie(response.data.name);
      })
    }
  }, [props.link])
  return <div>{specie}</div>
}

export function Vehicle (props: any) {
  const [vehicle, setVehicle] = useState <any>();
  useEffect(()=> {
    if(props.link) {
      axios.get(props.link).then(response => {
        setVehicle(response.data.name);
      })
    }
  })
  return (
    vehicle ? <div>{vehicle}</div>
    : <><br/>Loading...</>
  )
}

export function Starship (props: any) {
  const [starship, setStarship] = useState <any>();
  useEffect(() => {
    axios.get(props.link).then(response => {
      setStarship(response.data.name);
    })
  }, [props.link])
  return <div>{starship}</div>
}

export function Character (props: any) {
  const [character, setCharacter] = useState <any>();
  useEffect(() => {
    axios.get(props.link).then(response => {
      setCharacter(response.data.name);
    })
  }, [props.link])
  return (
    character ? <div>{character}</div> 
    : <><br/>Loading...</>
  ) 
}