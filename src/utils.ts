import { ProyectSelectType, RouterSelectType } from "./types";

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

export const viewContent = (
  sectionName: string,
  proyectType: ProyectSelectType
) => {
  if (proyectType === "React Native")
    return `
  import { StyleSheet, View } from "react-native";
  export const ${sectionName}View = () => {
    
    return <View style={styles.container}>{null}</View>;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
      backgroundColor: "#fff",
    },
  });
  `;

  if (proyectType === "React for web")
    return `
  export const ${sectionName}View = () => {
    
    return <div>{null}</div>;
  };
  `;
};

export const hookContent = (sectionName: string) =>
  `
  export const use${sectionName} = () => {
  
    return { };
  };
`;

export const formContent = (
  sectionName: string,
  proyectType: ProyectSelectType
) => {
  if (proyectType === "React Native")
    return `
  import { FormErrorText } from "~/components/ui/form/FormErrorText";
  import { FormField } from "~/components/ui/form/FormField";
  import { Button } from "~/components/ui/form/Button";
  import { TextInput } from "~/components/ui/form/TextInput";
  import { View, StyleSheet } from "react-native";
  import { use${sectionName}Form } from "./use${sectionName}Form";
  
    export const ${sectionName}Form = () => {
      const { formik } = use${sectionName}Form();
  
      return (
          <View style={styles.container}>
              <FormField>
                  <TextInput
                  label="Usuario"
                  value={formik.values.email}
                  id="email"
                  onChangeText={(text) => formik.setFieldValue("email", text)}
                  />
                  {formik.touched.email && <FormErrorText error={formik.errors.email} />}
              </FormField>
              <FormField>
                  <Button
                      onPress={() => formik.handleSubmit()}
                  >
                      Continuar
                  </Button>
              </FormField>
          </View>
      );
    };
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
      },
    });
    `;

  if (proyectType === "React for web")
    return `
    import { FormErrorText } from "~/components/ui/form/FormErrorText";
    import { FormField } from "~/components/ui/form/FormField";
    import { Button } from "~/components/ui/form/Button";
    import { Label } from "~/components/ui/form/Label";
    import { TextInput } from "~/components/ui/form/TextInput";
    import { use${sectionName}Form } from "./use${sectionName}Form";
    
      export const ${sectionName}Form = () => {
        const { formik } = use${sectionName}Form();
    
        return (
            <form onSubmit={formik.handleSubmit}>
                <FormField>
                    <Label htmlFor="email">Usuario</Label>
                    <TextInput
                        value={formik.values.email}
                        id="email"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && <FormErrorText error={formik.errors.email} />}
                </FormField>
                <FormField>
                    <Button
                        type="submit"
                    >
                        Continuar
                    </Button>
                </FormField>
            </form>
        );
      };
      `;
};

export const formHookContent = ({
  sectionName,
  schemaPath,
}: {
  sectionName: string;
  schemaPath: string;
}) =>
  `
  import { toFormikValidationSchema } from "zod-formik-adapter";
  import { useFormik } from "formik";
  import {
    ${lowerFirstLetter(sectionName)}Schema,
    type ${sectionName}Type,
  } from "${schemaPath}";
  
  const initialValues: ${sectionName}Type = {};
  
  export const use${sectionName}Form = () => {
    const formik = useFormik({
      initialValues,
      validationSchema: toFormikValidationSchema(${lowerFirstLetter(
        sectionName
      )}Schema),
      onSubmit: (values: ${sectionName}Type) => {
        console.log(values);
        },
    });
  
    return {
      formik,
    };
  };
  
  `;

export const contextContent = (sectionName: string) =>
  `
  import React, { createContext, useContext, useState } from "react";
  
  interface ContextValues {
    name: string;
  }
  
  const ${sectionName}Context = createContext<ContextValues>({
    name: "",
  });
  
  export const use${sectionName}Context = () => useContext(${sectionName}Context);
  
  export const ${sectionName}ContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [name, setName] = useState("");
    return (
      <${sectionName}Context.Provider
        value={{
          name,
        }}
      >
        {children}
      </${sectionName}Context.Provider>
    );
  };
  `;

export const schemaContent = (sectionName: string) =>
  `
    import { z } from "zod";
  
    export const ${lowerFirstLetter(sectionName)}Schema = z.object({
      name: z.string({
        required_error: "El nombre requerido",
      }),
    });
  
    export type ${sectionName}Type = z.infer<typeof ${lowerFirstLetter(
    sectionName
  )}Schema>;
  `;

export const routerContent = ({
  sectionName,
  routerType,
}: {
  sectionName: string;
  routerType: RouterSelectType;
}) => {

  if (routerType === "None of the above") return `
export const ${lowerFirstLetter(sectionName)}Router = {
  example: () => {
    return { };
  },
};
  `;

  if (routerType === "React Query") return `
import { axios } from "~/lib/axios";
import { useQuery, useMutation } from "@tanstack/react-query";

type ExampleResponse = {
  message: string;
};

export const ${lowerFirstLetter(sectionName)}Router = {
  example: () => {
    const result = useQuery({
      queryKey: ["example${sectionName}"],
      queryFn: async () => {
        try {
          const res = await axios.get<ExampleResponse>("/example");
          return res.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            return {
              error: error.response?.data.message ?? "Error desconocido",
              status: error.status ?? 500,
              data: null,
            };
          }
          return {
            error: "Error desconocido",
            status: 500,
            data: null,
          };
        }
      },
    });

    return result;
  },
  exampleMutate: () => {
    const mutation = useMutation({
      mutationFn: async () => {
        try {
          const res = await axios.post<ExampleResponse>("/example");
          return res.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            return {
              error: error.response?.data.message ?? "Error desconocido",
              status: error.status ?? 500,
              data: null,
            };
          }
          return {
            error: "Error desconocido",
            status: 500,
            data: null,
          };
        }
      },
    });

    return mutation;
  },
};
  `;

  if (routerType === "tRPC") return `
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const ${lowerFirstLetter(sectionName)}Router = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ctx}) => {
    if (false) {
      throw new TRPCError({ code: "UNAUTHENTICATED" });
    }

    return { };
  }),
});
  `;

  if (routerType === "Axios") return `
  import { AxiosError } from "axios";
  import axios from "~/lib/axios";
  
  type ExampleResponse = {
    token: string;
  };

  export const ${lowerFirstLetter(sectionName)}Router = {
    example: async () => {
        try {
          const res = await axios.post<ExampleResponse>("/example", values);
          return {
            data: res.data,
            status: res.status,
            error: null,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            return {
              error: error.response?.data.message ?? "Error desconocido",
              status: error.status ?? 500,
              data: null,
            };
          }
          return {
            error: "Error desconocido",
            status: 500,
            data: null,
          };
        }
    }
  }
  `
};
