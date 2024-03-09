(function () {
    let todoArr = [];

    function createAppTitle(title) {
        let appTitile = document.createElement('h2');
        appTitile.innerHTML = title;
        return appTitile;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let btnWrapper = document.createElement('div');
        let btn = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        btnWrapper.classList.add('input-group-append');
        btn.classList.add('btn', 'btn-primary');
        btn.textContent = 'Добавить дело';
        btn.setAttribute('disabled', '')

        btnWrapper.append(btn);
        form.append(input);
        form.append(btnWrapper);

        input.addEventListener('input', function () {
            btn.disabled = !input.value;
        })

        return {
            form,
            input,
            btn,
        }
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(data) {
        let item = document.createElement('li');
        let btnGroup = document.createElement('div');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = data.name;

        if(data.done) {
            item.classList.add('list-group-item-success');
        }

        btnGroup.classList.add('btn-group', 'btn-group-sm');
        doneBtn.classList.add('btn', 'btn-success')
        doneBtn.textContent = 'Готово';
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.textContent = 'Удалить';

        btnGroup.append(doneBtn);
        btnGroup.append(deleteBtn);
        item.append(btnGroup);

        return {
            id: data.id,
            item,
            doneBtn,
            deleteBtn,
        }
    }

    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        loadTodoList(todoList, title);

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!todoItemForm.input.value) return;

            let todoItemData = {
                id: getLastId(todoArr)+1,
                name: todoItemForm.input.value,
                done: false,
            }
            createNewItem(todoItemData, todoList, title)
            todoItemForm.btn.setAttribute('disabled', '')
            todoItemForm.input.value = '';

            setItemData(title, todoArr);
        })
    }

    function loadTodoList(todoList, listName) {
        let loadedData = getItemData(listName);
        for(todoEl of loadedData) {
            createNewItem(todoEl, todoList, listName)
        }
    }

    function createNewItem(data, todoList, listName) {
        let todoItem = createTodoItem(data)

        todoItem.doneBtn.addEventListener('click', function () {
            todoItem.item.classList.toggle('list-group-item-success');
            let changedItem = todoArr.find(el => el.id === todoItem.id);
            changedItem.done = !changedItem.done
            setItemData(listName, todoArr);
        })
        todoItem.deleteBtn.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                todoItem.item.remove();
                todoArr = todoArr.filter(el => el.id !== todoItem.id)
                setItemData(listName, todoArr);
            }
        })
        todoList.append(todoItem.item);
        todoArr.push(data);
    }

    function getLastId(arr) {
        maxId = 0;
        for(el of arr)
            maxId = Math.max(maxId, el.id);
        return arr.sort((a, b) => b.id - a.id)
    }

    function setItemData(listName, data) {
        let jsonParsed = JSON.stringify(data);
        localStorage.setItem(listName, jsonParsed);
    }

    function getItemData(listName) {
        arr = JSON.parse(localStorage.getItem(listName))
        if(!arr)
            return []
        return arr;
    }

    window.createTodoApp = createTodoApp;
})()