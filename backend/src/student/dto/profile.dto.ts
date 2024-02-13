
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class profileDto {

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter the correct email" })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly fullName: string

    @IsNotEmpty()
    @MinLength(10)
    readonly mobile: number

    @IsNotEmpty()
    @IsString()
    @MinLength(30)
    readonly headline: string

    @IsNotEmpty()
    @IsString()
    @MinLength(100)
    readonly biography: string

    @IsNotEmpty()
    @IsString()
    readonly twitter: string

    @IsNotEmpty()
    @IsString()
    readonly facebook: string

    @IsNotEmpty()
    @IsString()
    readonly instagram: string

    @IsNotEmpty()
    @IsString()
    readonly linkedin: string

    @IsNotEmpty()
    @IsString()
    readonly website: string

    @IsNotEmpty()
    @IsString()
    readonly image: string

}
