import mongoose, { Schema, Document } from 'mongoose';

export interface IInsightModel extends Document {
  userId: mongoose.Types.ObjectId;
  insights: Array<{
    title: string;
    description: string;
    severity: 'success' | 'warning' | 'info';
  }>;
  generatedAt: Date;
}

const InsightSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  insights: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      severity: {
        type: String,
        enum: ['success', 'warning', 'info'],
        required: true
      }
    }
  ],
  generatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Insight = mongoose.model<IInsightModel>('Insight', InsightSchema);
