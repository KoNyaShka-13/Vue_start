import Main from "@/pages/Main";
import { createRouter, createWebHistory } from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
//Реализация постраницной навигации реализована крайне просто, достаточно создать массив, состоящий из объектов, в которых будем описывать маршруты страницы
const routes = [//Массив с маршрутами
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    
]

const router = createRouter({ //Создаем роутер, принимает некий объект с опциями
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
