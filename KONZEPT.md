# Personal Finance Dashboard - Konzept & Dokumentation

## Projektübersicht

Das Personal Finance Dashboard ist ein vollständiges Webprojekt zur Verwaltung persönlicher Finanzen, entwickelt mit reinem HTML, CSS (Tailwind) und Vanilla JavaScript - perfekt für ein Wirtschaftsinformatik-Portfolio.

---

## 1. Seiten/Views

### 1.1 Dashboard (index.html)
**Hauptseite der Anwendung**

Bereiche:
- **Navigation**: Links zu Dashboard & Info-Seite, Dark Mode Toggle
- **Zeitraum-Filter**: Vordefinierte und benutzerdefinierte Zeiträume
- **Statistik-Karten**: Gesamtausgaben, Transaktionsanzahl, Durchschnitt/Tag
- **Charts**: Kreisdiagramm (Kategorien) & Balkendiagramm (Zeitverlauf)
- **Eingabeformular**: Neue Ausgaben hinzufügen
- **Ausgabentabelle**: Alle Transaktionen mit Löschen-Funktion
- **Export**: CSV-Download-Button

### 1.2 Info-Seite (about.html)
**Dokumentations- und Informationsseite**

Inhalte:
- Projektübersicht und Ziele
- Tech-Stack Erklärung
- Feature-Liste
- Architektur-Beschreibung
- Schnellstart-Anleitung

---

## 2. HTML-Struktur

### 2.1 DOM-Hierarchie (index.html)

```
<body class="bg-gray-100 dark:bg-gray-900">
│
├── <nav> [Navigation]
│   ├── Logo & Titel
│   ├── Navigation Links (Dashboard, Info)
│   └── Theme Toggle Button (#theme-toggle)
│
├── <main> [Hauptinhalt]
│   │
│   ├── <header> [Seitentitel]
│   │
│   ├── <section> [Filter-Bereich]
│   │   ├── <select id="period-select">
│   │   ├── <div id="custom-date-range">
│   │   │   ├── <input id="start-date">
│   │   │   └── <input id="end-date">
│   │   └── <button id="apply-filter">
│   │
│   ├── <section> [Statistik-Karten]
│   │   ├── <div> Total (#total-expenses)
│   │   ├── <div> Anzahl (#transaction-count)
│   │   └── <div> Durchschnitt (#avg-per-day)
│   │
│   ├── <section> [Charts Grid]
│   │   ├── <div> Kreisdiagramm
│   │   │   └── <canvas id="category-pie-chart">
│   │   └── <div> Balkendiagramm
│   │       └── <canvas id="timeline-bar-chart">
│   │
│   ├── <section> [Formular]
│   │   └── <form id="expense-form">
│   │       ├── <input id="expense-description">
│   │       ├── <input id="expense-amount">
│   │       ├── <select id="expense-category">
│   │       ├── <input id="expense-date">
│   │       └── <button type="submit">
│   │
│   └── <section> [Tabelle]
│       ├── <button id="export-csv">
│       └── <table>
│           └── <tbody id="expenses-table-body">
│
└── <footer> [Footer]
```

### 2.2 Wichtige IDs und Klassen

#### IDs für JavaScript-Zugriff
```javascript
// Filter
#period-select          // Zeitraum-Auswahl
#custom-date-range     // Container für benutzerdefinierte Daten
#start-date            // Start-Datum Input
#end-date              // End-Datum Input
#apply-filter          // Filter anwenden Button

// Statistiken
#total-expenses        // Gesamtausgaben Anzeige
#transaction-count     // Anzahl Transaktionen
#avg-per-day          // Durchschnitt pro Tag

// Charts
#category-pie-chart    // Canvas für Kreisdiagramm
#timeline-bar-chart    // Canvas für Balkendiagramm

// Formular
#expense-form          // Formular Element
#expense-description   // Beschreibung Input
#expense-amount        // Betrag Input
#expense-category      // Kategorie Select
#expense-date          // Datum Input

// Tabelle & Export
#expenses-table-body   // Tbody für dynamische Zeilen
#export-csv           // CSV Export Button

// Theme
#theme-toggle         // Dark Mode Toggle Button
```

