/*
    All response messages
 */

const rp = require('request-promise');

const _send = (psid, message) => {
    const options = {
        method: 'POST',
        uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
        body: {
            messaging_type: "RESPONSE",
            recipient: {
                id: psid
            },
            message: {
                text: message
            }
        },
        json: true
    };

    return rp(options);
};

const sendMessage = (psid, type) => {

    var text = '';
    
    switch (type) {
        case 'start':
            text = "Let's start the game!";
            break;
        case 'position':
            text = "Where are you?";
            break;
        case 'finish':
            text = "You win! Congratulations.";
            break;
    }

    return text ? _send(psid, text) : null;
};

module.exports = {
    sendMessage
};