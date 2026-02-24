const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    contract_number: { type: String, required: true, trim: true },
    sale_date: { type: Date, required: true },
    total_price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', trim: true },
    first_installment: { type: Number, default: 0, min: 0 },
    monthly_payment: { type: Number, default: 0, min: 0 },
    payment_duration_months: { type: Number, default: 12 },
    payment_frequency_months: { type: Number, default: 1 },
    payment_start_date: { type: Date },
    total_paid: { type: Number, default: 0, min: 0 },
    payment_method: { type: String, default: 'Cash', trim: true },
    contract_document_url: { type: String, trim: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'defaulted'],
      default: 'active',
    },
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

module.exports = mongoose.model('Sale', saleSchema);