#### CSS-Klassen
```css
/* Navigation */
.nav-link              // Navigation Links
.nav-link.active       // Aktiver Link

/* Statistik-Karten */
.stats-card            // Statistik-Karte Container
.stats-icon            // Icon Container in Karte

/* Charts */
.chart-container       // Chart Canvas Container

/* Kategorien */
.category-badge        // Kategorie-Label in Tabelle

/* Buttons */
.delete-btn            // Löschen Button in Tabelle

/* Toast */
.toast                 // Benachrichtigungs-Toast
.toast.error          // Error Toast

/* Sonstiges */
.empty-state          // Leere Tabelle Anzeige
```

---

## 3. JavaScript Module & Funktionen

### 3.1 Modulübersicht

```
js/
├── app.js       [Application Bootstrap]
├── state.js     [State Management]
├── api.js       [Data Layer]
├── charts.js    [Visualization]
├── ui.js        [View Layer]
└── theme.js     [Theme Management]
```

### 3.2 state.js - State Management

**Verantwortung**: Zentrale Datenverwaltung, Observer Pattern

```javascript
class State {
    // Eigenschaften
    expenses           // Alle Ausgaben
    filteredExpenses   // Gefilterte Ausgaben
    currentFilter      // Aktueller Filter
    listeners          // Observer-Liste
    nextId            // Nächste ID
    
    // Hauptmethoden
    init(expenses)
    // Initialisiert State mit Daten
    
    addExpense(expense)
    // Fügt neue Ausgabe hinzu, aktualisiert Filter, benachrichtigt Observer
    
    deleteExpense(id)
    // Löscht Ausgabe, aktualisiert Filter, benachrichtigt Observer
    
    updateFilter(filter)
    // Aktualisiert Filter-Einstellungen, wendet Filter an
    
    applyFilter()
    // Filtert Ausgaben basierend auf currentFilter
    
    getFilterDates()
    // Berechnet Start- und Enddatum für verschiedene Zeiträume:
    // - current-month, last-month
    // - current-quarter, last-quarter
    // - current-year, custom
    
    getFilteredExpenses()
    // Gibt gefilterte Ausgaben zurück
    
    getStatistics()
    // Berechnet: total, count, avgPerDay, days
    
    getExpensesByCategory()
    // Gruppiert Ausgaben nach Kategorie
    // Returns: { "Lebensmittel": 150.50, "Miete": 750.00, ... }
    
    getExpensesByDate()
    // Gruppiert Ausgaben nach Datum
    // Returns: { "2024-01-15": 87.50, "2024-01-20": 24.00, ... }
    
    subscribe(listener)
    // Registriert Observer-Funktion
    
    notify()
    // Benachrichtigt alle Observer über Änderungen
}
```

**Observer Pattern Implementation**:
```javascript
// Module subscriben zu State-Änderungen
state.subscribe(() => {
    updateStatistics();
    updateExpensesTable();
    updateCharts();
});

// Jede Änderung triggert alle Listener
state.addExpense(newExpense); // → notify() → alle Listener
```

### 3.3 api.js - Daten-Handling

**Verantwortung**: Laden, Speichern, Export von Daten

```javascript
// JSON Import
async loadExpensesFromJSON(url = './data/expenses.json')
// - Lädt Daten von lokaler JSON-Datei oder URL
// - Returns: Array von Expense-Objekten
// - Error Handling: Gibt leeres Array zurück bei Fehler

async loadExpensesFromAPI(apiUrl)
// - Lädt Daten von REST-API
// - Unterstützt verschiedene Response-Formate
// - Throws: Error bei API-Fehlern

// Export
exportToJSON(expenses)
// - Konvertiert Ausgaben zu JSON-String
// - Formatiert mit 2 Spaces Einrückung

exportToCSV(expenses)
// - Konvertiert zu CSV-Format
// - Header: ID,Datum,Beschreibung,Kategorie,Betrag
// - Quoted Strings für Beschreibungen

downloadFile(content, filename, mimeType)
// - Erstellt Blob und triggert Browser-Download
// - Cleanup: Entfernt temporäre URLs

// LocalStorage
saveToLocalStorage(expenses)
// - Speichert Ausgaben im Browser
// - Key: 'finance-dashboard-expenses'

loadFromLocalStorage()
// - Lädt gespeicherte Ausgaben
// - Returns: Array oder null
```

