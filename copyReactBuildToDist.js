/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const copydir = require("copy-dir");

copydir.sync("./src/renderer/dist", "./build/dist", {
  filter: function (stat, filepath, filename) {
    if (stat === "symbolicLink") {
      return false;
    }
    return true; // remind to return a true value when file check passed.
  },
});
