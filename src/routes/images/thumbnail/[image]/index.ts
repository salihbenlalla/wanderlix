import createGetHandler from "~/routes/images/createGetHandler";

export const onGet = createGetHandler(convertUrl);

function convertUrl(url: URL) {
  const imagePath = url.pathname.split("/");
  const imageName = imagePath[3];
  return `https://f004.backblazeb2.com/file/travel22/thumbnails/${imageName}`;
}
