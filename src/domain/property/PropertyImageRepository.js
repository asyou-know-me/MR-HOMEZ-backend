class PropertyImageRepository {
  async create(imageData) {
    throw new Error("create() not implemented");
  }

  async findByPropertyId(propertyId) {
    throw new Error(
      "findByPropertyId() not implemented"
    );
  }

  async findPrimaryByPropertyIds(propertyIds) {
    throw new Error(
      "findPrimaryByPropertyIds() not implemented"
    );
  }

  async findById(id) {
    throw new Error(
      "findById() not implemented"
    );
  }

  async delete(id) {
    throw new Error(
      "delete() not implemented"
    );
  }
}

export default PropertyImageRepository;