**Datenfluss**:
```
Initialer Load:
localStorage → (falls vorhanden) → State
    ↓ (falls leer)
JSON-File → State

Bei Änderungen:
User Action → State Update → localStorage Save
```

### 3.4 charts.js - Chart.js Integration

**Verantwortung**: Diagramme initialisieren und aktualisieren

```javascript
// Globale Variablen
let pieChart = null     // Kreisdiagramm-Instanz
let barChart = null     // Balkendiagramm-Instanz

// Kategorie-Farben
const categoryColors = {
    'Lebensmittel': '#10B981',  // Grün
    'Miete': '#3B82F6',         // Blau
    'Freizeit': '#F59E0B',      // Amber
    'Transport': '#8B5CF6',     // Lila
    'Gesundheit': '#EF4444',    // Rot
    'Bildung': '#06B6D4',       // Cyan
    'Sonstiges': '#6B7280'      // Grau
}

// Hauptfunktionen
initPieChart()
// - Erstellt Kreisdiagramm für Kategorien
// - Konfiguration: Legend unten, Tooltips mit %
// - Dark Mode Support

updatePieChart()
// - Holt Daten von state.getExpensesByCategory()
// - Aktualisiert Labels, Daten, Farben
// - chart.update() für Neuzeichnung

initBarChart()
// - Erstellt Balkendiagramm für Zeitverlauf
// - X-Achse: Datum (DD.MM Format)
// - Y-Achse: Betrag (€)
// - Limitiert auf letzte 15 Einträge

updateBarChart()
// - Holt Daten von state.getExpensesByDate()
// - Sortiert nach Datum
// - Formatiert Datumsanzeige
// - chart.update() für Neuzeichnung

updateChartThemes()
// - Passt Farben für Dark/Light Mode an
// - Text-Farben, Grid-Farben, Border
// - Triggert update() auf beiden Charts

initCharts()
// - Wrapper: Initialisiert beide Charts
```

**Chart.js Konfiguration**:
```javascript
// Pie Chart
{
    type: 'pie',
    data: {
        labels: ['Lebensmittel', 'Miete', ...],
        datasets: [{
            data: [150.50, 750.00, ...],
            backgroundColor: [colors...],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: { 
                callbacks: { 
                    label: (ctx) => '€XX.XX (XX%)' 
                } 
            }
        }
    }
}

// Bar Chart
{
    type: 'bar',
    data: {
        labels: ['15.01', '20.01', ...],
        datasets: [{
            label: 'Ausgaben (€)',
            data: [87.50, 24.00, ...],
            backgroundColor: '#3B82F6',
            borderRadius: 4
        }]
    },
    options: {
        scales: {
            y: { 
                beginAtZero: true,
                ticks: { callback: (val) => '€' + val }
            }
        }
    }
}
```

### 3.5 ui.js - UI Updates & Event Handling

**Verantwortung**: DOM-Manipulation, Event Listener, User Feedback

