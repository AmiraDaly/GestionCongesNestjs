import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
    const env: string | undefined = process.env.NODE_ENV;
    console.log('env is ',env);
    const fallback: string = resolve(`${dest}/.env`);
    console.log('fallback is ',fallback);
    const filename: string = env ? `${env}.env` : 'development.env';
    console.log('filename is ',filename);
    let filePath: string = resolve(`${dest}/${filename}`);
    console.log('filePath is ',filePath);

    if (!existsSync(filePath)) {
        filePath = fallback;
    }

    return filePath;
}