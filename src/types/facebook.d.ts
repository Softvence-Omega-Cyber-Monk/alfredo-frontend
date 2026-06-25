interface Window {
    FB: {
        init: (params: {
            appId: string;
            cookie: boolean;
            xfbml: boolean;
            version: string;
        }) => void;
        login: (
            callback: (response: fb.StatusResponse) => void,
            options?: { scope: string }
        ) => void;
        getLoginStatus: (callback: (response: fb.StatusResponse) => void) => void;
        api: (path: string, callback: (response: any) => void) => void;
    };
    fbAsyncInit: () => void;
}

declare namespace fb {
    interface StatusResponse {
        status: 'connected' | 'not_authorized' | 'unknown';
        authResponse: AuthResponse | null;
    }
    interface AuthResponse {
        accessToken: string;
        expiresIn: number;
        signedRequest: string;
        userID: string;
    }
}