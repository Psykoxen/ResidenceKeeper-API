import { HomeHelper } from "../models/home/helpers";
import Home from "../models/home/home";
import User from "../models/user/user";

export namespace HomeService {
  export const getAllHomes = (): Array<Home> => {
    return HomeHelper.getAllHomes();
  };

  export const createHome = (home: Home): void => {
    HomeHelper.createHome(home);
  };

  export const addResidentToHome = (homeId: number, userId: number): void => {
    HomeHelper.addResidentToHome(homeId, userId);
  };

  export const getHomeResidents = (homeId: number): Array<User> => {
    return HomeHelper.getHomeResidents(homeId);
  };

  export const getHomeByResidentId = (userId: number): Array<Home> => {
    return HomeHelper.getHomeByResidentId(userId);
  };
}
