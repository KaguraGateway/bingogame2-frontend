FROM oven/bun:latest

WORKDIR /bingogame2-frontend

COPY . ./

RUN bun install

EXPOSE 3000
CMD ["bun", "dev"]