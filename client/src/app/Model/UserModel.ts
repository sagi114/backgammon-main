import { Guid } from 'guid-typescript';
export interface UserModel{
    Id?:Guid;
    Email:string;
    Password:string;
    Name?:string;
    wins?:number;
    losts?:number;
}