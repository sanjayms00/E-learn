import { ConfigService } from '@nestjs/config';
export declare class SignedUrlService {
    private configService;
    private client;
    constructor(configService: ConfigService);
    generateSignedUrl(key: any): Promise<string>;
}
