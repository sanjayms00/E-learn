
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Student } from '../schema/student.schema';
import { Model, Types } from 'mongoose';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class StudentMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>
  ) { }


  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    console.log("student middleware")
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_CLIENT);

        //find student blocked or not
        const studentId = new Types.ObjectId(decodedToken.id)
        const blockedStudent = await this.studentModel.findOne({ _id: studentId, status: true })

        if (!blockedStudent) {
          // User is blocked
          return res.status(401).json({ message: 'Unauthorized, user is blocked' });
        }

        next();
      } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      console.error('Token verification failed');
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
