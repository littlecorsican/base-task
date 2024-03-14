const genSaltAndHash = require('./helper/genSaltAndHash')
const app = require("./index");
const supertest = require("supertest");
const request = supertest(app);
const jwtSignature = require('./helper/jwtSignature')
const role = require('./helper/role')
const create1000Products = require('./helper/create1000Products')

test('test salt generation', () => {
    expect(typeof genSaltAndHash("password")).toBe("string")
});

it("test index", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World");
});

it("test role", async () => {
    const endpoint = '/api/inventory' 
    const bool = await role({
        email: "root@root.com",
        method: "GET",
        endpoint
    })
    expect(bool).toBe(true);
});

it("test products unauth", async () => {
    const res = await request.get("/api/inventory");
    expect(res.status).toBe(401);
});

it("test dashboard unauth", async () => {
    const res = await request.get("/api/dashboard");
    expect(res.status).toBe(401);
});

it("test products auth", async () => {
    let data = { 
        time: new Date(), 
        email: "root@root@gmail.com",
        id: 1,
        permissions: [
            "view_product"
        ]
    }
    const token=jwtSignature(data)
    const res = await request
        .get("/api/inventory?limit=10&offset=0&sortBy=Date DESC&contains=")
        .set('Content-Type', "application/json")
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});


it("test individual product", async () => {
    let data = { 
        time: new Date(), 
        email: "root@root@gmail.com",
        id: 1,
        permissions: [
            "view_product"
        ]
    }
    const token=jwtSignature(data)
    const res = await request
        .get("/api/inventory/1")
        .set('Content-Type', "application/json")
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});


it("test seed 1000 products", async () => {
    const products = create1000Products()
    expect(products.length).toBe(1000);
});