import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly fName : string

    @IsNotEmpty()
    @IsString()
    readonly lName : string

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter the correct email"})
    readonly email : string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password : string

}