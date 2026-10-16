class DeletePropertyCategory {
  constructor(
    categoryRepository,
    storageService
  ) {
    this.categoryRepository =
      categoryRepository;

    this.storageService =
      storageService;
  }


  async execute(id) {
    const category =
      await this.categoryRepository
        .findById(id);


    if (!category) {
      throw new Error(
        "Category not found"
      );
    }


    if (category.imageKey) {
      await this.storageService
        .deleteImage(
          category.imageKey
        );
    }


    return await this.categoryRepository
      .delete(id);
  }
}


export default DeletePropertyCategory;