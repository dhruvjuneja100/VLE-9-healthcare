FROM node:22-alpine

WORKDIR /app

COPY server.js ./

ENV NODE_ENV=production
ENV PORT=3000

RUN adduser -D appuser \
    && rm -rf /usr/local/lib/node_modules/npm \
              /usr/local/bin/npm \
              /usr/local/bin/npx

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
