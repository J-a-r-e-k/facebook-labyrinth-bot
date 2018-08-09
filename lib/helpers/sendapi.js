const CONFIG = require('./../../config');
const rp = require('request-promise');

const send = (psid, text, pos) => {
    let message = {
        text: text
    };

    if (pos) {
        message = {
            attachment: {
                'type': 'image',
                'payload': {
                    'url': `${CONFIG.images_url}${pos}.png`,
                    'is_reusable': true
                }
            }
        };
    }

    const options = {
        method: 'POST',
        uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${CONFIG.access_token}`,
        body: {
            messaging_type: 'RESPONSE',
            recipient: {
                id: psid
            },
            message: message
        },
        json: true
    };

    return rp(options);
};

const sendMessage = (psid, type, pos) => {
    let text;

    if (parseInt(pos) === CONFIG.finish) {
        type = 'finish';
    }

    switch (type) {
    case 'start':
        pos = null;
        text = 'Let\'s start the game! Write up, down, left or right command to change your position and find your way out of a labyrinth.';
        break;
    case 'up':
        text = 'Where are you?';
        break;
    case 'down':
        text = 'Where are you?';
        break;
    case 'left':
        text = 'Where are you?';
        break;
    case 'right':
        text = 'Where are you?';
        break;
    case 'finish':
        pos = null;
        text = 'You won! Congratulations. Write start command to play again.';
        break;
    }

    return text ? send(psid, text, pos) : null;
};

module.exports = {
    sendMessage
};
