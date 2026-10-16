class GetProjects {
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


  async execute(filters = {}) {
    const projects =
      await this.projectRepository
        .findAll(filters);


    if (!projects.length) {
      return [];
    }


    const ids =
      projects.map(
        (project) =>
          project.id
      );


    const images =
      await this.projectImageRepository
        .findPrimaryByProjectIds(
          ids
        );


    const imageMap =
      new Map();


    images.forEach((image) => {
      imageMap.set(
        image.projectId,
        image
      );
    });


    return await Promise.all(
      projects.map(
        async (project) => {

          const image =
            imageMap.get(
              project.id
            );


          if (!image) {
            return {
              ...project,
              imageUrl: null,
            };
          }


          const imageUrl =
            await this.storageService
              .getImageUrl(
                image.imageKey
              );


          return {
            ...project,
            imageUrl,
          };
        }
      )
    );
  }
}


export default GetProjects;