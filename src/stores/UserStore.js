import {defineStore} from "pinia";
import axios from "../axios-auth";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        email: '',
        token: '',
        firstName: '',
        lastName: ''
    }),
    getters: {
        getLoggedIn() {
            return this.email !== '' && this.token !== '';
        }
    },
    actions: {
        login(user) {
            return new Promise((resolve, reject) => {
            axios.post('/user/login', {
                email: user.email,
                password: user.password
            }).then(response => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);

                this.email = response.data.email;
                this.token = response.data.token;
                this.firstName = response.data.firstName;
                this.lastName = response.data.lastName;

                resolve(response);
            }).catch(error => reject(error));
            });
        },
        autoLogin() {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token && email) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.token = token;
                this.email = email;
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.token = '';
            this.email = '';
        }
    }
})