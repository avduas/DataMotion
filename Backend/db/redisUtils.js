require('dotenv').config();
const Redis = require('ioredis');

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

redisClient.on('connect', function () {
    console.log('Connected to Redis');
});

async function findValueByKey(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
}
// For future
// async function savePasswordAndUserIdToRedis(email, password, userId) {
//     try {
//         const redisValue = `${password}:${userId}`;
//         await redisClient.set(email, redisValue);
//         console.log(`Password and userId saved to Redis for email ${email}`);
//     } catch (error) {
//         console.error("Error saving password and userId to Redis:", error);
//     }
// }
module.exports = { findValueByKey, redisClient };
