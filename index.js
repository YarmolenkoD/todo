var todoWrap = document.getElementById('todo-wrap')
var input = document.getElementById('input')
var routerText = document.getElementById('router')
var router = 'all'
var todoArray = []

updateTodo()

function routerFunc (arr) {
  if (router === 'all') {
    routerText.innerText = 'All todo: ' + arr.length
  } else if (router === 'active') {
    routerText.innerText = 'Active todo: ' + arr.length
  } else {
    routerText.innerText = 'Done todo: ' + arr.length
  }
}

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
    delBtn.dataset.id = el.id
    doneBtn.className = 'doneBtn fa fa-check'
    doneBtn.id = 'done'
    doneBtn.dataset.id = el.id
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
  routerFunc(array)
}

todoWrap.addEventListener('click', function (e) {
  var index
  if (e.target.id === 'done') {
    todoArray.forEach(function (el, i) {
      if (el.id === parseFloat(e.target.dataset.id)) {
        index = i
      }
    })
    console.log(index, e.target.dataset.id)
    todoArray[parseFloat(index)].isDone = !todoArray[parseFloat(index)].isDone
  }
  if (e.target.id === 'del') {
    todoArray.forEach(function (el, i) {
      if (el.id === parseFloat(e.target.dataset.id)) {
        index = i
      }
    })
    todoArray.splice(parseFloat(index), 1)
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
  if (input.value.length !== 0) {
    event.preventDefault()
    var newTodo = {
      id: todoArray.length,
      value: input.value,
      isDone: false
    }
    todoArray.push(newTodo)
    input.value = ''
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
  }
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