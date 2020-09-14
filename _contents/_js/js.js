// Firebase instances
var config = {
apiKey: "AIzaSyAOnocDSCMQ8VnxJGhLQNa6CAKm_w48Yrw",
authDomain: "easy-zap.firebaseapp.com",
databaseURL: "https://easy-zap.firebaseio.com/",
storageBucket: "easy-zap.appspot.com"
};
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
var database = firebase.database();

function writeDatabaseUserMessage(messageId, userUuid, name, color, text, date, time) {
	firebase.database().ref('messages/' + messageId).set({
		userId: userUuid,
		userName: name,
		userColor: color,
		messageBody: text,
		createdDate: date,
		createdTime: time
	});
}

var messagesListener = firebase.database().ref('messages/');
messagesListener.on('child_added', function(data) {
	if(data.val().userId == _getUserUuid()) createNewMessageInContext(data.val().userName, data.val().userColor, data.val().createdTime, data.val().messageBody, true);
	else createNewMessageInContext(data.val().userName, data.val().userColor, data.val().createdTime, data.val().messageBody, false);
});

// function by @trincot - https://stackoverflow.com/questions/47616381/how-to-exclude-all-shades-of-gray-while-generating-random-hex-color-code
function generateRandomColor() {
    // Threshold can be between 0 and 127: 
    //    the higher it is, the more colors are considered to be too grey-like.
    const threshold = 50;
    // Generate three color parts randomly
    const parts = Array.from(Array(3), _ => 
            Math.floor(Math.random()*256)
        ).sort( (a, b) => a-b );
    
    // Check whether they are too close to the same value:
    if (parts[2] - parts[0] < threshold) { // color is too greyish
        // Replace the middle one with a random value outside of the "too close" range
        const exclude = Math.min(255, parts[0] + threshold) 
                      - Math.max(0, parts[2] - threshold);
        parts[1] = Math.floor(Math.random()*(256-exclude));
        if (parts[1] >= parts[2] - threshold) parts[1] += exclude;
    }
    // Shuffle and format the color parts and return the resulting string
    return parts
        .sort( (a, b) => Math.random() < 0.5 )
        .map( p => ('0' + p.toString(16)).substr(-2) )
        .join('');
}

/**
 * 
 * @param {string} userName 
 * @param {string} userColor 
 * @param {dateTime} timeStamp 
 * @param {string} message 
 * @param {boolean} sented
 */
function createNewMessageInContext(userName, userColor, timeStamp, message, sented) {

    if(!userName){
        return
    }

    if(!userColor){
        return
    }

    if(!timeStamp){
        return
    }

    if(!message){
        return
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
            <div class="Author" style="color: ${userColor}">${userName}</div>
            <div class="TimeStamp">${timeStamp}</div>
        </div>
        <div class="Content">${message}</div>
    </div>`
        
    messageBody.append(newMessage)
}

function sendMessage(){

    let messageText = _getMessageText()

    var d = new Date();

    let hours = ("0" + d.getHours()).slice(-2);
    let minutes = ("0" + d.getMinutes()).slice(-2);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth()+1)).slice(-2);
    let year = d.getFullYear();

    let messageDate = `${year}-${month}-${day}`
    let messageTime = `${hours}:${minutes}`

    if(!messageText){
        return
    } else {
        messageText = _removeCursedWords(messageText)
    }

    var lastMessageId = 0;
	firebase.database().ref('messages/').limitToLast(1).once('value', function(snapshot) {
		snapshot.forEach((child) => {
			lastMessageId = parseInt(child.key)+1;
		});
	});

	writeDatabaseUserMessage(lastMessageId, _getUserUuid(), _getUserName(), _getUserColor(), messageText, messageDate, messageTime);

    _clearMessageText()
    _scrollMessageDivToBottom()
}

function _showMenuOptions() {
	$("#ModalNickname").show();

	$(".modal-close").show();
	$("#name-button-div button").hide();
	$("#name-input").val(_getUserName());
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

function _setUserName(name){
    if(!name){
        return
    }

    localStorage.setItem('userName', name)

    $('.TextNickName').text(name);
}

function _getUserName(){
    if(!localStorage.getItem('userName')){
        return
    } else {
        return localStorage.getItem('userName')
    }
}

function _setUserColor(){
    if(!localStorage.getItem('userColor')){
    	let randomColor = "#" + generateRandomColor()
        localStorage.setItem('userColor', randomColor)
    } 
}

function _getUserColor(){
    if(!localStorage.getItem('userColor')){
        let randomColor = "#" + generateRandomColor()
        localStorage.setItem('userColor', randomColor)
        return randomColor
    } else {
        return localStorage.getItem('userColor')
    }
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

function _checkUserProfile(){
    if(!_getUserName()){
    	$("#ModalNickname").show();
    	$(".modal-close").hide();
    	$("#name-button-div button").hide();
    }
    else $('.TextNickName').text(_getUserName());

    $('.TextNickName').css('color', _getUserColor()); 
}

// It's just for test
/*let color1 = _getUserColor()
let color2 = "#" + generateRandomColor()
for(let i = 0; i<10; i++){
    
    let enviado = true
    let userName = 'Lucas Miranda'
    let userColor = color1
    let random = Math.ceil(Math.random() * 1000)

    if((random % 2) === 0){
        enviado = false
        userName = 'Matheus de Barros'
        userColor = color2
    }

    createNewMessageInContext(userName, userColor, '21:53', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, nihil quo harum praesentium voluptatem in ad minus cumque corporis odio tempore animi deleniti officia maxime. Esse non consequuntur rem nemo.', enviado);
}*/

// BOOTSTRAP!
$(document).ready(function () {
   
    $("#send-button").click(function (){ 
        sendMessage()
    })

    $("#change-name").click(function (){ 
        _setUserName($("#name-input").val())
        $("#ModalNickname").hide();
    })

    $('#name-input').keyup(function (e) {
    	var name = $.trim($('#name-input').val());
		if(name == "") $("#name-button-div button").hide();
		else $("#name-button-div button").show();	
    });

    $(".modal-close").click(function (){ 
        $(".modal").hide();
    })

    setTimeout(() => {
        _scrollMessageDivToBottom()
        _setUserUuid()
        _setUserColor()
        _checkUserProfile()
        _registerListener()
    }, 100);
});