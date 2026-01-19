/// <reference types="vite/client" />

declare module '@svg-maps/taiwan' {
    const Taiwan: {
        viewBox: string;
        locations: {
            path: string;
            id: string;
            name?: string;
        }[];
        label?: string;
    };
    export default Taiwan;
}
