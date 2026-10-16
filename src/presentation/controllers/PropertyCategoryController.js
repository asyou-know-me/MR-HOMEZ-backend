class PropertyCategoryController {
  constructor({
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
  }) {
    this.createCategory =
      createCategory;

    this.getCategories =
      getCategories;

    this.getCategoryById =
      getCategoryById;

    this.updateCategory =
      updateCategory;

    this.deleteCategory =
      deleteCategory;

    this.uploadCategoryImage =
      uploadCategoryImage;
  }


  create = async (
    req,
    res
  ) => {
    try {
      const category =
        await this.createCategory
          .execute(req.body);


      return res
        .status(201)
        .json({
          success: true,

          message:
            "Category created successfully",

          data:
            category,
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


  getAll = async (
    req,
    res
  ) => {
    try {
      const categories =
        await this.getCategories
          .execute({
            active:
              req.query.active,
          });


      return res.json({
        success: true,

        count:
          categories.length,

        data:
          categories,
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


  getById = async (
    req,
    res
  ) => {
    try {
      const category =
        await this.getCategoryById
          .execute(
            req.params.id
          );


      return res.json({
        success: true,
        data: category,
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


  update = async (
    req,
    res
  ) => {
    try {
      const category =
        await this.updateCategory
          .execute(
            req.params.id,
            req.body
          );


      return res.json({
        success: true,

        message:
          "Category updated successfully",

        data:
          category,
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


  delete = async (
    req,
    res
  ) => {
    try {
      const category =
        await this.deleteCategory
          .execute(
            req.params.id
          );


      return res.json({
        success: true,

        message:
          "Category deleted successfully",

        data:
          category,
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


  uploadImage = async (
    req,
    res
  ) => {
    try {
      const category =
        await this.uploadCategoryImage
          .execute(
            req.params.id,
            req.file
          );


      return res
        .status(200)
        .json({
          success: true,

          message:
            "Category image updated successfully",

          data:
            category,
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
}


export default PropertyCategoryController;