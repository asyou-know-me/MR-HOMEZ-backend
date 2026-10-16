class UpdateProject {
  constructor(projectRepository) {
    this.projectRepository =
      projectRepository;
  }


  async execute(id, data) {
    const project =
      await this.projectRepository
        .findById(id);


    if (!project) {
      throw new Error(
        "Project not found"
      );
    }


    return await this.projectRepository
      .update(
        id,
        data
      );
  }
}


export default UpdateProject;