import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {registerSW} from 'virtual:pwa-register'
import './i18n/i18n.ts';
import "./index.css"

registerSW({immediate: true});

createRoot(document.getElementById('root')!).render(
    <App/>
)
