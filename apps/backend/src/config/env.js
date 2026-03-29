export const env = {
  port: Number(process.env.PORT || 4000),
  databaseFile: process.env.DATABASE_FILE || './chat-log.sqlite'
};
