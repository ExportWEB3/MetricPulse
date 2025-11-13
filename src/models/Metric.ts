import mongoose, { Schema, Document } from 'mongoose';

export interface IMetricModel extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  mrr: number;
  users: number;
  churn: number;
  newUsers: number;
  revenue: number;
  uploadedAt: Date;
}

const MetricSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true
  },
  mrr: {
    type: Number,
    required: true,
    min: 0
  },
  users: {
    type: Number,
    required: true,
    min: 0
  },
  churn: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  newUsers: {
    type: Number,
    required: true,
    min: 0
  },
  revenue: {
    type: Number,
    required: true,
    min: 0
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for efficient queries
MetricSchema.index({ userId: 1, date: -1 });

export const Metric = mongoose.model<IMetricModel>('Metric', MetricSchema);
