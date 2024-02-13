import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoom } from './schema/chatRoom.schema';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Student } from 'src/student/schema/student.schema';

@Injectable()
export class MessagesService {


  constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) { }

  accessChat(userId: string) {
    // this.chatModel.find({
    //   isGroupChat: false,
    //   $and: [{
    //     users: {
    //       $ElemMatch: { $eq:  }
    //     }
    //   }]
    // })
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    console.log(createMessageDto)
    this.messageModel.create({

    })
  }

  async findAllInstructors(studentId: string) {
    //return the instructors list

    const studentChats = await this.studentModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(studentId) }
      },
      {
        $lookup: {
          from: "courses",
          localField: "courses.courseId",
          foreignField: "_id",
          as: "courseData"
        }
      },
      {
        $unwind: "$courseData"
      },
      {
        $lookup: {
          from: "instructors",
          localField: "courseData.instructorId",
          foreignField: "_id",
          as: "instructorData"
        }
      },
      {
        $group: {
          _id: "$instructorData._id",
          instructorName: { $first: { $arrayElemAt: ["$instructorData.fullName", 0] } },
          fullName: { $first: "$fullName" },
          image: { $first: "$image" },
          studentId: { $first: "$_id" }
        }
      },
      {
        $project: {
          _id: { $arrayElemAt: ["$_id", 0] },
          instructorName: 1,
          fullName: 1,
          image: 1,
          studentId: 1
        }
      }
    ]);

    return studentChats

  }

  async findAllChats() {
    //return the instructors list
    return await this.chatRoomModel.find().exec();
  }

  async findAllMessages(chatId: string) {
    const query = chatId ? { chat: chatId } : {};
    return this.messageModel.find(query).exec();
  }

  getClientByName(clientId: string) {
    // return this.clientToUser[clientId];
  }

  identify(name: string, clientId: string) {
    // this.clientToUser[clientId] = name

    // return Object.values(this.clientToUser)

  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
