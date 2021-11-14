const list = [];
let id = 0;

const options = {
    status: {
        todo: "To Do",
        progress: "In Progress",
        done: "Done",
    },

    priority: {
        high: "High",
        low: "Low",
    }
}


function changeStatus(taskName, status){
    const task = getTaskByName(taskName);
    task.status = status;
}

function addTask(task, priority = options.priority.low, status = options.status.todo){
    list.push({
        id: getId(),
        name: task,
        status: options.status.todo,
        priority,
    })
}

function deleteTask(taskName){
    const taskNumber = getTaskNumberByName(taskName);
    list.splice(taskNumber, 1);
}


function showBy(option){
    let allOptions = options[option];

    for (const optionValue in allOptions) {
        showTasksWithOption(option, optionValue);
    }
}

function showList() {
    showBy('status');
}




//minor functions

function getTaskNumberByName(taskName){
    let answer = false;

    list.forEach(function(task, i){
        if (task.name === taskName) {
            answer = i;
        }
    })

    return answer;
}

function getTaskByName(outerTask){
    return list[ getTaskNumberByName(outerTask) ];
}

function getId(){
    return ++id;
}

function showTasksWithOption(option, optionValue){
    let optionValueConst = options[option][optionValue];

    console.log(optionValueConst);
    const prefix = '  ';

    let isTasksFinded = false;

    for (const task of list) {
        if(task[option] == optionValueConst){
            console.log( `${prefix}"${task.name}"` );
        }
    }

    if (!isTasksFinded) {
        console.log( `${prefix}-` );
    }
}








//Usage

function logBeautyfullTitle(title){
    console.log('');
    console.log(`----------------------${title}-------------------------`);
}


logBeautyfullTitle('Добавление задач');

addTask('turn on PC');
addTask('create a task', 'High');
addTask('write a post');
addTask('make a bed');

showList();


logBeautyfullTitle('Изменение статусов');

changeStatus('turn on PC', 'Done');

showList();


logBeautyfullTitle('Удаление');

deleteTask('turn on PC');

showList();


logBeautyfullTitle('showBy');

showBy("priority");

console.log(list);