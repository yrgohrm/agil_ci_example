function isConsonant(chr) {
    return "bcdfghjklmnpqrstvwxz".indexOf(chr.toLowerCase()) != -1
}

/**
 * Convert a string into robber language (as defined by Astrid Lindgren).
 * Example: "Hejsan" becomes "Hohejojsosanon"
 *
 * @param str the string to convert to robber language
 */
function toRobber(str) {
    let res = ""
    for (const chr of str) {
        if (isConsonant(chr)) {
            res += chr + "o" + chr.toLowerCase()
        } else {
            res += chr
        }
    }
    return res
}

/**
 * Convert a string into allspråket.
 * Example: "Hejsan" becomes "Hallejsan"
 *
 * @param str the string to convert to allspråket
 */
function toAllsprak(str) {
    let isNewWord = true,
        res = ""
    for (const chr of str) {
        if (isConsonant(chr) && isNewWord) {
            res += chr + "all"
            isNewWord = false
        } else {
            if (chr === " ") {
                isNewWord = true
            }

            res += chr
        }
    }

    return res
}

/**
 * Convert a string in robber language or allspråket into normal language.
 * This function tries to auto detect wich language has been used and
 * if it can't decide it just returns the original string.
 *
 * @param str the string to convert to normal language
 */
function toNormal(str) {
    for (let i = 0; i < str.length; ++i) {
        const chr = str.charAt(i)
        if (isConsonant(chr)) {
            let nextChar = str.charAt(i + 1)
            if (nextChar === "o") {
                return reverseRobber(str)
            } else if (nextChar === "a") {
                return reverseAllsprak(str)
            }

            return str
        }
    }

    return str
}

function reverseRobber(str) {
    let res = ""
    for (let i = 0; i < str.length; ++i) {
        let chr = str.charAt(i)
        res += chr
        if (isConsonant(chr)) {
            i += 2
        }
    }

    return res
}

function reverseAllsprak(str) {
    let res = "",
        isNewWord = true
    for (let i = 0; i < str.length; ++i) {
        let chr = str.charAt(i)
        res += chr
        if (isConsonant(chr) && isNewWord) {
            i += 3
            isNewWord = false
        } else if (chr === " ") {
            isNewWord = true
        }
    }

    return res
}

export { toRobber, toAllsprak, toNormal }
