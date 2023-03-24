import { createRouter, createWebHistory } from 'vue-router'

import Feed from "@/views/Home/Feed.vue";
import LoginView from "@/views/Login/LoginView.vue";
import RegisterView from "@/views/Login/RegisterView.vue";
import Profile from "@/views/Account/Profile.vue";
import EditProfile from "@/views/Account/EditProfile.vue";
import SearchProfile from "@/views/Account/SearchProfile.vue";
import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';


const routes = [
  { path: '/', component: Feed },
  { path: '/login', component: LoginView},
  { path: '/register', component: RegisterView},
  { path: '/profile/:id', component: Profile, props: true },
  { path: '/editprofile/:id', component: EditProfile, props: true},
  { path: '/search', component: SearchProfile },
  { path: '/products', component: ProductList },
  { path: '/createproduct', component: CreateProduct },
  { path: '/editproduct/:id', component: EditProduct, props: true  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
