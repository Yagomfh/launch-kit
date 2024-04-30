type CreateSessionCookiesParams = {
    token?: string;
    refreshToken?: string;
};
export declare function createSessionCookies(params: CreateSessionCookiesParams): void;
export declare function removeSessionCookies(): void;
export declare function getToken(): string;
export declare function getRefreshToken(): string;
export {};
