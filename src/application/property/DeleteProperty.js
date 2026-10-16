class DeleteProperty {
  constructor(propertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async execute(id) {
    const existingProperty = await this.propertyRepository.findById(id);

    if (!existingProperty) {
      throw new Error("Property not found");
    }

    return await this.propertyRepository.delete(id);
  }
}

export default DeleteProperty;
