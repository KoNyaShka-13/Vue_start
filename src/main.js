import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI';
import router from "@/router/router";
import VIntersection from './directives/VIntersection';

const app = createApp(App)

components.forEach(component => {//Регистрируем компоненты, чтобы не нужно было постоянно их регистрировать в файлах
    app.component(component.name, component)//Первым параметром передаем название компонента, а вторым параметром сам компонент
})

app.directive('intersection', VIntersection)//Указываем название и документ

app
    .use(router)
    .mount('#app');
