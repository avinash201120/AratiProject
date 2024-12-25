import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User document
interface IUser extends Document {
  email: string;
  password?: string; // Optional for OAuth users
  provider: "email" | "google" | "facebook";
  providerId?: string; // For OAuth users
  name: string; // Full name of the user
  firstName?: string; // User's first name
  lastName?: string; // User's last name
  role?: "admin" | "student" | "merchant" | "promoter" | "citizen"; // User role

  status: "active" | "inactive" | "pending"; // Account status
  deactivationReason?: string; // Reason for deactivation (if applicable)
  deactivatedAt?: Date; // Timestamp of account deactivation

  isVerified: boolean; // Whether the user has verified their email
  verificationToken?: string; // Token for email verification

  resetPasswordToken?: string; // Token for password reset
  resetPasswordExpires?: Date; // Expiry time for reset token

  school?: string; // School name for students
  schoolCategory?: string; // School category for students
  country?: string; // Country of the user
  town?: string; // Town of the user

  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}

// Define the schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "email"; // Required only for email-based users
      },
    },
    provider: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
    providerId: {
      type: String,
      default: null, // For OAuth users
    },
    name: {
      type: String,
    },
    firstName: {
      type: String,
      default: null, // Optional field for first name
    },
    lastName: {
      type: String,
      default: null, // Optional field for last name
    },
    role: {
      type: String,
      enum: ["admin", "student", "merchant", "promoter", "citizen"],
      default: "citizen", // Default role
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    deactivationReason: {
      type: String,
      default: null, // Only used if the user is inactive
    },
    deactivatedAt: {
      type: Date,
      default: null, // Only used if the user is inactive
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    school: {
      type: String,
      required: function (this: IUser) {
        return this.role === "student";
      },
      default: null,
    },
    schoolCategory: {
      type: String,
      required: function (this: IUser) {
        return this.role === "student";
      },
      default: null,
    },
    country: {
      type: String,
      default: "",
    },
    town: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id; // Map `_id` to `id`
        delete ret._id; // Remove `_id`
        delete ret.__v; // Remove Mongoose version key
        delete ret.password; // Do not expose the password in responses
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Export the model
export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

//og
// import mongoose, { Document, Schema } from "mongoose";

// // Define the interface for the User document
// interface IUser extends Document {
//   //   username?: string; // Optional for OAuth users
//   email: string;
//   password?: string; // Optional for OAuth users
//   provider: "email" | "google" | "facebook";
//   providerId?: string; // For OAuth users
//   name: string; // Full name of the user
//   role?: "admin" | "student" | "merchant" | "promoter" | "citizen"; // User role

//   status: "active" | "inactive" | "pending"; // Account status
//   deactivationReason?: string; // Reason for deactivation (if applicable)
//   deactivatedAt?: Date; // Timestamp of account deactivation

//   isVerified: boolean; // Whether the user has verified their email
//   verificationToken?: string; // Token for email verification

//   resetPasswordToken?: string; // Token for password reset
//   resetPasswordExpires?: Date; // Expiry time for reset token

//   createdAt: Date; // Creation timestamp
//   updatedAt: Date; // Last update timestamp
// }

// // Define the schema
// const UserSchema = new Schema<IUser>(
//   {
//     // username: {
//     //   type: String,
//     //   default: null, // Optional for OAuth users
//     // },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: function (this: IUser) {
//         return this.provider === "email"; // Required only for email-based users
//       },
//     },
//     provider: {
//       type: String,
//       enum: ["email", "google", "facebook"],
//       default: "email",
//     },
//     providerId: {
//       type: String,
//       default: null, // For OAuth users
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["admin", "student", "merchant", "promoter", "ecoCitizen"],
//       default: null, // Role will be set by admin
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive", "pending"],
//       default: "pending",
//     },
//     deactivationReason: {
//       type: String,
//       default: null, // Only used if the user is inactive
//     },
//     deactivatedAt: {
//       type: Date,
//       default: null, // Only used if the user is inactive
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     verificationToken: {
//       type: String,
//       default: null,
//     },
//     resetPasswordToken: {
//       type: String,
//       default: null,
//     },
//     resetPasswordExpires: {
//       type: Date,
//       default: null,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt automatically
//     toJSON: {
//       virtuals: true,
//       transform: (doc, ret) => {
//         ret.id = ret._id; // Map `_id` to `id`
//         delete ret._id; // Remove `_id`
//         delete ret.__v; // Remove Mongoose version key
//         delete ret.password; // Do not expose the password in responses
//       },
//     },
//     toObject: {
//       virtuals: true,
//     },
//   }
// );

// // Export the model
// export default mongoose.models.User ||
//   mongoose.model<IUser>("User", UserSchema);
