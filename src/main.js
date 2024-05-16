import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

import Modal from './components/modal.vue';
const app = createApp(App);
app.component('GlobalModal', Modal);
app.mount('#app');
