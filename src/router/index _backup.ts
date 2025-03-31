import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import CalendarView from '@/views/CalendarView.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TablesView from '@/views/TablesView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'

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
  // {
  //   path: '/',
  //   name: 'eCommerce',
  //   component: ECommerceView,
  //   meta: {
  //     title: 'eCommerce Dashboard',
  //   }
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {
      title: 'Calendar'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: SigninView,
    meta: {
      title: 'Login',
      requiresGuest: true
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  document.title = `${ APP_NAME } ${ to.meta.title } | ${ SYSTEM_DEVELOPER }`
  
  const authStore = useAuthStore();
  const loader = $loading.show();
  
  try {

    if (authStore.is_authenticated === null) {
      // Intentamos obtener el usuario antes de hacer cualquier verificación
      await authStore.fetchUser();
    }

    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (to.meta.requiresAuth && !authStore.is_authenticated) {
      // Redirigir al login si no está autenticado
      next({ name: 'login' });
      toast.warning('Inicia sesión para continuar')
      return
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
