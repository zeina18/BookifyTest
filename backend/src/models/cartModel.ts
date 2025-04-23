import mongoose, {Schema, Document, ObjectId} from "mongoose";
import { ICinema } from "./cinemaModel";

const cartStatusEnum = ["active", "completed"] 

export interface ICartItem{
    product: ICinema;
    unitPrice: number;
    quantity: number;
    city: string;
    cinema: string;
    date: string;
    showTime: string;
    seatNo: string;
}

export interface ICart extends Document{
    userId: ObjectId |  string
    items: ICartItem[]
    totalAmount: number
    status: "active" | "completed"
}

const CartItemSchema = new Schema<ICartItem>({
    product:{type: Schema.Types.ObjectId, ref: "Cinema", required: true },
    quantity:{type: Number, required: true, default: 1 },
    unitPrice:{type: Number, required: true },
    city:{type: String, required: true },
    cinema:{type: String, required: true },
    seatNo:{type: String, required: true },
    date:{type: String, required: true },
    showTime:{type: String, required: true },
})

const CartSchema = new Schema<ICart>({
    userId:{type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    totalAmount:{type: Number, required: true },
    status: {type: String, enum: cartStatusEnum, default: "active" }
})

export const cartModel = mongoose.model<ICart>("Cart",CartSchema)