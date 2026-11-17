import('./main.js').catch(() => { document.querySelector('#app').innerHTML = '<main class="error">Nightboard could not load. Check your connection and refresh.</main>'; });
