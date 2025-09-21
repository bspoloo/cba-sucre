import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '@/stores/index';

export const authGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();
    if (to.meta.requieresAuth && authStore.isLoggedIn) {
        next({
            path: 'admin/login',
            query: { returnUrl: to.fullPath }
        });
    } else if (to.meta.requieresAuth && authStore.isLoggedIn) {
        if (Array.isArray(to.meta.roles) && to.meta.roles.length > 0) {
            const userRole = authStore.userRole;
            if (to.meta.roles.includes(userRole)) {
                next();
            } else {
                next({ path: '/unauthorized' });
            }
        } else {
            next();
        }
    } else {
        next()
    }
};

export const guestGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();

    if (to.meta.requieresGuest && authStore.isLoggedIn) {
        next({
            path: 'admin/dashboard'
        });
    } else {
        next()
    }
}