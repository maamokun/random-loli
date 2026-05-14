import { Elysia } from "elysia";
import { getPxImg, getRandomLoli, getOriginalImg } from "./lib/pixiv";
import { html, createElement } from "@elysia/html";
import { Page } from "./templates/page";

const app = new Elysia();

app.use(html());

app.get("/pximg/*", async ({ params }) => {
  const data = await getPxImg(params["*"]);
  return new Response(data, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
});

app.get("/", async () => {
  const loli = await getRandomLoli(false);
  const originalUrl = await getOriginalImg(loli);
  const proxiedUrl = originalUrl.url.replace("https://i.pximg.net/", "");
  return createElement(Page, {
    title: originalUrl.title,
    imageUrl: `/pximg/${proxiedUrl}`,
    username: originalUrl.user,
    userId: originalUrl.userId,
  });
});

app.get("/r18", async () => {
  const loli = await getRandomLoli(true);
  const originalUrl = await getOriginalImg(loli);
  const proxiedUrl = originalUrl.url.replace("https://i.pximg.net/", "");
  return createElement(Page, {
    title: originalUrl.title,
    imageUrl: `/pximg/${proxiedUrl}`,
    username: originalUrl.user,
    userId: originalUrl.userId,
  });
});

export default app;
