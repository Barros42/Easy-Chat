/**
 * 
 */
function showMenuOptions() {
	alert("To-do!")
}


/**
 * 
 * @param {string} userName 
 * @param {dateTime} timeStamp 
 * @param {string} message 
 * @param {boolean} sented
 */

function createNewMessageInContext(userName, timeStamp, message, sented) {

    if(!userName){
        return
    }

    if(!timeStamp){
        return
    }

    if(!message){
        return
    } else {
        message = _removeCursedWords(message)
    }

    if(sented === undefined || sented === null){
        return
    }

    let messageBody = $('#MessageBody')
    let customClass = 'Sented'

    if(sented === false){
        customClass = 'Received'
        userName += ' · '
    } else {
        userName = ' · ' + userName
    }

    let newMessage = `
    <div class="Message ${customClass}">
        <div class="AuthorAndTime">
            <div class="Author">${userName}</div>
            <div class="TimeStamp">${timeStamp}</div>
        </div>
        <div class="Content">${message}</div>
    </div>`
        
    messageBody.append(newMessage)

}

function sendMessage(){

    let messageText = _getMessageText()

    if(!messageText){
        return
    }

    // filter message here

    createNewMessageInContext('Matheus de Barros', `${new Date().getHours()}:${new Date().getMinutes()}` , messageText, true)

    _clearMessageText()
    _scrollMessageDivToBottom()
}


function _clearMessageText(){
    $("#text-input").val('')
    $("#text-input").focus()
}

function _getMessageText(){
    return $("#text-input").val()
}

function _scrollMessageDivToBottom(){
    $("#MessageBody").scrollTop( $("#MessageBody")[0].scrollHeight + 100);
}

function _setUserUuid(){
    if(!localStorage.getItem('userUUID')){
        localStorage.setItem('userUUID', uuidv4())
    } 
}

function _getUserUuid(){
    if(!localStorage.getItem('userUUID')){
        let uuid = uuidv4()
        localStorage.setItem('userUUID', uuid)
        return uuid
    } else {
        return localStorage.getItem('userUUID')
    }
}

function _registerListener(){
    $("#text-input").keydown(function (e) { 
        if(e.keyCode == 13){
            sendMessage()
        }
    });
}

// It's just for test
for(let i = 0; i<10; i++){
    
    let enviado = true
    let userName = 'Lucas Miranda'
    let random = Math.ceil(Math.random() * 1000)

    if((random % 2) === 0){
        enviado = false
        userName = 'Matheus de Barros'
    }

    createNewMessageInContext(userName, '21:53', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, nihil quo harum praesentium voluptatem in ad minus cumque corporis odio tempore animi deleniti officia maxime. Esse non consequuntur rem nemo.', enviado);
}


// BOOTSTRAP!
    $(document).ready(function () {
        
        $("#send-button").click(function (){ 
            sendMessage()
        })

        setTimeout(() => {
            _scrollMessageDivToBottom()
            _setUserUuid()
            _registerListener()
        }, 100);
    });