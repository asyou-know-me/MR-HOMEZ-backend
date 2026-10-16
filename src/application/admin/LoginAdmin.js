import bcrypt
  from "bcryptjs";

import jwt
  from "jsonwebtoken";


class LoginAdmin {
  constructor(
    adminRepository
  ) {
    this.adminRepository =
      adminRepository;
  }


  async execute({
    email,
    password,
  }) {
    if (
      !email ||
      !password
    ) {
      throw new Error(
        "Email and password are required"
      );
    }


    const admin =
      await this.adminRepository
        .findByEmail(
          email.trim()
            .toLowerCase()
        );


    if (!admin) {
      throw new Error(
        "Invalid email or password"
      );
    }


    if (!admin.active) {
      throw new Error(
        "Admin account is inactive"
      );
    }


    const passwordMatches =
      await bcrypt.compare(
        password,
        admin.passwordHash
      );


    if (!passwordMatches) {
      throw new Error(
        "Invalid email or password"
      );
    }


    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is missing"
      );
    }


    const token =
      jwt.sign(
        {
          id:
            admin.id,

          email:
            admin.email,

          role:
            admin.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn:
            process.env.JWT_EXPIRES_IN ||
            "8h",
        }
      );


    return {
      token,

      admin: {
        id:
          admin.id,

        name:
          admin.name,

        email:
          admin.email,

        role:
          admin.role,
      },
    };
  }
}


export default LoginAdmin;