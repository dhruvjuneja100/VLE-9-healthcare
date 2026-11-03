FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./

ENV NODE_ENV=production
ENV PORT=3000

RUN adduser -D appuser

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
