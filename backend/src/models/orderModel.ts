import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface IOrderItem{
    productTitle: string;
    unitPrice: number;
    quantity: number;
    seatNo: string
    date: string
    showTime: string
    cinema: string
    city: string
}

export interface IOrder extends Document{
    orderItems: IOrderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;
}
const orderItemSchema = new Schema<IOrderItem>({
    productTitle: {type: String, required: true},
    unitPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
    seatNo: {type: String, required: true},
    date: {type: String, required: true},
    showTime: {type: String, required: true},
    city: {type: String, required: true},
    cinema: {type: String, required: true}
    
})

const OrderSchema = new Schema<IOrder>({
    orderItems: [orderItemSchema],
    total: {type: Number, required: true},
    address: {type: String, required: false},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);