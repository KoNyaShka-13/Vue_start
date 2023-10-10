import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI';
import router from "@/router/router";
import directives from '@/directives';
import store from '@/store';

const app = createApp(App)

components.forEach(component => {//Регистрируем компоненты, чтобы не нужно было постоянно их регистрировать в файлах
    app.component(component.name, component)//Первым параметром передаем название компонента, а вторым параметром сам компонент
})

directives.forEach(directive => {
    app.directive(directive.name, directive)//Просто указываем, что мы будем доставать данные из диррективы, но не указываем ее
})

//app.directive('intersection', VIntersection)//Указываем название и документ

app
    .use(router)
    .use(store)
    .mount('#app');
