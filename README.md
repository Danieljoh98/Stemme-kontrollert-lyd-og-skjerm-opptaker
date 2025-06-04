# 🎙️ Stemme & Skjerm Opptaker

## 📄 Om prosjektet

Dette er en **kraftig nettbasert opptaksapplikasjon** med stemmekontrollfunksjoner for både lyd- og skjermopptak. Applikasjonen lar deg kontrollere hele opptaksprosessen handsfree ved hjelp av stemmekommandoer, og fungerer direkte i nettleseren uten behov for eksterne programmer eller plugins.

**Hovedfunksjoner:**
* **Lydopptak** - Ta opp lyd av høy kvalitet fra mikrofonen din
* **Skjermopptak** - Fang skjermen din med systemlyd og valgfri mikrofon
* **Stemmekontroll** - Kontroller alt med stemmekommandoer som "Start recording", "Stop recording"
* **Live forhåndsvisning** - Se hva du tar opp i sanntid
* **Handsfree betjening** - Komplett arbeidsflyt uten å røre en knapp
* **Flere formater** - Last ned som MP4 for bedre kompatibilitet
* **Mørk/Lys tema** - Bytt tema med stemme eller knapp
* **Live transkript** - Se stemmekommandoer når de gjenkjennes

## 🚀 Hvordan laste ned og starte programmet

### Forutsetninger
Før du starter, sørg for at du har:
* **Moderne nettleser** (Chrome anbefales, Firefox, Edge, Safari)
* **Mikrofontilgang** for stemmekommandoer og lydopptak
* **Skjermdelingstillatelse** for skjermopptak

### Steg-for-steg installasjon

1. **Last ned prosjektet**
```bash
git clone https://github.com/Danieljoh98/audio-screen-capture.git
cd audio-screen-capture
```
*Eller last ned ZIP-filen og pakk den ut*

2. **Åpne applikasjonen**
   * Naviger til prosjektmappen i Filutforsker
   * Dobbeltklikk på **`voice-recorder.html`** (hovedversjon)
   * ELLER gå til mappen `all_in_1` og åpne **`voice-recorder_all_in_1.html`** (alt samlet i én fil)

3. **Tillat rettigheter**
   * Klikk **"Tillat"** når nettleseren spør om mikrofontilgang
   * Dette kan dukke opp flere ganger - klikk alltid "Tillat"

4. **Start å bruke applikasjonen!**
   * Klikk "🎤 Enable Voice" for å aktivere stemmekommandoer
   * Si "Start recording" for å begynne opptak
   * Alt fungerer lokalt i nettleseren din

### Alternative måter å åpne på:
* **Høyreklikk** på `voice-recorder.html` → "Åpne med" → din nettleser
* **Via nettleser:** Trykk `Ctrl + O` og velg filen
* **Dra og slipp** filen inn i nettleservinduet

## 🎯 Slik bruker du applikasjonen

### Grunnleggende opptak

**Lydopptak:**
1. Klikk **"Select Audio"** (knappen blir blå)
2. Klikk **"🔴 Start Recording"**
3. Snakk inn i mikrofonen din
4. Klikk **"⏹️ Stop Recording"**
5. Klikk **"💾 Download"** for å lagre

**Skjermopptak:**
1. Klikk **"Select Screen"** (knappen blir blå)
2. Velg skjerm/vindu når nettleseren spør
3. Veksle **"🎤 Microphone ON/OFF"** hvis ønskelig
4. Klikk **"🔴 Start Recording"**
5. Klikk **"⏹️ Stop Recording"**
6. Klikk **"💾 Download"** for å lagre

### Stemmekontroll
Aktiver med **"🎤 Enable Voice"** og bruk disse kommandoene:
* **"Start recording"** - Start opptak
* **"Stop recording"** - Stopp opptak
* **"Select audio"** - Bytt til lydmodus
* **"Select screen"** - Bytt til skjermmodus
* **"Microphone on/off"** - Slå mikrofon av/på
* **"Download"** - Last ned opptak
* **"Dark mode" / "Light mode"** - Bytt tema
* **"Disable voice"** - Slå av stemmekommandoer


## 📁 Prosjektstruktur

```
audio-screen-capture/
├── voice-recorder.html     # Hovedfil - komplett funksjonell versjon
├── README.md               # Prosjektdokumentasjon
├── all_in_1/
│   └── voice-recorder_all_in_1.html  # Alt samlet i én enkelt fil
└── src/
    ├── css/
    │   └── styles.css      # CSS-stiler (for fremtidig modulær versjon)
    └── js/
        └── main.js         # JavaScript (for fremtidig modulær versjon)
```

