// This script converts Mojibake strings to plain ASCII.

var fieldName = "Nombre Proyecto";

// Safely get the field value
var utf8String = SourceIndexData.GetField(fieldName);

// Check if the field value is a non-null string
if (utf8String != null && typeof utf8String === 'string') {
    // Character map for common single-character Unicode and two-character Mojibake
    var charMap = {
        // Correct single characters (precomposed Unicode)
        '\u00C0': 'A', '\u00C1': 'A', '\u00C2': 'A', '\u00C3': 'A', '\u00C4': 'A', '\u00C5': 'A',
        '\u00C8': 'E', '\u00C9': 'E', '\u00CA': 'E', '\u00CB': 'E',
        '\u00CC': 'I', '\u00CD': 'I', '\u00CE': 'I', '\u00CF': 'I',
        '\u00D2': 'O', '\u00D3': 'O', '\u00D4': 'O', '\u00D5': 'O', '\u00D6': 'O',
        '\u00D9': 'U', '\u00DA': 'U', '\u00DB': 'U', '\u00DC': 'U',
        '\u00D1': 'N',
        '\u00C7': 'C',
        '\u00E0': 'a', '\u00E1': 'a', '\u00E2': 'a', '\u00E3': 'a', '\u00E4': 'a', '\u00E5': 'a',
        '\u00E8': 'e', '\u00E9': 'e', '\u00EA': 'e', '\u00EB': 'e',
        '\u00EC': 'i', '\u00ED': 'i', '\u00EE': 'i', '\u00EF': 'i',
        '\u00F2': 'o', '\u00F3': 'o', '\u00F4': 'o', '\u00F5': 'o', '\u00F6': 'o',
        '\u00F9': 'u', '\u00FA': 'u', '\u00FB': 'u', '\u00FC': 'u',
        '\u00F1': 'n',
        '\u00E7': 'c',

        // Mojibake character sequences
        'Ã\u00A1': 'a', // á
        'Ã\u00A9': 'e', // é
        'Ã\u00AD': 'i', // í
        'Ã\u00B3': 'o', // ó
        'Ã\u00BA': 'u', // ú
        'Ã\u00B1': 'n' // ñ
    };

    var result = '';
    var i = 0;
    while (i < utf8String.length) {
        var char = utf8String.charAt(i);
        // Check for a two-character Mojibake sequence
        if (i + 1 < utf8String.length) {
            var twoChar = char + utf8String.charAt(i + 1);
            if (charMap[twoChar] !== undefined) {
                result += charMap[twoChar];
                i += 2; // Skip both characters
                continue;
            }
        }

        // Check for a single-character Unicode
        if (charMap[char] !== undefined) {
            result += charMap[char];
        } else {
            // Keep the character as is
            result += char;
        }
        i++;
    }

    SourceIndexData.SetField(fieldName, result.trim());
}