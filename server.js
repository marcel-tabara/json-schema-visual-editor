const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const prettier = require("prettier");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const app = express();

app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https://jsonschema-visual-editor.herokuapp.com/"],
      styleSrc: [
        "'self'",
        "https://maxcdn.bootstrapcdn.com",
        "https://use.fontawesome.com",
        "'unsafe-inline'"
      ],
      connectSrc: [
        "'self'",
        "ws:",
        "https://jsonschema-visual-editor.herokuapp.com:5000/api/prettify"
      ]
    }
  })
);

app.use(express.static(path.join(__dirname, "dist/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.post("/api/prettify", (req, res) => {
  const opt = {
    useTabs: false,
    printWidth: 60,
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    bracketSpacing: false,
    jsxBracketSameLine: true,
    parser: `${req.body.parser}`,
    trailingComma: "none",
    arrowParens: "avoid",
    proseWrap: "preserve"
  };

  let formattedCode = "";
  try {
    formattedCode = prettier.format(req.body.code, opt);
  } catch (e) {
    console.log("console: error", e);
  }

  res.json(formattedCode);
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log("App is listening on port " + port);
