const mongoose = require('mongoose');

/**
 * Client model aligned with frontend field names and JSON schema.
 *
 * Fields used in the frontend:
 * - full_name, contract_number, email, phone, address, nationality,
 *   identification_number, id_picture_url, contract_document_url,
 *   preferred_payment_method, preferred_currency, notes
 */
const clientSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    contract_number: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    nationality: { type: String, trim: true },
    identification_number: { type: String, trim: true },
    id_picture_url: { type: String, trim: true },
    contract_document_url: { type: String, trim: true },
    preferred_payment_method: {
      type: String,
      enum: ['Cash', 'Installment'],
      default: 'Cash',
    },
    preferred_currency: {
      type: String,
      default: 'USD',
      trim: true,
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

module.exports = mongoose.model('Client', clientSchema);

