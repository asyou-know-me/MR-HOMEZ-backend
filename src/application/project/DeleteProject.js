class DeleteProject {
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


    for (const image of images) {
      await this.storageService
        .deleteImage(
          image.imageKey
        );
    }


    return await this.projectRepository
      .delete(id);
  }
}


export default DeleteProject;