import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";

export const CookieGetter =  createParamDecorator(
    async (data:string, context: ExecutionContext): Promise<string>=> {
        console.log(data)
        const request = context.switchToHttp().getRequest();
        console.log(request)
        console.log(request.cookies)
        const refreshToken = request.cookies[data];
        if(!refreshToken) {
            throw new UnauthorizedException('Token topilmadi');
        }
        return refreshToken;
    }
)