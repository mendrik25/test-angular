import { BaseRepository } from "../common/repository/base.repository";
import { User } from "./user.model";
import { UserDocument, userModel } from "./user.schema";

class UserRepository extends BaseRepository<UserDocument, User> {
  ROLE_POPULATION_STAGE = [
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },
    {
      $unwind: {
        path: "$role",
      },
    },
  ];

  constructor() {
    super(userModel);
  }
}

export const userRepository = new UserRepository();
