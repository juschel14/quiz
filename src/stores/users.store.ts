import { defineStore } from 'pinia';

import { fetchWrapper } from '../helpers';
import { useAuthStore } from '../stores';
import  router  from '../router';
import type User from '../types/usertype'
const api = import.meta.env.VITE_API_URL
/*
interface Permission {
    id?: number,
    name: string,
    description: string,
    level: number,
}
interface Role {
    id?: number,
    name: string,
    description: string,
    disable?: boolean,
    level: number,
    permissions: Permission[]
}
interface User  {
    id: null | number,
    name: string,
    email: string,
    password: string,
    role?: Role,
    role_id: number,
    error: string,
}*/
interface EditUser  {
    id: number,
    name: string,
    email: string,
   
}
interface UsersState  {   
    user:  User,
   // edit_user:  EditUser,
    users: [] | User[],
    error: null | string
}



export const useUsersStore = defineStore({
    id: 'users',
    state: (): UsersState => {
        return {       
            user: {       
                id: null,  
                name: '',
                email: '',
                password: '',
            },    
            //edit_user: EditUser,    
            users: [],
            error: null
        }
       
    },
    actions: {
        async register(password: string, email: string, name: string) {
            const registered = await fetchWrapper.post(api + `/register`, {password,email,name});
            if(registered.success) {
                this.$state.user.email = registered.email
                this.$state.user.name = registered.name
                router.push('/login');

            } else {
                this.$state.error = registered.message
            }
        },
        async getUser(token: string) {
            const url = api + '/get_user?token=' + token
            console.log('user before get',localStorage.getItem('user'))
            const user = await fetchWrapper.get(`${url}`,null)
            if(user.status ===  'Token is Invalid') {
                console.log('user token v',user)
                this.$state.error = user.status
            } else {
                this.$state.user.email = user.user.email
                this.$state.user.id = user.user.id
                this.$state.user.name = user.user.name
                localStorage.setItem('user', JSON.stringify(this.$state.user));
                console.log('user ok',user)
            }
            
        },
        async getUsers() {
            
            try {
                this.$state.users = await fetchWrapper.get(api + '/admin/get_users',null) 
                
            } catch (error) {
                this.$state.error =   JSON.stringify(error)
            }
        },
        async saveUser(user: EditUser) {
            try {
                const users = await fetchWrapper.post(api + `/admin/save_user`, {user: user})
                if(users) {
                    this.$state.users = users
                }
            } catch (error) {
                this.$state.error = JSON.stringify(error)
            }
           
        },
        async removeUser(id: number) {
            // add isDeleting prop to user being deleted
           

            const users = await fetchWrapper.delete(api + '/admin/remove_user',{id: id})
            // remove user from list after deleted
            this.$state.users = users

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === this.$state.user.id) {
                this.$state.user = {       
                    id: null,  
                    name: '',
                    email: '',
                    password: '',                
                }
                authStore.logout();
            }
        }
       /* 
        async getById(id) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
       */
    }
});
