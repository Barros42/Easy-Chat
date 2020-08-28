
/**
 * 
 * @param {string} userName 
 * @param {dateTime} timeStamp 
 * @param {string} message 
 */

function createSentedMessage(userName, timeStamp, message) {

    if(!userName){
        return
    }

    if(!timeStamp){
        return
    }

    if(!message){
        return
    }

    let messageBody = $('#MessageBody')

    let newMessage = `
    <div class="Message Sented">
        <div class="AuthorAndTime">
            <div class="Author">${userName}</div>
            <div class="TimeStamp">${timeStamp}</div>
        </div>
        <div class="Content">${message}</div>
    </div>`
        
    messageBody.append(newMessage)

}


// It's just a test

for(let i = 0; i<10; i++){
    createSentedMessage('Matheus de Barros', '21:53', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, nihil quo harum praesentium voluptatem in ad minus cumque corporis odio tempore animi deleniti officia maxime. Esse non consequuntur rem nemo.');
}
