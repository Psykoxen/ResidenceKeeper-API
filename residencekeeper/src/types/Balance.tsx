interface Balance {
  balance: number;
  users: Array<{
    userId: number;
    balance: number;
  }>;
}

export default Balance;
