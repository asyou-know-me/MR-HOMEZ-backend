class UploadPropertyImages {
  constructor(propertyRepository, propertyImageRepository, storageService) {
    this.propertyRepository = propertyRepository;
    this.propertyImageRepository = propertyImageRepository;
    this.storageService = storageService;
  }
  async execute(propertyId, files) {
    /* CHECK PROPERTY */

    const property = await this.propertyRepository.findById(propertyId);

    if (!property) {
      throw new Error("property not found");
    }

    if (!files || files.length === 0) {
      throw new Error("Please select at least one image");
    }

    /* EXISTING IMAGES */
    const existingImages =
      await this.propertyImageRepository.findByPropertyId(propertyId);

    const uploadedImages = [];

    /* UPLOAD EACH IMAGE */

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const imageKey = await this.storageService.uploadPropertyImage(
        propertyId,
        file,
      );

      const image = await this.propertyImageRepository.create({
        propertyId: Number(propertyId),
        imageKey,

        isPrimary: existingImages.length === 0 && i === 0,

        displayOrder: existingImages.length + i,
      });

      uploadedImages.push(image);
    }

    return uploadedImages;
  }
}

export default UploadPropertyImages;
