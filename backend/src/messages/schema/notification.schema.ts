import { SchemaFactory } from "@nestjs/mongoose";
import { Message } from "./message.schema";

export class Notification extends Message {

}

export const NotificationSchema = SchemaFactory.createForClass(Notification)