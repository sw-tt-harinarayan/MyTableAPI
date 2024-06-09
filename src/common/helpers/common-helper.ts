import { imageFolderField } from "src/configs/constants";

export const getImageFolderField = (url: string): ImageFolderFieldInterface => {
  let key: string = "";
  const urlArr: Array<string> = url.split("/");

  if (urlArr.length > 3) key = urlArr[3];

  return imageFolderField[key];
};
