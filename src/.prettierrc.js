module.exports = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 150,
    proseWrap: 'never',
    endOfLine: 'lf',
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
        {
            files: 'document.ejs',
            options: {
                parser: 'html',
            },
        },
    ],
};
