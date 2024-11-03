/* eslint-disable */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "translatte", {
    enumerable: true,
    get: function() {
        return translatte;
    }
});
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
const _token = require("./token.js");
const _languages = require("./languages");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const translatte = async ({ text, from, to })=>{
    const errors = [
        'The language «[lang]» is not supported',
        'Text must not exceed 5000 bytes',
        'The server returned an empty response',
        'Could not get token from google',
        'Text translation request failed'
    ];
    const bytes = (0, _languages.utf8Length)(text);
    if (bytes > 5000) {
        const chars = Math.ceil(text.length / Math.ceil(bytes / 4700)) + 100;
        let plain = ' ' + text + ' ';
        let texts = [];
        let j = 0;
        [
            '.',
            ',',
            ' '
        ].forEach((separator)=>{
            if (!plain) return;
            const split = plain.split(separator);
            for(let i = 0, l = split.length; i < l; i++){
                if (!texts[j]) texts[j] = [];
                if ((texts[j].join(separator) + split[i]).length < chars) {
                    texts[j].push(split[i]);
                    plain = split.slice(i + 1).join(separator);
                } else {
                    if (!texts[j].length) break;
                    texts[j].push('');
                    texts[++j] = [];
                    if ((texts[j].join(separator) + split[i]).length < chars) {
                        texts[j].push(split[i]);
                        plain = split.slice(i + 1).join(separator);
                    } else {
                        break;
                    }
                }
            }
            texts = texts.map((t)=>{
                if (!t) return '';
                if (typeof t === 'object') {
                    return t.join(separator).trim();
                } else if (typeof t === 'string') {
                    return t.trim();
                }
                return '';
            }).filter(Boolean);
        });
        if (!texts || !texts.length) return Promise.reject(new Error(errors[1]));
        return texts.reduce((p, text)=>{
            return p.then((prev)=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        translatte({
                            text,
                            from,
                            to
                        }).then((text)=>{
                            if (!text) return reject(errors[2]);
                            text = prev && prev.text ? prev.text + ' ' + text : text;
                            return resolve(text);
                        }).catch((e)=>reject(e));
                    }, 1000);
                });
            });
        }, Promise.resolve());
    }
    // Substituir marcadores temporários
    const placeholders = {};
    // Não traduzir os textos que estão dentro do {{}} pois são variáveis
    const translatedText = text.replace(/{{(.*?)}}/g, (match)=>{
        const placeholder = `{{${Object.keys(placeholders).length}}}`;
        placeholders[placeholder] = match // Armazena o valor original
        ;
        return placeholder // Substitui pelo marcador
        ;
    });
    try {
        const tk = (0, _token.fetchToken)(translatedText);
        if (!tk) throw new Error(errors[3]);
        const params = new URLSearchParams({
            tk,
            client: 'gtx',
            q: translatedText,
            sl: from,
            tl: to
        });
        params.append('dt', 't');
        const { data } = await _axios.default.get(`https://translate.google.com/translate_a/single?${params}`);
        let translateText = data[0].map((obj)=>obj[0] || '').join('');
        // Restaura os marcadores com os valores originais
        for (const [placeholder, value] of Object.entries(placeholders)){
            translateText = translateText.replace(placeholder, value);
        }
        return translateText;
    } catch (error) {
        return Promise.reject(error);
    }
};

//# sourceMappingURL=translatte.js.map