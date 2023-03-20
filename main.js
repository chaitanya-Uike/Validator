// import _ from "lodash";

// const schema = {
//   type: "object",
//   properties: {
//     email: {
//       type: "string",
//       format: "email",
//     },
//     password: {
//       type: "string",
//       allOf: [{ min: 6 }, { max: 12 }],
//     },
//     address: {
//       type: "object",
//       properties: {
//         city: {
//           type: "string",

//           if: { format: "email" },
//           then: { max: 6 },
//           else: { min: 3 },

//           allOf: [
//             {
//               if: { min: 6 },
//               then: { max: 8 },
//               else: { max: 3 },
//             },
//             {
//               if: { format: "email" },
//               then: { max: 6 },
//               else: { min: 6 },
//             },
//           ],
//         },
//         country: {
//           type: "string",
//         },
//       },
//     },
//     temp: {
//       oneOf: [{ type: "string", min: 6 }],
//     },
//   },
// };

// const data = {
//   email: "test@email.com",
//   password: "Password",
//   address: {
//     city: "nag",
//     country: "USA",
//   },
//   temp: "hello world",
// };

// const errors = [];

// function validate(schema, data) {
//   if (typeof schema !== "object") {
//     errors.push("schema should be a object");
//     return false;
//   }

//   if (schema.hasOwnProperty("allOf")) {
//     return allOfValidator(schema.allOf, data, schema);
//   }
//   if (schema.hasOwnProperty("oneOf")) {
//     return oneOfValidator(schema.oneOf, data, schema);
//   }
//   if (schema.hasOwnProperty("if")) {
//     return ifThenElseValidator(
//       schema.if,
//       schema.then,
//       schema.else,
//       schema,
//       data
//     );
//   }

//   const newSchema = _.omit(schema, ["if", "then", "else", "anyOf", "oneOf"]);

//   const type = newSchema.type;

//   if (type === undefined) {
//     errors.push(`schema should have a "type" property`);
//     return false;
//   }

//   if (typeof type !== "string") {
//     errors.push(`"type" should a "string"`);
//     return false;
//   }

//   switch (type) {
//     case "string":
//       return validateString(newSchema, data);
//     case "object":
//       return validateObject(newSchema, data);

//     default:
//       errors.push(`${type} not supported`);
//       return false;
//   }
// }

// function validateString(schema, data) {
//   let valid = true;
//   Object.keys(schema).forEach((prop) => {
//     if (prop === "type") {
//       if (typeof data !== "string") {
//         errors.push(`type string expected got ${typeof data}`);
//         valid = false;
//       }
//     } else if (prop === "min") {
//       if (typeof schema.min !== "number") {
//         errors.push(`min expects value of type "number"`);
//         valid = false;
//         return;
//       }
//       if (data.length < schema.min) {
//         errors.push("minimum length is " + schema.min);
//         valid = false;
//       }
//     } else if (prop === "max") {
//       if (typeof schema.max !== "number") {
//         errors.push(`max expects value of type "number"`);
//         valid = false;
//         return;
//       }
//       if (data.length > schema.max) {
//         errors.push("maximum length is " + schema.max);
//         valid = false;
//       }
//     } else if (prop === "format") {
//       if (typeof schema.format !== "string") {
//         errors.push(`string.format expects value of type "string"`);
//         valid = false;
//         return;
//       }
//       valid = validateStringFormat(schema.format, data);
//     } else {
//       errors.push(`${prop} validation not supported on string`);
//     }
//   });

//   return valid;
// }

// function validateStringFormat(format, data) {
//   if (format === "email") {
//     if (
//       !data.match(
//         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//       )
//     ) {
//       errors.push(`${data} is not a valid email`);
//       return false;
//     }
//     return true;
//   }

//   errors.push(`"${format}" format not supported`);
//   return false;
// }

// function validateObject(schema, data) {
//   let valid = true;
//   Object.keys(schema).forEach((prop) => {
//     if (prop === "type") {
//       if (typeof data !== "object") {
//         errors.push(`type "object" expected got ${typeof data}`);
//         valid = false;
//       }
//     } else if (prop === "properties") {
//       const properties = schema.properties;
//       if (typeof properties !== "object") {
//         errors.push(
//           `"properties" should be an "object" got ${typeof properties}`
//         );
//         valid = false;
//         return;
//       }

//       Object.keys(properties).forEach((field) => {
//         if (typeof data[field] === "undefined") {
//           errors.push(`required field "${field}" not present`);
//           valid = false;
//         } else {
//           const subSchema = properties[field];
//           valid = validate(subSchema, data[field]) && valid;
//         }
//       });
//     } else errors.push(`${prop} not recognised`);
//   });
//   return valid;
// }

// // TODO: suppress errors collection during allOf and oneOf checks
// function allOfValidator(tests, data, context) {
//   if (!Array.isArray(tests)) {
//     errors.push(`"allOf" expects type array got "${typeof tests}"`);
//     return false;
//   }

//   const tempSchema = _.omit(context, "allOf");

//   for (let i = 0; i < tests.length; i++) {
//     const test = _.merge(tempSchema, tests[i]);
//     if (!validate(test, data)) {
//       errors.push(`failed "allOf" tests`);
//       return false;
//     }
//   }
//   return true;
// }

// function oneOfValidator(tests, data, context) {
//   if (!Array.isArray(tests)) {
//     errors.push(`"oneOf" expects type array got "${typeof tests}"`);
//     return false;
//   }

//   const tempSchema = _.omit(context, "oneOf");
//   for (let i = 0; i < tests.length; i++) {
//     const test = _.merge(tempSchema, tests[i]);
//     if (validate(test, data)) return true;
//   }
//   errors.push(`failed "oneOf" tests`);
//   return false;
// }

// function ifThenElseValidator(condition, schema1, schema2, context, data) {
//   if (!schema1 && !schema2) {
//     return true;
//   }

//   const tempSchema = _.omit(context, ["if"]);

//   const conditionCheck = _.merge(_.cloneDeep(tempSchema), condition);

//   const check = validate(conditionCheck, data);

//   if (check && schema1) {
//     const thenOmit = _.omit(tempSchema, ["then"]);
//     return validate(_.merge(thenOmit, schema1), data);
//   } else if (!check && schema2) {
//     const elseOmit = _.omit(tempSchema, ["else"]);
//     const res = validate(_.merge(elseOmit, schema2), data);
//     return res;
//   }

//   return true;
// }

// console.log(validate(schema, data), errors);

import Ajv from "ajv";

const schema1 = {
  maximum: 10,
  minimum: 2,
  allOf: [
    {
      minimum: 3,
    },
    {
      minimum: 6,
    },
  ],
};

const data1 = {
  hello: 4,
};

const ajv = new Ajv();

const validate = ajv.compile(schema1);

console.log(validate);

const valid = validate(data1);
if (!valid) console.log(validate.errors);
