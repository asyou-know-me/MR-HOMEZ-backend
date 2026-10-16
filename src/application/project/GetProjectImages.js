class GetProjectImages {
  constructor(
    projectImageRepository,
    storageService
  ) {
    this.projectImageRepository =
      projectImageRepository;

    this.storageService =
      storageService;
  }


  async execute(projectId) {
    const images =
      await this.projectImageRepository
        .findByProjectId(
          projectId
        );


    return await Promise.all(
      images.map(
        async (image) => ({
          ...image,

          imageUrl:
            await this.storageService
              .getImageUrl(
                image.imageKey
              ),
        })
      )
    );
  }
}


export default GetProjectImages;