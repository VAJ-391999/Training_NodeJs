export interface IConfig {
    port: number,
    mongodbUrl: string,
    saltRound: number,
    jwtTokenSecret: string
}