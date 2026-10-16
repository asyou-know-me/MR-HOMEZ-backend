class CreateProject {
  constructor(projectRepository) {
    this.projectRepository =
      projectRepository;
  }


  async execute(data) {
    if (
      !data.name ||
      !data.city ||
      !data.projectType
    ) {
      throw new Error(
        "Name, city and project type are required"
      );
    }

    return await this.projectRepository
      .create(data);
  }
}


export default CreateProject;