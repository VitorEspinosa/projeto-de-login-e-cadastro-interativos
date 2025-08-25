document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM para Login e Cadastro
    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Referências aos elementos de input do Login
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');

    // Referências aos elementos de input do Cadastro
    const registerUsernameInput = document.getElementById('register-username');
    const registerPasswordInput = document.getElementById('register-password');
    const registerEmailInput = document.getElementById('register-email');

    // Referência ao botão de Logout (se existir na página atual, ou seja, no dashboard)
    const logoutBtn = document.getElementById('logout-btn');

    // --- Funções Auxiliares ---

    // Função para exibir mensagens (erro/sucesso)
    function displayMessage(element, message, type) {
        element.textContent = message;
        element.className = `message ${type}`; // Adiciona classes 'message' e 'error'/'success'
        element.style.display = 'block'; // Garante que a mensagem seja visível
        setTimeout(() => {
            element.textContent = '';
            element.className = 'message';
            element.style.display = 'none';
        }, 3000); // Esconde a mensagem após 3 segundos
    }

    // Função para obter usuários do localStorage
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // Função para salvar usuários no localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Função para armazenar o token (simulado)
    function setAuthToken(token) {
        localStorage.setItem('authToken', token);
    }

    // Função para obter o token (simulado)
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }

    // Função para remover o token (logout)
    function removeAuthToken() {
        localStorage.removeItem('authToken');
    }

    // Função para verificar se o usuário está logado
    function isAuthenticated() {
        return getAuthToken() !== null;
    }
    // --- Lógica de Cadastro ---
    if (registerForm) { // Verifica se o formulário de cadastro existe na página
        showRegisterBtn.addEventListener('click', () => {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            showLoginBtn.classList.remove('active');
            showRegisterBtn.classList.add('active');
            loginMessage.textContent = ''; // Limpa mensagens de login
        });
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = registerUsernameInput.value.trim();
            const password = registerPasswordInput.value.trim();
            const email = registerEmailInput.value.trim();

            if (!username || !password || !email) {
                displayMessage(registerMessage, 
                    'Por favor, preencha todos os campos.', 'error');
                return;
            }
            let users = getUsers();
            // Verifica se o nome de usuário ou email já existe
            const usernameExists = users.some
            (user => user.username === username);
            const emailExists = users.some(user => user.email === email);
            if (usernameExists) {
                displayMessage(registerMessage, 
                    'Nome de usuário já existe.', 'error');
                return;
            }
            if (emailExists) {
                displayMessage(registerMessage, 
                    'Email já cadastrado.', 'error');
                return;
            }
            // Adiciona novo usuário (sem criptografia de senha para simplicidade)
            users.push({ username, password, email });
            saveUsers(users);

            displayMessage(registerMessage, 
'Cadastro realizado com sucesso! Agora você pode fazer login.', 'success');
            // Opcional: Redirecionar para o login ou preencher campos de login
            registerForm.reset();
            // Mudar para o formulário de login automaticamente após o cadastro
            setTimeout(() => {
                showLoginBtn.click();
            }, 1500);
        });
    }
    // --- Lógica de Login ---
    if (loginForm) { // Verifica se o formulário de login existe na página
        showLoginBtn.addEventListener('click', () => {
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            showRegisterBtn.classList.remove('active');
            showLoginBtn.classList.add('active');
            registerMessage.textContent = ''; // Limpa mensagens de cadastro
        });
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginUsernameInput.value.trim();
            const password = loginPasswordInput.value.trim();
            if (!username || !password) {
                displayMessage(loginMessage, 
                    'Por favor, preencha nome de usuário e senha.', 'error');
                return;
            }
            const users = getUsers();
            const user = users.find(u => u.username 
                === username && u.password === password);
            if (user) {
                // Simula a geração de um token
                const token = btoa(username + ':' + Date.now()); // Codifica base64 (fake token)
                setAuthToken(token);
                displayMessage(loginMessage, 
                    'Login bem-sucedido! Redirecionando...', 'success');
                // Redireciona para o painel
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                displayMessage(loginMessage, 
                    'Nome de usuário ou senha incorretos.', 'error');
            }
        });
    }
    // --- Lógica de Logout ---
    if (logoutBtn) { // Verifica se o botão de logout existe na página (dashboard)
        logoutBtn.addEventListener('click', () => {
            removeAuthToken(); // Remove o token
            window.location.href = 'index.html'; // Redireciona para a página de login
        });
    }
    // --- Verificação inicial de autenticação ---
    // Se estiver na página de login/cadastro e já estiver logado, redireciona para o dashboard
    if (window.location.pathname.endsWith('index.html') 
        || window.location.pathname === '/') {
        if (isAuthenticated()) {
            window.location.href = '../dashboard.html';
        }
    }
});