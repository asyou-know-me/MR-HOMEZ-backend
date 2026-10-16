class ProjectController {
  constructor({
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    uploadProjectImages,
    getProjectImages,
    deleteProjectImage,
  }) {
    this.createProject =
      createProject;

    this.getProjects =
      getProjects;

    this.getProjectById =
      getProjectById;

    this.updateProject =
      updateProject;

    this.deleteProject =
      deleteProject;

    this.uploadProjectImages =
      uploadProjectImages;

    this.getProjectImages =
      getProjectImages;

    this.deleteProjectImage =
      deleteProjectImage;
  }


  create = async (req, res) => {
    try {
      const project =
        await this.createProject
          .execute(req.body);

      return res
        .status(201)
        .json({
          success: true,
          data: project,
        });

    } catch (error) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  getAll = async (req, res) => {
    try {
      const projects =
        await this.getProjects
          .execute({
            search:
              req.query.search,

            city:
              req.query.city,

            projectType:
              req.query.projectType,

            launchStatus:
              req.query.launchStatus,

            featured:
              req.query.featured,

            status:
              req.query.status,
          });


      return res.json({
        success: true,

        count:
          projects.length,

        data:
          projects,
      });

    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  getById = async (req, res) => {
    try {
      const project =
        await this.getProjectById
          .execute(
            req.params.id
          );


      return res.json({
        success: true,
        data: project,
      });

    } catch (error) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  update = async (req, res) => {
    try {
      const project =
        await this.updateProject
          .execute(
            req.params.id,
            req.body
          );


      return res.json({
        success: true,
        data: project,
      });

    } catch (error) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  delete = async (req, res) => {
    try {
      const project =
        await this.deleteProject
          .execute(
            req.params.id
          );


      return res.json({
        success: true,
        message:
          "Project deleted successfully",
        data: project,
      });

    } catch (error) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  uploadImages = async (
    req,
    res
  ) => {
    try {
      const images =
        await this.uploadProjectImages
          .execute(
            req.params.id,
            req.files
          );


      return res
        .status(201)
        .json({
          success: true,
          data: images,
        });

    } catch (error) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  getImages = async (
    req,
    res
  ) => {
    try {
      const images =
        await this.getProjectImages
          .execute(
            req.params.id
          );


      return res.json({
        success: true,
        data: images,
      });

    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };


  deleteImage = async (
    req,
    res
  ) => {
    try {
      const image =
        await this.deleteProjectImage
          .execute(
            req.params.imageId
          );


      return res.json({
        success: true,
        message:
          "Image deleted successfully",
        data: image,
      });

    } catch (error) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };
}


export default ProjectController;