class UploadCategoryImage {
  constructor(
    categoryRepository,
    storageService
  ) {
    this.categoryRepository =
      categoryRepository;

    this.storageService =
      storageService;
  }


  async execute(
    categoryId,
    file
  ) {
    const category =
      await this.categoryRepository
        .findById(categoryId);


    if (!category) {
      throw new Error(
        "Category not found"
      );
    }


    if (!file) {
      throw new Error(
        "Please select an image"
      );
    }


    /*
      Delete old S3 image if one exists
    */

    if (category.imageKey) {
      await this.storageService
        .deleteImage(
          category.imageKey
        );
    }


    /*
      Upload new image
    */

    const imageKey =
      await this.storageService
        .uploadImage(
          "categories",
          categoryId,
          file
        );


    /*
      Save new key in Neon
    */

    return await this.categoryRepository
      .update(
        categoryId,
        {
          imageKey,
        }
      );
  }
}


export default UploadCategoryImage;