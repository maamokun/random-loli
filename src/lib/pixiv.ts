import * as buffer from "node:buffer";

export const getPxImg = async (path: string) => {
  const data = await fetch(`https://i.pximg.net/${path}`, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
      Referer: "https://www.pixiv.net/",
    },
  });
  return buffer.Buffer.from(await data.arrayBuffer());
};

export const getRandomLoli = async (r18: boolean) => {
  const search = await fetch(
    `https://www.pixiv.net/ajax/search/artworks/%E3%83%AD%E3%83%AA?order=date_d&mode=${r18 ? "r18" : "safe"}&p=1&ai_type=0&csw=0&s_mode=s_tag&ratio=&lang=en&type=illust`,
  );
  const searchData = (await search.json()) as any;
  const entries = searchData.body.illustManga.data;
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];
  return randomEntry.id;
};

export const getOriginalImg = async (id: string) => {
  const dataRes = await fetch(`https://www.pixiv.net/ajax/illust/${id}`);
  const data = (await dataRes.json()) as any;
  return {
    url: data.body.urls.original,
    title: data.body.illustTitle,
    id: id,
    user: data.body.userName,
    userId: data.userId,
  };
};
