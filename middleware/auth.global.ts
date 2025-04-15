export default defineNuxtRouteMiddleware((to) =>{
    const token = localStorage.getItem('token');
    if (!token && !['/auth/login', '/auth/register'].includes(to.path)){
        return navigateTo('/auth/login');
    }
})

