// const { Schema } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (e) {
    const status = 422;
    const message = "fill the form";
    const extradetails = e.errors[0].message;
    const error = {
      status,
      message,
      extradetails,
    };
    console.log(error);
    next(error);

    // res.status(400).json({ message: error.errors[0].message });
  }
};

module.exports = validate;
