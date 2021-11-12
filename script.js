const list = [];

const statuses = {
    todo: "To Do",
    done: "Done",
    progress: "In Progress",
}

const priorities = {
    low: "low",
    high: "high",
}

//Проверочки

function isCorrectStatus(statusForCheck){
    let answer = false;

    for (const status in statuses) {
        const realStatus = statuses[status];
        answer = answer || (realStatus == statusForCheck);
    }

    return answer;
}

function isCorrectPriority(priorityForCheck){
    let answer = false;

    for (const priority in priorities) {
        const realPriority = priorities[priority];
        answer = answer || (realPriority == priorityForCheck);
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

let id = 0;
function getId(){
    return ++id;
}

//Функции из ТЗ

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

function addTask(task, priority = priorities.low, status = statuses.todo){
    // list[task] = "To Do";

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
        status: statuses.todo,
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

// Фукнция showList и его приятели

function showList() {
    showTasksWithStatus( statuses.todo );
    showTasksWithStatus( statuses.progress );
    showTasksWithStatus( statuses.done );
}

function showTasksWithStatus(status){
    console.log(status);
    const prefix = '  ';

    let isTasksFinded = false;

    for (const task of list) {
        if(task.status == status){
            console.log( `${prefix}"${task.name}"` );
        }
    }

    if (!isTasksFinded) {
        console.log( `${prefix}-` );
    }
}










function logBeautyfullTitle(title){
    console.log(`----------------------${title}-------------------------`);
}


logBeautyfullTitle('Добавление задач');

addTask('turn on PC');
addTask('create a task');
addTask('write a post');
addTask('make a bed');

showList();

logBeautyfullTitle('Ошибки при вводе');

//Проверки на ошибки
deleteTask('asdasd');
changeStatus('asd', 'Done');
changeStatus('make a bed', 'Done!!!');

logBeautyfullTitle('Изменение статусов');

// changeStatus('write a post', "In Progress");
changeStatus('turn on PC', 'Done');

showList();

logBeautyfullTitle('Удаление');

deleteTask('turn on PC');

showList();