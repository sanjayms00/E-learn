import { SignupDto } from 'src/common/dtos/signDto';
import { StudentAuthService } from 'src/student/services/student-auth.service';
import { userAuthReturn } from 'src/common/types/type';
export declare class StudentAuthController {
    private studentAuthService;
    constructor(studentAuthService: StudentAuthService);
    signUp(signUpDto: SignupDto): Promise<{
        email: string;
    }>;
    verifyOtp(otpData: any): Promise<userAuthReturn>;
    resendOtp(data: {
        email: string;
    }): Promise<void>;
    login(loginData: any): Promise<userAuthReturn>;
    forgotPassword(data: {
        email: string;
    }): Promise<{
        status: boolean;
        message: string;
    }>;
    resetPassword(data: {
        token: string;
        password: string;
    }): Promise<{
        status: boolean;
        message: string;
    }>;
}
