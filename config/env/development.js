export default {
  env: 'development',
  MONGOOSE_DEBUG: true,
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  jwtAudience: 'ridgegram.com',
  db: 'mongodb://localhost:27017/ridgegram_dev',
  port: 3000,
  avatarAddress: 'http://localhost:3000/api/image/',
};
