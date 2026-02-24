const mongoose = require('mongoose');

const defaultedSaleSchema = new mongoose.Schema(
  {
    original_sale_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    contract_number: { type: String, trim: true },
    contract_document_url: { type: String, trim: true },
    sale_date: { type: Date },
    defaulted_date: { type: Date, required: true },
    total_price: { type: Number },
    currency: { type: String, trim: true },
    first_installment: { type: Number },
    monthly_payment: { type: Number },
    payment_duration_months: { type: Number },
    payment_frequency_months: { type: Number },
    total_paid: { type: Number },
    payment_method: { type: String, trim: true },
    default_reason: { type: String, trim: true },
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

module.exports = mongoose.model('DefaultedSale', defaultedSaleSchema);
