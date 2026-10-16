class DeletePropertyImage {
  constructor(propertyImageRepository, storageService) {
    this.propertyImageRepository = propertyImageRepository;
    this.storageService = storageService;
  }

  async execute(imageId) {
    const image = await this.propertyImageRepository.findById(imageId);

    if (!image) {
      throw new Error("Image not found");
    }

    /* DELETE FROM S3 */

    await this.storageService.deleteImage(image.imageKey);

    /* DELETE DB RECORD */

    return await this.propertyImageRepository.delete(imageId);
  }
}

export default DeletePropertyImage;