import * as yup from "yup";

export const validate = (schema) => {
  // it will be use as middleware
  return async (req, res, next) => {
    // check if the body is missing
    if (!req.body) return res.json({ error: "Empty body is not accepted" });

    const schemaToValidate = yup.object({
      body: schema,
    });
    try {
      await schemaToValidate.validate(
        {
          body: req.body,
        },
        {
          abortEarly: true,
        }
      );

      next();
    } catch (error) {
      if (error) {
        res.status(422).json({ error: error, status: req.body });
      }
    }
  };
};
