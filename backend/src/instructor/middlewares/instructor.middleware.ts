
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Instructor } from '../schema/instructor.schema';
import { Model, Types } from 'mongoose';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class InstructorMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(Instructor.name)
    private instructorModel: Model<Instructor>
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {

    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_INSTRUCTOR);

        //find student blocked or not
        const instructorId = new Types.ObjectId(decodedToken.id)
        const blockedStudent = await this.instructorModel.findOne({ _id: instructorId, status: true })
        console.log("instructor middleware")
        if (!blockedStudent) {
          return res.status(401).json({ message: 'Unauthorized, user is blocked' });
        }

        next();
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
