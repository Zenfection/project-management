# Task Management CTU by Zen

## <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-17-30-icons8-angularjs.png" title="" alt="icons8-angularjs.png" width="50"> Frontend (Angular 16)

## 1. Roadmap Evolution

| Status | Task | Commit | Source |
|:------:| ---- | ------ | ------ |

### 2. Changelog Optimize Code

### 3. Note

## <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-18-12-icons8-nestjs.png" title="" alt="icons8-nestjs.png" width="50"> Backend (NestJS 10)

### 1. Roadmap Evolution

| Status | Task                                                                                     | Commit                                                                                                       | Source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|:------:| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅      | Use SWC compiler                                                                         | [#31b37b7](https://github.com/Zenfection/project-management/commit/31b37b72f454c2fdee05570b7e89d370422067b9) | <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-18-54-swc.png" title="" alt="swc.png" width="50"> [SWC](https://swc.rs/)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ✅      | Register OpenAPI Swagger                                                                 | [#5ac0ab6](https://github.com/Zenfection/project-management/commit/5ac0ab6443835245af63832034fb33abefe715fa) | <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-22-32-Swagger-logo.png" title="" alt="Swagger-logo.png" width="50">[Swagger](https://swagger.io/specification/)                                                                                                                                                                                                                                                                                                                                                                                         |
| ✅      | Init Docker Container with postgreSQL and Redis Database                                 | [#520bd26](https://github.com/Zenfection/project-management/commit/520bd26e0880b38cf2417a922b432b7a979219f9) | <img title="" src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-23-09-icons8-docker.png" alt="icons8-docker.png" width="50"> [Docker](https://www.docker.com/)<br> <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-24-25-icons8-postgresql.png" title="" alt="icons8-postgresql.png" width="50">[postgreSQL](https://www.postgresql.org/)<br><img title="" src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-23-20-icons8-redis.png" alt="icons8-redis.png" width="50">[Redis](https://redis.io/) |
| ✅      | Create Compodoc Documentation                                                            | [#5905606](https://github.com/Zenfection/project-management/commit/59056063fa0a0b0b6065d94c1425336ba32fae41) | <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-29-49-23202313.png" title="" alt="23202313.png" width="50"> [Compodoc](https://compodoc.app/)                                                                                                                                                                                                                                                                                                                                                                                                           |
| ✅      | Intergate PrismaORM with [nestjs-prisma](https://github.com/notiz-dev/nestjs-prisma)     | [#3deacad](https://github.com/Zenfection/project-management/commit/3deacada581e83b8b2fba928609b8e954b2a163b) | <img title="" src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-11-32-02-prisma-logo-3805665B69-seeklogo.com.png" alt="prisma-logo-3805665B69-seeklogo.com.png" width="50"> [Prisma](https://www.prisma.io/)                                                                                                                                                                                                                                                                                                                                                      |
| ✅      | Create Hashing Password Service                                                          | [#1dac614](https://github.com/Zenfection/project-management/commit/1dac614332ce9bb6d5cc97e5aa8cf50c39eac6fd) | [bcrypt](https://github.com/kelektiv/node.bcrypt.js)<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ✅      | Setup Authentication SignIn / SignUp by  JWT includes: `access-token` and `refreshtoken` | [#78f749a](https://github.com/Zenfection/project-management/commit/78f749a834bc70c2a19fd867644f8d60a11149a9) | <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-16-53-14-pic_logo.svg" title="" alt="pic_logo.svg" width="50">[jwt](https://jwt.io/)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ✅      | Implement Guard for all authentication method                                            | [#65d1c61](https://github.com/Zenfection/project-management/commit/65d1c61e5a9e7a9576986c9fa81f9c68ce3799ab) | <img src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/09/21-16-54-10-passportJS-300x300.png" title="" alt="passportJS300x300png" width="50">[passport](https://www.passportjs.org/)                                                                                                                                                                                                                                                                                                                                                                                    |
| ✅      | Intergrate Redis to save `refresh-token` instead of `client-cookie`                      | [#d101d84](https://github.com/Zenfection/project-management/commit/d101d84fd7e1ec6b531511e646ee6c2146fd2889) | [ioredis](https://github.com/luin/ioredis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ✅      | Use cookie express store token via Redis                                                 | [#d060876](https://github.com/Zenfection/project-management/commit/d06087658fb38222bff39c49db6d114432a00fa7) | [express-session](https://github.com/expressjs/session)<br>[connect-redis](https://github.com/tj/connect-redis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ✅      | Add 2FA Authentication Method                                                            | [#cb7d0c7](https://github.com/Zenfection/project-management/commit/cb7d0c746f48d227f4bd9f58883a0d67f34f6237) | [otplib](https://www.npmjs.com/package/otplib)<br>[qrcode](https://www.npmjs.com/package/qrcode)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|        | Add Google Authentication Method                                                         |                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ✅      | Build Roles Authorization with Decorator and Guard                                       | [#4ea237a](https://github.com/Zenfection/project-management/commit/4ea237a5fcda91d111a8cbc7abccd2da6be2619c) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|        | Build SMTP Mailer                                                                        |                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ✅      | Build Cloud Storage with Cloudflare R2 and Rate Limiting                                 | [#24a599b](https://github.com/Zenfection/project-management/tree/24a599b3f593fe4f3705c2877edad64e565362b3)   | <img title="" src="https://raw.githubusercontent.com/Zenfection/Image/master/2023/10/23-15-36-56-cloudflare-r2.png" alt="cloudflare-r2.png" width="50">[CloudFlare R2](https://www.cloudflare.com/developer-platform/r2/)<br>[throtter](https://github.com/nestjs/throttler)                                                                                                                                                                                                                                                                                                              |



### 2. Changelog Optimize Code

- Build UserService with Prisma Serivce without DTO and Entity [#d57cf4e](https://github.com/Zenfection/project-management/commit/d57cf4e0c3c3af89b3d81d5987814abeea0666fe), [#f813be6](https://github.com/Zenfection/project-management/commit/f813be633cca6bce8a116e877e7eae567e6c6a59)
- Improve database and build seed data [#4929b8b](https://github.com/Zenfection/project-management/commit/4929b8b5e2c745b0132a73542edd8d43da620b40)
- Add upload avatar method for users [#8034221](https://github.com/Zenfection/project-management/tree/80342212963289bf09a3447276c11f7e0a407072)

### 3. Note

#### Database

![db.png](https://raw.githubusercontent.com/Zenfection/Image/master/2023/10/23-15-48-30-db.png)

#### .env

```text
# postgreSQL with Docker
POSTGRES_USER=<YOUR USER>
POSTGRES_PASSWORD=<YOUR PASSWORD>
POSTGRES_DB=<YOUR DATABASE>

# Redis with Docker
REDIS_URL=redis://localhost:6379

# Prisma
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public

# JWT TOKEN
JWT_SECRET=secret
JWT_AUDIENCE=localhost:3000
JWT_ISSUER=localhost:3000
JWT_ACESSS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400

# SESSION
SESSION_SECRET=<YOUR SECRET>

# TFA SECRET
TFA_APP_NAME=<YOUR TFA NAME>


# Cloudflare R2
ACCOUNT_ID=<YOUR ACCOUNT ID>
ACCESS_KEY_ID=<YOUR ACCESS ID>
SECRET_ACCESS_KEY=<YOUR SECRET ACCESS KEY>
BUCKET_NAME=<YOUR NAME BUCKET>

# Rate Limit
UPLOAD_RATE_TTL=60
UPLOAD_RATE_LIMIT=10
```