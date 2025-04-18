function loadJSON() {
    fetch("json-data/albums.json")
        .then(response => response.json())
        .then(jsonData => {
            generateTable(jsonData);
        })
        .catch(error => {
            console.error("Fejl i at indlæse JSON filen:", error);
        });
}

function generateTable(json) {
    const table = document.getElementById("jsonTable");

    if (!json.length) {
        table.innerHTML = "<tr><td colspan='100%'>Ingen data er tilgængeligt</td></tr>";
        return;
    }

    const selectedFields = ["albumName", "artistName", "productionYear", "favorites"];

    // Tabelhoved
    let headerRow = "<tr>";
    for (let i = 0; i < selectedFields.length; i++) {
        headerRow += "<th>" + selectedFields[i] + "</th>";
    }
    headerRow += "</tr>";

    // Tabelrækker
    let rows = "";
    for (let i = 0; i < json.length; i++) {
        // de 4 ønskede felter
        const album = {
            albumName: json[i].albumName,
            artistName: json[i].artistName,
            productionYear: json[i].productionYear,
            favorites: json[i].favorites
        };

        let row = "<tr>";
        for (let j = 0; j < selectedFields.length; j++) {
            let field = selectedFields[j];
            row += "<td>" + album[field] + "</td>";
        }
        row += "</tr>";
        rows += row;
    }

    table.innerHTML = headerRow + rows;
}

window.onload = loadJSON;