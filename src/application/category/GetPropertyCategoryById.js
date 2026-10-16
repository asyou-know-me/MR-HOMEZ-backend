class GetPropertyCategoryById {
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


    let imageUrl = null;


    if (category.imageKey) {
      imageUrl =
        await this.storageService
          .getImageUrl(
            category.imageKey
          );
    }


    return {
      ...category,
      imageUrl,
    };
  }
}


export default GetPropertyCategoryById;