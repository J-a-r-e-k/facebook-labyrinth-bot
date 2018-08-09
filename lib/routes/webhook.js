/*
    Endpoint for our webook
 */

const _ = require("lodash");
const sendMessage = require("./../helpers/sendapi").sendMessage;
const labyrinth = require("./../helpers/labyrinth");

const getAction = (text) => {
    let selected;

    const actions = {
        'start': /^start$/i,
        'up': /^up$/i,
        'down': /^down$/i,
        'left': /^left$/i,
        'right': /^right$/i
    };

    for (let [key, value] of Object.entries(actions)) {
        if (text.match(value)) {
            selected = key;
        }
    }

    return selected;
}

module.exports = (req, res) => {
    const psid = _.get(req.body, 'entry.0.messaging.0.sender.id');
    const text = _.get(req.body, 'entry.0.messaging.0.message.text');

    let action = getAction(text);

    if (action) {
        labyrinth.get(psid)
            .then(pos => labyrinth[action](psid, pos))
            .then(pos => sendMessage(psid, action, pos));
    }

    res.sendStatus(200);    
};