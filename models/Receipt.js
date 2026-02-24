const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema(
  {
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    receipt_url: { type: String, trim: true },
    file_url: { type: String, trim: true },
    file_type: { type: String, trim: true },
    status: { type: String, enum: ['available', 'pending'], default: 'available' },
    upload_date: { type: Date },
    notes: { type: String, trim: true },
  },
  {
    timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' },
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Receipt', receiptSchema);
