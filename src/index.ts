import { Elysia } from "elysia";
import { getPxImg, getRandomLoli, getOriginalImg } from "./lib/pixiv";
import { html, createElement } from "@elysia/html";
import { Page } from "./templates/page";

const app = new Elysia();

app.use(html());

const fetchImageAsDataUri = async (url: string): Promise<string> => {
  const path = url.replace("https://i.pximg.net/", "");
  const imageBuffer = await getPxImg(path);
  const ext = url.split(".").pop()?.toLowerCase() ?? "jpeg";
  const mimeType = ext === "png" ? "image/png" : ext === "gif" ? "image/gif" : "image/jpeg";
  const base64 = imageBuffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
};

app.get("/", async () => {
  const loli = await getRandomLoli(false);
  const originalUrl = await getOriginalImg(loli);
  const dataUri = await fetchImageAsDataUri(originalUrl.url);
  return createElement(Page, {
    title: originalUrl.title,
    imageUrl: dataUri,
    username: originalUrl.user,
    userId: originalUrl.userId,
  });
});

app.get("/r18", async () => {
  const loli = await getRandomLoli(true);
  const originalUrl = await getOriginalImg(loli);
  const dataUri = await fetchImageAsDataUri(originalUrl.url);
  return createElement(Page, {
    title: originalUrl.title,
    imageUrl: dataUri,
    username: originalUrl.user,
    userId: originalUrl.userId,
  });
});

app.listen(3000)
