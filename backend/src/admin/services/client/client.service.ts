import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Client.name)
        private clientModel: Model<Client>
    ) { }

    async getAllStudents() {
        return await this.clientModel.find({ instructor: false }, { password: 0, __v: 0 })
    }

    async getAllInstructors() {
        return await this.clientModel.find({ instructor: true }, { password: 0, __v: 0 })
    }

    async changeStatus(data: { id: string, status: boolean }) {
        try {
            const result = await this.clientModel.updateOne(
                { _id: data.id },
                {
                    $set: {
                        status: data.status
                    }
                }
            );

            console.log(result)
            if (!result) {
                throw new HttpException("Document not found or status unchanged", HttpStatus.NOT_FOUND);
            }

            return { status: "updated" };
        } catch (error) {
            console.log(error.message)
            throw new HttpException("Failed to update status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
