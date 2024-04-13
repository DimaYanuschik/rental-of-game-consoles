import jwt from "jsonwebtoken";

export const checkAuth = (request, response, next) => {
  const token = (request.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      request.userId = decoded.id;

      next();
    } catch (error) {
      return response.json({
        message: "Нет доступа",
      });
    }
  } else {
    return response.json({
      message: "Нет доступа",
    });
  }
};
