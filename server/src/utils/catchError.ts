export const tryCatch = async <T>(
    fn: () => Promise<T>
): Promise<[undefined, T] | [Error]> => {
    try {
        const data = await fn();
        return [undefined, data];
    } catch (error: unknown) {
        const err =
            error instanceof Error
                ? error
                : new Error(String(error));

        return [err];
    }
};
