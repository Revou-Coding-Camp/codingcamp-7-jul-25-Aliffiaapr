const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const deleteAllBtn = document.getElementById('delete-all-btn');
const filterBtn = document.getElementById('filter-btn');

let todos = [];
let filterActive = false;

function renderTodos() {
  todoList.innerHTML = '';
  let displayTodos = filterActive
    ? todos.filter(todo => !todo.completed)
    : todos;
  if (displayTodos.length === 0) {
    todoList.innerHTML = `<tr>
      <td colspan="4" class="text-center py-4 text-gray-400">No task found</td>
    </tr>`;
    return;
  }
  displayTodos.forEach((todo, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-gray-700';
    tr.innerHTML = `
      <td class="py-2 px-2">${todo.text}</td>
      <td class="py-2 px-2">${todo.date}</td>
      <td class="py-2 px-2">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} data-idx="${idx}" class="status-checkbox">
      </td>
      <td class="py-2 px-2">
        <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded delete-btn" data-idx="${idx}">Delete</button>
      </td>
    `;
    todoList.appendChild(tr);
  });
}

todoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  const date = dateInput.value;
  if (!text) {
    alert('Task tidak boleh kosong!');
    return;
  }
  if (!date) {
    alert('Tanggal harus diisi!');
    return;
  }
  todos.push({ text, date, completed: false });
  todoInput.value = '';
  dateInput.value = '';
  renderTodos();
});

todoList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const idx = e.target.getAttribute('data-idx');
    todos.splice(idx, 1);
    renderTodos();
  }
  if (e.target.classList.contains('status-checkbox')) {
    const idx = e.target.getAttribute('data-idx');
    todos[idx].completed = e.target.checked;
    renderTodos();
  }
});

deleteAllBtn.addEventListener('click', function() {
  if (confirm('Anda yakin ingin menghapus semua?')) {
    todos = [];
    renderTodos();
  }
});

filterBtn.addEventListener('click', function() {
  filterActive = !filterActive;
  filterBtn.textContent = filterActive ? 'Show All' : 'Filter';
  renderTodos();
});

renderTodos();
