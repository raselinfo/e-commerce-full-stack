const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

// Save the production log
const accessLogStream = fs.createWriteStream(
  path.resolve("logs", "access.log"),
  { flags: "a" }
);

// Production log
const production = morgan(
  (tokens, req, res) => {
    return (
      JSON.stringify({
        method: tokens["method"](req, res),
        url: tokens["url"](req, res),
        status: tokens["status"](req, res),
        date: tokens["date"](req, res, "iso"),
        time: tokens["total-time"](req, res, 4),
        id: tokens["id"](req, res),
      }) + ";"
    );
  },
  { stream: accessLogStream }
);

// Development log
const development = ({ method, url, status, date, time, id, body, jwt }) => {
  return morgan((tokens, req, res) => {
    let str = `\n✨START✨✨✨✨✨✨✨\n`;
    if (method) {
      str += `🙋 Method    * ${tokens.method(req, res)}\n`;
    }
    if (url) {
      str += `🔗 URl       * ${tokens.url(req, res)}\n`;
    }
    if (status) {
      str += `📋 Status    * ${
        tokens.status(req, res) <= 400
          ? "✅" + tokens.status(req, res) + "✅"
          : "👿" + tokens.status(req, res) + "👿"
      }\n`;
    }
    if (date) {
      str += `📅 Date      * ${tokens
        .date(req, res, "iso")
        .slice(0, 19)
        .replace("T", " ")}\n`;
    }
    if (time) {
      str += `⏰ Time      * ${tokens["total-time"](req, res, 4) + "ms"}\n`;
    }
    if (id) {
      str += `🆔 ID        * ${tokens.id(req, res)}\n`;
    }
    if (body) {
      str += `💪 Body      * ${tokens.body(req, res).slice(0,221)}\n`;
    }
    if (jwt) {
      str += `👑 JWT       * ${tokens.token(req, res)}\n`;
    }
    str += `✨END✨✨✨✨✨✨✨✨\n`;
    return str;
  });
};

// Logger function
const logger = (app, data) => {
  let options = {
    method: true,
    url: true,
    status: true,
    date: true,
    time: true,
    id: true,
    body: true,
    jwt: true,
    ...data,
  };

  // Custom id formatter
  morgan.token("id", (req) => uuid());
  // Custom request body formatter
  morgan.token("body", (req, _res) => JSON.stringify(req.body));
  // Custom header authorization formatter
  morgan.token("token", (req) => req.headers.authorization);

  process.env.MODE === "development"
    ? app.use(development(options))
    : app.use(production);
};

module.exports = logger;
