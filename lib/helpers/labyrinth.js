const CONFIG = require('./../../config');
const MOVES = CONFIG.moves;
const redis = require('redis').createClient(CONFIG.redis_url);

const save = (key, value) => {
    return new Promise((resolve) => {
        redis.set(key, value);
        return resolve(value);
    });
};

const get = (key) => {
    return new Promise((resolve) => {
        redis.get(key, (err, res) => {
            if (err) {
                console.error(err);
            }
            const response = res ? {
                x: res[0],
                y: res[1]
            } : {
                x: CONFIG.start[0],
                y: CONFIG.start[1]
            };
            return resolve(response);
        });
    });
};

const start = (psid) => {
    return save(psid, CONFIG.start);
};

const up = (psid, pos) => {
    if (MOVES[`${pos['x']}${pos['y']}`][0]) {
        pos['y'] = parseInt(pos['y']) + 1;
    }
    return save(psid, `${pos['x']}${pos['y']}`);
};

const down = (psid, pos) => {
    if (MOVES[`${pos['x']}${pos['y']}`][1]) {
        pos['y'] = parseInt(pos['y']) - 1;
    }
    return save(psid, `${pos['x']}${pos['y']}`);
};

const left = (psid, pos) => {
    if (MOVES[`${pos['x']}${pos['y']}`][2]) {
        pos['x'] = parseInt(pos['x']) - 1;
    }
    return save(psid, `${pos['x']}${pos['y']}`);
};

const right = (psid, pos) => {
    if (MOVES[`${pos['x']}${pos['y']}`][3]) {
        pos['x'] = parseInt(pos['x']) + 1;
    }
    return save(psid, `${pos['x']}${pos['y']}`);
};

module.exports = {
    start,
    get,
    up,
    down,
    left,
    right
};
