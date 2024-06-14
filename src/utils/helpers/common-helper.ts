import { imageFolderField } from "src/configs/constants";

export const getImageFolderField = (url: string): ImageFolderFieldInterface => {
  let key: string = "";
  const urlArr: Array<string> = url.split("/");

  if (urlArr.length > 3) key = urlArr[3];

  return imageFolderField[key];
};

export function extractDataFromObject(data: any, keys: Array<any>) {
  let result: any = {};

  keys.forEach((item: string) => {
    result[item] = data[item];
  });

  return result;
}

export function arraysEqual(arr1: Array<string>, arr2: Array<string>) {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) return false;

  // Check if every element of arr1 exists in arr2
  return arr1.every((elem) => arr2.includes(elem));
}

export function checkRoleExists(arr1: Array<string>, arr2: Array<string>) {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) return true;
  }

  return false;
}
