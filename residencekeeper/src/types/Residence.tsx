import Balance from "./Balance";
import Home from "./Home";
import Payment from "./Payment";

interface Residence {
  home: Home;
  payments: Payment[];
  balance: Balance;
}

export default Residence;
