FROM node:20

COPY package*.json ./
COPY pnpm*.yaml ./

RUN npm i -g pnpm
RUN npm i -g pm2

RUN pnpm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["pm2-runtime", "dist/apps/server/main.js"]
