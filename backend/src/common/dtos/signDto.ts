import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly fullName : string

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter the correct email"})
    readonly email : string

    @IsNotEmpty()
    @IsNumber({}, {message: "Please enter correct mobile number "})
    readonly mobile : number

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password : string
}