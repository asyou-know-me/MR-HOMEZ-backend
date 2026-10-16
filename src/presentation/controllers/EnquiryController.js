class EnquiryController {
  constructor(enquiryRepository) {
    this.enquiryRepository = enquiryRepository;
  }

  create = async (req, res) => {
    try {
      const { name, email, phone, message, propertyId, projectId } = req.body;

      if (!name?.trim() || !phone?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name and phone number are required",
        });
      }

      if (!propertyId && !projectId) {
        return res.status(400).json({
          success: false,
          message: "Property or project reference is required",
        });
      }

      const enquiry = await this.enquiryRepository.create({
        name: name.trim(),

        email: email?.trim() || null,

        phone: phone.trim(),

        message: message?.trim() || null,

        propertyId: propertyId ? Number(propertyId) : null,

        projectId: projectId ? Number(projectId) : null,

        status: "new",
      });

      return res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully",
        data: enquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getAll = async (req, res) => {
    try {
      const enquiries = await this.enquiryRepository.findAll();

      return res.json({
        success: true,
        count: enquiries.length,
        data: enquiries,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  updateStatus = async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = ["new", "contacted", "qualified", "closed"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid enquiry status",
        });
      }

      const enquiry = await this.enquiryRepository.updateStatus(
        req.params.id,
        status,
      );

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: "Enquiry not found",
        });
      }

      return res.json({
        success: true,
        data: enquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const enquiry = await this.enquiryRepository.delete(req.params.id);

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: "Enquiry not found",
        });
      }

      return res.json({
        success: true,
        message: "Enquiry deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default EnquiryController;
