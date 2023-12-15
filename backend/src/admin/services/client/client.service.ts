import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Client.name)
        private clientModel: Model<Client>
    ) { }

    getAllStudents() {
        return this.clientModel.find({ instructor: false })
    }

    getAllINstructors() {
        return this.clientModel.find({ instructor: true })
    }


    // BlockClient(id: number) {

    // }

    // unBlockClient(id: number) {

    // }
}
