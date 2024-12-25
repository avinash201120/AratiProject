import mongoose, { Schema, Types, Model } from "mongoose";

export interface IMessage {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  createdAt?: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
