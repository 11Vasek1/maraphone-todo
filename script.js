const list = {}

let amountEveryStatus = { //Просто счетчики количества задач для всех статусов. Необходимо для совпадение с ТЗ(запятые, тире при отсутствии задач и тд)
    "To Do": 0,
    "In Progress": 0,
    "Done": 0,
}

function clearAmounts(){//Обнуляет числа в объекте сверху
    for (const status in amountEveryStatus) {
        amountEveryStatus[status] = 0;
    }
}

//Проверочки

function isCorrectStatus(status){
    if ( status === "To Do" || status === "In Progress" || status === "Done" ){
        return true;
    }else{
        return false;
    }
}

function isTaskInList(outerTask){
    let isFinded = false;
    for (const task in list) {
        if(task === outerTask){
            isFinded = true;
        }
    }

    return isFinded;
}

//Функции из ТЗ

function changeStatus(task, status){
    if ( !isCorrectStatus(status) ) {
        console.log('Error: unexpected status "'+status+'"');
        return false;
    }

    if ( !isTaskInList(task) ) {
        console.log('Error, there is no task "'+task+'" in TODO list');
        return false;
    }

    list[task] = status;
}

function addTask(task){
    list[task] = "To Do";
}

function deleteTask(task){
    if (isTaskInList(task)) {
        delete list[task];
    } else {
        console.log('Warning, there is no task "'+task+'" in TODO list');
    }
}

// Фукнция showList и его приятели

function showList() {
    showTasksWithStatus("To Do");
    showTasksWithStatus("In Progress");
    showTasksWithStatus("Done");
}

function showTasksWithStatus(status){
    clearAmounts();

    console.log(status);

    //Тут приколдесы, связанные с тире, при отсутствии задач с определенным статусом

    for (const task in list) {
        if(list[task] == status){
            amountEveryStatus[status]++;
        }
    }

    let prefix = '  ';

    if ( amountEveryStatus[status] == 0 ) {
        console.log( prefix + '-' );
    }


    for (const task in list) {
        if(list[task] == status){
            if (amountEveryStatus[status] == 1) {
                console.log( prefix + '"' + task + '"' ); //За Орду(зачеркнуто) точное следование ТЗ!!!
            } else {
                console.log( prefix + '"' + task + '",' );
            }
        }
    }
}

console.log('----------------------Добавление задач-------------------------');

addTask('create a task');
addTask('write a post');
addTask('make a bed');
addTask('turn on PC');
showList();

console.log('----------------------Ошибки при вводе-------------------------');

//Проверки на ошибки
deleteTask('asdasd');
changeStatus('asd', 'Done');
changeStatus('make a bed', 'Done!!!');

console.log('----------------------Изменение статусов-------------------------');

changeStatus('write a post', "In Progress");
changeStatus('turn on PC', 'Done');

showList();

console.log('----------------------Удаление-------------------------');

deleteTask('turn on PC');

showList();