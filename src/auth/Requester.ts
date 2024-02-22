import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Requester = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request['user'];
});
