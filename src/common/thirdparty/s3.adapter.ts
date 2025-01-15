import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Adapter {
    private readonly s3Client = new S3Client({
        region: this.configService.get<string>('AWS_REGION'),
        credentials: {
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY')
        }
    });

    constructor(private readonly configService: ConfigService) {}

    async uploadImage(fileName: string, buffer: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
                Key: fileName,
                Body: buffer,
                ACL: 'public-read'
            })
        );
    }

    getImageUrl(fileName: string): string {
        return `https://${this.configService.get('AWS_S3_BUCKET_NAME')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
    }
}
