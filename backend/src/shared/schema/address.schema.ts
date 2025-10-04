import * as mongoose from 'mongoose';

export const addressSchema: mongoose.Schema = new mongoose.Schema({
    address: { type: String, required: true, trim: true },
    district: { type: String, required: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryZone', required: true },
});
