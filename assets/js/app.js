// 1. Render => OK
// 2. Load current song => OK
// 3. Play/Pause => OK
// 4. input range working => OK
// 5. Next/Previous => OK
// 6. Random/Replay => OK
// 7. Click to play specified song to player => OK
// 8. Volumn input => onclick
// 9. Set / Get localStorage => OK
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "LCN_PLAYER";
const recentlyPlaylist = $(".recently-playlist");
const categoryList = $(".category-list");
const artistList = $(".artist-list");
const player = $(".player");
const playerImage = $(".player .player-image");
const playerName = $(".player .player-name");
const playerSingle = $(".player .player-single");
const audio = $(".audio");
const btnTogglePlay = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-pre");
const progress = $(".progress");
const currentTime = $(".current-time");
const endTime = $(".end-time");
const replayBtn = $(".btn-replay");
const suffleBtn = $(".btn-suffle");
const wave = $(".player-wave");
const volumnInput = $(".volumn");
const volIcon = $(".vol-icon");
const leftScroll = $(".left-scroll");
const rightScroll = $(".right-scroll");
const cateLeftScroll = $(".cate-left-scroll");
const cateRightScroll = $(".cate-right-scroll");
const artistLeftScroll = $(".artist-left-scroll");
const artistRightScroll = $(".artist-right-scroll");

