class CreatePropertyCategory {
  constructor(categoryRepository) {
    this.categoryRepository =
      categoryRepository;
  }


  async execute(data) {
    if (!data.name) {
      throw new Error(
        "Category name is required"
      );
    }

    return await this.categoryRepository
      .create(data);
  }
}


export default CreatePropertyCategory;