```javascript
// Initialisierung
initUI()
// - Setzt Event Listener auf alle Buttons/Forms
// - Subscribt zu State-Änderungen
// - Initialisiert Default-Werte (heutiges Datum)

// Event Handler
handleExpenseSubmit(e)
// 1. Verhindert Default Form Submit
// 2. Liest alle Input-Werte
// 3. Ruft state.addExpense() auf
// 4. Reset Formular
// 5. Zeigt Success-Toast

handlePeriodChange(e)
// - Zeigt/Versteckt Custom Date Range
// - Wendet Filter bei Predefined Periods automatisch an

handleApplyFilter()
// - Validiert Custom Date Range
// - Ruft state.updateFilter() auf
// - Zeigt Toast-Benachrichtigung

handleExportCSV()
// - Holt gefilterte Ausgaben
// - Generiert CSV mit exportToCSV()
// - Triggert Download mit Timestamp im Namen

handleDeleteExpense(id)
// - Zeigt Bestätigungs-Dialog
// - Ruft state.deleteExpense() auf
// - Zeigt Success-Toast

// UI Update Funktionen
updateStatistics()
// - Holt Stats von state.getStatistics()
// - Aktualisiert DOM:
//   * #total-expenses → €XXX.XX
//   * #transaction-count → N
//   * #avg-per-day → €XX.XX

updateExpensesTable()
// - Holt gefilterte Ausgaben
// - Leert tbody
// - Sortiert nach Datum (neueste zuerst)
// - Erstellt Zeilen mit createExpenseRow()
// - Zeigt Empty State bei keinen Daten

createExpenseRow(expense)
// - Erstellt <tr> Element
// - Formatiert Datum (DD.MM.YYYY)
// - Fügt Kategorie-Badge mit Farbe hinzu
// - Fügt Löschen-Button mit Event Listener hinzu
// - Returns: <tr> Element

showToast(message, type)
// - Erstellt Toast-Element
// - Fügt zu body hinzu
// - Auto-Remove nach 3 Sekunden
// - Fade-Out Animation
```

**UI Update Flow**:
```
State Change → notify() → updateStatistics()
                       → updateExpensesTable()
                       → (in app.js) updateCharts()
```

### 3.6 theme.js - Dark Mode

**Verantwortung**: Theme-Verwaltung und Persistenz

```javascript
initTheme()
// 1. Checkt localStorage für gespeicherten Theme
// 2. Fallback: System Preference (prefers-color-scheme)
// 3. Wendet Theme an (adds/removes 'dark' class)
// 4. Setzt Event Listener auf Toggle Button

toggleTheme()
// 1. Checkt aktuellen Theme
// 2. Toggle 'dark' class auf <html>
// 3. Speichert in localStorage
// 4. Dispatcht 'themechange' Event für Charts

getCurrentTheme()
// - Returns: 'dark' oder 'light'
```

**Theme Implementierung**:
```css
/* Tailwind Dark Mode */
.dark .bg-gray-100  → .dark:bg-gray-900
.dark .text-gray-900 → .dark:text-white

/* Automatisch durch Tailwind 'dark:' Klassen */
```

### 3.7 app.js - Application Bootstrap

**Verantwortung**: Koordination aller Module

```javascript
async initApp()
// 1. initTheme() - Theme System
// 2. Load Data:
//    - Try localStorage first
//    - Fallback: JSON file
// 3. state.init(expenses)
// 4. initUI() - Event Listeners
// 5. initCharts() - Chart.js
// 6. Initial Render:
//    - updateStatistics()
//    - updateExpensesTable()
//    - updateCharts()
// 7. Listen to 'themechange' → updateChartThemes()
// 8. Error Handling: Zeigt Fehler-Message bei Problemen

// Auto-Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
```

---

## 4. Datenstruktur

### 4.1 Expense Object
```javascript
{
    id: 1,                              // Unique ID (Number)
    description: "Wocheneinkauf",       // String
    amount: 87.50,                      // Number (Float)
    category: "Lebensmittel",           // String (Enum)
    date: "2024-01-15"                  // String (YYYY-MM-DD)
}
```

### 4.2 Kategorien (Enum)
```javascript
[
    "Lebensmittel",
    "Miete",
    "Freizeit",
    "Transport",
    "Gesundheit",
    "Bildung",
    "Sonstiges"
]
```

### 4.3 Filter Object
```javascript
{
    period: "current-month",  // String (Enum)
    startDate: "2024-01-01",  // String | null
    endDate: "2024-01-31"     // String | null
}
```

### 4.4 Statistics Object
```javascript
{
    total: 1500.50,      // Number (Float)
    count: 15,           // Number (Integer)
    avgPerDay: 50.02,    // Number (Float)
    days: 30             // Number (Integer)
}
```

---

## 5. Erweiterungsvorschläge

### 5.1 Responsive Design
**Status**: ✅ Implementiert

- Tailwind Breakpoints: sm, md, lg
- Mobile-First Approach
- Flexible Grid Layouts
- Touch-Friendly Buttons

### 5.2 Dark Mode
**Status**: ✅ Implementiert

- localStorage Persistenz
- System Preference Detection
- Smooth Transitions
- Chart Theme Updates

