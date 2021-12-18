const searchButton = document.getElementById("searchButton");
const username = document.getElementById("username");
const mode = document.getElementById("mode");

const avatar = document.getElementById("avatar");
const avatar_inner = document.getElementById("avatar_inner");
const user_name = document.getElementById("name");
const login = document.getElementById("login");
const created_at = document.getElementById("created_at");
const created_at_inner = document.getElementById("created_at_inner");
const bio = document.getElementById("bio");
const public_repos = document.getElementById("public_repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const my_location = document.getElementById("location");
const blog = document.getElementById("blog");
const twitter_username = document.getElementById("twitter_username");
const company = document.getElementById("company");

const errorBox = document.getElementById("error");
const mainBox = document.getElementById("mainBox");

searchButton.addEventListener("click", () => {
  if (!username.value) {
    username.focus();
    return;
  }
  fetch(`https://api.github.com/users/${username.value}`)
    .then(async (data) => {
      if (!data.ok) {
        errorBox.innerHTML = "<h2>user does not exist.</h2>";
        errorBox.style.display = "block";
        mainBox.style.display = "none";
        return;
      }
      res = await data.json();
      avatar.src = res.avatar_url;
      avatar_inner.src = res.avatar_url;
      user_name.innerText = res.name;
      login.innerText = "@" + res.login;
      const myDate = new Date(res.created_at).toDateString().split(" ");
      created_at.innerText =
        "Joined " + myDate[2] + " " + myDate[1] + " " + myDate[3];
      created_at_inner.innerText =
        "Joined " + myDate[2] + " " + myDate[1] + " " + myDate[3];

      bio.innerText = res.bio;
      public_repos.innerText = res.public_repos;
      followers.innerText = res.followers;
      following.innerText = res.following;
      my_location.innerText = res.location || "unavailable";
      blog.innerText = res.blog || "unavailable";
      twitter_username.innerText = res.twitter_username || "unavailable";
      company.innerText = res.company || "unavailable";
      errorBox.style.display = "none";
      mainBox.style.display = "flex";
    })
    .catch((e) => {
      console.log("Connection error", e);
      errorBox.innerHTML = "<h2>Please check your internet connection.</h2>";
      errorBox.style.display = "block";
      mainBox.style.display = "none";
    });
});

mode.addEventListener("click", () => {
  document.getElementsByTagName("body")[0].classList.toggle("body-light");
  document.getElementById("mode").innerText = document
    .getElementById("mode")
    .innerText.startsWith("Light")
    ? "Dark🌚"
    : "Light🌞";
});
