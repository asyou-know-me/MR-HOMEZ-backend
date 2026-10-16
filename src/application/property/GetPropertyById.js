class GetPropertyById {
  constructor(propertyRepository, propertyImageRepository, storageService) {
    this.propertyRepository = propertyRepository;

    this.propertyImageRepository = propertyImageRepository;

    this.storageService = storageService;
  }

  async execute(id) {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new Error("Property not found");
    }

    const images = await this.propertyImageRepository.findByPropertyId(id);

    const imagesWithUrls = await Promise.all(
      images.map(async (image) => ({
        ...image,

        imageUrl: await this.storageService.getImageUrl(image.imageKey),
      })),
    );

    return {
      ...property,

      images: imagesWithUrls,
    };
  }
}

export default GetPropertyById;
