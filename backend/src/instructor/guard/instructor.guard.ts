import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class InstructorJwtAuthGuard extends AuthGuard('instructor-jwt') { }