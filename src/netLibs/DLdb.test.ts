import { Feed, Item } from "./feedDataClasses";
import * as R from "ramda";
import { User } from "./DLdb";

describe("Testing database functionality.", () => {
  test("can connect to sqlite database", async () => {
    console.log("testing sqlize");

    const jane = await User.create({
      firstName: "jane",
      lastName: "doe",
    });
    const users = await User.findAll();
    console.log("users: " + users[0]["firstName"]);
  });
});
