import { defineStore } from 'pinia';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth'
import { fetchWrapper } from '../helpers';
import  router  from '../router';

import { initializeApp } from "firebase/app";

//const api = import.meta.env.VITE_API_URL
//const baseUrl = api;
interface AuthState  {   
    token: string,
    error: string,
    user: object
}
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_API_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  };
const auth = getAuth(initializeApp(firebaseConfig))

export const useAuthStore = defineStore({
    id: 'auth',
    
    
    state: (): AuthState => {
        return {           
            token: '',
            error: '',
            //returnUrl: '/',
            user: {}
        }
     
    },
    actions: {
        init() {
            
            onAuthStateChanged(auth, (user) => {
                console.log('onAuthStateChanged',auth,user)
            })
        },
        resetError() {
            this.$state.error = ''
        },
        async login(email: string,password: string){
            try {
                const user = await signInAnonymously(auth)
                if(user) {
                    console.log('login user',user.user.getIdToken)
                    this.$state.user = user
                    this.$state.token = await user.user.getIdToken(false)
                    router.push('/easy')
                } else {
                    router.push
                }

            } catch (error) {
                this.$state.error = JSON.stringify(error)
            }
        },
        async logout() {
            await signOut(auth)
            this.$state.user = {}
            router.push('/login')
        },
        async register() {
            try {

            } catch(error) {

            }
        },
       
    }
});
