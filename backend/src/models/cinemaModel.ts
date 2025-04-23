import mongoose,{Schema, Document} from "mongoose";

export interface ICinema extends Document{
  movie_id: string;
  titleImg: string;
  bgImg: string;
  previewImg: string;
  video: string;
  title: string;
  year: string;
  date: string;
  ageLimit: string;
  length: string;
  category: string;
  locations: {
    city: string;
    cinemas: {
      name: string;
      showtimes: Record<string, string[]>; // Assuming showtimes is an object with arrays of showtimes
    }[];
  }[];
  description: string;
  active: boolean;
  price: number;
  stock: number;

}


const cinemaSchema = new Schema<ICinema>({
  movie_id: { type: String, required: true },
  titleImg: { type: String, required: true },
  bgImg: { type: String, required: true },
  previewImg: { type: String, required: true },
  video: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: String, required: true },
  date: { type: String, required: true },
  ageLimit: { type: String, required: true },
  length: { type: String, required: true },
  category: { type: String, required: true },
  locations: [
    {
      city: { type: String, required: true },
      cinemas: [
        {
          name: { type: String, required: true },
          showtimes: { type: Object, required: true }, // You can replace this with a specific structure if needed
        },
      ],
    },
  ],
  description: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default:0 },
})

const CinemaModel = mongoose.model<ICinema>('Cinema',cinemaSchema);

export default CinemaModel;