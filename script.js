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



function isCorrectStatus(statusForCheck){
    let answer = false;

    for (const status in options.status) {
        const realStatus = options.status[status];
        answer = answer || (realStatus == statusForCheck);
    }

    return answer;
}

function isCorrectPriority(priorityForCheck){
    let answer = false;

    for (const priority in options.priority) {
        const realPriority = options.priority[priority];
        answer = answer || (realPriority == priorityForCheck);
    }

    return answer;
}

function isCorrectOption(optionForCheck){
    let answer = false;

    for (const option in options) {
        answer = answer || (option == optionForCheck);
    }

    return answer;
}

function isTaskInList(outerTask){
    let answer = false;

    for (const task of list) {
        const taskName = task.name;
        answer = answer || (taskName == outerTask);
    }

    return answer;
}



function getTaskNumberByName(outerTask){
    let answer = false;

    for (let i = 0; i < list.length; i++) {
        const taskName = list[i].name;
        if (taskName === outerTask) {
            answer = i;
            return answer;
        }
    }

    console.log('Error, there is no task "'+outerTask+'" in TODO list');
}

function getTaskByName(outerTask){
    return list[ getTaskNumberByName(outerTask) ];
}

function getId(){
    return ++id;
}



function changeStatus(taskName, status){
    if ( !isCorrectStatus(status) ) {
        console.log('Error: unexpected status "'+status+'"');
        return;
    }

    if ( !isTaskInList(taskName) ) {
        console.log('Error, there is no task "'+taskName+'" in TODO list');
        return;
    }

    const task = getTaskByName(taskName);
    task.status = status;
}

function addTask(task, priority = options.priority.low, status = options.status.todo){
    if ( !isCorrectStatus(status) ) {
        console.log('Error: unexpected status "'+status+'"');
        return;
    }

    if ( !isCorrectPriority(priority) ) {
        console.log('Error: unexpected priority "'+priority+'"');
        return;
    }


    list.push({
        id: getId(),
        name: task,
        status: options.status.todo,
        priority,
    })
}

function deleteTask(taskName){

    if ( !isTaskInList(taskName) ) {
        console.log('Error, there is no task "'+taskName+'" in TODO list');
        return;
    }

    const taskNumber = getTaskNumberByName(taskName);
    list.splice(taskNumber, 1);
}



function showList() {
    showBy('status');
}

function showBy(option){
    if ( !isCorrectOption(option) ) {
        console.log('Error, there is no option "'+option+'" in TODO list');
        return;
    }

    let allOptions = options[option];

    for (const optionValue in allOptions) {
        showTasksWithOption(option, optionValue);
    }
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








//Использование всего этого великолепия

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

logBeautyfullTitle('Ошибки при вводе');

//Проверки на ошибки
deleteTask('asdasd');
changeStatus('asd', 'Done');
changeStatus('make a bed', 'Done!!!');
showBy("priorityasdads")


logBeautyfullTitle('Изменение статусов');

// changeStatus('write a post', "In Progress");
changeStatus('turn on PC', 'Done');

showList();

logBeautyfullTitle('Удаление');

deleteTask('turn on PC');

showList();

logBeautyfullTitle('showBy');

showBy("priority");

console.log(list);