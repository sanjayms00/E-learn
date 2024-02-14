import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoom } from './schema/chatRoom.schema';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Student } from 'src/student/schema/student.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { accessChat } from 'src/common/interfaces/chat.interface';

@Injectable()
export class MessagesService {


  constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) { }

  async accessChat(data: accessChat) {

    const { instructorId, studentId } = data

    const objInstructorId = new Types.ObjectId(instructorId)
    const objStudentId = new Types.ObjectId(studentId)

    //find chat
    let chat = await this.chatRoomModel.findOne({
      student: objStudentId,
      instructor: objInstructorId
    }).exec();

    //create new one if not exist
    if (!chat) {
      chat = await this.chatRoomModel.create({
        student: objStudentId,
        instructor: objInstructorId,
        messages: []
      });
    }

    chat = await chat.populate({
      path: 'student',
      select: 'fullName'
    })
    chat = await chat.populate({
      path: 'instructor',
      select: 'fullName'
    })

    if (chat.messages.length > 0) {
      chat = await chat.populate({
        path: 'messages',
        model: 'Message'
      });
    }

    return chat
  }


  async instructor(studentId: string) {

    const objStudentIdId = new Types.ObjectId(studentId)

    const instructors = await this.courseModel.aggregate([
      {
        $match: {
          students: {
            $elemMatch: {
              $eq: objStudentIdId
            }
          }
        }
      },
      {
        $lookup: {
          from: 'instructors',
          localField: 'instructorId',
          foreignField: '_id',
          as: 'instructorData'
        }
      },
      {
        $project: {
          _id: 0,
          id: { $arrayElemAt: ["$instructorData._id", 0] },
          fullName: { $arrayElemAt: ["$instructorData.fullName", 0] }
        }
      }

    ])

    return instructors
  }


  async studentChats(studentId: string) {

    const objStudentId = new Types.ObjectId(studentId)

    let chats = await this.chatRoomModel.find({
      student: objStudentId
    })
      .populate({
        path: 'instructor',
        select: 'fullName'
      })
      .populate({
        path: 'student',
        select: 'fullName'
      })
      .exec();

    return chats
  }


  async createMessage(createMessageDto: CreateMessageDto) {

    const { content, senderType, chatRoom, sender } = createMessageDto

    const message = await this.messageModel.create({
      sender,
      content,
      senderType,
      chatRoom
    })

    if (!message) {
      throw new HttpException('Failed to create message.', HttpStatus.BAD_REQUEST);
    }

    const objchatRoom = new Types.ObjectId(chatRoom)

    const addMessagetoRoom = await this.chatRoomModel.updateOne(
      { _id: objchatRoom },
      {
        $push: { messages: message._id }
      }
    )

    if (!addMessagetoRoom) {
      throw new HttpException('Failed to add message to the chat room.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return message
  }


  // async findAllChats() {
  //   //return the instructors list
  //   return await this.chatRoomModel.find().exec();
  // }

  async loadMessages(chatId: string) {

    const objChatId = new Types.ObjectId(chatId)

    let chat = await this.chatRoomModel
      .findOne(
        { _id: objChatId }
      )
      .populate("student", "fullName image")
      .populate("instructor", "fullName image")
      .populate({
        path: 'messages',
        model: 'Message'
      });

    return chat

  }

  // getClientByName(clientId: string) {
  //   // return this.clientToUser[clientId];
  // }

  // identify(name: string, clientId: string) {
  // this.clientToUser[clientId] = name

  // return Object.values(this.clientToUser)

  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }


  //instructor 

  async students(instructorId: string) {

    const objInstructorId = new Types.ObjectId(instructorId)

    const students = await this.courseModel.aggregate([
      {
        $match: {
          instructorId: objInstructorId
        }
      },
      {
        $unwind: "$students"
      },
      {
        $group: {
          _id: "$students"
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: '_id',
          as: 'studentsData'
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          fullName: { $arrayElemAt: ["$studentsData.fullName", 0] }
        }
      }
    ])

    return students

  }

  async instructorChats(instructorId: string) {

    const objInstructorId = new Types.ObjectId(instructorId)

    let chats = await this.chatRoomModel.find({
      instructor: objInstructorId
    })
      .populate({
        path: 'student',
        select: 'fullName'
      })
      .populate({
        path: 'instructor',
        select: 'fullName'
      })
      .exec();

    return chats

  }

}
