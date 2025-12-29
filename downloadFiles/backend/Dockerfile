FROM node:20-alpine AS builder
WORKDIR /app

# copy package files and install all deps (including dev) for build
COPY package.json package-lock.json* ./
RUN npm install

# copy source and build
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

# install runtime system deps (ffmpeg para processamento de mídia)
RUN apk add --no-cache ffmpeg

# copy only production deps
COPY package.json package-lock.json* ./
RUN npm install --production

# copy built files
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
