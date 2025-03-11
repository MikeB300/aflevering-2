async function loadJSON() {
    try {
        const response = await fetch("json-data/albums.json");  // Hent JSON-filen
        const jsonData = await response.json();  // Konverter JSON til et objekt
        generateTable(jsonData);  // Generer tabellen med de ønskede felter
    } catch (error) {
        console.error("Fejl i at indlæse JSON filen:", error);  // Hvis noget hvis det går galt, logges en fejl
    }
}

function generateTable(json) {
    const table = document.getElementById("jsonTable");

    // Tjek at data'en er der
    if (!json.length) {
        table.innerHTML = "<tr><td colspan='100%'>Ingen data er tilgængeligt</td></tr>";
        return;
    }

    // Vælg de ønskede felter til tabellen her!
    const selectedFields = ["albumName", "artistName", "productionYear", "favorites"];

    
// Lav tabelhovedet
let headerRow = "<tr>";

// Loop gennem selectedFields og lav hver <th> cell
for (let i = 0; i < selectedFields.length; i++) {
    headerRow += "<th>" + selectedFields[i] + "</th>";  // Tilføj hver <th> til headerRow
}

headerRow += "</tr>";  // Afslut tabelhovedet

// Lav tabelrækker
let rows = "";

// Loop gennem hver objekt i JSON
for (let i = 0; i < json.length; i++) {
    let row = "<tr>";  // Start tabelrækken

    // Loop gennem de felter, vi har valgt
    for (let j = 0; j < selectedFields.length; j++) {
        let field = selectedFields[j];
        row += "<td>" + json[i][field] + "</td>";  // Tilføj data for hvert felt
    }

    row += "</tr>";  // Afslut tabelrækken
    rows += row;  // Tilføj rækken til alle rækker
}


    // Sæt HTML for tabellen
    table.innerHTML = headerRow + rows;
}

// Load json når siden indlæses
window.onload = loadJSON;