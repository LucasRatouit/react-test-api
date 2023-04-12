import { useState } from "react";

export const useReqState = () => {
    const [token, setToken] = useState("")
    const [returnRequest, setReturnRequest] = useState("Bienvenue, ce site test les requêtes de mon API REST node.js (pokemons)")
    const [returnRequestList, setReturnRequestList] = useState("")

    return { token, setToken, returnRequest, setReturnRequest, returnRequestList, setReturnRequestList }
};