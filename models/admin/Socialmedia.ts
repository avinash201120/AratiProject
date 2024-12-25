import mongoose, { Schema, Model } from "mongoose";
export interface ISocialMedia {
  platform: string;
  link: string;
  updatedAt?: Date;
}

const SocialMediaSchema = new Schema<ISocialMedia>({
  platform: { type: String, required: true },
  link: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const SocialMedia: Model<ISocialMedia> =
  mongoose.models.SocialMedia ||
  mongoose.model<ISocialMedia>("SocialMedia", SocialMediaSchema);
