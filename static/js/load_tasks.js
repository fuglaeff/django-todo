
var tasksDiv = document.querySelector('.tasks');

function appendPoint(pointJSON) {
    var pointItem = document.createElement('li');
    pointItem.className = 'point';

    var pointStatus = document.createElement('input');
    pointStatus.setAttribute("type", "button");
    if (pointJSON.is_complete ) {
        pointStatus.className = 'point-status-comp';
        pointStatus.setAttribute('value', false);
    } else {
        pointStatus.className = 'point-status-no-comp';
        pointStatus.setAttribute('value', true);
    };
    pointStatus.id = pointJSON.id;

    var pointText = document.createElement('p');
    pointText.className = 'point-text';

    pointText.innerText = pointJSON.description;

    pointItem.append(pointStatus, pointText);
    return pointItem;
};


function appendComment(commentJSON) {
    var commentItem = document.createElement('li');
    commentItem.className = 'comment';

    var commentUserName = document.createElement('div');
    commentUserName.className = 'comment-comm-creator';

    var commentContent = document.createElement('div');
    commentContent.className = 'comment-content';

    var commentDt = document.createElement('div');
    commentDt.className = 'comment-dt';

    commentUserName.innerHTML = '<b>' + commentJSON.comm_creator + '</b>' + ": ";
    commentContent.innerText = commentJSON.comment;
    commentDt.innerHTML = '<i>' + commentJSON.comm_dt + '</i>';

    commentItem.append(commentUserName, commentContent, commentDt);
    return commentItem;
};

function createTaskElement(data) {
    var taskId = data.id;
    var taskName = data.name;
    var taskDescription = data.description;
    var taskCreateDt = data.created_dt;
    var taskStatus = data.status;
    var taskComments = data.comments;
    var taskPoints = data.points;

    var taskBox = document.createElement('div');
    taskBox.className = 'task';

    var taskBody = document.createElement('div');
    taskBody.className = 'task-body';

    var taskTopBar = document.createElement('div');
    taskTopBar.className = 'task-topbar';

    var taskHideButton = document.createElement("input");
    taskHideButton.setAttribute("type", "button");
    taskHideButton.className = 'hidebutton';

    var taskDeleteButton = document.createElement("input");
    taskDeleteButton.setAttribute("type", "button");
    taskDeleteButton.className = 'deletebutton';
    taskDeleteButton.id = taskId;

    var taskShortName = document.createElement('div');
    taskShortName.innerHTML = '<b>Task #' + taskId + '</b>' + '<i> ' + taskName + '</i>';
    taskShortName.className = 'task-short-name';
    taskShortName.style.display = 'none';

    taskTopBar.append(taskHideButton, taskDeleteButton, taskShortName);

    var taskNameRow = document.createElement('h1');
    taskNameRow.innerText = taskName + ' #' + taskId;

    var taskCreateDtRow = document.createElement('p');
    taskCreateDtRow.innerText = taskCreateDt;

    var taskDescriptionRow = document.createElement('p');
    taskDescriptionRow.innerText = taskDescription;

    var taskPointsRow = document.createElement('ul');
    taskPointsRow.className = 'points';
    for (j=0; j<taskPoints.length; j++) {
        taskPointsRow.append(appendPoint(taskPoints[j]));
    };

    var taskCommentsRow = document.createElement('ul');
    taskCommentsRow.className = 'comments';
    for (j=0; j<taskComments.length; j++) {
        taskCommentsRow.append(appendComment(taskComments[j]));
    };

    var createCommentForm = document.createElement('form');
    createCommentForm.setAttribute("method", "post");
    createCommentForm.setAttribute("action", "/api-comm/");

    var taskIdForCommentForm = document.createElement("input");
    taskIdForCommentForm.setAttribute("type", "text");
    taskIdForCommentForm.setAttribute("value", taskId);
    taskIdForCommentForm.setAttribute("name", "task_id");
    taskIdForCommentForm.style.display = 'none';

    var CommentForCommentForm = document.createElement("input");
    CommentForCommentForm.setAttribute("type", "text");
    CommentForCommentForm.setAttribute("name", "comment");
    CommentForCommentForm.className = 'comment-text';

    var sendButton = document.createElement("input");
    sendButton.setAttribute("type", "button");
    sendButton.setAttribute("value", "Send");
    sendButton.className = 'comment-send';

    var showComments = document.createElement("input");
    showComments.setAttribute("type", "button");
    showComments.className = 'comments-shower';

    var commentsDiv = document.createElement('div');
    commentsDiv.append(taskCommentsRow, createCommentForm);
    commentsDiv.style.display = 'none';

    createCommentForm.append(taskIdForCommentForm, CommentForCommentForm, sendButton)
    taskBody.append(taskNameRow, taskCreateDtRow, taskDescriptionRow, taskPointsRow, commentsDiv, showComments);
    taskBox.append(taskTopBar, taskBody);

    return taskBox;
};

