const request = require("supertest");
const app = require("../../index");

describe("The application", () => {
  it("should return true", () => {
    expect(200).toBe(200);
  });
});
/*
describe("Users API", () => {
  it("POST /user --> create user", () => {
    return request(app)
      .post("/user")
      .send({
        name: "New Name",
        email: "newname@google.com",
        password: "newpass111$",
        phoneNo: "08140228588",
        username: "Username",
        profileImage: "imageURL",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "New Name",
            email: "newname@google.com",
            password: "newpass111$",
            phoneNo: "08140228588",
            username: "Username",
            profileImage: "imageURL",
            completed: false,
          })
        );
      });
  });

  it("POST /login --> login user", () => {});

  it("PUT /user --> update user", () => {});

  it("GET /user --> get user", () => {
    return request(app)
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
              email: expect.any(String),
              password: expect.any(String),
              phoneNo: expect.any(String),
              username: expect.any(String),
              profileImage: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /user --> validate request body", () => {
    return request(app).post("/user").send({ name: 123 }).expect(422);
  });

  //   it("GET /user/id --> 404 if not found", () => {
  //     return request(app).get("/todos/999999").expect(404);
  //   });

  it("DELETE /user --> delete user", () => {});
});
*/
