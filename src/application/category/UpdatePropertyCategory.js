class UpdatePropertyCategory {
  constructor(categoryRepository) {
    this.categoryRepository =
      categoryRepository;
  }


  async execute(id, data) {
    const existing =
      await this.categoryRepository
        .findById(id);


    if (!existing) {
      throw new Error(
        "Category not found"
      );
    }


    return await this.categoryRepository
      .update(
        id,
        data
      );
  }
}


export default UpdatePropertyCategory;