const mongoose = require("mongoose");

const staySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    hostId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    // location: {
    //   address: { type: String, required: true },
    //   zip: { type: String, required: true },
    //   city: { type: String, required: true },
    //   country: { type: String, required: true },
    //   geo: {
    //     langitude: { type: String, required: true },
    //     latitude: { type: String, required: true },
    //   },
    // },
    location: { type: String, required: true },
    highlights: {
      maxGuests: { type: Number, required: true },
      rooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      wifi: { type: Boolean, required: true },
      kitchen: { type: Boolean, required: true },
      airconditioner: { type: Boolean, required: true },
    },
    reservations: [
      {
        _id: { type: mongoose.Types.ObjectId, required: true },
        startDate: { type: Number, required: true },
        endDate: { type: Number, required: true },
        // guest who booked
        guestId: { type: mongoose.Types.ObjectId, required: true },
        otherGuests: [
          {
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            birthdate: { type: Date, required: true },
          },
        ],
      },
    ],
    pictures: [{ type: String }],
    ratings: [
      {
        ratedAt: Number,
        stars: { type: Number, min: 0, max: 5 },
        message: { type: String, required: true },
        ratedBy: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Stay = mongoose.model("Stay", staySchema);
module.exports = Stay;
