const mongoose = require('mongoose');

/**
 * Apartment model aligned with frontend field names and JSON schema.
 *
 * Frontend uses snake_case keys like:
 * - unit_number, block, floor, direction, apartment_description,
 *   area_sqm, description, parking_spot, status, base_price, currency,
 *   bedrooms, bathrooms, features, image_url
 */
const apartmentSchema = new mongoose.Schema(
  {
    unit_number: { type: String, required: true, trim: true },
    block: { type: String, trim: true },
    floor: { type: String, required: true, trim: true },
    direction: { type: String, trim: true },
    apartment_description: { type: String, trim: true },
    area_sqm: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    parking_spot: { type: String, trim: true },
    status: {
      type: String,
      enum: ['available', 'reserved', 'sold'],
      default: 'available',
    },
    base_price: { type: Number, min: 0 },
    currency: { type: String, default: 'USD', trim: true },
    bedrooms: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 },
    features: [{ type: String, trim: true }],
    image_url: { type: String, trim: true },
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

module.exports = mongoose.model('Apartment', apartmentSchema);