FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun build --compile src/index.ts --outfile server

FROM oven/bun:1 AS runtime
WORKDIR /app

COPY --from=build /app/server /app/server

EXPOSE 3000
CMD ["/app/server"]
