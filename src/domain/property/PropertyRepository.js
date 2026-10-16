class PropertyRepository{
    async create(propertyData) {
        throw new Error("create() not implemented");
    }

    async findAll(filters = {}) {
        throw new Error("findAll() not implemented");
    }

    async findById(id) {
        throw new Error("findById() is not implemented");
    }

    async update(id, propertyData){
        throw new Error("update() is not implemented");
    }

    async delete(id) {
        throw new Error("delete() is not implemented");
    }
}

export default PropertyRepository;