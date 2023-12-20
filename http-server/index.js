const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv);

let homepage = "";
let projectpage = "";
let registrationpage = "";

fs.readFile("home.html", (err, home) => {
  if (err) throw err;
  homepage= home;
});

fs.readFile("project.html", (err, project) => {
  if (err) throw err;
  projectpage = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) throw err;
  registrationpage = registration;
});

const server = http.createServer((request, response) => {
  const url = request.url;
  response.writeHead(200, { "Content-Type": "text/html" });

  switch (url) {
    case "/project":
      response.write(projectpage);
      break;
    case "/registration":
      response.write(registrationpage);
      break;
    default:
      response.write(homepage
      );
  }

  response.end();
});

server.listen(args.port);