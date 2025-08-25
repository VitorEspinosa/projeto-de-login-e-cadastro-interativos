document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-mensagem");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita envio automático

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    // Verificação dos campos
    if (!nome || !email || !mensagem) {
      alert("⚠️ Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação simples de e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      alert("⚠️ Por favor, insira um e-mail válido.");
      return;
    }

    // Se passou pelas validações
    alert("✅ Mensagem enviada com sucesso!\nObrigado por entrar em contato, " + nome + "!");
    
    // Limpar o formulário
    form.reset();
  });
});