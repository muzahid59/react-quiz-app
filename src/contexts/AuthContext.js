import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}   

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        setCurrentUser(auth.currentUser);
        return unsubscribe;
    }, []);
    
    // signup
    async function signup(email, password, username) {
        // firebase signup
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);  
        updateProfile(auth.currentUser, {
            displayName: username
        });  
        const user = auth.currentUser;

        setCurrentUser({ 
            ...user
        });
    }   
    // login
    async function login(email, password) {
        // firebase login
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        // firebase logout
        const auth = getAuth();
        return signOut(auth);   
    }
    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}