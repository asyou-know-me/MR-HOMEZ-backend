class GetProperties {
  constructor(
    propertyRepository,
    propertyImageRepository,
    storageService
  ) {
    this.propertyRepository =
      propertyRepository;

    this.propertyImageRepository =
      propertyImageRepository;

    this.storageService =
      storageService;
  }


  async execute(filters = {}) {

    /* =========================================
       GET PROPERTIES
    ========================================= */

    const properties =
      await this.propertyRepository
        .findAll(filters);


    if (
      !properties ||
      properties.length === 0
    ) {
      return [];
    }


    /* =========================================
       GET PROPERTY IDS
    ========================================= */

    const propertyIds =
      properties.map(
        (property) =>
          property.id
      );


    /* =========================================
       GET PRIMARY IMAGES
    ========================================= */

    const primaryImages =
      await this.propertyImageRepository
        .findPrimaryByPropertyIds(
          propertyIds
        );


    /* =========================================
       CREATE IMAGE MAP

       propertyId → image
    ========================================= */

    const imageMap =
      new Map();


    primaryImages.forEach(
      (image) => {

        imageMap.set(
          image.propertyId,
          image
        );

      }
    );


    /* =========================================
       ADD SIGNED IMAGE URL
    ========================================= */

    const propertiesWithImages =
      await Promise.all(

        properties.map(
          async (property) => {

            const primaryImage =
              imageMap.get(
                property.id
              );


            /*
              Property has no image
            */

            if (!primaryImage) {

              return {
                ...property,

                imageUrl: null,

                primaryImage: null,
              };

            }


            /*
              Generate temporary S3 URL
            */

            const imageUrl =
              await this.storageService
                .getImageUrl(
                  primaryImage.imageKey
                );


            return {
              ...property,

              imageUrl,

              primaryImage: {
                id:
                  primaryImage.id,

                imageKey:
                  primaryImage.imageKey,
              },
            };

          }
        )

      );


    return propertiesWithImages;
  }
}


export default GetProperties;