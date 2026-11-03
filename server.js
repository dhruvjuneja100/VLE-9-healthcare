const http = require("http");

const PORT = process.env.PORT || 3000;

// Dummy patient records only
const patients = [
  {
    id: 1,
    name: "Patient One",
    age: 30,
    condition: "General Checkup"
  }
];

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Cross-Origin-Resource-Policy": "same-origin",
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Cache-Control": "no-store"
  });

  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {
    return sendResponse(res, 200, {
      message: "Healthcare Management API",
      status: "Running"
    });
  }

  if (req.method === "GET" && req.url === "/patients") {
    return sendResponse(res, 200, patients);
  }

  if (req.method === "POST" && req.url === "/patients") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;

      if (body.length > 10000) {
        req.destroy();
      }
    });

    req.on("end", () => {

      try {
        const patient = JSON.parse(body);

        if (
          typeof patient.name !== "string" ||
          patient.name.trim().length < 2 ||
          patient.name.trim().length > 100 ||
          !Number.isInteger(patient.age) ||
          patient.age < 0 ||
          patient.age > 120 ||
          typeof patient.condition !== "string" ||
          patient.condition.trim().length < 2 ||
          patient.condition.trim().length > 100
        ) {
          return sendResponse(res, 400, {
            error: "Invalid patient information"
          });
        }

        const newPatient = {
          id: patients.length + 1,
          name: patient.name.trim(),
          age: patient.age,
          condition: patient.condition.trim()
        };

        patients.push(newPatient);

        return sendResponse(res, 201, {
          message: "Patient registered successfully",
          patient: newPatient
        });

      } catch {
        return sendResponse(res, 400, {
          error: "Invalid JSON request"
        });
      }
    });

    return;
  }

  sendResponse(res, 404, {
    error: "Endpoint not found"
  });
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Healthcare application running on port ${PORT}`);
  });
}

module.exports = { server, patients };
