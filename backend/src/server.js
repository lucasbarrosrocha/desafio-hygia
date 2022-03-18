const app = require("./app");

(() => {
  console.log(`Starting the server apps...`);
  app.listen(process.env.PORT, () => {
    console.log("App is running at " + process.env.PORT);
  });
})();
