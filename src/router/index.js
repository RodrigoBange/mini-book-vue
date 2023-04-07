import { createRouter, createWebHistory } from 'vue-router'

import Feed from "@/views/Home/Feed.vue";
import LoginView from "@/views/Login/LoginView.vue";
import RegisterView from "@/views/Login/RegisterView.vue";
import Profile from "@/views/Account/ProfileView.vue";
import EditProfile from "@/views/Account/EditProfileView.vue";
import SearchProfile from "@/views/Account/SearchProfileView.vue";
import RequestsView from "@/views/Account/RequestsView.vue";
import UsersPanelView from "@/views/Admin/UsersPanelView.vue";
import UserEditView from "@/views/Admin/UserEditView.vue";
import UserCreateView from "@/views/Admin/UserCreateView.vue";

const routes = [
  { path: '/', component: Feed },
  { path: '/login', component: LoginView},
  { path: '/register', component: RegisterView},
  { path: '/profile/:id', component: Profile, props: true },
  { path: '/editprofile/:id', component: EditProfile, props: true},
  { path: '/search', component: SearchProfile },
  { path: '/requests', component: RequestsView },
  { path: '/admin/users', component: UsersPanelView },
  { path: '/admin/users/edit/:id', component: UserEditView, props: true  },
  { path: '/admin/users/create', component: UserCreateView}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
