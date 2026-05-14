import { createElement } from "@elysia/html";

export const Page = ({
  title,
  imageUrl,
  username,
  userId,
}: {
  title: string;
  imageUrl: string;
  username: string;
  userId: string;
}) => {
  return (
    <html>
      <head>
        <title>Random Loli</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Random Loli" />
        <meta property="og:description" content="どんなかわいい幼女に出会えるでしょう？" />
      </head>
      <body class="flex flex-col h-screen bg-gray-100 p-4 overflow-hidden">
        <h1 class="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center flex-shrink-0">
          {title}
        </h1>
        <div class="flex-1 flex items-center justify-center min-h-0 mb-2">
          <img
            src={imageUrl}
            alt={title}
            class="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>
        <a
          href={`https://www.pixiv.net/users/${userId}`}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline text-center flex-shrink-0 mb-2"
        >
          from {username} on Pixiv
        </a>
      </body>
    </html>
  );
};
