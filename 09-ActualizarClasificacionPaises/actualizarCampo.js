/*
El objetivo de este script es la reconversión de caracteres
no mostrados de forma correcta por el interprete de UTF-8 
de Therefore a ASCII

La versión de JS que se usa en Therefore tiene limitaciones 
a la hora de hacer estas conversiones.
*/
var fieldName = "Clasificación";

// Safely get the field value
var utf8String = SourceIndexData.GetField(fieldName);

// Check if the field value is a non-null string
if (utf8String != null && typeof utf8String === 'string') {
  var result = '';
  for (var i = 0; i < utf8String.length; i++) {
    var charCode = utf8String.charCodeAt(i);
    // Only append characters that are within the basic ASCII range (0-127).
    if (charCode >= 32 && charCode <= 126) {
      result += String.fromCharCode(charCode);
    }
  }
  // Trim any leading/trailing whitespace and set the field
  SourceIndexData.SetField(fieldName, result.trim());
}