const fs = require('fs');

async function fetchChadsoft() {
    let url = "https://tt.chadsoft.co.uk/ctgp-leaderboards.json";
    let response = await fetch(url);
    let data = await response.json();
    let urlList = [];

    for(i=0;i<data["leaderboards"].length;i++) {
        urlList.push("https://tt.chadsoft.co.uk" + data["leaderboards"][`${i}`]["_links"]["item"]["href"]+'?limit=1');
    }

    let fetches = await urlList.map(url => fetch(url).then(res => res.json()));
    let results = await Promise.allSettled(fetches);
    let main = {
        leaderboards: data["leaderboards"],
        lastUpdated: new Date()
    };

    fs.writeFile("Backup_150CTGP.json", JSON.stringify(main), (err) => {
        if (err) {
          console.error("Error writing 150CTGP JSON to file:", err);
        } else {
          console.log("150CTGP JSON data written to file successfully.");
        }
    });

    fs.writeFile("Records_150CTGP.json", JSON.stringify(results), (err) => {
        if (err) {
          console.error("Error writing 150CTGP JSON to file:", err);
        } else {
          console.log("150CTGP JSON data written to file successfully.");
        }
    });
}

fetchChadsoft();