class UpdateProperty {
  constructor(propertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async execute(id, propertyData) {
    const existingProperty = await this.propertyRepository.findById(id);

    if (!existingProperty) {
      throw new Error("Property not found");
    }

    return await this.propertyRepository.update(id, propertyData);
  }
}

export default UpdateProperty;
