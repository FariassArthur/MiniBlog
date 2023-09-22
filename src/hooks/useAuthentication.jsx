/* O firebase necessita de algumas funções 
para salvar dados de usuários já que não faz isso
nativamente */
// A única coisa que salva no firebase é email e senha
import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

import React from 'react'

const useAuthentication = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup - impede resquícios de funções
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(); //possível usar funções de autenticação

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    } //evita vazamento de memória

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true);
        setError(null);

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, [])



    return {
        auth,
        createUser,
        error,
        loading,
    };
}

export default useAuthentication