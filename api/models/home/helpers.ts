import { database } from "../../config/database";
import Resident from "../user/user";
import Home from "./home";

export namespace HomeHelper {
  export const getAllHomes = (): Array<Home> => {
    const rows = database.prepare("SELECT * FROM home").all();
    const homes: Home[] = rows.map((row: any) => new Home(row.id, row.name));

    return homes;
  };

  export const createHome = (home: Home): void => {
    database
      .prepare(
        `
        INSERT INTO home (name) VALUES (@name)
        `
      )
      .run(home);
  };

  export const addResidentToHome = (homeId: number, userId: number): void => {
    database
      .prepare(
        `
        INSERT INTO home_user (home_id, user_id) VALUES (@homeId, @userId)
        `
      )
      .run({ homeId, userId });
  };

  export const getHomeResidents = (homeId: number): Array<Resident> => {
    const ids = database
      .prepare(
        `
        SELECT user_id FROM home_user WHERE home_id = @homeId
        `
      )
      .all({ homeId });
    const users: Resident[] = [];
    ids.forEach((id: any) => {
      const row = database
        .prepare("SELECT * FROM user WHERE id = ?")
        .get(id.user_id) as Resident;
      if (row) {
        users.push(row);
      }
    });
    return users;
  };

  export const getHomeByResidentId = (userId: number): Array<Home> => {
    const homeId = database
      .prepare(
        `
        SELECT home_id FROM home_user WHERE user_id = @userId
        `
      )
      .all({ userId });
    const homes: Home[] = [];
    homeId.forEach((id: any) => {
      const row = database
        .prepare("SELECT * FROM home WHERE id = ?")
        .get(id.home_id) as Home;
      if (row) {
        homes.push(row);
      }
    });
    console.log(homes);
    return homes;
  };
}
