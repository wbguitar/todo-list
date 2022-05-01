class ToDoClass {
    constructor() {
        // load tasks from local storage
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [
                { task: 'Go to Dentist', isComplete: false },
                { task: 'Do Gardening', isComplete: true },
                { task: 'Renew Library Account', isComplete: false },
            ];
        }

        this.loadTasks();

        this.addEventListeners();
    }

    addEventListeners() {
        // add task when hitting enter instead of pushing the button
        document.getElementById('addTask').addEventListener("keypress", event => {
            if (event.key === 'Enter') {
                // alert("Enter hit!");
                // this.addTaskClick();
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    }

    loadTasks() {
        // creates HTML code appending tasks list items
        let tasksHtml = this.tasks.reduce((html, task, index) => html +=
            this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = tasksHtml;
    }

    generateTaskHtml(task, index) {
        // creates a list item for each task
        return `
         <li class="list-group-item checkbox">
          <div class="row">
           <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label><input id="toggleTaskStatus" type="checkbox"  
            onchange="toDo.toggleTaskStatus(${index})" value="" class="" 
            ${task.isComplete ? 'checked' : ''}></label>
           </div>
           <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
            ${task.task}
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i 
            id="deleteTask" data-id="${index}" class="delete-icon glyphicon 
            glyphicon-trash"></i></a>
           </div>
          </div>
         </li>
       `;
    }

    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        let t = this.tasks[index];
        console.log(`taks ${t.task} toggled to ${t.isComplete}`);
        localStorage.setItem("TASKS", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        localStorage.setItem("TASKS", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task) {
        let newTask = {
            task,
            isComplete: false
        };

        console.log(`add task ${task}`);


        // get parent element to add error class if passed task is and empty string
        let parentDiv = document.getElementById('addTask').parentElement;

        if (task === '') {
            parentDiv.classList.add('has-error');
        }
        else {
            parentDiv.classList.remove('has-error');
            // add the valid task
            this.tasks.push(newTask);
            localStorage.setItem("TASKS", JSON.stringify(this.tasks));
            this.loadTasks();
        }

    }
}

window.addEventListener("load", function () {
    toDo = new ToDoClass();
});