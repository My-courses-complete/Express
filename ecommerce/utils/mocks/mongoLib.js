const sinon = require("sinon");

const { productsMock, filteredProductsMock } = require("./products");

const getAllStub = sinon.stub();
const tagQuery = { tags: { $in: ["expensive"] } };

getAllStub.withArgs("products").resolves(productsMock);
getAllStub
  .withArgs("products", tagQuery)
  .resolves(filteredProductsMock("expensive"));

const createStub = sinon.stub().resolves("609718ff10022979ece9b7eb");

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
};
