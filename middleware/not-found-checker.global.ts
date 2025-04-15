
export default defineNuxtRouteMiddleware((to) =>{
    const routes = [
        "/account/edit-account",
        "/account/profile",
        "/auth/login",
        "/book/new-book",
        "/book",
        "/history",
        "/",
    ];
    if (!routes.includes(to.path)) {
        navigateTo('/page-not-found');
    }
})