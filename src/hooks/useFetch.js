import { useState, useEffect } from "react";


// 4 - Custom hook //

export const useFetch = (url) =>{
    const [data, setData] = useState(null);

    // 5 - Refatorando o post //
    const [config, setConfig] = useState(null); // vai configurar o metodo que sera utilizado //
    const [method, setMethod] = useState(null) // vai dizer qual metodo sera utilizado na função (get ou post)//
    const [callfetch, setCallFetch] = useState(false);

    // 6 - loading //
    const [loading, setLoading] = useState(false);

    // 8 - tratando erros //

    const[error, setError] = useState(null);

    // Desafio 6 //
const [itemId, setItemId] = useState(null);

    const httpConfig = (data, method) =>{
        if(method === "POST") {
            setConfig({
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            });
            
            setMethod("POST");
    } else if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });

            setMethod("DELETE");
            setItemId(data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {

            // 6 - loading //
            setLoading(true);
            
            try{
                const res = await fetch(url);

                const json = await res.json();
    
                setData(json);
                setMethod(null);
                setError(null);
            } catch (error){

                console.log(error.message);

               setError("Houve algum erro ao carregar os dados...") 
            }
           

            setLoading(false)
         };

         fetchData();
        
    }, [url, callfetch]);

    // 5 - refatorando post //

    useEffect(() => {
        const httpRequest = async () => {
            if(method === 'POST') {

                setLoading(true);
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions)

        const json = await res.json();

        setCallFetch(json);
         // 9 - desafio
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;

        const res = await fetch(deleteUrl, config);

        const json = await res.json();

        setCallFetch(json);
      }
    };

httpRequest();
    },[config, method, url,itemId]);
    console.log(config)

    return {data, httpConfig, loading, error};
};