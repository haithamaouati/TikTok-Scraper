function fetchUserInfo() {
    let username = document.getElementById("username").value;
    let url = `https://www.tiktok.com/@${username}?isUniqueId=true&isSecured=true`;

    fetch(url)
    .then(response => response.text())
    .then(html => {
        let info = {};

        // Extracting data from HTML using regular expressions
        let regex = /"uniqueId":"([^"]+)"/;
        let match = html.match(regex);
        if (match) info.Username = match[1];

        regex = /"id":"([^"]+)"/;
        match = html.match(regex);
        if (match) info.ID = match[1];

        regex = /"nickname":"([^"]+)"/;
        match = html.match(regex);
        if (match) info.Name = match[1];

        regex = /"signature":"([^"]+)"/;
        match = html.match(regex);
        if (match) info.Bio = match[1];

        regex = /"followerCount":(\d+)/;
        match = html.match(regex);
        if (match) info.Followers = match[1];

        regex = /"followingCount":(\d+)/;
        match = html.match(regex);
        if (match) info.Following = match[1];

        regex = /"heartCount":(\d+)/;
        match = html.match(regex);
        if (match) info.Likes = match[1];

        regex = /"videoCount":(\d+)/;
        match = html.match(regex);
        if (match) info.Videos = match[1];

        regex = /"friendCount":(\d+)/;
        match = html.match(regex);
        if (match) info.Friends = match[1];

        regex = /"region":"([^"]+)",.*"region":"([^"]+)"/;
        match = html.match(regex);
        if (match) info.Country = match[2];

        regex = /"language":"([^"]+)",.*"language":"([^"]+)"/;
        match = html.match(regex);
        if (match) info.Language = match[2];

        regex = /"verified":(true|false)/;
        match = html.match(regex);
        if (match) info['Is Verified'] = match[1] === "true" ? "Yes" : "No";

        regex = /"privateAccount":(true|false)/;
        match = html.match(regex);
        if (match) info['Is Private'] = match[1] === "true" ? "Yes" : "No";

        // Constructing the result HTML
        let result = "<div>";
        for (let key in info) {
            result += `<p><strong>${key}:</strong> ${info[key]}</p>`;
        }
        result += "</div>";

        document.getElementById("userInfoContainer").innerHTML = result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
