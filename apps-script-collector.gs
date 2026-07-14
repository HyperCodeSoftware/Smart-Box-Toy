/**
 * Colector de răspunsuri pentru formularul Smart Box Toy.
 *
 * Instalare (5 minute):
 * 1. Mergi pe sheets.google.com și creează un Google Sheet nou (orice nume, ex. "Smart Box Toy — Feedback").
 * 2. În el: Extensions -> Apps Script.
 * 3. Șterge codul din editor și lipește tot conținutul acestui fișier.
 * 4. Sus, click Deploy -> New deployment.
 * 5. La "Select type" alege Web app.
 * 6. Execute as: Me. Who has access: Anyone.
 * 7. Click Deploy, apoi autorizează scriptul (contul tău Google).
 * 8. Copiază URL-ul "Web app" care apare (se termină în /exec).
 * 9. Pune acel URL în wooblies-feedback.html, în constanta SHEET_ENDPOINT_URL din <script>.
 *
 * La fiecare răspuns trimis din pagină, se adaugă automat un rând nou în foaia
 * "Răspunsuri" a acestui Sheet (se creează singură la primul răspuns).
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Răspunsuri');
  if (!sheet) {
    sheet = ss.insertSheet('Răspunsuri');
    sheet.appendRow([
      'Data',
      'Vârstă copil',
      'Ecran',
      'Rol în casă',
      'Tip conţinut',
      'Formă personaje',
      'Control (aplicaţie)',
      'Preţ starter pack',
      'Preţ personaj suplimentar',
      'Alte gânduri',
      'Email'
    ]);
  }

  var p = e.parameters || {};

  function joined(key) {
    return (p[key] || []).join(', ');
  }
  function single(key) {
    return (p[key] || [''])[0];
  }

  sheet.appendRow([
    new Date(),
    joined('varsta'),
    single('ecran'),
    single('rol'),
    joined('continut'),
    single('personaje'),
    single('control'),
    single('pret_pachet'),
    single('pret_personaj'),
    single('alte_ganduri'),
    single('email')
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
