import mongoose, { Schema, Model } from "mongoose";

export interface ISetting {
  key: string;
  value: string;
  updatedAt?: Date;
}

const SettingSchema = new Schema<ISetting>({
  key: { type: String, required: true },
  value: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);
