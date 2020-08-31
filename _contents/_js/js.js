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


// It's just for test
for(let i = 0; i<1000; i++){
    
    let enviado = true
    let userName = 'Lucas Miranda'
    let random = Math.ceil(Math.random() * 1000)

    if((random % 2) === 0){
        enviado = false
        userName = 'Matheus de Barros'
    }

    createNewMessageInContext(userName, '21:53', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, nihil quo harum praesentium voluptatem in ad minus cumque corporis odio tempore animi deleniti officia maxime. Esse non consequuntur rem nemo.', enviado);
}
