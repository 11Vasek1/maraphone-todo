const list = [];
let id = 0;


const STATUS = {
    todo: "To Do",
    progress: "In Progress",
    done: "Done",
}

const PRIORITY = {
    high: "High",
    low: "Low",
}

const options = {
    status: [
        STATUS.todo,
        STATUS.progress,
        STATUS.done,
    ],

    priority: [
        PRIORITY.high,
        PRIORITY.low,
    ]
}


function changeStatus(taskId, status){
    const task = list[ getTaskNumberById(taskId) ]
    task.status = status;
}

function addTask(task, priority = PRIORITY.low, status = STATUS.todo){
    list.push({
        id: createId(),
        name: task,
        status,
        priority,
    })
}

function deleteTask(taskId){
    const taskNumber = getTaskNumberById(taskId);
    list.splice(taskNumber, 1);
}


function showBy( targetOption ){
    const selectedOptions = options[targetOption];

    selectedOptions.forEach(function(title){
        showTasks(targetOption, title)
    })
}

function showTasks(targetOption, title){
    console.log(title);

    let isTaskFinded = false;

    list.forEach(function(task){
        if(task[targetOption] === title){
            console.log( `    "${task.name}"` );
            isTaskFinded = true;
        }
    })

    if (!isTaskFinded) {
        console.log( '    -' );
    }
}

function showList() {
    showBy('status');
}




//minor|technical functions

function getTaskNumberById(taskId){
    let answer = false;

    list.forEach(function(task, i){
        if (task.id === taskId) {
            answer = i;
        }
    })

    return answer;
}

function createId(){
    return ++id;
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
console.log(list);


logBeautyfullTitle('Изменение статусов');

changeStatus(1, 'Done');

showList();


logBeautyfullTitle('Удаление');

deleteTask(1);

showList();


logBeautyfullTitle('showBy');

showBy("priority");

console.log(list);