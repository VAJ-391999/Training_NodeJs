import { createClient } from "redis";

export const redisClient = createClient({
  socket: {
    host: "redis_db",
    port: 6379,
  },
});

export const redisConnection = async () => {
  try {
    await redisClient.connect();
    console.log("redis connections");
    await redisClient.expire("user_list", 60);
    redisClient.on("error", (err) => {
      console.log("Error occurred while connecting or accessing redis server");
    });
  } catch (error) {
    console.log("Error", error)
  }
};
