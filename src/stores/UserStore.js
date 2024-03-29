import {defineStore} from "pinia";
import axios from "../axios-auth";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userId: '',
        email: '',
        token: '',
        firstName: '',
        profile_picture: '',
    }),
    getters: {
        getLoggedIn() {
            return this.email !== '' && this.token !== '';
        },
        getAdmin() {
            this.getAdminStatus(this.userId).then(response => {
                this.admin = response.data;
            });
            return this.admin;
        }
    },
    actions: {
         login(user) {
            return new Promise((resolve, reject) => {
            axios.post('/users/login', {
                email: user.email,
                password: user.password
            }).then(response => {
                if (response.data.message === "Success") {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('firstName', response.data.firstName);

                    this.userId = response.data.userId;
                    this.email = response.data.email;
                    this.token = response.data.token;
                    this.firstName = response.data.firstName;
                }
                resolve(response);
            }).catch(error => reject(error));
            });
        },
        autoLogin() {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const userId = localStorage.getItem('userId');
            const firstName = localStorage.getItem('firstName');

            if (token && email) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.token = token;
                this.email = email;
                this.userId = userId;
                this.firstName = firstName;
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            localStorage.removeItem('firstName');
            this.token = '';
            this.email = '';
            this.userId = '';
            this.firstName = '';
            this.admin = false;
        },
        getAdminStatus(userId) {
            return axios.get('/users/admins/' + userId);
        }
    }
})
