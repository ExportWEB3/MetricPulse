import mongoose, { Schema, Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
  revokedTokens: string[]; // Store revoked token JTIs or hashes
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't return password by default
  },
  revokedTokens: {
    type: [String],
    default: [],
    select: false // Don't return by default for performance
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model<IUserModel>('User', UserSchema);

