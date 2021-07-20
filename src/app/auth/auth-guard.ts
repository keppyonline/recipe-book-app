import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private auth: AuthService){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>{
        return this.auth.user$
        .pipe(map(user=>{
            return !!user;
        }));
    }
}