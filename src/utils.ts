import * as fs from "fs";
import * as path from "path";

import { RouterSelectType } from "./types";

export const TEMPLATES_PATH = path.join(__dirname, "templates");

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
  const file = fs.readFileSync(`${TEMPLATES_PATH}/view.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const hookContent = (sectionName: string) => {
  const file = fs.readFileSync(`${TEMPLATES_PATH}/hook.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const formContent = (sectionName: string) => {
  const file = fs.readFileSync(`${TEMPLATES_PATH}/form.txt`, "utf8");
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
  const file = fs.readFileSync(`${TEMPLATES_PATH}/formHook.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName))
    .replace(/{{schemaPath}}/g, schemaPath);
};

export const contextContent = (sectionName: string) => {
  const file = fs.readFileSync(`${TEMPLATES_PATH}/context.txt`, "utf8");
  return file
    .replace(/{{sectionName}}/g, sectionName)
    .replace(/{{lowerFirstLetterSectionName}}/g, lowerFirstLetter(sectionName));
};

export const schemaContent = (sectionName: string) => {
  const file = fs.readFileSync(`${TEMPLATES_PATH}/schema.txt`, "utf8");
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
    const file = fs.readFileSync(`${TEMPLATES_PATH}/generalRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }

  if (routerType === "React Query") {
    const file = fs.readFileSync(`${TEMPLATES_PATH}/reactQueryRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }

  if (routerType === "tRPC") {
    const file = fs.readFileSync(`${TEMPLATES_PATH}/trpcRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }

  if (routerType === "Axios") {
    const file = fs.readFileSync(`${TEMPLATES_PATH}/axiosRouter.txt`, "utf8");
    return file
      .replace(/{{sectionName}}/g, sectionName)
      .replace(
        /{{lowerFirstLetterSectionName}}/g,
        lowerFirstLetter(sectionName)
      );
  }
};
