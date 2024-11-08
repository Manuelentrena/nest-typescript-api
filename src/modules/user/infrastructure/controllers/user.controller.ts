import { Controller } from '@nestjs/common';

@Controller('/users')
export class UserController {
  //   constructor(@Inject('UserTasks') private readonly userTasks: UserTasks) {}
  //   @Get(':id/tasks')
  //   async getAllTasksByUser(
  //     @Param() params: FindOneUserParams,
  //     @Res() res: Response,
  //   ) {
  //     return res.status(200).json({
  //       tasks: (await this.userTasks.run(params.id)).map((task) =>
  //         task.toPlainObject(),
  //       ),
  //     });
  //   }
}
