const mongoose = require('mongoose');

const apartmentReservationSchema = new mongoose.Schema(
  {
    apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    non_client_name: { type: String, required: true, trim: true },
    reservation_date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'converted'],
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

module.exports = mongoose.model('ApartmentReservation', apartmentReservationSchema);
