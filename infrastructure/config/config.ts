
const configFile = require('./dev.json')
interface Env {
    env: string | undefined
    account: string | undefined
    region: string | undefined
    imageBucketArn: string | undefined
    sesVerifiedDomain: string | undefined
    fromEmailAddress: string | undefined
}

interface AppConfig {
    env: string
    account: string
    region: string
    imageBucketArn: string
    sesVerifiedDomain: string
    fromEmailAddress: string
}

const getConfig = (): Env => {
    return {
        env: configFile.envNameenv ? configFile.envNameenv : 'dev' ,
        account: configFile.account ? configFile.account : 'dev' ,
        region: configFile.region ? configFile.region : 'us-east-1' ,
        imageBucketArn: configFile.imageBucketArn,
        sesVerifiedDomain: configFile.sesVerifiedDomain,
        fromEmailAddress: configFile.fromEmailAddress,
    };
};

const getSanitzedConfig = (config: Env): AppConfig => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config file`);
        }
    }
    return config as AppConfig;
};

const sanitizedConfig = getSanitzedConfig(getConfig());

export default sanitizedConfig;
