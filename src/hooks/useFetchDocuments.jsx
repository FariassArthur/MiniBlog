import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    //docCollection é onde eu tô pegando os dados
    //uid para pegar dados do usuário

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        
        async function loadData() {
            if(cancelled) {
                return;
            }

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            //search  data
            try {
                
                let q;

                //busca
                //dashboard

                q = await query(collectionRef, orderBy("createdAt", "desc"));

                //mapeamento de dados
                /* Pega o dado existente e compara com a atualização pra atribuir */
                await onSnapshot(q, (QuerySnapshot) => {

                    setDocuments(
                        //o snapshot não trás só os dados, ele trás mais coisas
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false)

            } catch (error) {
                console.log(error)
                setError(error.message);

                setLoading(false);
            }
        }

        loadData();

    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return() => setCancelled(true);
    }, []);

    return {documents, loading, error};

};