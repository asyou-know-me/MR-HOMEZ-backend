class GetPropertyImages {
  constructor(propertyImageRepository, storageService) {
    this.propertyImageRepository = propertyImageRepository;
    this.storageService = storageService;
  }

  async execute(propertyId) {
    const images =
      await this.propertyImageRepository.findByPropertyId(propertyId);
    return await Promise.all(
      images.map(async (image) => {
        const imageUrl = await this.storageService.getImageUrl(image.imageKey);

        return {
          ...image,
          imageUrl,
        };
      }),
    );
  }
}

export default GetPropertyImages;