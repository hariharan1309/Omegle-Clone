// models/Room.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
    status: string;
  // Add other fields as needed
}

const RoomSchema: Schema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    // Add other fields as needed
  },
  {
    timestamps: true, // Optional: Add createdAt and updatedAt timestamps
  }
);

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
