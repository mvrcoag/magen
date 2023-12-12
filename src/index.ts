import * as fs from "fs";

import {
  contextContent,
  formContent,
  formHookContent,
  hookContent,
  lowerFirstLetter,
  routerContent,
  schemaContent,
  snakeCase,
  viewContent,
} from "./utils";

import { ProyectSelectType } from "./types";
import { prompt } from "enquirer";

const main = async () => {
  const { proyectType }: { proyectType: ProyectSelectType } = await prompt({
    type: "select",
    name: "proyectType",
    message: "What type of proyect are you working on?",
    choices: ["React for web", "React Native"],
    required: true,
  });

  const { moduleName }: { moduleName: string } = await prompt({
    type: "input",
    name: "moduleName",
    message: "Module name in PascalCase (ej: Auth)",
    required: true,
  });

  // get section name from user
  const { sectionName }: { sectionName: string } = await prompt({
    type: "input",
    name: "sectionName",
    message: "Section name in PascalCase (ej: Login)",
    required: true,
  });

  // get path from user
  const { path }: { path: string } = await prompt({
    type: "input",
    name: "path",
    message: "Path to create the section (ej: src/modules/auth/login)",
    initial: `src/modules/${snakeCase(moduleName)}/${snakeCase(sectionName)}`,
    required: true,
  });

  // get if section will have a form
  const { withForm }: { withForm: string } = await prompt({
    type: "confirm",
    name: "withForm",
    message: "Section will have a form?",
    required: true,
  });

  // get if section will have a context
  const { withContext }: { withContext: string } = await prompt({
    type: "confirm",
    name: "withContext",
    message: "Section will have a context?",
    required: true,
  });

  const { withApiRouter }: { withApiRouter: string } = await prompt({
    type: "confirm",
    name: "withApiRouter",
    message: "Section will have an api router?",
    required: true,
  });

  const fullSectionName = moduleName + sectionName;
  const schemaFile = `${path}/${lowerFirstLetter(fullSectionName)}.schema.ts`;

  if (withApiRouter) {
    const { routerPath }: { routerPath: string } = await prompt({
      type: "input",
      name: "routerPath",
      message: "Ingresa el path del router (API)",
      initial: `src/api/routers/${snakeCase(moduleName)}`,
      required: true,
    });
    !fs.existsSync(routerPath) && fs.mkdirSync(routerPath, { recursive: true });
    // define the router file
    const routerFile = `${routerPath}/${lowerFirstLetter(fullSectionName)}.ts`;

    // create the router file
    if (!fs.existsSync(routerFile)) {
      fs.writeFileSync(
        routerFile,
        routerContent({
          sectionName: fullSectionName,
          schemaPath: schemaFile.replace("src", "~").replace(".ts", ""),
        })
      );
      console.log(routerFile, "creado");
    }
  }

  // create section folder on components if not exists
  !fs.existsSync(path) && fs.mkdirSync(path, { recursive: true });

  // define the standard files
  const files = [
    {
      file: `/${fullSectionName}View.tsx`,
      content: viewContent(fullSectionName, proyectType),
    },
    {
      file: `/use${fullSectionName}.ts`,
      content: hookContent(fullSectionName),
    },
  ];

  // if section will have a form, add the form files
  if (withForm) {
    files.push({
      file: `/${fullSectionName}Form.tsx`,
      content: formContent(fullSectionName, proyectType),
    });
    files.push({
      file: `/use${fullSectionName}Form.ts`,
      content: formHookContent({
        schemaPath: schemaFile.replace("src", "~").replace(".ts", ""),
        sectionName: fullSectionName,
      }),
    });
  }

  // if section will have a context, add the context files
  if (withContext) {
    files.push({
      file: `/${fullSectionName}Context.tsx`,
      content: contextContent(fullSectionName),
    });
  }

  // create the files
  files.forEach((file) => {
    const filePath = `${path}${file.file}`;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
      console.log(filePath, "creado");
    }
  });

  // create the schema file
  if (!fs.existsSync(schemaFile)) {
    fs.writeFileSync(schemaFile, schemaContent(fullSectionName));
  }
};

// execute the main function
main()
  .then(() => {
    console.log("");
    console.log("--------------------");
    console.log("Section created successfully");
    console.log("Remember to:");
    console.log(
      "1. Add the router to the api root file (api/root.ts, server/root.ts, etc.)"
    );
    console.log(
      "2. Add the view component to the pages router file (Pages, App, Navigation.tsx, etc.)"
    );
    console.log("--------------------");
    console.log("");
  })
  .catch((err) => console.error(err));