var request = new XMLHttpRequest();

request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        // Success!
        var tasks = JSON.parse(this.response);

        for (i=0; i<tasks.length; i++) {
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

form.addEventListener('click', function() {
    var target = event.target;
    if (target.type === 'button' && target.className === 'submit') {
        var data = Object.fromEntries(new FormData(form));
        var pointsCnt = parseInt(data.points_cnt);
        delete data.points_cnt;
        var fieldNames = Object.keys(data);
        var pointsArray = [];
        for (i=2; i < 2 + pointsCnt; i++) {
            var point = data[fieldNames[i]];
            if ( point !== '' ) {
                pointsArray.push(point);
            };
            delete data[fieldNames[i]];
        };
        console.log(pointsArray);
        data.points = pointsArray;

        // JSON.stringify()

        request.open('POST', '/api-task/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('X-CSRFToken', csrftoken);

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var response = JSON.parse(this.response);
                form.reset();
                console.log(form.querySelector('.points-fields').childNodes);
                var task = createTaskElement(response);
                document.querySelector('.tasks').prepend(task);
            } else {
                console.log(this);

            }
        };

        request.send(JSON.stringify(data));
    } else if (target.type === 'button' && target.className === 'add-new-point') {
        var pointsFormDiv = target.parentElement;
        var pointCnt = pointsFormDiv.childNodes[1].value;
        var br = document.createElement('br');
        var newPointRow = document.createElement('input');
        newPointRow.setAttribute("type", "text");
        newPointRow.setAttribute("name", "point_" + pointCnt);
        target.before(newPointRow, br);
        pointsFormDiv.childNodes[1].setAttribute('value', parseInt(pointCnt) + 1);
//        console.log(pointsFormDiv.childNodes[1].value);
    };
});

tasksDiv.addEventListener('click', function() {
    var target = event.target;
    if (target.type === 'button' && target.className === 'comment-send') {
    var form = target.parentElement;
    var commentsBlock = form.previousSibling;
    var data = JSON.stringify(Object.fromEntries(new FormData(form)));
//    var request = new XMLHttpRequest();
    request.open('POST', '/api-comm/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('X-CSRFToken', csrftoken);

    request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
                commentsBlock.append(appendComment(JSON.parse(this.response)));
                form.reset();
          } else {
              console.log(this);

      }};

    request.send(data);
} else if (target.type === 'button' && target.className === 'hidebutton') {
    var toptaskbar = target.parentElement;
    var taskContent = toptaskbar.nextSibling;
    if(taskContent.style.display === 'none') {
        toptaskbar.lastChild.style.display = 'none';
        taskContent.style.display = '';
    } else if(taskContent.style.display === '') {
        taskContent.style.display = 'none';
        toptaskbar.lastChild.style.display = '';
    };
} else if (target.type === 'button' && target.className === 'deletebutton') {
    request.open('DELETE', '/api-task/' + target.id + '/', true);
    request.setRequestHeader('X-CSRFToken', csrftoken);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var taskForDeleting = target.parentElement.parentElement;

            taskForDeleting.remove();
        };
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
} else if (target.type === 'button' && target.className === 'comments-shower') {
    var comments = target.previousSibling;
    console.log(comments);
    if(comments.style.display === 'none') {
        comments.style.display = '';
    } else if(comments.style.display === '') {
        comments.style.display = 'none';
    };
} else if (target.type === 'button' && target.className.startsWith('point-status-')) {

    var data = Object.fromEntries(new FormData());
    data.is_complete = target.value;
//    var request = new XMLHttpRequest();
    request.open('PATCH', '/api-points/' + target.id + '/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('X-CSRFToken', csrftoken);

    request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
                var response = JSON.parse(this.response);
                if (response.is_complete ) {
                    target.className = 'point-status-comp';
                    target.setAttribute('value', false);
                } else {
                    target.className = 'point-status-no-comp';
                    target.setAttribute('value', true);
                };
          } else {
              console.log(this);

      }};

    request.send(JSON.stringify(data));
};});