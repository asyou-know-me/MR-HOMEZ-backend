import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

import {
  s3Client,
  S3_BUCKET_NAME,
} from "./s3.js";


class S3StorageService {

  async uploadImage(
    folder,
    id,
    file
  ) {
    const safeName =
      file.originalname
        .replace(/\s+/g, "-")
        .replace(
          /[^a-zA-Z0-9.-]/g,
          ""
        );

    const key =
      `${folder}/${id}/${Date.now()}-${safeName}`;


    await s3Client.send(
      new PutObjectCommand({
        Bucket:
          S3_BUCKET_NAME,

        Key:
          key,

        Body:
          file.buffer,

        ContentType:
          file.mimetype,
      })
    );


    return key;
  }


  async uploadPropertyImage(
    propertyId,
    file
  ) {
    return await this.uploadImage(
      "properties",
      propertyId,
      file
    );
  }


  async uploadProjectImage(
    projectId,
    file
  ) {
    return await this.uploadImage(
      "projects",
      projectId,
      file
    );
  }


  async deleteImage(key) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket:
          S3_BUCKET_NAME,

        Key:
          key,
      })
    );
  }


  async getImageUrl(key) {
    return await getSignedUrl(
      s3Client,

      new GetObjectCommand({
        Bucket:
          S3_BUCKET_NAME,

        Key:
          key,
      }),

      {
        expiresIn:
          60 * 60,
      }
    );
  }
}


export default S3StorageService;