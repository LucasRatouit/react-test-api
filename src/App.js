import './App.css';
import React, { useState, useCallback } from "react";
import axios from 'axios';
import { useReqState } from './requests/ALLuseState';
import FetchPoke from './requests/allPokemons';

export default function App() {
  const [request, setRequest] = useState("")
  const { token, setToken, returnRequest, setReturnRequest, returnRequestList, setReturnRequestList } = useReqState()

  const handleOptionChange = (e) => {
    setRequest(e.target.value);
  }

  const loading = () => (
    <div className='loading'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </div>
  )

  const login = useCallback(() => {
    setReturnRequest(loading)
    const getInputUsername = document.getElementById("username").value
    const getInputPassword = document.getElementById("password").value
    axios
      .post("https://node-test-api.onrender.com/api/login", { username: getInputUsername, password: getInputPassword })
      .then((res) => res.data)
      .then((res) => {
        setReturnRequest(res.message)
        setToken(res.token)
        setReturnRequestList("")
      })
      .catch(err => {
        console.log(err.response.data.message)
        setReturnRequest(err.response.data.message)
      })
  }, [setToken, setReturnRequest, setReturnRequestList])

  const findPoke = useCallback(() => {
    setReturnRequest(loading)
    const getInputID = document.getElementById("id").value
    axios
      .get(`https://node-test-api.onrender.com/api/pokemons/${getInputID}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {

        const message = res.data.message
        const poke = res.data.data

        const infoPoke = (
          <div key={poke.id} className='listPokemon'>
            <h3>{poke.name}</h3>
            <h6>HP : {poke.hp}</h6>
            <h6>CP : {poke.cp}</h6>
            <h6>TYPES : {poke.types.join("-")}</h6>
            <h6>ID : {poke.id}</h6>
            <img src={poke.picture} alt={poke.name} />
          </div>
        )

        setReturnRequest(message)
        setReturnRequestList(infoPoke)
      })
      .catch((err) => {
        console.log(err.response.data.message)
        setReturnRequest(err.response.data.message)
      })
  }, [token, setReturnRequest, setReturnRequestList])

  const creation = useCallback(() => {
    setReturnRequest(loading)
    const getInputName = document.getElementById("name").value
    const getInputHP = document.getElementById("hp").value
    const getInputCP = document.getElementById("cp").value
    const getInputPicture = document.getElementById("picture").value
    const getInputType = document.getElementById("type").value
    axios
      .post("https://node-test-api.onrender.com/api/pokemons", { name: getInputName, hp: getInputHP, cp: getInputCP, picture: getInputPicture, types: [getInputType] }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data)
      .then((res) => {
        setReturnRequest(res.message)
      })
      .catch(err => {
        console.log(err.response.data.message)
        setReturnRequest(err.response.data.message)
      })
  }, [token, setReturnRequest])

  const putPoke = useCallback(() => {
    setReturnRequest(loading)
    const getInputID = document.getElementById("id").value
    const getInputName = document.getElementById("name").value
    const getInputHP = document.getElementById("hp").value
    const getInputCP = document.getElementById("cp").value
    const getInputPicture = document.getElementById("picture").value
    const getInputType = document.getElementById("type").value
    axios
      .put(`https://node-test-api.onrender.com/api/pokemons/${getInputID}`, { name: getInputName, hp: getInputHP, cp: getInputCP, picture: getInputPicture, types: [getInputType] }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const message = res.data.message
        setReturnRequest(message)
      })
      .catch(err => {
        console.log(err.data)
      })
  }, [token, setReturnRequest])

  const deletePoke = useCallback(() => {
    setReturnRequest(loading)
    const getInputID = document.getElementById("id").value
    axios
      .delete(`https://node-test-api.onrender.com/api/pokemons/${getInputID}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const message = res.data.message
        console.log(res.data)
        setReturnRequest(message)
      })
      .catch(err => {
        const message = err.response.data.message
        console.log(message)
        setReturnRequest(message)
      })
  }, [token, setReturnRequest])

  /////////////////////////////////////

  const handleButtonClick = () => {
    setReturnRequest(loading)
    setReturnRequestList("")
    if (request === "HOME") {
      axios
        .get("https://node-test-api.onrender.com/")
        .then(res => {
          setReturnRequest(res.data)
        })
    }
    if (request === "login") {
      const auth = (
        <div className='listAuth'>
          <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" required />
          <input type="password" id="password" name="password" placeholder="Mot de passe" required />
          <button className='buttonAuth' id="auth" onClick={() => login()} />
        </div>
      )
      setReturnRequest("")
      setReturnRequestList(auth)
    }
    if (request === "allPoke") {
      axios
        .get("https://node-test-api.onrender.com/api/pokemons", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          const pokemons = res.data.data
          const message = res.data.message

          const pokemonsList = pokemons.map(pokemon => (
            <div key={pokemon.id} className='listPokemon'>
              <h3>{pokemon.name}</h3>
              <h6>HP : {pokemon.hp}</h6>
              <h6>CP : {pokemon.cp}</h6>
              <h6>TYPES : {pokemon.types.join("-")}</h6>
              <h6>ID : {pokemon.id}</h6>
              <img src={pokemon.picture} alt={pokemon.name} />
            </div>
          ))
          console.log(res.data.data)
          setReturnRequest(message)
          setReturnRequestList(pokemonsList)

        })
        .catch(err => {
          console.log(err.response.data.message)
          setReturnRequest(err.response.data.message)
        })
    }
    if (request === "pokeByPK") {
      const ByPK = (
        <div className='listAuth'>
          <input type="number" id="id" name="id" placeholder="ID du pokémon à trouver" required />
          <button className='buttonAuth' id="add" onClick={() => findPoke()} />
        </div>
      )
      setReturnRequest("")
      setReturnRequestList(ByPK)
    }
    if (request === "addPoke") {
      const infoPoke = (
        <div className='listAuth'>
          <input type="text" id="name" name="name" placeholder="Nom du pokémon" required />
          <input type="number" id="hp" name="hp" placeholder="Point de vie du pokémon" required />
          <input type="number" id="cp" name="cp" placeholder="Point de dégat du pokémon" required />
          <input type="url" id="picture" name="picture" placeholder="Lien de l'image du pokémon" required />
          <input type="text" id="type" name="type" placeholder="Type du pokémon" required />
          <button className='buttonAuth' id="add" onClick={() => creation()} />
        </div>
      )
      setReturnRequest("")
      setReturnRequestList(infoPoke)
    }
    if (request === "modifPoke") {
      const ByPK = (
        <div className='listAuth'>
          <input type="number" id="id" name="id" placeholder="ID du pokémon à modifier" required />
          <input type="text" id="name" name="name" placeholder="Nom du pokémon" required />
          <input type="number" id="hp" name="hp" placeholder="Point de vie du pokémon" required />
          <input type="number" id="cp" name="cp" placeholder="Point de dégat du pokémon" required />
          <input type="url" id="picture" name="picture" placeholder="Lien de l'image du pokémon" required />
          <input type="text" id="type" name="type" placeholder="Type du pokémon" required />
          <button className='buttonAuth' id="add" onClick={() => putPoke()} />
        </div>
      )
      setReturnRequest("")
      setReturnRequestList(ByPK)
    }
    if (request === "delPoke") {
      const ByPK = (
        <div className='listAuth'>
          <input type="number" id="id" name="id" placeholder="ID du pokémon à trouver" required />
          <button className='buttonAuth' id="add" onClick={() => deletePoke()} />
        </div>
      )
      setReturnRequest("")
      setReturnRequestList(ByPK)
    }
    if (request === "test") {
      FetchPoke();
    }
  }

  return (
    <div className="App">
      <div className='selector'>
        <select onChange={handleOptionChange} value={request} id="pet-select">
          <option defaultValue={"START"} value="START">Selectionnais une requête !</option>
          <option value="HOME">HOME</option>
          <option value="login">Authentification</option>
          <option value="allPoke">Liste des pokémons</option>
          <option value="pokeByPK">Retrouver un pokémon</option>
          <option value="addPoke">Ajouter un pokémon</option>
          <option value="modifPoke">Modifier un pokémon</option>
          <option value="delPoke">Supprimer un pokémon</option>
        </select>
        <button onClick={handleButtonClick} />
      </div>
      <header className="App-header">
        {returnRequest}
        <div className='listPokemons'>
          {returnRequestList}
        </div>
      </header>
    </div>
  );
}