### 5.3 CSV Export
**Status**: ✅ Implementiert

- Export gefilterte Daten
- Standard CSV Format
- Timestamp im Dateinamen
- Excel-Kompatibel

### 5.4 Weitere Vorschläge

**Kurzfristig**:
1. **Budget System**
   - Monatliche Budgets pro Kategorie
   - Fortschrittsbalken
   - Warnungen bei Überschreitung

2. **Erweiterte Filter**
   - Multi-Kategorie Select
   - Betrags-Range Filter
   - Volltext-Suche

3. **Mehr Charts**
   - Liniendiagramm für Trends
   - Vergleich zu Vormonat
   - Top-Ausgaben Ranking

**Mittelfristig**:
4. **Backend Integration**
   - REST API für Cloud-Sync
   - User Authentication
   - Multi-Device Support

5. **PWA Features**
   - Offline Functionality
   - App Installation
   - Push Notifications

6. **Import Funktionen**
   - CSV Import
   - Bank Statement Parser
   - Drag & Drop Upload

**Langfristig**:
7. **ML Features**
   - Automatische Kategorisierung
   - Ausgaben-Prognosen
   - Anomalie-Erkennung

8. **Erweiterte Analytics**
   - Jahresvergleiche
   - Spar-Potenzial Analyse
   - Finanz-Reports

---

## 6. Technische Details

### 6.1 Browser Kompatibilität
- Chrome/Edge: ✅ (Getestet)
- Firefox: ✅ (ES6 Modules Support)
- Safari: ✅ (iOS 11+)
- IE11: ❌ (ES6 nicht unterstützt)

### 6.2 Abhängigkeiten
**CDN Resources**:
- Tailwind CSS 2.2.19
- Chart.js 4.4.0
- Font Awesome 6.4.0

**Lokal**:
- Keine Build Tools
- Keine npm packages
- Reine Browser APIs

### 6.3 Performance
- Lazy Loading: Nicht nötig (kleine App)
- Debouncing: Bei Filter-Updates möglich
- Pagination: Bei >100 Ausgaben empfohlen

### 6.4 Sicherheit
- XSS: Input Sanitization durch DOM APIs
- CSRF: Nicht relevant (Client-Only)
- LocalStorage: Nur nicht-sensitive Daten

---

## 7. Deployment

### 7.1 Statisches Hosting
**GitHub Pages**:
```bash
# Settings → Pages → Source: main branch
# URL: https://username.github.io/repo-name
```

**Netlify**:
```bash
# Drag & Drop Ordner auf netlify.com
# Oder: netlify-cli
netlify deploy --prod
```

**Vercel**:
```bash
vercel --prod
```

### 7.2 Mit Backend
Für REST-API Integration:
```javascript
// In api.js anpassen:
const API_URL = 'https://api.example.com';
await loadExpensesFromAPI(API_URL + '/expenses');
```

---

## 8. Testing

### 8.1 Manuelle Tests
**Checklist**:
- [ ] Seite lädt ohne Fehler
- [ ] Beispieldaten werden angezeigt
- [ ] Charts werden gerendert
- [ ] Neue Ausgabe hinzufügen funktioniert
- [ ] Filter funktionieren
- [ ] Ausgabe löschen funktioniert
- [ ] CSV Export funktioniert
- [ ] Dark Mode Toggle funktioniert
- [ ] Responsive auf Mobile
- [ ] LocalStorage speichert Daten

### 8.2 Test-Script
```bash
# Core Logic Tests
node test-logic.js
```

### 8.3 Browser DevTools
```javascript
// Console Tests:
state.getStatistics()
state.getExpensesByCategory()
state.getFilteredExpenses()
```

---

## 9. Lizenz & Credits

**Lizenz**: MIT (Frei verwendbar)

**Entwickelt mit**:
- HTML5, CSS3, JavaScript ES6+
- Tailwind CSS (Styling)
- Chart.js (Visualisierung)
- Font Awesome (Icons)

**Zweck**: Wirtschaftsinformatik Portfolio-Projekt

---

**Ende der Dokumentation**

Für Fragen oder Feedback: Siehe README.md