### Filalternativer

**Alternativ 1: Hovedversjon (Anbefalt)**
- Bruk `voice-recorder.html` - Dette er den komplette, fullt funksjonelle versjonen

**Alternativ 2: Alt-i-en fil (Enklest å dele)**
- Bruk `all_in_1/voice-recorder_all_in_1.html` - Alt samlet i én enkelt fil, perfekt for deling eller enkel distribusjon

## 🔧 Feilsøking

### Vanlige problemer

**Stemmekommandoer fungerer ikke:**
- Oppdater siden (F5 eller Ctrl+R)
- Tillat mikrofonrettigheter
- Klikk "Enable Voice" knappen
- Snakk tydelig og vent på gjenkjenning

**Ingen lyd i opptak:**
- Sørg for at mikrofonen er aktivert (grønn knapp)
- Sjekk nettleserens mikrofonrettigheter
- Prøv å oppdatere siden

**Skjermopptak mislykkes:**
- Tillat skjermdeling når du blir spurt
- Velg riktig skjerm/vindu
- Sørg for at nettleseren støtter skjermopptak

**Tillatelsesvindu dukker opp hele tiden:**
- Dette er normal oppførsel
- Klikk alltid "Tillat" for mikrofontilgang
- Appen trenger vedvarende mikrofontilgang for stemmekommandoer

### Nettleserkompatibilitet
- **Chrome**: Full støtte (anbefalt)
- **Firefox**: Full støtte
- **Edge**: Full støtte
- **Safari**: Grunnleggende støtte (noen begrensninger)


## 🎨 Grensesnittveiledning

### Knappfarger
- **Rød**: Ikke valgt/inaktiv modus
- **Blå**: Valgt/aktiv modus  
- **Grønn**: Mikrofon aktivert
- **Rød**: Mikrofon deaktivert

### Statusindikatorer
- **Ready**: System klart for opptak
- **🔴 Recording**: Tar opp for øyeblikket
- **✅ Stopped**: Opptak fullført

## 📝 Tekniske detaljer

### Filformater
- **Lyd**: WebM-format, lastet ned som MP4-kompatibel
- **Video**: WebM/MP4-format med H.264-koding når mulig
- **Kvalitet**: Høy bitrate lyd (128kbps) og video (2.5Mbps)

### Personvern
- Alt opptak skjer lokalt i nettleseren din
- Ingen data sendes til eksterne servere
- Opptak lagres midlertidig i nettleserens minne
- Nedlastede filer lagres direkte på enheten din

### Lydfunksjoner
- **Høy kvalitet**: 44.1kHz samplingsrate opptak
- **Auto-aktiver**: Mikrofonen aktiveres automatisk for lydopptak
- **Systemlyd**: Skjermopptak fanger systemlyder
- **Blandet lyd**: Kombiner mikrofon og systemlyd i skjermopptak

## 🎪 Avanserte tips

1. **Stemmetrening**: Snakk tydelig og vent på kommandogjenkjenning
2. **Flere opptak**: Hvert opptak lagres separat med tidsstempler
3. **Rask tilgang**: Bruk stemmekommandoer for raskere arbeidsflyt
4. **Temaveksling**: "Dark mode" / "Light mode" for bedre synlighet
5. **Handsfree drift**: Komplett opptaksarbeidsflyt kun med stemme

## 🆘 Støtte

Hvis du støter på problemer:
1. Oppdater siden og prøv igjen
2. Sjekk nettleserkonsollen for feilmeldinger
3. Sørg for at alle rettigheter er gitt
4. Prøv i et inkognito/privat nettleservindu
5. Oppdater nettleseren din til nyeste versjon

## Teknologier brukt

* **Vanilla JavaScript** - Ren JavaScript uten eksterne biblioteker
* **Web APIs** - MediaRecorder, SpeechRecognition, Screen Capture
* **CSS Grid & Flexbox** - For responsiv layout
* **HTML5** - Moderne web-standarder
* **WebRTC** - For sanntids media-opptak

## Utviklet av

**Daniel Nilsen Johansen**
* 📧 danieljoh98@gmail.com
* 🔗 [GitHub](https://github.com/Danieljoh98)
* 📍 Halden, Norge

## 📜 Lisens

Dette prosjektet er åpen kildekode og tilgjengelig for personlig og utdanningsbruk.

---

**Laget med ❤️ for sømløs stemmekontrollert opptak**
