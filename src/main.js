import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI';
import router from "@/router/router";

const app = createApp(App)

components.forEach(component => {//Регистрируем компоненты, чтобы не нужно было постоянно их регистрировать в файлах
    app.component(component.name, component)//Первым параметром передаем название компонента, а вторым параметром сам компонент
})



app
    .use(router)
    .mount('#app');
