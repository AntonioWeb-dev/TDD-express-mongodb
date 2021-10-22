import { NextFunction, Request, Response } from 'express';
import { SendEmail } from '../infra/aws/services/SES/Ses.send-email';
import { GetTemplates } from '../utils/GetPath';
import { UploadImage } from '../infra/aws/services/S3/uploadImage';
import { deleteImage } from '../infra/aws/services/S3/deleteImage';
import MulterConfig from '../utils/Multer';

import { IUserService } from '../interfaces/IUser/userService.interface';
import { IUser } from '../interfaces/IUser/user.interface';
import { IS3Service } from '../interfaces/s3.interface';
/**
 * @class UserController
 * @desc Responsible to handle with requests meda to API - endpoint: /users
 **/

export class UserController {
  private userService: IUserService;
  private S3: IS3Service;

  constructor(userService: IUserService, S3: IS3Service) {
    this.userService = userService;
    this.S3 = S3;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.index();
      return res.json(users);
    } catch (err) {
      next(err)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    if (req.params.id === req.user_id) {
      return res.status(403).json({});
    }
    try {
      const user = await this.userService.show(req.params.id);
      return res.json(user);
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = JSON.parse(req.body['body']);
    const file = req.file;

    let avatarURL: string | undefined;
    let newUser: IUser;
    if (file != null) {
      avatarURL = await UploadImage(this.S3, MulterConfig.directory, file.filename)
    }
    try {
      newUser = await this.userService.create({ name, email, avatar: avatarURL, password })
      // Get template html, params is the file's name without *.html
      const template = await GetTemplates('CreateAcount');
      const emailService = new SendEmail("Conta criada", template);
      emailService.send([newUser.email])

      return res.json(newUser);
    } catch (err) {
      if (file != null && typeof (avatarURL) == 'string') {
        await deleteImage(this.S3, avatarURL)
      }
      next(err);
    }
  }

  async updateImage(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    let avatarURL: string | undefined;
    if (file != null) {
      avatarURL = await UploadImage(this.S3, MulterConfig.directory, file.filename)
    }
    try {
      const user = await this.userService.updateAvatar(req.user_id, avatarURL)
      return res.json(user);
    } catch (err) {
      if (file != null && typeof (avatarURL) == 'string') {
        await deleteImage(this.S3, avatarURL)
      }
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    // if (id !== req.user_id) {
    //   return res.status(403).json({});
    // }
    let isDeleted;
    try {
      isDeleted = await this.userService.delete(id);
      if (isDeleted.avatar && isDeleted.avatar !== "undefined") {
        await deleteImage(this.S3, isDeleted.avatar)
      }
    } catch (err) {
      next(err);
    }
    return res.json(isDeleted);
  }
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (id !== req.user_id) {
      return res.status(403).json({});
    }
    let userUpdated;
    try {
      userUpdated = await this.userService.update(id, req.body);
    } catch (err) {
      next(err);
    }
    return res.json(userUpdated);
  }
}
