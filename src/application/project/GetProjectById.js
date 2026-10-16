class GetProjectById {
  constructor(
    projectRepository,
    projectImageRepository,
    storageService
  ) {
    this.projectRepository =
      projectRepository;

    this.projectImageRepository =
      projectImageRepository;

    this.storageService =
      storageService;
  }


  async execute(id) {
    const project =
      await this.projectRepository
        .findById(id);


    if (!project) {
      throw new Error(
        "Project not found"
      );
    }


    const images =
      await this.projectImageRepository
        .findByProjectId(id);


    const imagesWithUrls =
      await Promise.all(
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


    return {
      ...project,
      images:
        imagesWithUrls,
    };
  }
}


export default GetProjectById;