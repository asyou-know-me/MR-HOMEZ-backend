class GetPropertyCategories {
  constructor(
    categoryRepository,
    storageService
  ) {
    this.categoryRepository =
      categoryRepository;

    this.storageService =
      storageService;
  }


  async execute(filters = {}) {
    const categories =
      await this.categoryRepository
        .findAll(filters);


    return await Promise.all(

      categories.map(
        async (category) => {

          if (!category.imageKey) {
            return {
              ...category,
              imageUrl: null,
            };
          }


          const imageUrl =
            await this.storageService
              .getImageUrl(
                category.imageKey
              );


          return {
            ...category,
            imageUrl,
          };
        }
      )

    );
  }
}


export default GetPropertyCategories;