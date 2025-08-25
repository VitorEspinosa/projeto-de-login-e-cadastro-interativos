document.addEventListener('DOMContentLoaded', () => {
    const dashboardUsernameSpan = document.getElementById
    ('dashboard-username');
    const dashboardEmailSpan = document.getElementById
    ('dashboard-email');
    // Função para obter usuários do localStorage (duplicado de auth.js, pode ser refatorado se em um módulo maior)
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
    // Função para obter o token (simulado)
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }
    // Função para verificar se o usuário está logado
    function isAuthenticated() {
        return getAuthToken() !== null;
    }
    // Função para obter o usuário logado com base no token
    function getLoggedInUser() {
        const token = getAuthToken();
        if (!token) return null;
        try {
            // Decodifica o token (username:timestamp)
            const decoded = atob(token);
            const [username] = decoded.split(':');
            
            const users = getUsers();
            return users.find(u => u.username === username);
        } catch (e) {
            console.error("Erro ao decodificar token:", e);
            return null;
        }
    }
    // --- Proteção de Rota ---
    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return; // Impede que o restante do script seja executado
    }
    // Se estiver autenticado, carrega e exibe os dados do usuário
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        dashboardUsernameSpan.textContent = loggedInUser.username;
        dashboardEmailSpan.textContent = loggedInUser.email;
    } else {
        // Isso pode acontecer se o token for válido mas o usuário não for encontrado (ex: usuário deletado)
        // Neste caso, é melhor forçar o logout
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const dashboardUsernameSpan = document.getElementById('dashboard-username');
    const dashboardEmailSpan = document.getElementById('dashboard-email');

    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function getAuthToken() {
        return localStorage.getItem('authToken');
    }

    function isAuthenticated() {
        return getAuthToken() !== null;
    }

    function getLoggedInUser() {
        const token = getAuthToken();
        if (!token) return null;
        try {
            const decoded = atob(token);
            const [username] = decoded.split(':');
            const users = getUsers();
            return users.find(u => u.username === username);
        } catch (e) {
            console.error("Erro ao decodificar token:", e);
            return null;
        }
    }

    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        dashboardUsernameSpan.textContent = loggedInUser.username;
        dashboardEmailSpan.textContent = loggedInUser.email;
    } else {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    }

    // ---- Compra de ingressos ----
    let ingressoSelecionado = null; // guarda o ingresso que o usuário comprou

    // Seleciona todos os tickets
    const tickets = document.querySelectorAll('.ticket');

    tickets.forEach(ticket => {
        ticket.addEventListener('click', () => {
            const ingressoNome = ticket.querySelector('h4').textContent;

            if (!ingressoSelecionado) {
                // Primeira compra
                ingressoSelecionado = ingressoNome;
                alert(`Você comprou o ingresso: ${ingressoNome}`);
            } else if (ingressoSelecionado !== ingressoNome) {
                // Já havia comprado outro ingresso
                const mudar = confirm(`Você já comprou o ingresso ${ingressoSelecionado}. Tem certeza que quer mudar para ${ingressoNome}?`);
                if (mudar) {
                    ingressoSelecionado = ingressoNome;
                    alert(`Agora você comprou o ingresso: ${ingressoNome}`);
                }
            } else {
                // Clicou no mesmo ingresso
                alert(`Você já comprou o ingresso: ${ingressoNome}`);
            }
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });
});
