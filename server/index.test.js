const genSaltAndHash = require('./helper/genSaltAndHash')
const app = require("./index");
const supertest = require("supertest");
const request = supertest(app);

test('test salt generation', () => {
    expect(typeof genSaltAndHash("password")).toBe("string")
});

it("test index", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World");
});

// it("test products", async () => {
//     const res = await request.get("/api/inventory");
//     expect(res.status).toBe(200);
// });

