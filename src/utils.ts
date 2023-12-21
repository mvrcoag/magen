import * as fs from "fs";

import { RouterSelectType } from "./types";

// convert string to snake_case
export const snakeCase = (string: string) => {
  return string
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

// convert first letter to lower case
export const lowerFirstLetter = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const viewContent = (sectionName: string) => {
  const file = fs.readFileSync(`./src/templates/view.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const hookContent = (sectionName: string) => {
  const file = fs.readFileSync(`./src/templates/hook.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const formContent = (sectionName: string) => {
  const file = fs.readFileSync(`./src/templates/form.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const formHookContent = ({
  sectionName,
  schemaPath,
}: {
  sectionName: string;
  schemaPath: string;
}) => {
  const file = fs.readFileSync(`./src/templates/formHook.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName))
    .replace(/{{schemaPath}}/g, schemaPath);
};

export const contextContent = (sectionName: string) => {
  const file = fs.readFileSync(`./src/templates/context.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const schemaContent = (sectionName: string) => {
  const file = fs.readFileSync(`./src/templates/schema.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const routerContent = ({
  sectionName,
  routerType,
}: {
  sectionName: string;
  routerType: RouterSelectType;
}) => {
  if (routerType === "None of the above") {
    const file = fs.readFileSync(`./src/templates/generalRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }

  if (routerType === "React Query") {
    const file = fs.readFileSync(`./src/templates/reactQueryRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }

  if (routerType === "tRPC") {
    const file = fs.readFileSync(`./src/templates/trpcRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }

  if (routerType === "Axios") {
    const file = fs.readFileSync(`./src/templates/axiosRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }
};
