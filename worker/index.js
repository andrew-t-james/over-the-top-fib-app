const redis = require('redis');
const { redisHost, redisPort } = require('./keys');

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

// using recursion on purpose for slow processing
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  // eslint-disable-next-line radix
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');