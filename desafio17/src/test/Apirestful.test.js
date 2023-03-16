// const request = require(`supertest`)(`http://localhost:8080/test/productos`);
// const expect = require(`chai`).expect;

import supertest from "supertest";
const request = supertest(`http://localhost:8080/api/productos`);
import { expect } from "chai";

//Test BDD:
describe(`Test api restful entregable 17 - productos`, () => {
  describe(`GET / `, () => {
    it(`Debería retornar status 200`, async () => {
      const response = await request.get(`/`);

      expect(response.status).to.eql(200);
    });

    it(`Debería retornar un arreglo`, async () => {
      const response = await request.get(`/`);

      expect(typeof response._body).to.eql(`object`);
    });
  });

  describe(`POST /`, () => {
    it(`Debería agregar un producto`, async () => {

      //no olvidar que el codigo debe ser distinto cada vez que se realiza el test
      const response = await request.post(`/`).send({
        title: `producto desde supertest / chai`,
        timestamp: new Date().toDateString(),
        price: 1234,
        description: `descripción desde supertest / chai`,
        code: `ats552`,
        image: `URL desde supertest / chai`,      
        stock: 35,
      });

      expect(response.status).to.equal(200);
    });
  });

  describe(`DELETE / `, () => {
    it(`Debería retornar status 200`, async () => {
      //Colocar id conocido de la DB
      const response = await request.delete(`/64127a707a74d942d4502912`);

      expect(response.status).to.eql(200);
    });
  });
});
