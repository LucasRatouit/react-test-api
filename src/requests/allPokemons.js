import axios from 'axios';
import { useReqState } from './ALLuseState';

const FetchPoke = () => {
    const { token, setReturnRequest, setReturnRequestList } = useReqState();

    //useEffect(() => {
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
    //}, [token, setReturnRequest, setReturnRequestList]);

    return null;
}

export default FetchPoke;