class UploadProjectImages {
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


  async execute(
    projectId,
    files
  ) {
    const project =
      await this.projectRepository
        .findById(projectId);


    if (!project) {
      throw new Error(
        "Project not found"
      );
    }


    if (!files?.length) {
      throw new Error(
        "Please select at least one image"
      );
    }


    const existing =
      await this.projectImageRepository
        .findByProjectId(
          projectId
        );


    const result = [];


    for (
      let i = 0;
      i < files.length;
      i++
    ) {
      const imageKey =
        await this.storageService
          .uploadProjectImage(
            projectId,
            files[i]
          );


      const image =
        await this.projectImageRepository
          .create({
            projectId:
              Number(projectId),

            imageKey,

            isPrimary:
              existing.length === 0 &&
              i === 0,

            displayOrder:
              existing.length +
              i,
          });


      result.push(image);
    }


    return result;
  }
}


export default UploadProjectImages;