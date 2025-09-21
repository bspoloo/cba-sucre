import { createRouter, createWebHistory } from 'vue-router'

// Importa tus vistas
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Experiencia from '../views/Experiencia.vue'
import Programa from '../views/Programa.vue'
import Sistema from '../views/Sistema.vue'
import SobreNosotros from '../views/SobreNosotros.vue'
import AdminEstudiantes from "../views/admin/AdminEstudiantes.vue";
import AdminDocentes from "../views/admin/AdminDocentes.vue";
import AdminMaterias from "../views/admin/AdminMaterias.vue";
import AdminApp from '@/views/admin/AdminApp.vue'
import Login from '@/views/admin/Login.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import { authGuard, guestGuard } from './guards'


const routes = [
  {
    path: '/',
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    component: AboutView,
    meta: { requiresAuth: false }
  },
  {
    path: '/experiencia',
    component: Experiencia,
    meta: { requiresAuth: false }
  },
  {
    path: '/programa',
    component: Programa,
    meta: { requiresAuth: false }
  },
  {
    path: '/sistema',
    component: Sistema,
    meta: { requiresAuth: false }
  },
  {
    path: '/sobre-nosotros',
    component: SobreNosotros,
    meta: { requiresAuth: false }
  },

  {
    path: '/admin',
    component: AdminApp,
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
        // component: AdminApp,
        // meta: { requiresAuth: true }
      },
      {
        path: 'login',
        component: Login,
        meta: { requiresGuest: true, }
      },
      {
        path: 'dashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: 'estudiantes',
        component: AdminEstudiantes,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: 'docentes',
        component: AdminDocentes,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: 'materias',
        component: AdminMaterias,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
    ]
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    meta: { requiresAuth: false }
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(authGuard);
router.beforeEach(guestGuard);

export default router
