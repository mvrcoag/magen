#!/usr/bin/env node

import * as fs from "fs";

import { ProyectSelectType, RouterSelectType } from "./types";
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

import { prompt } from "enquirer";

const main = async () => {
  console.log(`          
  _____ ___ ___ ___ ___ 
 |     | .'| . | -_|   |
 |_|_|_|__,|_  |___|_|_|
           |___|        
 `);

  console.log("\nBy @mvrcoag\n");

  const { proyectType }: { proyectType: ProyectSelectType } = await prompt({
    type: "select",
    name: "proyectType",
    message: "What type of project are you working on?",
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

  const fullSectionName = moduleName + sectionName;

  const { withView }: { withView: string } = await prompt({
    type: "confirm",
    name: "withView",
    message: "Section will have a view?",
    required: true,
  });

  if (withView) {
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
          schemaPath: './' + lowerFirstLetter(fullSectionName) + '.schema',
          sectionName: fullSectionName,
        }),
      });
      files.push({
        file: `/${lowerFirstLetter(fullSectionName)}.schema.ts`,
        content: schemaContent(fullSectionName),
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
      }
    });
  }

  const { withApiRouter }: { withApiRouter: string } = await prompt({
    type: "confirm",
    name: "withApiRouter",
    message: "Section will have an api router?",
    required: true,
  });

  if (withApiRouter) {
    const { routerType }: { routerType: RouterSelectType } = await prompt({
      type: "select",
      name: "routerType",
      message: "What type of router you want to create?",
      choices: ["Axios", "React Query", "tRPC", "None of the above"],
      required: true,
    });

    const { routerPath }: { routerPath: string } = await prompt({
      type: "input",
      name: "routerPath",
      message: "Path to create the router (ej: src/api/routers/auth)",
      initial: `src/api/routers/${snakeCase(moduleName)}`,
      required: true,
    });
    !fs.existsSync(routerPath) && fs.mkdirSync(routerPath, { recursive: true });
    // define the router file
    const routerFile = `${routerPath}/${lowerFirstLetter(moduleName)}.ts`;

    // create the router file
    if (!fs.existsSync(routerFile)) {
      fs.writeFileSync(
        routerFile,
        routerContent({
          sectionName: fullSectionName,
          routerType: routerType,
        })
      );
    }
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
