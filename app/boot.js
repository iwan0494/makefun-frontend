const app = document.querySelector('#app');
app.setAttribute('aria-live', 'polite');
import('./views.js').then(({ start }) => start(app)).catch(() => { app.textContent = 'The live board could not be opened. Please refresh.'; });
