import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { User } from "src/modules/users/entities/user.entity"

@Injectable()
export class UserInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<User>): Observable<any> | Promise<Observable<any>> {
        console.log(context.getClass().name);
        return next
        .handle()
        .pipe(map(((user) => plainToInstance(User, user))));
    }
}