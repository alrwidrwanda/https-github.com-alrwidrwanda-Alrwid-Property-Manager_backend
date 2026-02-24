const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    payment_date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', trim: true },
    payment_method: { type: String, default: 'Cash', trim: true },
    payment_type: {
      type: String,
      enum: ['advanced_payment', 'scheduled_payment', 'additional', 'final', 'monthly'],
      default: 'scheduled_payment',
    },
    reference_number: { type: String, trim: true },
    is_delayed: { type: Boolean, default: false },
    delay_days: { type: Number, default: 0, min: 0 },
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

module.exports = mongoose.model('Payment', paymentSchema);
