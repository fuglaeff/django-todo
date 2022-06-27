
var tasksDiv = document.querySelector('.tasks');


function createTaskElement(data) {
    var taskId = data.id;
    var taskName = data.name;
    var taskDescription = data.description;
    var taskCreateDt = data.created_dt;
    var taskStatus = data.status;
    var taskComments = data.comments;
    console.log(taskComments);

    var taskBox = document.createElement('div');
    taskBox.className = 'task';
    var taskNameRow = document.createElement('div');
    taskNameRow.innerText = taskName;

    var taskDescriptionRow = document.createElement('div');
    taskDescriptionRow.innerText = taskDescription;

    var taskCommentsRow = document.createElement('ul');
    var commentsCnt = taskComments.length;
    console.log(commentsCnt);
    for (i=0; i<commentsCnt; i++) {
        var commentItem = document.createElement('li');
        commentItem.innerText = taskComments[i].comment;
        taskCommentsRow.append(commentItem);
    };

    taskBox.append(taskNameRow, taskDescriptionRow, taskCommentsRow);

    return taskBox;
};

var request = new XMLHttpRequest();

request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        // Success!
        var tasks = JSON.parse(this.response);
        var tasksCnt = tasks.length;

        for (i=0; i<tasksCnt; i++) {
            var task = createTaskElement(tasks[i]);
            tasksDiv.append(task);
        };
    };
};

request.onerror = function() {
    // There was a connection error of some sort
};

request.open('GET', '/api-task/', true);
request.send();



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

var form = document.querySelector('form');

form.querySelector('.submit').addEventListener('click', function() {
    console.log(form);
    var data = JSON.stringify(Object.fromEntries(new FormData(form)));
    console.log(data);
//    var request = new XMLHttpRequest();
    request.open('POST', '/api-task/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('X-CSRFToken', csrftoken);

    request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
              var response = JSON.parse(this.response);
              console.log(response);
              form.reset();
              var task = createTaskElement(response);
              document.querySelector('.tasks').prepend(task);
          } else {
              console.log(this);

      }};

    request.send(data);
});