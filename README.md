# Personal Finance Dashboard

Ein modernes, interaktives Dashboard zur Verwaltung persönlicher Finanzen

![Dashboard Preview](https://img.shields.io/badge/Status-Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Inhaltsverzeichnis

- [Übersicht](#übersicht)
- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Projektstruktur](#projektstruktur)
- [Architektur](#architektur)
- [Erweiterungen](#erweiterungen)
- [Lizenz](#lizenz)

## 🎯 Übersicht

Das Personal Finance Dashboard ist eine Single-Page-Application (SPA), die es Benutzern ermöglicht, ihre Ausgaben zu verwalten, zu kategorisieren und visuell auszuwerten. Das Projekt demonstriert moderne Webentwicklung ohne große Frameworks und ist ideal für ein GitHub-Portfolio geeignet.

### Hauptziele

- **Einfachheit**: Keine komplexen Build-Tools oder Frameworks erforderlich
- **Modularität**: Saubere Trennung von Zuständigkeiten
- **Benutzerfreundlichkeit**: Intuitive Bedienung und ansprechendes Design
- **Portfolio-ready**: Professioneller Code mit ausführlicher Dokumentation

## ✨ Features

### Kernfunktionen

- ✅ **Kategorisierte Ausgaben**: Verwaltung von Ausgaben in sieben Kategorien
  - Lebensmittel
  - Miete
  - Freizeit
  - Transport
  - Gesundheit
  - Bildung
  - Sonstiges

- ✅ **Flexible Zeitraum-Filter**
  - Aktueller Monat
  - Letzter Monat
  - Aktuelles Quartal
  - Letztes Quartal
  - Aktuelles Jahr
  - Benutzerdefinierter Zeitraum

- ✅ **Interaktive Datenvisualisierung**
  - Kreisdiagramm für Kategorieverteilung
  - Balkendiagramm für zeitlichen Verlauf
  - Powered by Chart.js

- ✅ **Datenverwaltung**
  - Laden von JSON-Daten (lokal oder via REST-API)
  - Automatisches Speichern in LocalStorage
  - CSV-Export für externe Analysen

- ✅ **Benutzerfreundlichkeit**
  - Einfaches Eingabeformular für neue Ausgaben
  - Sofortige Aktualisierung aller Ansichten
  - Löschen einzelner Ausgaben
  - Toast-Benachrichtigungen für Benutzeraktionen

### Erweiterte Features

- ✅ **Dark Mode**: Umschalten zwischen hellem und dunklem Design
- ✅ **Responsive Design**: Optimiert für Desktop, Tablet und Smartphone
- ✅ **LocalStorage-Integration**: Persistente Datenspeicherung im Browser
- ✅ **Statistiken**: Gesamtausgaben, Transaktionsanzahl, Durchschnitt pro Tag

## 🛠 Tech-Stack

### Frontend

| Technologie | Verwendung | Warum? |
|------------|------------|--------|
| **HTML5** | Semantische Struktur | Standard, zugänglich, SEO-freundlich |
| **Tailwind CSS** | Styling & Layout | Utility-First, schnell, anpassbar |
| **Vanilla JavaScript (ES6+)** | Geschäftslogik | Native Features, keine Framework-Abhängigkeiten |
| **Chart.js** | Datenvisualisierung | Einfach, performant, gut dokumentiert |
| **Font Awesome** | Icons | Umfangreiche Icon-Bibliothek |

### Architektur-Prinzipien

- **ES6 Modules**: Modularer, wartbarer Code
- **State Management**: Zentrale Zustandsverwaltung
- **Observer Pattern**: Reaktive UI-Updates
- **Separation of Concerns**: Klare Verantwortlichkeiten

## 📦 Installation

### Voraussetzungen

Keine! Das Projekt läuft direkt im Browser ohne Build-Prozess.

### Schnellstart

1. **Repository klonen**
   ```bash
   git clone https://github.com/kabaediz/Personal-Finance-Dashboard.git
   cd Personal-Finance-Dashboard
   ```

2. **Option A: Direkt im Browser öffnen**
   ```bash
   # Einfach die index.html im Browser öffnen
   open index.html
   # oder
   start index.html
   # oder per Doppelklick
   ```

3. **Option B: Mit lokalem Webserver (empfohlen)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (npx)
   npx http-server
   
   # Node.js (Live Server)
   npx live-server
   ```
   
   Dann im Browser öffnen: `http://localhost:8000`

4. **Option C: VS Code Live Server**
   - Live Server Extension installieren
   - Rechtsklick auf `index.html`
   - "Open with Live Server" auswählen

## 💻 Verwendung

### Dashboard-Übersicht

Das Dashboard zeigt eine umfassende Übersicht Ihrer Finanzen:

1. **Navigation**: Wechseln zwischen Dashboard und Info-Seite
2. **Zeitraum-Filter**: Wählen Sie den gewünschten Zeitraum
3. **Statistiken**: Sehen Sie Gesamtausgaben, Transaktionen und Durchschnittswerte
4. **Charts**: Visuellen Überblick über Kategorien und Zeitverlauf
5. **Neue Ausgabe**: Fügen Sie einfach neue Ausgaben hinzu
6. **Ausgabenliste**: Alle Transaktionen in übersichtlicher Tabelle

### Neue Ausgabe hinzufügen

1. Scrollen Sie zum Formular "Neue Ausgabe hinzufügen"
2. Füllen Sie alle Felder aus:
   - Beschreibung (z.B. "Wocheneinkauf")
   - Betrag in Euro
   - Kategorie auswählen
   - Datum wählen
3. Klicken Sie auf "Hinzufügen"
4. Die Ausgabe erscheint sofort in allen Ansichten

### Daten filtern

1. Wählen Sie einen vordefinierten Zeitraum oder "Benutzerdefiniert"
2. Bei benutzerdefiniert: Start- und Enddatum eingeben
3. Klicken Sie auf "Anwenden"
4. Alle Ansichten werden automatisch aktualisiert

### Daten exportieren

1. Klicken Sie auf "Als CSV exportieren"
2. Die gefilterten Daten werden als CSV-Datei heruntergeladen
3. Öffnen Sie die Datei in Excel, Google Sheets oder einem Texteditor

### Dark Mode

- Klicken Sie auf das Mond/Sonnen-Icon in der Navigation
- Der Modus wird in LocalStorage gespeichert
- Ihre Einstellung bleibt beim nächsten Besuch erhalten

## 📁 Projektstruktur

```
Personal-Finance-Dashboard/
├── index.html              # Hauptseite (Dashboard)
├── about.html              # Info-Seite
├── css/
│   └── styles.css         # Custom CSS Styles
├── js/
│   ├── app.js            # Haupteinstiegspunkt
│   ├── state.js          # State-Management
│   ├── api.js            # Daten-Handling & Export
│   ├── charts.js         # Chart.js Integration
│   ├── ui.js             # DOM-Manipulation
│   └── theme.js          # Dark Mode Management
├── data/
│   └── expenses.json     # Beispieldaten
└── README.md             # Diese Datei
```

## 🏗 Architektur

### Module und Verantwortlichkeiten

#### 1. **app.js** - Application Bootstrap
- Koordiniert alle Module
- Initialisiert die Anwendung
- Lädt initiale Daten
- Error Handling

#### 2. **state.js** - State Management
- Zentrale Datenverwaltung
- Observer Pattern Implementation
- Filter-Logik
- Berechnungen und Statistiken

**Wichtige Methoden:**
```javascript
state.init(expenses)              // Initialisierung
state.addExpense(expense)         // Ausgabe hinzufügen
state.deleteExpense(id)           // Ausgabe löschen
state.updateFilter(filter)        // Filter aktualisieren
state.getFilteredExpenses()       // Gefilterte Daten abrufen
state.getStatistics()             // Statistiken berechnen
```

#### 3. **api.js** - Data Layer
- JSON Import/Export
- LocalStorage-Integration
- CSV-Export
- REST-API Support

**Wichtige Methoden:**
```javascript
loadExpensesFromJSON(url)         // JSON laden
exportToCSV(expenses)             // CSV generieren
downloadFile(content, filename)   // Download triggern
saveToLocalStorage(expenses)      // Daten speichern
loadFromLocalStorage()            // Daten laden
```

#### 4. **charts.js** - Data Visualization
- Chart.js Integration
- Chart Initialization
- Data Update Logic
- Theme-responsive Charts

**Wichtige Methoden:**
```javascript
initCharts()                      // Charts initialisieren
updateCharts()                    // Charts aktualisieren
updateChartThemes()               // Theme für Charts anpassen
```

#### 5. **ui.js** - View Layer
- DOM-Manipulation
- Event Handling
- UI-Updates
- User Feedback (Toasts)

**Wichtige Methoden:**
```javascript
initUI()                          // UI initialisieren
updateStatistics()                // Statistiken aktualisieren
updateExpensesTable()             // Tabelle rendern
showToast(message, type)          // Benachrichtigung anzeigen
```

#### 6. **theme.js** - Theme Management
- Dark/Light Mode Toggle
- LocalStorage Persistence
- System Preference Detection

**Wichtige Methoden:**
```javascript
initTheme()                       // Theme initialisieren
toggleTheme()                     // Theme wechseln
getCurrentTheme()                 // Aktuelles Theme abrufen
```

### Datenfluss

```
User Input → UI Event Handler → State Update → 
Observer Notification → UI/Charts Update → LocalStorage Save
```

### State Management Pattern

Das Projekt verwendet ein einfaches Observer Pattern:

1. Module subscriben zu State-Änderungen
2. State notifiziert alle Listener bei Änderungen
3. UI und Charts aktualisieren sich automatisch

```javascript
// Subscribe to changes
state.subscribe(() => {
    updateUI();
    updateCharts();
});

// Trigger update
state.addExpense(newExpense); // Notifies all subscribers
```

## 🎨 DOM-Struktur

### Dashboard (index.html)

```html
<body>
  <nav>                          <!-- Navigation -->
    - Logo & Title
    - Page Links (Dashboard, Info)
    - Theme Toggle
  </nav>
  
  <main>
    <header>                     <!-- Page Header -->
    
    <section id="filters">       <!-- Time Period Filters -->
      - Period Select
      - Custom Date Range
      - Apply Button
    </section>
    
    <section id="statistics">    <!-- Statistics Cards -->
      - Total Expenses
      - Transaction Count
      - Average per Day
    </section>
    
    <section id="charts">        <!-- Data Visualization -->
      - Pie Chart (Categories)
      - Bar Chart (Timeline)
    </section>
    
    <section id="form">          <!-- Add Expense Form -->
      - Description Input
      - Amount Input
      - Category Select
      - Date Input
      - Submit Button
    </section>
    
    <section id="table">         <!-- Expenses Table -->
      - Table Headers
      - Dynamic Rows
      - Delete Buttons
      - Export Button
    </section>
  </main>
  
  <footer>                       <!-- Footer -->
</body>
```

### Wichtige IDs & Klassen

| Element | ID/Class | Verwendung |
|---------|----------|------------|
| Zeitraum-Select | `#period-select` | Filter-Auswahl |
| Start-Datum | `#start-date` | Benutzerdefinierter Filter |
| End-Datum | `#end-date` | Benutzerdefinierter Filter |
| Filter-Button | `#apply-filter` | Filter anwenden |
| Gesamt | `#total-expenses` | Statistik-Anzeige |
| Anzahl | `#transaction-count` | Statistik-Anzeige |
| Durchschnitt | `#avg-per-day` | Statistik-Anzeige |
| Kreisdiagramm | `#category-pie-chart` | Chart Canvas |
| Balkendiagramm | `#timeline-bar-chart` | Chart Canvas |
| Formular | `#expense-form` | Expense Input |
| Tabelle Body | `#expenses-table-body` | Dynamic Content |
| Export Button | `#export-csv` | CSV Download |
| Theme Toggle | `#theme-toggle` | Dark Mode |

## 🚀 Erweiterungen

Das Projekt kann um folgende Features erweitert werden:

### Kurzfristige Erweiterungen

1. **Budget-Verwaltung**
   - Monatliche Budgets pro Kategorie
   - Warnung bei Budgetüberschreitung
   - Fortschrittsbalken

2. **Erweiterte Filter**
   - Mehrfach-Kategorieauswahl
   - Betragsbereich-Filter
   - Textsuche in Beschreibungen

3. **Zusätzliche Charts**
   - Liniendiagramm für Trends
   - Stacked Bar Chart für Kategorien
   - Monatlicher Vergleich

4. **Daten-Import**
   - CSV-Import
   - Drag & Drop JSON-Upload
   - Bank-Statement Parser

### Mittelfristige Erweiterungen

5. **Backend-Integration**
   - REST API für Multi-Device Sync
   - Benutzer-Authentifizierung
   - Cloud-Speicherung

6. **Erweiterte Analytics**
   - Trend-Analyse
   - Prognosen
   - Vergleich zu Vorperioden

7. **Wiederholende Ausgaben**
   - Automatische monatliche Einträge
   - Template-System
   - Erinnerungen

8. **Multi-Währung Support**
   - Währungsauswahl
   - Automatische Konvertierung
   - Wechselkurs-Integration

### Langfristige Erweiterungen

9. **Progressive Web App (PWA)**
   - Offline-Funktionalität
   - App Installation
   - Push-Benachrichtigungen

10. **Erweiterte Features**
    - Einnahmen-Tracking
    - Vermögensverwaltung
    - Spar-Ziele
    - Automatische Kategorisierung (ML)

## 📝 Verwendete Konzepte

### JavaScript Konzepte

- ✅ ES6 Modules
- ✅ Classes
- ✅ Arrow Functions
- ✅ Template Literals
- ✅ Destructuring
- ✅ Spread Operator
- ✅ Promises & Async/Await
- ✅ Array Methods (map, filter, reduce)
- ✅ LocalStorage API
- ✅ Fetch API
- ✅ Event Handling
- ✅ DOM Manipulation

### Design Patterns

- ✅ Observer Pattern (State Management)
- ✅ Module Pattern (ES6 Modules)
- ✅ Singleton Pattern (State Instance)
- ✅ Factory Pattern (Table Row Creation)

### Best Practices

- ✅ Separation of Concerns
- ✅ DRY (Don't Repeat Yourself)
- ✅ Clean Code
- ✅ Kommentierte Funktionen
- ✅ Error Handling
- ✅ Responsive Design
- ✅ Accessibility (Semantic HTML)


## 📄 Lizenz

MIT License - Frei verwendbar für Portfolio und Lernzwecke.


## 🙏 Danksagungen

- **Tailwind CSS** - Utility-First CSS Framework
- **Chart.js** - Simple yet flexible JavaScript charting
- **Font Awesome** - Vector icons and social logos

---
