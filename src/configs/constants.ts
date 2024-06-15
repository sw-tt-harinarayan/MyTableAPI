export const jwtConstants = {
  expiresIn: "1d",
  secret: "sdf4535sd1f35sd1fsd1",
};

export const imageFolderField = {
  user: {
    folderName: "users",
    fieldName: "profileImage",
  },
  category: {
    fieldName: "image",
    folderName: "categories",
  },
  outlet: {
    fieldName: "images",
    folderName: "Outlets",
  },
};

const sortByDate = {
  CREATED_ASC: "createdAt,asc",
  CREATED_DESC: "createdAt,desc",
};

const sortByName = {
  NAME_ASC: "name,asc",
  NAME_DESC: "name,desc",
};

export const sortByUser = {
  ...sortByDate,
  ...sortByName,
};

export const sortByCategory = {
  ...sortByDate,
  ...sortByName,
};
