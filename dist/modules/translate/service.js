"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serviceTranslatte", {
    enumerable: true,
    get: function() {
        return serviceTranslatte;
    }
});
const _translatte = require("./shared/translatte");
const MAX_RETRIES = 3;
const serviceTranslatte = async ({ text, to, from })=>{
    let attempts = 0;
    while(attempts < MAX_RETRIES){
        try {
            const translatedText = await (0, _translatte.translatte)({
                text,
                to,
                from
            });
            return translatedText;
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);
        }
    }
    return text;
};

//# sourceMappingURL=service.js.map