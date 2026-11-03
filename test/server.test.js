const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { server } = require("../server");

let baseUrl;

before(async () => {
    await new Promise((resolve) => {
        server.listen(0, "127.0.0.1", resolve);
    });

    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
});

test("GET / should return API status", async () => {
    const response = await fetch(`${baseUrl}/`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "Running");
});

test("GET /patients should return patient records", async () => {
    const response = await fetch(`${baseUrl}/patients`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(data));
});

test("POST /patients should register a valid patient", async () => {
    const response = await fetch(`${baseUrl}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Test Patient",
            age: 25,
            condition: "General Checkup"
        })
    });

    const data = await response.json();

    assert.equal(response.status, 201);
    assert.equal(data.patient.name, "Test Patient");
});

test("POST /patients should reject invalid patient information", async () => {
    const response = await fetch(`${baseUrl}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "A",
            age: 200,
            condition: "General Checkup"
        })
    });

    assert.equal(response.status, 400);
});

test("Unknown routes should return 404", async () => {
    const response = await fetch(`${baseUrl}/unknown`);

    assert.equal(response.status, 404);
});
