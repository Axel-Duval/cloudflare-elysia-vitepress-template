// Code example: 3YT-2AO
const CODE_PART_LENGTH = 3;
const CODE_PARTS = 2;

export const part = (length = CODE_PART_LENGTH): string => {
    return Math.random()
        .toString(36)
        .substring(2, length + 2)
        .toUpperCase();
};

export const getCode = (parts = CODE_PARTS): string => {
    const codeParts = [];
    for (let i = 0; i < parts; i++) {
        codeParts.push(part());
    }
    return codeParts.join("-");
};
