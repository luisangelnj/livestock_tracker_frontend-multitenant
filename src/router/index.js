import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/ui/views/Authentication/LoginView.vue'
import SignupView from '@/ui/views/Authentication/SignupView.vue'
import ForgotPasswordView from '@/ui/views/Authentication/ForgotPasswordView.vue'
import ResetPasswordView from '@/ui/views/Authentication/ResetPasswordView.vue'
import VerifyEmailNoticeView from '@/ui/views/Authentication/VerifyEmailNoticeView.vue'
import VerifyEmailView from '@/ui/views/Authentication/VerifyEmailView.vue'
import DefaultLayoutRouterView from '@/layouts/DefaultLayoutRouterView.vue'
import DashboardView from '@/ui/views/Dashboard/DashboardView.vue'
import CattleListView from '@/ui/views/Herds/Cattle/CattleListView.vue'
import CattleAddView from '@/ui/views/Herds/Cattle/CattleAddView.vue'
import CattleUpdateView from '@/ui/views/Herds/Cattle/CattleUpdateView.vue'
import CattleDetailView from '@/ui/views/Herds/Cattle/CattleDetailView.vue'
import CorralListView from '@/ui/views/Herds/Corral/CorralListView.vue'
import CorralAddView from '@/ui/views/Herds/Corral/CorralAddView.vue'

import ExampleView from '@/ui/views/ExampleView.vue'

import { useLoading } from 'vue-loading-overlay'
import { useToast } from "vue-toastification";

import { useAuthStore } from '@/stores/authStore';

import { APP_NAME, SYSTEM_DEVELOPER } from '@/config/env'

const $loading = useLoading({
  color: '#007BFF'
});
const toast = useToast({
  timeout: 5000
});

const routes = [

  // Rutas de registro y autenticación
  { path: '/auth/login', name: 'login', component: LoginView, meta: { title: 'Login', requiresGuest: true } },
  { path: '/auth/signup', name: 'signup', component: SignupView, meta: { title: 'Signup', requiresGuest: true } },
  {
    path: '/auth/verification-notice', name: 'verify-notice', component: VerifyEmailNoticeView, meta: { title: 'Verifica tu correo', requiresGuest: true },
    beforeEnter: (to, from, next) => {
      // Si viene de otra ruta del sistema, lo deja pasar. Si es accedido manualmente manda a home
      from.name ? next() : next("/");
    },
  },
  { path: '/auth/email/verify/:id/:token', name: 'verify-email', component: VerifyEmailView, meta: { title: 'Verifica tu correo', requiresGuest: true } },
  { path: '/auth/forgot-password', name: 'forgot-password', component: ForgotPasswordView, meta: { title: 'Olvidé mi contraseña', requiresGuest: true } },
  { path: '/auth/reset-password/:token/:email', name: 'reset-password', component: ResetPasswordView, meta: { title: 'Restablecer mi contraseña', requiresGuest: true } },


  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard', requiresAuth: true } },
  

  {
    path: '/herd',
    component: DefaultLayoutRouterView, // o uno llamado HerdLayout si quieres aislarlo
    meta: { requiresAuth: true },
    children: [
      // 🐄 CATTLE
      {
        path: 'cattle',
        children: [
          {
            path: '',
            name: 'cattle-list',
            component: CattleListView,
            meta: { title: 'Listado de ganado' }
          },
          {
            path: 'add',
            name: 'cattle-add',
            component: CattleAddView,
            meta: { title: 'Registro de nuevo ganado' }
          },
          {
            path: ':id',
            name: 'cattle-detail',
            component: CattleDetailView,
            meta: { title: 'Detalle de ganado' }
          },
          {
            path: 'update/:id',
            name: 'cattle-update',
            component: CattleUpdateView,
            meta: { title: 'Edición de ganado' }
          }
        ]
      },

          // 🐖 CORRALS
    {
      path: 'corrals',
      children: [
        {
          path: '',
          name: 'corrals-list',
          component: CorralListView,
          meta: { title: 'Listado de corrales' }
        },
        {
          path: 'add',
          name: 'corral-add',
          component: CorralAddView,
          meta: { title: 'Registro de nuevo corral' }
        },
        // {
        //   path: ':id',
        //   name: 'corral-detail',
        //   component: () => import('@/pages/herd/corrals/CorralDetailView.vue'),
        //   meta: { title: 'Detalle de corral' }
        // },
        // {
        //   path: 'update/:id',
        //   name: 'corral-update',
        //   component: () => import('@/pages/herd/corrals/CorralUpdateView.vue'),
        //   meta: { title: 'Edición de corral' }
        // },
        // {
        //   path: ':id/assign',
        //   name: 'corral-assign',
        //   component: () => import('@/pages/herd/corrals/AssignCattleToCorral.vue'),
        //   meta: { title: 'Asignar ganado a corral' }
        // }
      ]
    }

    ]
  },


  {
    path: '/example',
    component: DefaultLayoutRouterView, // Aquí puedes poner un layout con un sidebar específico si lo deseas
    meta: { requiresAuth: true },
    children: [
      {
        path: 'first',
        name: 'first-example',
        component: ExampleView,
        meta: { title: 'Página ejemplo' }
      }
    ]
  },

  // Ruta comodín para redirigir a la página de inicio
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  document.title = `${APP_NAME} ${to.meta.title} | ${SYSTEM_DEVELOPER}`

  const authStore = useAuthStore();
  const loader = $loading.show();

  try {

    if (authStore.is_authenticated === null) {

      // Intentamos obtener el usuario antes de hacer cualquier verificación
      await authStore.fetchUser();
    }

    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (to.meta.requiresAuth && authStore.is_authenticated == null) {
      // Redirigir al login si no está autenticado
      next({ name: 'login' });
      toast.warning('Inicia sesión para continuar')
      return;
    }

    // Si la ruta requiere ser invitado (no estar autenticado) y el usuario ya está autenticado
    if (to.meta.requiresGuest && authStore.is_authenticated) {
      // Redirigir a la página principal si ya está autenticado
      return next({ name: 'dashboard' });
    }
    // Si todo está bien, procede a la ruta
    next();

  } catch (error) {

    // Si ocurre un error en cualquier parte del proceso, lo manejamos aquí
    console.error('Error en el middleware de autenticación:', error);
    // await authStore.logoutUser();
    // Opcional: redirigir al login en caso de un error inesperado
    return next({ name: 'login' });
  } finally {
    loader.hide()
  }

})

export default router
