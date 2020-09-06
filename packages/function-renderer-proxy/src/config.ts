'use strict';

import * as fse from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const CONFIG_PATH = path.resolve(__dirname, '../config.json');


export type Config = {
    cache: 'datastore' | 'memory' | 'filesystem' | null;
    cacheConfig: { [key: string]: string };
    timeout: number;
    port: string;
    host: string
    width: number;
    height: number;
    headers: { [key: string]: string };
    puppeteerArgs: Array<string>;
};

export class ConfigManager {
    public static config: Config = {
        cache: null,
        cacheConfig: {
            snapshotDir: path.join(os.tmpdir(), 'rendertron'),
            cacheDurationMinutes: (60 * 24).toString(),
            cacheMaxEntries: '100'
        },
        timeout: 10000,
        port: '3000',
        host: '0.0.0.0',
        width: 1000,
        height: 1000,
        headers: {},
        puppeteerArgs: ['--no-sandbox']
    };

    static async getConfiguration(): Promise<Config> {
        // Load config.json if it exists.
        if (fse.pathExistsSync(CONFIG_PATH)) {
            const configJson = await fse.readJson(CONFIG_PATH);

            // merge cacheConfig
            const cacheConfig = Object.assign(ConfigManager.config.cacheConfig, configJson.cacheConfig);

            ConfigManager.config = Object.assign(ConfigManager.config, configJson);

            ConfigManager.config.cacheConfig = cacheConfig;
        }
        return ConfigManager.config;
    }
}

