class DeleteProjectImage {
  constructor(
    projectImageRepository,
    storageService
  ) {
    this.projectImageRepository =
      projectImageRepository;

    this.storageService =
      storageService;
  }


  async execute(imageId) {
    const image =
      await this.projectImageRepository
        .findById(imageId);


    if (!image) {
      throw new Error(
        "Image not found"
      );
    }


    await this.storageService
      .deleteImage(
        image.imageKey
      );


    return await this.projectImageRepository
      .delete(imageId);
  }
}


export default DeleteProjectImage;  