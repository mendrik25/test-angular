import * as mongoose from 'mongoose';

export const metaDataSchema = new mongoose.Schema({
    description: { type: String, required: true },
    keywords: [{ type: String, required: true }],
    title: { type: String, required: true },
});
