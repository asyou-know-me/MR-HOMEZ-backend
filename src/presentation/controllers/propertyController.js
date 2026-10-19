class PropertyController {
  constructor({
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    uploadPropertyImages,
    getPropertyImages,
    deletePropertyImage,
  }) {
    this.createProperty = createProperty;

    this.getProperties = getProperties;

    this.getPropertyById = getPropertyById;

    this.updateProperty = updateProperty;

    this.deleteProperty = deleteProperty;

    this.uploadPropertyImages = uploadPropertyImages;

    this.getPropertyImages = getPropertyImages;

    this.deletePropertyImage = deletePropertyImage;
  }
  /* CREATE PROPERTY */

  create = async (req, res) => {
    try {
      const property = await this.createProperty.execute(req.body);
      res.status(201).json({
        success: true,
        message: "Property created successfully",
        data: property,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getAll = async (req, res) => {
    try {
      const filters = {
        search: req.query.search,

        city: req.query.city,

        propertyType: req.query.propertyType,

        listingType: req.query.listingType,

        featured: req.query.featured,

        status: req.query.status,
      };

      const properties = await this.getProperties.execute(filters);

      return res.status(200).json({
        success: true,

        count: properties.length,

        filters,

        data: properties,
      });
    } catch (error) {
      console.error("Get properties error:", error);

      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const property = await this.getPropertyById.execute(req.params.id);

      res.status(200).json({
        success: true,
        data: property,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  update = async (req, res) => {
    try {
      const property = await this.updateProperty.execute(
        req.params.id,
        req.body,
      );

      res.status(200).json({
        success: true,
        message: "Property updated successfully",
        data: property,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const property = await this.deleteProperty.execute(req.params.id);

      res.status(200).json({
        success: true,
        message: "Property deleted successfully",
        data: property,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  /* IMAGES CONTROLLER SECTION */

  uploadImages = async (req, res) => {
    try {
      const images = await this.uploadPropertyImages.execute(
        req.params.id,
        req.files,
      );

      return res.status(201).json({
        success: true,

        message: "Images uploaded successfully",

        data: images,
      });
    } catch (error) {
      console.error("Upload image error:", error);

      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }
  };

  getImages = async (req, res) => {
    try {
      const images = await this.getPropertyImages.execute(req.params.id);

      return res.status(200).json({
        success: true,

        count: images.length,

        data: images,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

  deleteImage = async (req, res) => {
    try {
      const image = await this.deletePropertyImage.execute(req.params.imageId);

      return res.status(200).json({
        success: true,

        message: "Image deleted successfully",

        data: image,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,

        message: error.message,
      });
    }
  };
}

export default PropertyController;
