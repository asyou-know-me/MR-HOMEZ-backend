class AdminController {
  constructor({
    loginAdmin,
  }) {
    this.loginAdmin =
      loginAdmin;
  }


  login = async (
    req,
    res
  ) => {
    try {

      const result =
        await this.loginAdmin
          .execute(
            req.body
          );


      return res
        .status(200)
        .json({

          success: true,

          message:
            "Login successful",

          data:
            result,

        });

    } catch (error) {

      return res
        .status(401)
        .json({

          success: false,

          message:
            error.message,

        });

    }
  };
}


export default AdminController; 