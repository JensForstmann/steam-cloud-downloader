# Steam Cloud Downloader

Download all files from the Steam Cloud for a specific game.



## Instructions

1. Go to this page with the correct `appid` (e.g. 730 for CS2): https://store.steampowered.com/account/remotestorageapp/?appid=730

2. Open the developer console and execute this JavaScript code:
    ```js
    (() => {
        let rows = [...document.getElementsByClassName("accountTable")[0].children[1].children];
        let files = rows.map(row => ({
            name: row.children[1].innerText,
            link: row.children[4].children[0].href
        }));
        let json = JSON.stringify(files, null, 4);
        let fileContent = "export const files = " + json + ";\n";
        let element = document.createElement("a");
        element.setAttribute("href", "data:text/javascript;charset=utf-8," + encodeURIComponent(fileContent));
        element.setAttribute("download", "files.mjs");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    })();
    ```

3. Save (overwrite) the file as `files.mjs`

4. Execute `node steam-cloud-downloader.mjs`

5. If there is more than one page of files on the Steam page:
   - Click on "next"
   - Repeat steps 2-4

The files will be saved in the `download` directory.
