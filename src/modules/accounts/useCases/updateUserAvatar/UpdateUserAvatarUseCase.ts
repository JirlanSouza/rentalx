import { inject, injectable } from "tsyringe";

import { deleteFile } from "@utils/file";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IUpdateUserAvatarInDTO {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IUpdateUserAvatarInDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;
    await this.usersRepository.create(user);
  }
}
