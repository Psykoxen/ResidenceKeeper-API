interface Payment {
  id: number;
  user_id: number;
  home_id: number;
  amount: number;
  date: string;
  name: string;
  category_id: number;
  expense: string;
}

export default Payment;
