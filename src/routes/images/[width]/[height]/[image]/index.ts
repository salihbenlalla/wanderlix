import createGetHandler from "~/routes/images/createGetHandler";

export const onGet = createGetHandler(convertUrl);

function convertUrl(url: URL) {
  const imagePath = url.pathname.split("/");
  const imageWidth = imagePath[2];
  const imageName = imagePath[4];
  return `https://f004.backblazeb2.com/file/travel22/${imageWidth}/${imageName}`;
}
