var todoWrap = document.getElementById('todo-wrap')
var input = document.getElementById('input')
var router = 'all'
var todoArray = [
  {
    value: 'todo item',
    isDone: false
  },
  {
    value: 'todo item2',
    isDone: false
  },
  {
    value: 'todo item3',
    isDone: false
  },
  {
    value: 'todo item4',
    isDone: true
  }
]

updateTodo()

function updateTodo (array) {
  array = array || todoArray
  todoWrap.innerHTML = ''
  array.forEach(function (el, i) {
    var newTodoItem = document.createElement('li')
    var itemBtnWrap = document.createElement('div')
    var text = document.createElement('span')
    var delBtn = document.createElement('span')
    var doneBtn = document.createElement('span')
    delBtn.className = 'delBtn fa fa-trash-o'
    delBtn.id = 'del'
    doneBtn.className = 'doneBtn fa fa-check'
    doneBtn.id = 'done'
    itemBtnWrap.classList.add('item-btn-wrap')
    itemBtnWrap.appendChild(delBtn)
    itemBtnWrap.appendChild(doneBtn)
    text.classList.add('todo-item-text')
    text.innerText = el.value
    newTodoItem.classList.add('todo-item')
    newTodoItem.classList.add('mui-panel')
    newTodoItem.id = i
    newTodoItem.appendChild(text)
    newTodoItem.appendChild(itemBtnWrap)
    if (el.isDone) {
      newTodoItem.classList.add('done')
      doneBtn.classList.add('done')
    }
    todoWrap.appendChild(newTodoItem)
  })
}

todoWrap.addEventListener('click', function (e) {
  if (e.target.id === 'done') {
    todoArray[e.target.parentNode.parentNode.id].isDone = !todoArray[e.target.parentNode.parentNode.id].isDone
  }
  if (e.target.id === 'del') {
    todoArray.splice(e.target.parentNode.parentNode.id, 1)
  }
  switch (router) {
    case 'all':
      updateTodo()
      break;
    case 'active':
      activeTodo()
      break;
    case 'done':
      doneTodo()
      break;
  }
}, false)

function addTodo (event) {
  event.preventDefault()
  var newTodo = {
    id: todoArray.length,
    value: input.value,
    isDone: false
  }
  todoArray.push(newTodo)
  input.value = ''
  updateTodo()
}

function doneTodo () {
  var doneArray = todoArray.filter(function (item) {
    if (item.isDone) {
      return item
    }
  })
  router = 'done'
  updateTodo(doneArray)
}

function allTodo () {
  router = 'all'
  updateTodo()
}

function activeTodo () {
  var activeArray = todoArray.filter(function (item) {
    if (!item.isDone) {
      return item
    }
  })
  router = 'active'
  updateTodo(activeArray)
}