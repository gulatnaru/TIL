/* 1. 검색 */
const submit = document.querySelector("#js-submit");
const inputArea = document.querySelector("#js-input");

const sidebar = document.querySelector("#js-playlist");
const playbox = document.createElement("div");
sidebar.innerHTML = localStorage.getItem("playlist");
const resetBtn = document.querySelector("#js-reset");

const UI = {
  reset: () => {
    resetBtn.addEventListener("click", () => {
      sidebar.innerHTML = null;
      localStorage.clear();
    });
  },
  submit: () => {
    submit.addEventListener("click", () => {
      SoundCloudAPI.getTracks(inputArea.value);
    });
  },
  enter: () => {
    inputArea.addEventListener("keyup", e => {
      if (e.which === 13) {
        // pushToDOM(inputValue);
        SoundCloudAPI.getTracks(inputArea.value);
      }
    });
  }
};

UI.reset();
UI.submit();
UI.enter();

/* 2. SoundCloud API  사용하기 */
const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },
  getTracks: inputValue => {
    SC.get("/tracks", {
      q: inputValue
    }).then(function(tracks) {
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks);
    });
  }
};

SoundCloudAPI.init();

// find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.

/* 3. 카드 보여주기 */
SoundCloudAPI.renderTracks = tracks => {
  let searchResults = document.querySelector("#js-search-results");
  searchResults.innerHTML = null;
  tracks.forEach(track => {
    //Card
    const card = document.createElement("div");
    card.classList.add("card");

    //Image
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image");

    const imageImg = document.createElement("img");
    imageImg.classList.add("image_img");
    imageImg.src =
      track.artwork_url || "http://lorempixel.com/200/200/abstract";

    //Content
    const content = document.createElement("div");
    content.classList.add("content");

    //Header
    const header = document.createElement("div");
    header.classList.add("header");

    const link = document.createElement("a");
    link.href = track.permalink_url;
    link.target = "_blank"; //new tab
    link.innerHTML = track.title;

    //Button
    const button = document.createElement("div");
    button.classList.add("ui", "bottom", "attached", "button", "js-button");

    button.addEventListener("click", e => {
      SoundCloudAPI.addPlaylist(track.permalink_url);
    });

    const icon = document.createElement("i");
    icon.classList.add("add", "icon");

    const buttonText = document.createElement("span");
    buttonText.innerHTML = "Add to playlist";

    imageDiv.appendChild(imageImg);

    header.appendChild(link);
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    searchResults.appendChild(card);
  });
};

/* 4. Playlist 에 추가하고 실제로 재생하기 */

SoundCloudAPI.addPlaylist = trackURL => {
  SC.oEmbed(trackURL, { auto_play: true }).then(function(embed) {
    console.log("oEmbed response: ", embed);
    playbox.innerHTML = embed.html;
    sidebar.insertBefore(playbox, sidebar.firstChild);

    //local storage
    localStorage.setItem("playlist", sidebar.innerHTML);
  });
};
