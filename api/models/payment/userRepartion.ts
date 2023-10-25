class userRepartion {
  user_id: number;
  payment_id: number;
  repartition: number;

  constructor(user_id: number, payment_id: number, repartition: number) {
    this.user_id = user_id;
    this.payment_id = payment_id;
    this.repartition = repartition;
  }
}

export default userRepartion;
