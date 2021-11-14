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


function changeStatus(taskName, status){
    const task = getTaskByName(taskName);
    task.status = status;
}

function addTask(task, priority = PRIORITY.low, status = STATUS.todo){
    list.push({
        id: getId(),
        name: task,
        status,
        priority,
    })
}

function deleteTask(taskName){
    const taskNumber = getTaskNumberByName(taskName);
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