const app = {
  isPlaying: false,
  isReplay: false,
  isRandom: false,
  currentIndex: 0,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  loadConfig() {
    this.isRandom = this.config.isRandom;
    this.isReplay = this.config.isReplay;
  },
  songs: [
    {
      image: "./assets/image/emkhacgihoa.jpg",
      path: "./assets/music/emkhacgihoa.mp3",
      name: "Em Khác Gì Hoa (Lofi Version)",
      single: "Lil Z",
    },
    {
      image: "./assets/image/anhyeuvoithe.jpg",
      path: "./assets/music/anhyeuvoithe.mp3",
      name: " Anh Yêu Vội Thế Remix",
      single: "LaLa Trần (Orinn Remix)",
    },
    {
      image: "./assets/image/anhsedonem.jpg",
      path: "./assets/music/anhsedonem.mp3",
      name: "Anh Sẽ Đón Em",
      single: "Nguyên, Trang",
    },
    {
      image: "./assets/image/mortals.jpg",
      path: "./assets/music/mortals.mp3",
      name: "Mortals",
      single: "Warriyo",
    },
    {
      image: "./assets/image/onon.jpg",
      path: "./assets/music/onon.mp3",
      name: "On & On",
      single: "Cartoon, Daniel Levi",
    },
    {
      image: "./assets/image/cauhuachuaventron.jpg",
      path: "./assets/music/CauHuaChuaVenTron-PhatHuyT4-7093319.mp3",
      name: "Câu Hứa Chưa Vẹn Tròn",
      single: "Phát Huy T4",
    },
    {
      image: "./assets/image/chayvenoiphiaanh.jpg",
      path: "./assets/music/Chay-Ve-Noi-Phia-Anh-Khac-Viet.mp3",
      name: "Chạy Về Nơi Phía Anh",
      single: "Khắc Việt",
    },
    {
      image: "./assets/image/chayvekhocvoianh.jpg",
      path: "./assets/music/Chay-Ve-Khoc-Voi-Anh-ERIK.mp3",
      name: "Chạy Về Khóc Với Anh",
      single: "ERIK",
    },
    {
      image: "./assets/image/coemday.jpg",
      path: "./assets/music/CoEmDay-NhuViet-7126614.mp3",
      name: "Có Em Đây",
      single: "Như Việt",
    },
    {
      image: "./assets/image/cuoithoi.jpg",
      path: "./assets/music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3",
      name: "Cưới Thôi",
      single: "Masew, Masiu, B Ray, TAP",
    },
    {
      image: "./assets/image/devuong.jpg",
      path: "./assets/music/DeVuong-DinhDungACV-7121634.mp3",
      name: "Đế Vương",
      single: "Đình Dũng, ACV",
    },
    {
      image: "./assets/image/hoatantinhtan.jpg",
      path: "./assets/music/HoaTanTinhTan-GiangJolee-7126977.mp3",
      name: "Hoa Tàn Tình Tan",
      single: "Giang Jolee",
    },
    {
      image: "./assets/image/ledoemxuithoi.jpg",
      path: "./assets/music/LaDoEmXuiThoi-KhoiSofiaDanTrangChauDangKhoa-7125647.mp3",
      name: "Là Do Em Xui Thôi",
      single: "Khói, Sofia, Châu Đăng Khoa",
    },
    {
      image: "./assets/image/saigondaulongqua.jpg",
      path: "./assets/music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3",
      name: "Sài Gòn Đau Lòng Quá",
      single: "Hứa Kim Tuyền, Hoàng Duyên",
    },
    {
      image: "./assets/image/timduocnhaukhothenao.jpg",
      path: "./assets/music/TimDuocNhauKhoTheNaoOriginalMovieSoundtrackFromChiaKhoaTramTy-AnhTuTheVoice-7127088.mp3",
      name: "Tìm Được Nhau Khó Thế Nào",
      single: "Anh Tú",
    },
  ],
  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent() {
    // Click play / pause button ở player
    btnTogglePlay.onclick = () => {
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Click vào next Btn
    nextBtn.onclick = () => {
      if (this.isRandom) {
        this.playRandomSong();
      } else {
        this.playNextSong();
      }
      this.render();
    };

    // Click vào Pre btn
    preBtn.onclick = () => {
      if (this.isRandom) {
        this.playRandomSong();
      } else {
        this.playPreSong();
      }
      this.render();
    };

    // Toggle replay
    replayBtn.onclick = () => {
      this.isReplay = !this.isReplay;
      replayBtn.classList.toggle("active", this.isReplay);
      this.setConfig("isReplay", this.isReplay);
      if (this.isReplay) {
        replayBtn.title = "Tắt phát lại một bài";
      }
    };

    // Toggle suffle
    suffleBtn.onclick = () => {
      this.isRandom = !this.isRandom;
      suffleBtn.classList.toggle("active", this.isRandom);
      this.setConfig("isRandom", this.isRandom);
      if (this.isRandom) {
        suffleBtn.title = "Tắt phát ngẫu nhiên";
      }
    };

    // Bài hát đang được play
    audio.onplay = () => {
      this.isPlaying = true;
      btnTogglePlay.classList.add("playing");
      wave.classList.add("active");
      const playContainer = $(".song-item.active .action-play");
      playContainer.classList.add("play");
      const pauseContainer = $(".song-item.active .action-play");
      pauseContainer.classList.remove("pause");
      const playButton = $(".song-item.active .play-btn");
      playButton.style.display = "inline-block";
      const pauseButton = $(".song-item.active .pause-btn");
      pauseButton.style.display = "none";
    };
    // Bài hát đang bị pause
    audio.onpause = () => {
      this.isPlaying = false;
      btnTogglePlay.classList.remove("playing");
      wave.classList.remove("active");
      const playContainer = $(".song-item.active .action-play");
      playContainer.classList.remove("play");
      const pauseContainer = $(".song-item.active .action-play");
      pauseContainer.classList.add("pause");
      const playButton = $(".song-item.active .play-btn");
      playButton.style.display = "none";
      const pauseButton = $(".song-item.active .pause-btn");
      pauseButton.style.display = "inline-block";
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = () => {
      let currentTimePercent = null;
      if (audio.currentTime > 0) {
        currentTimePercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
      }
      progress.value = currentTimePercent;
      this.updateCurrentSongTime();
      this.getDurationTimeDetail();
    };

    // Khi chạy hết Bài
    audio.onended = () => {
      if (this.isReplay) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Set up khi audio đang được load thuộc tính
    audio.onloadedmetadata = () => {
      progress.value = 0;
      // end time
      this.getDurationTimeDetail();
    };

    // Khi thay đổi seek bar
    progress.oninput = () => {
      audio.currentTime = (progress.value * audio.duration) / 100;
      this.updateCurrentSongTime();
      this.getDurationTimeDetail();
    };

    // Khi thay đổi vol bar
    volumnInput.oninput = () => {
      audio.volume = Number(volumnInput.value);
    };

    // Khi click vào playlist
    recentlyPlaylist.onclick = (e) => {
      // Click vào nút play của song item không có class active
      // Return Element Object nếu tìm thấy và return null nếu không tìm thấy
      const actionPlay = e.target.closest(
        ".song-item:not(.active) .action-play"
      );
      // Nếu click vào nút play ở song không có class active
      if (actionPlay) {
        this.currentIndex = Number(actionPlay.dataset.playId);
        this.loadCurrentSong();
        audio.play();
        this.render();
      } else {
        const actionPlay = e.target.closest(
          ".song-item.active .action-play.play"
        );
        const actionPause = e.target.closest(
          ".song-item.active .action-play.pause"
        );
        // Nếu click vào toggle play ở song có class active
        if (actionPlay) {
          audio.pause();
          this.render();
        } else if (actionPause) {
          audio.play();
          this.render();
        }
      }
    };

    // Click left scroll ở recently added
    leftScroll.onclick = () => {
      recentlyPlaylist.scrollLeft -= 330;
    };

    // Click right scroll ở recently added
    rightScroll.onclick = () => {
      recentlyPlaylist.scrollLeft += 330;
    };

    cateLeftScroll.onclick = () => {
      categoryList.scrollLeft -= 330;
    };

    cateRightScroll.onclick = () => {
      categoryList.scrollLeft += 330;
    };

    artistLeftScroll.onclick = () => {
      artistList.scrollLeft -= 160;
    };

    artistRightScroll.onclick = () => {
      artistList.scrollLeft += 160;
    };
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $(".song-item.active").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 300);
  },
  getDurationTimeDetail() {
    let s = parseInt(audio.duration % 60);
    let m = parseInt((audio.duration / 60) % 60);
    if (s == 0) {
      s += "0";
    } else if (s < 10) {
      s = "0" + s;
    }
    endTime.innerText = m + ":" + s;
  },

  updateCurrentSongTime() {
    currentTime.innerText = audio.currentTime;
    endTime.innerText = audio.duration;
    // current time
    var currentSecond = parseInt(audio.currentTime % 60);
    var currentMinute = parseInt((audio.currentTime / 60) % 60);
    if (currentSecond < 10) {
      currentTime.innerHTML = currentMinute + ":0" + currentSecond;
    } else {
      currentTime.innerHTML = currentMinute + ":" + currentSecond;
    }
  },

  playNextSong() {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    audio.play();
    this.render();
  },

  playPreSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    audio.play();
  },
  playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.currentIndex === newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
    audio.play();
    this.render();
  },
  loadCurrentSong() {
    playerImage.src = this.currentSong.image;
    playerName.textContent = this.currentSong.name;
    playerSingle.textContent = this.currentSong.single;
    audio.src = this.currentSong.path;
    volumnInput.value = audio.volume;
    progress.value = 0;
    this.scrollToActiveSong();
  },
  render() {
    let htmls = this.songs.map((song, index) => {
      return `<div class="song-item ${
        this.currentIndex === index ? "active" : ""
      }">
                <div class="song-image">
                  <img src="${song.image}" alt="">
                </div>
                <h5 title = "${song.name}">${song.name}</h5>
                <div class="text">${song.single}</div>
                <ul class="action">
                  <li class="action-item action-play pause" data-play-id = ${index}><svg class="pause-btn svg-icon svg-icon-play data-song-${index}" focusable="false" height="1em" role="img"
                      width="1em" viewBox="0 0 12 12" aria-hidden="true">
                      <path fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M2.5.5v11l9-5.5z"></path>
                    </svg>
                    <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" role="img" aria-hidden="true" class="play-pause-btn play-btn">
                        <g>
                        <path d="M10 2H5v20h5V2zm9 0h-5v20h5V2z"></path>
                      </g>
                    </svg>
                    </li>
                  <li class="action-item">
                    <svg viewBox="0 0 16 16" width="16" height="16" focusable="false" role="img" aria-hidden="true"
                      class="sk__sc-1vdzswr-0 jFctkk">
                      <g>
                        <path clip-rule="evenodd" fill-rule="evenodd"
                          d="m8 4.79-.755-.869c-1.17-1.348-2.252-1.832-3.093-1.9-.836-.067-1.59.263-2.164.858C.802 4.108.528 6.283 2.04 7.812a245.96 245.96 0 0 0 4.775 4.7c.482.46.882.837 1.186 1.122.304-.285.704-.663 1.186-1.123a238.026 238.026 0 0 0 4.771-4.695 3.545 3.545 0 0 0 .057-4.963c-.572-.589-1.324-.915-2.161-.843-.843.072-1.926.562-3.098 1.911L8 4.791zm6.672 3.725C10.78 12.452 8 15 8 15s-2.78-2.548-6.672-6.485c-3.717-3.76 1.043-10.549 5.976-5.972.232.215.464.455.696.723.232-.267.464-.508.696-.723C13.63-2.04 18.39 4.68 14.672 8.515z">
                        </path>
                        <path
                          d="m8 4.79-.755-.869c-1.17-1.348-2.252-1.832-3.093-1.9-.836-.067-1.59.263-2.164.858C.802 4.108.528 6.283 2.04 7.812a245.96 245.96 0 0 0 4.775 4.7c.482.46.882.837 1.186 1.122.304-.285.704-.663 1.186-1.123a238.026 238.026 0 0 0 4.771-4.695 3.545 3.545 0 0 0 .057-4.963c-.572-.589-1.324-.915-2.161-.843-.843.072-1.926.562-3.098 1.911L8 4.791zm6.672 3.725C10.78 12.452 8 15 8 15s-2.78-2.548-6.672-6.485c-3.717-3.76 1.043-10.549 5.976-5.972.232.215.464.455.696.723.232-.267.464-.508.696-.723C13.63-2.04 18.39 4.68 14.672 8.515z">
                        </path>
                      </g>
                    </svg>
                  </li>
                  <li class="action-item">
                    <svg class="svg-icon svg-icon-options" focusable="false" height="12" role="img" width="12"
                      viewBox="0 0 12 12" aria-hidden="true">
                      <path
                        d="M10.5 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM6 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z">
                      </path>
                    </svg>
                  </li>
                </ul>
            </div>`;
    });
    recentlyPlaylist.innerHTML = htmls.join("");
  },
  start() {
    // Load config
    this.loadConfig();

    // Define properties for object
    this.defineProperties();

    // Handle Event
    this.handleEvent();

    // Load Current Song
    this.loadCurrentSong();

    // render
    this.render();

    // Hiển thị trạng thái button random & repeat
    replayBtn.classList.toggle("active", this.isReplay);
    suffleBtn.classList.toggle("active", this.isRandom);
  },
};

app.start();
