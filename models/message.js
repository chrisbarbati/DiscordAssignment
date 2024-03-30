//Model for a Discord message object

class message{
    constructor(content, sender){
        this.content = content; // The text content of the message
        this.sender = sender; // The user who sent the message
    }
}

module.exports = message;