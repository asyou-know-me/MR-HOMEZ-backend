class CreateProperty {
  constructor(propertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async execute(propertyData) {
    const { title, price, city, propertyType, listingType } = propertyData;

    if (!title || !price || !city || !propertyType || !listingType) {
      throw new Error("Required values are missing.");
    }

    return await this.propertyRepository.create(propertyData);
  }
}

export default CreateProperty;
