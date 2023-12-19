import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class statusDto {

    @IsNotEmpty()
    @MinLength(12)
    @IsString()
    readonly id: string

    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean

}