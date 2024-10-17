const { z } = require("zod");

const signupshema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 chars" })
    .max(255, { message: "Name must not be more than 255 chars" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "invalid email" })
    .min(3, { message: "Email must be atleast 3 chars" })
    .max(255, { message: "Email must not be more than 255 chars" }),
  phone: z
    .string({ required_error: "Phone no is required" })
    .trim()
    .min(10, { message: "Phone no must be atleast 10 chars" })
    .max(20, { message: "Phone no must not be more than 20 chars" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleast 7 chars" })
    .max(1024, { message: "Password must not be more than 1024 chars" }),
});

const loginshema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "invalid email" })
    .min(3, { message: "Email must be atleast 3 chars" })
    .max(255, { message: "Email must not be more than 255 chars" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be atleast 7 chars" })
    .max(1024, { message: "Password must not be more than 1024 chars" }),
});

module.exports = { signupshema, loginshema };
