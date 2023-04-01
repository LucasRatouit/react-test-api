import './App.css';
import React, { useCallback } from "react";
import axios from 'axios';

export default function App() {
  const [request, setRequest] = React.useState("")
  const [returnRequest, setReturnRequest] = React.useState("Bienvenue, ce site test les requêtes de mon API REST node.js (pokemons)")
  const [token, setToken] = React.useState("")
  const [returnRequestList, setReturnRequestList] = React.useState("")

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
      .post("https://node-test-api.onrender.com/api/login", { username: getInputUsername, password: getInputPassword }, { headers: { "Content-Type": "application/json" } })
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
  }, [])

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
          <input type="text" id="username" name="username" required />
          <input type="password" id="password" name="password" required />
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
              <img src={pokemon.picture} alt={pokemon.name} />
            </div>
          ))
          console.log(res.data)
          setReturnRequest(message)
          setReturnRequestList(pokemonsList)

        })
        .catch(err => {
          console.log(err.response.data.message)
          setReturnRequest(err.response.data.message)
        })
    }
    if (request === "pokeById") {
      console.log("Je sais pas encore...")
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
          <option value="pokeById">Requête en préparation...</option>
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