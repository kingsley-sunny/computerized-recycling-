const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/database");
const routes = require("./routes/index");
const adminRoutes = require("./routes/adminRoutes");
const expressLayout = require("express-ejs-layouts");
const { isAdmin } = require("./middlewares/isAdmin");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayout);
app.set("layout", "./layout/layout");
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/admin", isAdmin, adminRoutes);
app.use("/", routes);

const PORT = 3456;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Client server running on port ${PORT}`));
});
