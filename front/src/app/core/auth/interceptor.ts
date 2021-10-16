import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "@services/token/token.service";
import { Observable } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(this.tokenService.hasToken()){
            const token = <string> this.tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    'x-auth-token': token
                }
            })
        }

        return next.handle(req);
    }
}
