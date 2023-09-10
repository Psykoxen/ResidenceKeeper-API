class Payment {
  id: number;
  user_id: number;
  home_id: number;
  amount: number;
  date: Date;
  name: string;
  category_id: number;

  constructor(
    id: number,
    user_id: number,
    home_id: number,
    amount: number,
    date: Date,
    name: string,
    category_id: number
  ) {
    this.id = id;
    this.user_id = user_id;
    this.home_id = home_id;
    this.amount = amount;
    this.date = date;
    this.name = name;
    this.category_id = category_id;
  }
}

export default Payment;
