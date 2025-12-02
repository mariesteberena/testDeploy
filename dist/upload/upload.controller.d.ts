export declare class UploadController {
    uploadImage(file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        path: string;
        filename: string;
    }>;
    deleteImage(filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
