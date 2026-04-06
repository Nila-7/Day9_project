function getProfile(){
    let username = document.getElementById("username").value.trim();
    if(username === ""){
        alert("Enter username");
        return;
    }
    document.getElementById("profile").innerHTML = "Loading...";
    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json()) 
    .then(data => {
        if (data.message === "Not Found"){
            document.getElementById("profile").innerHTML = "User not found";
            return;
        }
        document.getElementById("profile").innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar" class="avatar">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>Followers: ${data.followers} | Following: ${data.following}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>
        `;
    })
    .catch((error) => {
        console.error("Error fetching profile:", error);
        document.getElementById("profile").innerHTML = "Error fetching profile";
    });
}
document.getElementById("username").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getProfile();
    }
});