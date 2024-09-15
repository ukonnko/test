const textbox = document.querySelector('#taskName');
const createButton = document.querySelector('#createButton');
const todo = document.querySelector('#todo');
const doing = document.querySelector('#doing');
const done = document.querySelector('#done');
const subboxes = document.querySelectorAll('.subbox');
let dragged = null;
let tasks = document.querySelectorAll('.task');

createButton.addEventListener('click', (event) => {
    const task = document.createElement('div');
    task.textContent = textbox.value;
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    todo.appendChild(task);
    textbox.value = "";

    tasks = document.querySelectorAll('.task');
    for (const task of tasks) {
        task.addEventListener('dragstart', (event) => {
            dragged = event.target;
        });
    }
});

const messageBox = document.querySelector('#balloon');

for (const subbox of subboxes) {
    subbox.addEventListener('dragover', (event) => {
        event.preventDefault();
        messageBox.textContent = `${subbox.getAttribute('name')}へ移動`;
        messageBox.classList.add('on');
        messageBox.style.left = `${event.clientX - messageBox.clientWidth / 2}px`;
        messageBox.style.top = `${event.clientY - messageBox.clientHeight / 2 + 28}px`;

    });

    subbox.addEventListener('drop', (event) => {
        event.preventDefault();
        messageBox.textContent = "";
        messageBox.classList.remove('on');

        if(event.target === subbox){
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
        }
        else{
            return;
        }
    });
}

const dustbox = document.querySelector('#dustbox');

dustbox.addEventListener('dragover', (event) => {
    event.preventDefault();
    messageBox.textContent = '削除';
    messageBox.classList.add('on');
    messageBox.style.left = `${event.clientX - messageBox.clientWidth / 2}px`;
    messageBox.style.top = `${event.clientY - messageBox.clientHeight / 2 + 28}px`;
});


const historyTable = document.querySelector('#history');

dustbox.addEventListener('drop', (event) => {
    event.preventDefault();
    
    messageBox.textContent = "";
    messageBox.classList.remove('on');

    const date = new Date();
    let history = {
        taskName: dragged.textContent, 
        deleteDate: date.toLocaleString()
    }
    let deleteHistories = [];
    deleteHistories.unshift(history);

    dragged.remove();

    for (const history of deleteHistories) {
        let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.textContent = history.taskName;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = history.deleteDate;
            tr.appendChild(td2);
        historyTable.appendChild(tr);
    }
});
