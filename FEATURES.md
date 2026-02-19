# 🎯 Personal Finance Dashboard - Features Overview

## 📱 User Interface

### Dashboard (index.html)
```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Finance Dashboard              Dashboard | Info | 🌙     │
├─────────────────────────────────────────────────────────────┤
│  Finanzübersicht                                             │
│  Verwalten und analysieren Sie Ihre Ausgaben                │
├─────────────────────────────────────────────────────────────┤
│  🔍 Zeitraum-Filter                                          │
│  [Aktueller Monat ▼]  [Von: ____] [Bis: ____]  [Anwenden]  │
├─────────────────────────────────────────────────────────────┤
│  💰 Gesamtausgaben  |  📊 Transaktionen  |  📈 Ø pro Tag    │
│     €1,234.56      |        15          |    €41.15        │
├─────────────────────────────────────────────────────────────┤
│  📊 Ausgaben nach Kategorie    |  📈 Ausgaben im Zeitverlauf│
│  ┌─────────────────────────┐  |  ┌──────────────────────┐  │
│  │   [Kreisdiagramm]       │  |  │  [Balkendiagramm]    │  │
│  │   - Lebensmittel 25%    │  |  │   ▄  ▄  ▄           │  │
│  │   - Miete 45%           │  |  │  ▄█▄▄█▄▄█▄          │  │
│  │   - Freizeit 15%        │  |  │ ▄███████████        │  │
│  │   - Transport 10%       │  |  │ ████████████        │  │
│  │   - Sonstiges 5%        │  |  │                      │  │
│  └─────────────────────────┘  |  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ➕ Neue Ausgabe hinzufügen                                  │
│  [Beschreibung] [Betrag €] [Kategorie ▼] [Datum] [+Hinzufügen] │
├─────────────────────────────────────────────────────────────┤
│  📋 Alle Ausgaben                      [⬇️ Als CSV exportieren]│
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Datum      Beschreibung    Kategorie    Betrag  🗑️  │    │
│  │ 15.02.24   Einkauf        Lebensmittel €50.00  [X] │    │
│  │ 01.02.24   Miete          Miete        €750.00 [X] │    │
│  │ 10.02.24   Kino           Freizeit     €24.00  [X] │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Features Breakdown

### 1️⃣ Expense Management
**Add Expenses**
- ✅ Beschreibung (Text)
- ✅ Betrag (Number with €)
- ✅ Kategorie (Dropdown)
- ✅ Datum (Date Picker)
- ✅ Validierung
- ✅ Instant Update

**Delete Expenses**
- ✅ Löschen Button per Zeile
- ✅ Bestätigungs-Dialog
- ✅ Sofortige UI-Aktualisierung

### 2️⃣ Categories (7)
```
🥗 Lebensmittel  → Grün   (#10B981)
🏠 Miete         → Blau   (#3B82F6)
🎮 Freizeit      → Amber  (#F59E0B)
🚗 Transport     → Lila   (#8B5CF6)
💊 Gesundheit    → Rot    (#EF4444)
📚 Bildung       → Cyan   (#06B6D4)
📦 Sonstiges     → Grau   (#6B7280)
```

### 3️⃣ Time Filters (6 Options)
```
📅 Aktueller Monat    → Automatisch berechnet
📅 Letzter Monat      → Vorheriger Monat
📅 Aktuelles Quartal  → Q1/Q2/Q3/Q4
📅 Letztes Quartal    → Vorheriges Quartal
📅 Aktuelles Jahr     → 01.01 - 31.12
📅 Benutzerdefiniert  → Frei wählbar
```

**Filter Logic:**
- Start- und Enddatum werden automatisch berechnet
- Bei "Custom": Manuelle Datumseingabe
- Alle Ansichten (Stats, Charts, Tabelle) werden gefiltert

### 4️⃣ Data Visualization

**Kreisdiagramm (Pie Chart)**
- Zeigt Prozentuale Verteilung der Kategorien
- Farbcodiert nach Kategorie
- Interaktive Tooltips mit € und %
- Legend unten
- Dark Mode Support

**Balkendiagramm (Bar Chart)**
- Zeigt Ausgaben im Zeitverlauf
- X-Achse: Datum (DD.MM)
- Y-Achse: Betrag (€)
- Limitiert auf letzte 15 Einträge
- Responsive
- Dark Mode Support

### 5️⃣ Statistics Dashboard

**Gesamtausgaben**
- Summe aller gefilterten Ausgaben
- Format: €1,234.56
- Icon: 💰

**Transaktionsanzahl**
- Anzahl gefilterter Ausgaben
- Format: 15
- Icon: 📊

**Durchschnitt pro Tag**
- Total / Tage im Zeitraum
- Format: €41.15
- Icon: 📈

### 6️⃣ Export Functionality

**CSV Export**
- Format: ID,Datum,Beschreibung,Kategorie,Betrag
- Nur gefilterte Daten
- Timestamp im Dateinamen
- Excel-kompatibel
- Download via Browser

**Beispiel CSV:**
```csv
ID,Datum,Beschreibung,Kategorie,Betrag
1,2024-01-15,"Wocheneinkauf",Lebensmittel,87.50
2,2024-01-01,"Monatsmiete",Miete,750.00
```

### 7️⃣ Dark Mode

**Features:**
- Toggle Button in Navigation
- Smooth Transitions (300ms)
- LocalStorage Persistenz
- System Preference Detection
- Charts passen sich an
- Alle Farben optimiert

**Implementierung:**
```css
/* Light Mode */
.bg-gray-100, .text-gray-900

/* Dark Mode */
.dark:bg-gray-900, .dark:text-white
```

### 8️⃣ Responsive Design

**Breakpoints:**
```
Mobile:  < 640px  (sm)
Tablet:  640-768px (md)
Desktop: > 1024px (lg)
```

**Anpassungen:**
- Navigation: Stack auf Mobile
- Filters: Column Layout auf Mobile
- Charts: Höhe angepasst
- Table: Horizontales Scrolling
- Stats Cards: Stack auf Mobile

### 9️⃣ Data Persistence

**LocalStorage:**
- Key: `finance-dashboard-expenses`
- Automatisches Speichern bei Änderungen
- Laden beim Start
- Fallback zu JSON-File

**Theme Persistence:**
- Key: `theme`
- Values: `light` | `dark`

### 🔟 User Feedback

**Toast Notifications:**
- Success (Grün): Ausgabe hinzugefügt, Filter angewendet
- Error (Rot): Validierungsfehler
- Auto-Dismiss nach 3 Sekunden
- Slide-In Animation

**Empty States:**
- Keine Ausgaben gefunden
- Icon + Text
- Hilfetext

## 🎯 User Flows

### Flow 1: Neue Ausgabe hinzufügen
```
1. Formular ausfüllen
   ↓
2. "Hinzufügen" klicken
   ↓
3. Validierung
   ↓
4. State Update → notify()
   ↓
5. UI Update (Stats, Charts, Table)
   ↓
6. LocalStorage Save
   ↓
7. Toast: "Ausgabe erfolgreich hinzugefügt!"
```

### Flow 2: Filter anwenden
```
1. Zeitraum auswählen
   ↓
2. (Optional) Custom Dates eingeben
   ↓
3. "Anwenden" klicken
   ↓
4. State.updateFilter()
   ↓
5. Filter anwenden (Datum-Range)
   ↓
6. notify() → UI Updates
   ↓
7. Charts & Table aktualisiert
```

### Flow 3: Ausgabe löschen
```
1. "Löschen" Button klicken
   ↓
2. Bestätigungs-Dialog
   ↓
3. Bestätigen
   ↓
4. State.deleteExpense()
   ↓
5. notify() → UI Updates
   ↓
6. LocalStorage Save
   ↓
7. Toast: "Ausgabe gelöscht"
```

### Flow 4: CSV exportieren
```
1. "Als CSV exportieren" klicken
   ↓
2. Gefilterte Daten holen
   ↓
3. Validierung (min. 1 Ausgabe)
   ↓
4. CSV generieren
   ↓
5. Dateiname mit Timestamp
   ↓
6. Browser-Download
   ↓
7. Toast: "CSV-Export erfolgreich!"
```

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────┐
│              APPLICATION START                   │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
    ┌───────────────────────┐
    │  Load from            │
    │  1. localStorage      │
    │  2. JSON file         │
    └───────────┬───────────┘
                │
                ↓
    ┌───────────────────────┐
    │  state.init(expenses) │
    └───────────┬───────────┘
                │
                ↓
    ┌───────────────────────┐
    │  Initial Render       │
    │  - Stats              │
    │  - Charts             │
    │  - Table              │
    └───────────┬───────────┘
                │
                ↓
    ┌───────────────────────┐
    │  Listen to Events     │
    └───────────┬───────────┘
                │
        ┌───────┴────────┐
        │                │
        ↓                ↓
┌───────────────┐  ┌────────────────┐
│ User Actions  │  │ State Changes  │
│ - Add         │  │ → notify()     │
│ - Delete      │  │ → UI Updates   │
│ - Filter      │  │ → LocalStorage │
└───────────────┘  └────────────────┘
```

## 📐 Architecture

```
┌─────────────────────────────────────────┐
│              app.js                     │
│         (Koordination)                  │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ↓         ↓         ↓
┌─────┐   ┌──────┐   ┌──────┐
│State│   │ UI   │   │Charts│
│     │←──│      │←──│      │
└──┬──┘   └──────┘   └──────┘
   │
   ↓
┌──────┐
│ API  │
│      │
└──────┘
```

## 🎓 Learning Value

### JavaScript Concepts Demonstrated
✅ ES6 Modules
✅ Classes & OOP
✅ Observer Pattern
✅ Async/Await
✅ Array Methods
✅ DOM Manipulation
✅ Event Handling
✅ LocalStorage API
✅ Fetch API

### Web Development Skills
✅ Semantic HTML
✅ CSS Frameworks
✅ Responsive Design
✅ Dark Mode
✅ Data Visualization
✅ State Management
✅ UX Best Practices

---

**All features working and tested! ✅**
