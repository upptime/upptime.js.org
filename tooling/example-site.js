const { execSync } = require("child_process");

execSync(
  `git clone --single-branch --branch gh-pages https://github.com/upptime/upptime status`,
  {
    stdio: "ignore",
  }
);

execSync("cp -r status build", {
  stdio: "ignore",
});

execSync("rm -rf build/status/.git", {
  stdio: "ignore",
});
