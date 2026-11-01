# HAUSRAT – Private Inventar-App

Eine komplett clientseitige Web-App für iPhone, iPad und Desktop. Keine Benutzerkonten, keine Werbung, keine externen Bibliotheken, keine Übertragung von Inventardaten. Alle Inventardaten und Fotos werden im Browser lokal gespeichert. Die Bruttosumme wird automatisch berechnet.

## So benutzt du die App

1. Tippe auf das **+** unten.
2. Erfasse **Bezeichnung** (z. B. „Artemide Tolomeo Lampe“) und **Bruttopreis pro Stück**.
3. Wähle den **Raum**; bei mehreren gleichen Gegenständen die **Anzahl**.
4. Mit **Sichern + weiter** kannst du sofort den nächsten Gegenstand erfassen.
5. Unter **Weitere Angaben** kannst du Kategorie, Kaufdatum, Notizen, Objektfoto und fotografierten Kaufbeleg hinterlegen.
6. Unter **Übersicht** findest du Summe, Raumwerte, Druckansicht/PDF, CSV und JSON-Backup.

## Auf dem iPhone als Offline-Web-App installieren

**Wichtig:** iOS benötigt für eine zuverlässige Installation der Offline-Web-App eine Webseite über **HTTPS** (oder einen Webserver auf `localhost` direkt auf dem iPhone). Dateien direkt aus der iOS-Dateien-App zu öffnen funktioniert je nach iOS-Version nur eingeschränkt; die dauerhafte Datenspeicherung ist dann nicht zuverlässig.

1. Lade den Inhalt dieses Ordners auf einen statischen **HTTPS-Webserver** (zum Beispiel GitHub Pages, Netlify oder dein eigener HTTPS-Server). Es ist keine Datenbank und kein Backend nötig. Der Server erhält nur die App-Dateien, **keine von dir eingegebenen Gegenstände**.
2. Öffne den HTTPS-Link einmal auf deinem iPhone in **Safari**. Warte, bis die Startseite vollständig geladen ist.
3. Tippe auf **Teilen** und dann **Zum Home-Bildschirm** bzw. **Zum Home-Bildschirm hinzufügen**.
4. Öffne die neue **Hausrat**-App vom Home-Bildschirm. Die Oberfläche funktioniert nach der ersten erfolgreichen Installation offline. Alle Daten bleiben auf genau diesem Gerät und in dieser Installation.
5. Teste den Offline-Modus am besten vor der eigentlichen Inventarisierung kurz im Flugmodus.

**Alternative am Computer:** `index.html` / `hausrat-einzeldatei.html` direkt in einem normalen Browser öffnen. Es ist kein Server erforderlich, aber die Offlinespeicherung von lokalen `file://`-Seiten hängt vom Browser ab. Für regelmäßige Nutzung ist eine HTTPS-Installation zuverlässiger.

**Alternative mit einem lokalen Webserver auf dem eigenen Rechner:** Im Ordner `python3 -m http.server 8080` aufrufen und am Rechner `http://localhost:8080` öffnen. Auf dem iPhone im WLAN ist `http://IP-DES-RECHNERS:8080` zum Testen der Oberfläche geeignet, unterstützt aber **keinen zuverlässigen PWA-Offline-Modus**; dafür gilt die HTTPS-/localhost-Voraussetzung.

## Exporte

- **Druckansicht / PDF:** Öffnet einen druckbaren Bericht mit Gesamtwert, allen Gegenständen, Raum-Zwischensummen und optionaler Fotodokumentation. Auf dem iPhone im Druckdialog über die PDF-Vorschau und die Teilen-Funktion als PDF in „Dateien“ sichern. Kein PDF-Server nötig.
- **CSV:** Tabellarische Liste für Excel / Numbers. Enthält Namen, Preise, Stückzahl, Räume, Notizen und Belegstatus, jedoch keine eingebetteten Bilder.
- **JSON-Backup:** Vollständige Daten einschließlich komprimierter Objekt- und Belegfotos. **Regelmäßig exportieren und extern sicher aufbewahren.** Die JSON-Datei enthält private Informationen und ist nicht verschlüsselt.
- **Import:** Backup zusammenführen oder vorhandene Einträge damit ersetzen.

## Datenschutz und wichtige Hinweise

- Es gibt keine Online-Dienste, Tracking, Cookies, Benutzerkonten oder Zugriffe auf fremde Server.
- Der Browser speichert lokal in **IndexedDB**, bei Nichtverfügbarkeit mit einem lokalen Fallback. Wenn gar kein dauerhafter Speicher verfügbar ist, zeigt die App eine Warnung.
- Browserdaten löschen, private Browserfenster, Speicherbereinigung durch iOS, ein Gerätewechsel oder eine Neuinstallation können Daten vernichten. **JSON-Backups sind daher unverzichtbar.**
- Die App verwendet **erfasste Bruttopreise**. Diese sind nicht zwangsläufig die für eine Hausratversicherung maßgebliche Versicherungssumme, der heutige Wiederbeschaffungswert oder ein Nachweis des Eigentums. Versicherungsbedingungen und Wertsachenlimits bitte gesondert prüfen.
- Zur Reduzierung des Speicherbedarfs werden Fotos beim Hinzufügen auf max. 1600 Pixel verkleinert und als JPEG komprimiert. Fotografierte Belege sollten scharf und gut lesbar sein.
- Mehrere Geräte synchronisieren nicht automatisch. Verwende dafür den manuellen Backup-Export und -Import.

## Dateien

- `index.html` – komplette App, inklusive CSS und JavaScript
- `service-worker.js` – Offline-Cache für die Oberfläche
- `manifest.webmanifest` und `icon-*.png` – Home-Bildschirm-Installation
- `hausrat-einzeldatei.html` – identische App als HTML-Einzeldatei, z. B. für Tests

Die Oberflächengestaltung orientiert sich an den mitgelieferten Apple-HIG-Referenzen (klare visuelle Hierarchie, große Touchflächen, reduzierte Wege, Safe Areas, System-Typografie, Dark Mode, Feedback und zugängliche Beschriftungen). Da es eine Browser-App ist, verwendet sie HTML/CSS/JavaScript und **kein SwiftUI**.
