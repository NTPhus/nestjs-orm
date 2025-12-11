import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return {msg: "I'm signup"}
    }

    signin(){
        return {msg: "I'm signin"}
    }
}
