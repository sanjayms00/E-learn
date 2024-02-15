import { IsString, IsNumber, IsUrl } from 'class-validator';

export class InstructorProfileDto {
    @IsString()
    fullName: string;

    @IsNumber()
    mobile: number;

    @IsString()
    email: string;

    @IsString()
    headline: string;

    @IsString()
    biography: string;

    @IsUrl()
    twitter: string;

    @IsUrl()
    facebook: string;

    @IsUrl()
    instagram: string;

    @IsUrl()
    linkedin: string;

    @IsUrl()
    website: string;

    image: { changingThisBreaksApplicationSecurity: string };
}
