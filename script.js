const registrationSection = document.querySelector('#registrationForm');
const loginSection = document.querySelector('#loginForm');

registrationSection.style.display = 'flex';

document.querySelector('#btn-register').addEventListener('click', (event) => {
    event.preventDefault();
    createUser();
});

document.querySelector('#btn-login').addEventListener('click', (event) => {
    event.preventDefault();
    loginUser();
});

document.getElementById('input_telefone').addEventListener('input', function (event) {
    let telefone = event.target.value.replace(/\D/g, '');

    if (telefone.length > 11) telefone = telefone.slice(0, 11);

    if (telefone.length > 6) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    } else if (telefone.length > 2) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else if (telefone.length > 0) {
        telefone = `(${telefone}`;
    }

    event.target.value = telefone;
});

document.getElementById('input_cpf').addEventListener('input', function (event) {
    let cpf = event.target.value.replace(/\D/g, '');
    if (cpf.length > 11) cpf = cpf.slice(0, 11);
    if (cpf.length >= 3) cpf = cpf.replace(/^(\d{3})/, '$1.');
    if (cpf.length >= 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
    if (cpf.length >= 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
    event.target.value = cpf;
});

const validateForm = () => {
    const nome = document.getElementById('input_nome').value.trim();
    const cpf = document.getElementById('input_cpf').value;
    const email = document.getElementById('input_email').value;
    const senha = document.getElementById('input_senha').value;
    const telefone = document.getElementById('input_telefone').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!nome) {
        alert("O nome não pode estar vazio.");
        return false;
    }
    if (!cpfRegex.test(cpf)) {
        alert("CPF inválido. Use o formato 000.000.000-00.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Email inválido.");
        return false;
    }
    if (!senhaRegex.test(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
        return false;
    }
    if (!telefoneRegex.test(telefone)) {
        alert("Telefone inválido. Use o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.");
        return false;
    }
    return true;
};

const createUser = () => {
    // Captura os valores dentro da função de criação do usuário
    const nome = document.getElementById('input_nome').value;
    const cpf = document.getElementById('input_cpf').value;
    const email = document.getElementById('input_email').value;
    const senha = document.getElementById('input_senha').value;
    const telefone = document.getElementById('input_telefone').value;


    if (!validateForm()) {
        return;
    }

    const newUser = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        telefone: telefone,
        genero: document.getElementById('input_genero').value,
        datanascimento: document.getElementById('input_datanascimento').value,
    };

    fetch("http://localhost:3000/users", {
        body: JSON.stringify(newUser),
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((resp) => {
            if (resp.ok) {
                alert("Usuário cadastrado com sucesso!");
                switchToLogin();
            } else {
                alert("Erro ao cadastrar usuário.");
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
};

const loginUser = () => {
    const loginValue = document.getElementById('input_login').value;
    const password = document.getElementById('input_login_senha').value;

    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => (user.email === loginValue || user.cpf === loginValue) && user.senha === password);

            if (user) {
                alert('Login realizado com sucesso!');

            } else {
                alert('Email ou senha incorretos!');
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
};

const switchToLogin = () => {
    registrationSection.style.display = 'none';
    loginSection.style.display = 'flex';
};

const getUsers = () => {
    fetch("http://localhost:3000/users", {
        method: "GET",
    })
        .then((resp) => resp.json())
        .then((data) => {

            data.forEach((user) => {

            });
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
};

window.addEventListener('load', () => {
    getUsers();
});