// Variable que almacena el contenedor del formulario de edición
const editFormContainer = document.getElementById('edit-form-container');

// Variables que almacenan los elementos del formulario de edición
const editUserForm = document.getElementById('edit-user-form');
const editUserId = document.getElementById('edit-user-id');
const editNameInput = document.getElementById('edit-name');
const editEmailInput = document.getElementById('edit-email');

// Evento para el botón "Mostrar Usuarios"
const showUsersBtn = document.getElementById('show-users-btn');
showUsersBtn.addEventListener('click', fetchUsers);

// Evento para el formulario de creación de usuarios (CREATE)
const userForm = document.getElementById('user-form');
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Usuario creado:', result);
            alert('¡Usuario creado con éxito!');
            userForm.reset();
            fetchUsers();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        alert('Error al crear el usuario.');
    }
});

// Evento para el formulario de edición de usuarios (UPDATE)
editUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = editUserId.value;
    const updatedUser = {
        name: editNameInput.value,
        email: editEmailInput.value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });
        
        if (response.ok) {
            alert('Usuario actualizado con éxito');
            editFormContainer.style.display = 'none';
            fetchUsers();
        } else {
            alert('Error al actualizar el usuario.');
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
    }
});

// --- Funciones del CRUD ---

// Función para obtener y mostrar todos los usuarios (READ)
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        if (response.ok) {
            const users = await response.json();
            renderUsersTable(users);
        } else {
            alert('Error al cargar los usuarios.');
        }
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        alert('Error de conexión con el servidor.');
    }
}

// Función para renderizar los usuarios en la tabla (con botones de editar y eliminar)
function renderUsersTable(users) {
    const tableBody = document.querySelector('#users-table tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user._id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="showEditForm({_id: '${user._id}', name: '${user.name}', email: '${user.email}'})">Editar</button>
                <button onclick="deleteUser('${user._id}')">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para mostrar el formulario de edición con los datos del usuario
function showEditForm(user) {
    editUserId.value = user._id;
    editNameInput.value = user.name;
    editEmailInput.value = user.email;
    editFormContainer.style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

// Función para cancelar la edición (oculta el formulario)
function cancelEdit() {
    editFormContainer.style.display = 'none';
}

// Función para eliminar un usuario (DELETE)
async function deleteUser(userId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Usuario eliminado con éxito');
                fetchUsers();
            } else {
                alert('Error al eliminar el usuario.');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error de conexión con el servidor.');
        }
    }
}