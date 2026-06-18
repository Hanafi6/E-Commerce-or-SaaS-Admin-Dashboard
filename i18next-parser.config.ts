/** @type {import('i18next-parser').UserConfig} */
export default {
    locales: ['ar', 'en'],
    input: ['src/**/*.{ts,tsx}'],
    output: 'src/locales/$LOCALE.json',
    trim: true,
    keySeparator: false,
    nsSeparator: false,
    createOldCatalogs: false,

    defaultValue: (locale, namespace, key) => {
        console.log(locale, namespace, key)
        if (locale === 'en') return key;
        return '';
    },

    lexers: {
        tsx: [{
            lexer: 'JsxLexer',
            functions: ['t'],
            components: ['T']
        }],
        ts: [{
            lexer: 'JavascriptLexer',
            functions: ['t']
        }]
    }
};