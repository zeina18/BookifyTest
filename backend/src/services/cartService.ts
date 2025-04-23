import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";
import cinemaModel from "../models/cinemaModel";

interface CreateCartForUser {
  userId: string;
}
const CreateCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface getActiveCartForUser {
  userId: string;
  populateProduct?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: getActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }
  if (!cart) {
    cart = await CreateCartForUser({ userId });
  }

  return cart;
};

interface clearCart {
  userId: string;
}

export const clearCart = async ({ userId }: clearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();

  return { data: await getActiveCartForUser({ userId, populateProduct: true }), statusCode: 200 };
};

interface addItemToCart {
  userId: string;
  productId: any;
  quantity: number;
  city: string;
  cinema: string;
  date: string;
  showTime: string;
  seatNo: string;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
  city,
  cinema,
  date,
  showTime,
  seatNo
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  //Does the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  //Fetch the product
  const product = await cinemaModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item!", statusCode: 400 };
  }

  cart.items.push({
      product: productId,
      unitPrice: product.price,
      quantity,
      city,
      cinema,
      seatNo,
      date,
      showTime
  });

  //Update the total amount for the cart
  cart.totalAmount += product.price * quantity;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface updateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
  city: string;
  cinema: string;
  date: string;
  showTime: string;
  seatNo: string;
}

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
  city,
  cinema,
  date,
  showTime,
  seatNo
}: updateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item not exist in cart!", statusCode: 400 };
  }

  const product = await cinemaModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item!", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  existsInCart.quantity = quantity;
  existsInCart.city = city;
  existsInCart.cinema = cinema;
  existsInCart.showTime = showTime;
  existsInCart.date = date;
  existsInCart.seatNo = seatNo;

  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface deleteItemInCart {
  userId: string;
  productId: any;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: deleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item not exist in cart!", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = calculateCartTotalItems({ cartItems: otherCartItems });

  cart.items = otherCartItems;
  cart.totalAmount = total;

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};

interface checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: checkout) => {
  if (!address) {
    return { data: "Please add the address!", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];

  // Loop cartItems and create orderItems
  for (const item of cart.items) {
    const product = await cinemaModel.findById(item.product);

    if (!product) {
      return { data: "Product not found!", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      seatNo: item.seatNo,
      date: item.date,
      showTime: item.showTime,
      cinema: item.cinema,
      city: item.city
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();

  //update cart status to be completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};
