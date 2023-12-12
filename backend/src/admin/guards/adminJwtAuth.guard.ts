import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class adminJwtAuthGuard extends AuthGuard('jwt') { }
