
fetch("./assets/data/recommend.json")
  .then(res => res.json())
  .then(data => {
    const recommendData = data.content.recommendationChannels;
    let navItemHtml = ``;
    recommendData.forEach((el) => {
      let officialIcon = el.channel.verifiedMark
        ? `<i class="icon-official"><span class="blind">인증 마크</span></i>`
        : ``;
      navItemHtml += `<li class="nav-item">
        <a href="">
          <figure class="profile-line">
            <img src="${el.channel.channelImageUrl}" alt="${el.channel.channelName}프로필 이미지">
            <span class="blind">LIVE</span>
          </figure>
          <div class="profile-info">
            <strong class="name">
              <span>${el.channel.channelName}</span>
              ${officialIcon}
            </strong>
            <span class="category">${el.liveInfo.liveCategoryValue}</span>
          </div>
          <em class="count">${el.liveInfo.concurrentUserCount}</em>
          <div class="text">
            <div class="info">
              <strong class="name">
                <span>${el.channel.channelName}</span>
                ${officialIcon}
              </strong>
              <span class="category">${el.liveInfo.liveCategoryValue}</span>
            </div>
            <span class="tit">${el.liveInfo.liveTitle}</span>
            <em class="count">${el.liveInfo.concurrentUserCount}</em>
          </div>
        </a>
      </li>`;
    });
    document.querySelector(".nav-list").innerHTML = navItemHtml;
    const navMoreBtn = document.querySelector(".navigator .btn-more");
    const navMoreBtnTxt = document.querySelector(".navigator .btn-more > span");
    const navItems = document.querySelectorAll(".nav-item");
    let isExpanded = false;

    navMoreBtn.addEventListener("click", () => {
      toggleNav(!isExpanded);
    });

    const toggleNav = (expand) => {
      navItems.forEach((item, index) => {
        if (index > 4) {
          item.classList.toggle("hidden", !expand);
        }
      });

      navMoreBtnTxt.textContent = expand ? "접기" : "15개 더보기";
      navMoreBtn.classList.toggle("active", expand);
      navMoreBtn.setAttribute("aria-expanded", expand.toString());
      isExpanded = expand;
    };

    toggleNav(false);

    navItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        document.querySelector(".side-bar").classList.add("expand");
      });
      item.addEventListener("mouseleave", () => {
        document.querySelector(".side-bar").classList.remove("expand");
      });
    });
  })
  .catch((error) => console.error("Error recommend.json", error))
;





fetch("./assets/data/banner.json")
  .then((res) => res.json())
  .then((data) => {
    const bannerData = data.content.banners;
    // 배너 데이터 처리
    let bannerItemHtml = ``;
    bannerData.forEach((el) => {
      bannerItemHtml += `<li class="bann-item">
              <a href="${el.landingUrl}" target="_blank">
                <div class="txt-area">
                  <div class="tit-area">
                    <strong class="tit">${el.title}</strong>
                    <p class="desc">${el.subCopy}</p>
                  </div>
                  <button type="button" class="btn-move">${el.scheduledDate}</button>
                </div>
                <div class="bann-img" style="background-image: url('${el.imageUrl}');"></div>
              </a>
            </li>`;
    });
    document.querySelector(".bann-list").innerHTML = bannerItemHtml;
  })
  .catch((error) => console.error("Error banner.json", error))
;




fetch("./assets/data/topRecommend.json")
  .then((res) => res.json())
  .then((data) => {
    const topRecommendData = data.content.topRecommendationLiveList;

    const viewCount = document.querySelector(".sc-live .live-header .viewer .count");
    const title = document.querySelector(".sc-live .live-header .tit");
    const category = document.querySelector(".sc-live .streamer .category > span");
    const videoPlayer = document.querySelector(".live-video video");
    const streamerProfile = document.querySelector(".streamer-profi");
    const streamerName = document.querySelector(".streamer-name");
    
    const liveContentSet = (data) => {
      viewCount.textContent = data.concurrentUserCount;
      title.textContent = data.liveTitle;
      category.textContent = data.liveCategoryValue;

      // 배경 비디오
      videoPlayer.src = data.livePlaybackJson;
      videoPlayer.load();
      videoPlayer.play();

      // 스트리머 프로필 이미지
      let streamerImg =
        data.channel.channelImageUrl || "./assets/img/anonymous.png";
      streamerProfile.innerHTML = `<a href="https://chzzk.naver.com/${data.channel.channelId}">
                                      <span class="blind">스트리머 채널로 이동</span>
                                      <figure class="profile-line">
                                        <img src="${streamerImg}" 
                                        alt="${data.channel.channelName} 프로필 이미지">
                                        <span class="blind">LIVE</span>
                                      </figure>
                                    </a>`;

      // 스트리머 이름 설정
      let officialIcon = data.channel.verifiedMark
        ? `<i class="icon-official"><span class="blind">인증 마크</span></i>`
        : ``;
      streamerName.innerHTML = `<a href="${data.channel.channelId}">
                                    <span class="blind">스트리머 채널로 이동</span>
                                    <strong class="name">
                                      <span>${data.channel.channelName}</span>
                                      ${officialIcon}
                                    </strong>
                                  </a>`;
    };
    liveContentSet(topRecommendData[0]);

    let topRecommendHtml = ``;
    topRecommendData.forEach((el) => {
      topRecommendHtml += `<li class="live-item" role="tabmenu">
                <button type="button" role="tab" aria-selected="false" 
                class="btn-tab">
                  <div class="thumbnail" 
                  style="background-image: url('${el.liveImageUrl}');">
                    <span class="blind">${el.liveTitle}</span>
                  </div>
                </button>
              </li>`;
    });
    document.querySelector(".live-list").innerHTML = topRecommendHtml;

    const tabBtn = document.querySelectorAll(".btn-tab");
    tabBtn[0].setAttribute("aria-selected", "true");

    tabBtn.forEach((item, index) => {
      item.addEventListener("click", function () {
        tabBtn.forEach((tab) => tab.setAttribute("aria-selected", "false"));
        this.setAttribute("aria-selected", "true");
        liveContentSet(topRecommendData[index]);
      });
    });
  })
  .catch((error) => console.error("Error topRecommend.json", error));





fetch("./assets/data/partner.json")
  .then((res) => res.json())
  .then((data) => {
    const partnerData = data.content.streamerPartners.slice(0, 17);
    let partnerItemHtml = ``;
    partnerData.forEach((el) => {
      let liveBadge = el.openLive
        ? `<span class="live-badge">
            <svg width="20" height="7" viewBox="0 0 39 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.5918 9.94881V12.4211H0.177979V0.368866H3.38116V9.94881H8.5918ZM13.8997 0.368866V12.4211H10.6965V0.368866H13.8997ZM23.7898 12.4211L27.8047 0.368866H24.296L21.8783 9.42263H21.8085L19.3821 0.368866H15.7425L19.7574 12.4211H23.7898ZM38.2796 9.94881V12.4211H29.6475V0.368866H38.2796V2.84111H32.8507V5.23819H37.9566V7.49327H32.8507V9.94881H38.2796Z"
                fill="white"></path>
            </svg>
            <span class="blind">LIVE</span>
          </span>`
        : ``;
      let officialIcon = el.verifiedMark
        ? `<i class="icon-official"><span class="blind">인증 마크</span></i>`
        : ``;
      let profileImg = el.profileImageUrl || "./assets/img/anonymous.png";

      partnerItemHtml += `<li class="partner-item">
                            <a href="https://chzzk.naver.com/live/${el.channelId}">
                              <div class="partner-img">
                                <figure>
                                  <img src="${profileImg}" alt="">
                                </figure>
                                ${liveBadge}
                              </div>
                              <strong class="partner-name">
                                <span class="name">
                                  <span>${el.channelName}</span>
                                  ${officialIcon}
                                </span>
                              </strong>
                            </a>
                          </li>`;
    });
    document.querySelector(".partner-list").innerHTML = partnerItemHtml;

    const partnerImgs = document.querySelectorAll(".partner-img");
    partnerImgs.forEach((item, index) => {
      item.classList.toggle("off", !partnerData[index].openLive);
    });
  })
  .catch((error) => console.error("Error partner.json", error));





fetch("./assets/data/liveList.json")
  .then((res) => res.json())
  .then((data) => {
    const liveListData = data.content.streamingLiveList.slice(0, 50);
    let recomItemHtml = ``;
    liveListData.forEach((el) => {
      let officialIcon = el.channel.verifiedMark
        ? `<i class="icon-official"><span class="blind">인증 마크</span></i>`
        : ``;
      let profileImg =
        el.channel.channelImageUrl || "./assets/img/anonymous.png";

      recomItemHtml += `<li class="recom-item">
        <a href="live/${el.channel.channelId}" class="thumbnail">
          <span class="blind">라이브 엔드로 이동</span>
          <figure>
            <img src="${el.liveImageUrl}" alt="">
          </figure>
          <span class="status">
            <span class="live-badge">
              <svg width="28" height="10" viewBox="0 0 39 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.5918 9.94881V12.4211H0.177979V0.368866H3.38116V9.94881H8.5918ZM13.8997 0.368866V12.4211H10.6965V0.368866H13.8997ZM23.7898 12.4211L27.8047 0.368866H24.296L21.8783 9.42263H21.8085L19.3821 0.368866H15.7425L19.7574 12.4211H23.7898ZM38.2796 9.94881V12.4211H29.6475V0.368866H38.2796V2.84111H32.8507V5.23819H37.9566V7.49327H32.8507V9.94881H38.2796Z"
                  fill="white"></path>
              </svg>
              <span class="blind">LIVE</span>
            </span>
            <span class="viewer">
              <em class="count">${el.concurrentUserCount.toLocaleString()}</em>명 시청
            </span>
          </span>
        </a>
        <div class="streamer">
          <a href="${el.channel.channelId}" class="streamer-img">
            <span class="blind">${el.channel.channelName}채널로 이동</span>
            <figure>
              <img src="${profileImg}" alt="${
        el.channel.channelName
      } 프로필 이미지">
            </figure>
          </a>
          <div class="recomm-info">
            <a href="live/${el.channel.channelId}" class="link-tit">
              <span class="tit">${el.liveTitle}</span>
              <span class="blind">라이브 엔드로 이동</span>
            </a>
            <a href="${el.channel.channelId}" class="link-name">
              <span class="name">
                <span>${el.channel.channelName}</span>
                ${officialIcon}
              </span>
              <span class="blind">스트리머 채널로 이동</span>
            </a>
            <a href="category/${el.categoryType}/${
        el.liveCategory
      }" class="link-category">
              <span class="category">${el.liveCategoryValue}</span>
            </a>
          </div>
        </div>
      </li>`;
    });
    document.querySelector(".recom-list").innerHTML = recomItemHtml;

    const recomMoreBtn = document.querySelector(".sc-recommend .btn-more");
    const recomMoreBtnTxt = document.querySelector(
      ".sc-recommend .btn-more > span"
    );
    const recomItems = document.querySelectorAll(".recom-item");
    let isExpanded = false;

    const toggleRecom = (expand) => {
      recomItems.forEach((item, index) => {
        if (index > 24) {
          item.classList.toggle("hidden", !expand);
        }
      });

      recomMoreBtnTxt.textContent = expand ? "접기" : "더보기";
      recomMoreBtn.classList.toggle("active", expand);
      recomMoreBtn.setAttribute("aria-expanded", expand.toString());
      isExpanded = expand;
    };

    recomMoreBtn.addEventListener("click", () => {
      toggleRecom(!isExpanded);
    });

    toggleRecom(false);
  })
  .catch((error) => console.error("Error liveList.json", error));





fetch("./assets/data/category.json")
  .then((res) => res.json())
  .then((data) => {
    const categoryData = data.content.categorys.slice(0, 8);
    let cateItemHtml = ``;
    categoryData.forEach((el) => {
      cateItemHtml += `<li class="cate-item">
              <a href="category/${el.categoryType}/${el.categoryId}">
                <figure class="thumbnail">
                  <img src="${el.posterImageUrl}" alt="">
                </figure>
                <p class="tit">${el.categoryValue}</p>
                <div class="info">
                  <span>시청자&nbsp;<em class="count">${el.concurrentUserCount.toLocaleString()}</em>명</span>
                  <span>라이브&nbsp;<em class="count">${el.openLiveCount.toLocaleString()}</em>개</span>
                </div>
              </a>
            </li>`;
    });
    document.querySelector(".cate-list").innerHTML = cateItemHtml;
  })
  .catch((error) => console.error("Error category.json", error));



fetch("./assets/data/comment.json")
  .then((res) => res.json())
  .then((json) => {
    const commentData = json.content.lastComments;
    let newsItemHtml = ``;
    commentData.forEach((el) => {
      let officialIcon = el.user.verifiedMark
        ? `<i class="icon-official"><span class="blind">인증 마크</span></i>`
        : ``;

      let newsThumb = el.comment.attaches
        ? `<figure class="thumbnail">
                    <img src="${el.comment.attaches[0].attachValue}" alt">
                  </figure>`
        : ``;
      let profileImg = el.user.profileImageUrl || "./assets/img/anonymous.png";

      const newContent = el.comment.content.replace(
        /(?:\r\n|\r|\n)/g,
        "<br />"
      );

      const postTimeSet = (date) => {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6) - 1;
        const day = date.slice(6, 8);
        const hour = date.slice(8, 10);
        const minute = date.slice(10, 12);
        const second = date.slice(12, 14);

        const start = new Date(year, month, day, hour, minute, second);
        const end = new Date();
        const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;

        if (seconds < 60) return "방금 전";
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        if (days < 7) return `${Math.floor(days)}일 전`;

        return start.toLocaleDateString();
      };

      const postTime = postTimeSet(el.comment.createdDate);

      newsItemHtml += `<li class="news-item swiper-slide">
                <div class="news-streamer">
                  <a href="${el.user.userIdHash}">
                    <span class="blind">스트리머 채널로 이동</span>
                    <div class="profile">
                      <figure>
                        <img src="${profileImg}" alt="${el.user.userNickname} 프로필 이미지">
                      </figure>
                      <div class="profile-txt">
                        <span class="name">
                          <span>${el.user.userNickname}</span>
                          ${officialIcon}
                        </span>
                        <span class="date">${postTime}</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="news-content">
                  <div class="news-text">
                    <div>
                      ${newContent}
                    </div>
                  </div>
                  ${newsThumb}
                </div>
                <div class="news-footer">
                  <button type="button" class="btn-news" aria-pressed="false">
                    <span class="blind">버프</span>
                    <i class="ico-buff">
                      <svg xmlns="http://www.w3.org/2000/svg" width="54" height="30" viewBox="0 0 54 30" fill="none">
                        <rect opacity="0.08" x="3.5" y="3" width="47" height="20" rx="10" stroke="white" stroke-width="2" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M38.1476 8.90009C38.5003 8.59066 39.0292 8.59579 39.3758 8.91199L42.7944 12.0306C43.1689 12.3723 42.9242 12.9958 42.4173 12.9915L40.7819 12.9777V16.4079C40.7819 16.8148 40.452 17.1447 40.0451 17.1447H37.402C36.995 17.1447 36.6651 16.8148 36.6651 16.4079V12.9429L35.0188 12.929C34.5112 12.9247 34.2774 12.2957 34.659 11.9609L38.1476 8.90009Z"
                          fill="#9DA5B6" />
                        <path d="M14.0871 17.0843C13.7899 17.0843 13.5468 17.0573 13.3576 17.0033C13.1685 16.9493 13.0199 16.8614 12.9118 16.7399C12.8038 16.6183 12.7261 16.4629 12.6788 16.2738C12.6383 16.0779 12.618 15.8415 12.618 15.5646V9.34382C12.618 8.98583 12.7126 8.72917 12.9017 8.57382C13.0908 8.41846 13.334 8.34079 13.6312 8.34079C13.9216 8.34079 14.1546 8.42184 14.3303 8.58395C14.5126 8.7393 14.6038 8.99259 14.6038 9.34382V10.8939H16.3262V9.34382C16.3262 8.98583 16.4174 8.72917 16.5997 8.57382C16.7821 8.41846 17.0185 8.34079 17.3089 8.34079C17.6061 8.34079 17.8425 8.42184 18.0182 8.58395C18.2005 8.7393 18.2917 8.99259 18.2917 9.34382V11.6133H19.5176V8.98921C19.5176 8.665 19.6189 8.42184 19.8216 8.25974C20.0242 8.09088 20.2572 8.00645 20.5207 8.00645C20.649 8.00645 20.7739 8.03009 20.8955 8.07737C21.0171 8.11789 21.1252 8.17868 21.2197 8.25974C21.3143 8.34079 21.3886 8.4421 21.4426 8.56368C21.5034 8.68526 21.5338 8.8271 21.5338 8.98921V17.52H19.5176V13.3458H18.2917V17.0843H14.0871ZM16.3262 15.4126V12.5454H14.6038V15.1492C14.6038 15.264 14.6207 15.3383 14.6545 15.3721C14.695 15.3991 14.7727 15.4126 14.8875 15.4126H16.3262ZM24.2288 12.3529V11.4512C24.2288 11.0864 24.3234 10.823 24.5125 10.6609C24.7084 10.4988 24.9617 10.4178 25.2724 10.4178C25.5763 10.4178 25.8229 10.5022 26.012 10.6711C26.2011 10.8332 26.2957 11.0932 26.2957 11.4512V12.3529H28.0991V11.4512C28.0991 11.0864 28.1936 10.823 28.3828 10.6609C28.5786 10.4988 28.8319 10.4178 29.1426 10.4178C29.4466 10.4178 29.6931 10.5022 29.8822 10.6711C30.0714 10.8332 30.1659 11.0932 30.1659 11.4512V12.3529H30.8549C31.1656 12.3529 31.3851 12.4373 31.5134 12.6062C31.6418 12.775 31.7059 12.9608 31.7059 13.1634C31.7059 13.3728 31.6384 13.5619 31.5033 13.7308C31.375 13.8929 31.1588 13.9739 30.8549 13.9739H23.5399C23.2359 13.9739 23.0164 13.8929 22.8813 13.7308C22.753 13.5619 22.6888 13.3728 22.6888 13.1634C22.6888 12.9608 22.753 12.775 22.8813 12.6062C23.0096 12.4373 23.2292 12.3529 23.5399 12.3529H24.2288ZM31.0676 15.6051C31.223 15.6051 31.3547 15.6321 31.4628 15.6862C31.5776 15.7335 31.6688 15.7976 31.7363 15.8787C31.8106 15.9597 31.8613 16.0543 31.8883 16.1624C31.9221 16.2637 31.9389 16.365 31.9389 16.4663C31.9389 16.5744 31.9221 16.6791 31.8883 16.7804C31.8545 16.8817 31.8005 16.9729 31.7262 17.0539C31.6586 17.135 31.5708 17.1992 31.4628 17.2464C31.3547 17.2937 31.223 17.3174 31.0676 17.3174H23.3271C23.1718 17.3174 23.04 17.2937 22.932 17.2464C22.8239 17.1992 22.7327 17.135 22.6584 17.0539C22.5909 16.9729 22.5402 16.8817 22.5064 16.7804C22.4727 16.6791 22.4558 16.5744 22.4558 16.4663C22.4558 16.365 22.4693 16.2637 22.4963 16.1624C22.5301 16.0543 22.5807 15.9597 22.6483 15.8787C22.7226 15.7976 22.8138 15.7335 22.9218 15.6862C23.0367 15.6321 23.1718 15.6051 23.3271 15.6051H31.0676ZM30.7333 8.34079C30.8886 8.34079 31.0204 8.36781 31.1284 8.42184C31.2365 8.46912 31.3243 8.53329 31.3918 8.61434C31.4594 8.69539 31.5067 8.78658 31.5337 8.88789C31.5675 8.98921 31.5843 9.09053 31.5843 9.19184C31.5843 9.29316 31.5675 9.39447 31.5337 9.49579C31.5067 9.5971 31.456 9.68829 31.3817 9.76934C31.3142 9.85039 31.2264 9.91794 31.1183 9.97197C31.0102 10.0193 30.8819 10.0429 30.7333 10.0429H23.6614C23.5061 10.0429 23.3744 10.0193 23.2663 9.97197C23.165 9.91794 23.0772 9.85039 23.0029 9.76934C22.9354 9.68829 22.8847 9.5971 22.8509 9.49579C22.8239 9.39447 22.8104 9.29316 22.8104 9.19184C22.8104 9.09053 22.8239 8.98921 22.8509 8.88789C22.8847 8.78658 22.9354 8.69539 23.0029 8.61434C23.0704 8.53329 23.1582 8.46912 23.2663 8.42184C23.3744 8.36781 23.5061 8.34079 23.6614 8.34079H30.7333Z" fill="#9DA5B6" />
                      </svg>
                    </i>
                  </button>
                  <span class="news-count">${el.buffNerf.buffCount}</span>
                  <span class="news-comment">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.9097 15.2606V17.2338C11.9097 17.5578 12.2671 17.7155 12.5042 17.5037C13.5598 16.5607 15.689 14.6543 16.5403 13.8649C17.6861 12.8021 18.3899 11.2393 18.3298 9.5076C18.2257 6.49823 15.7862 4.13867 12.8767 4.13867L7.20376 4.13883C4.30433 4.13883 1.80933 6.4451 1.6728 9.44299C1.52716 12.6437 3.98836 15.2606 7.04861 15.2606H11.9097Z"
                        stroke="#9DA5B6" stroke-width="1.4"></path>
                      <ellipse cx="7.11544" cy="9.90783" rx="0.961538" ry="0.961538" fill="#9DA5B6"></ellipse>
                      <ellipse cx="10" cy="9.90783" rx="0.961538" ry="0.961538" fill="#9DA5B6"></ellipse>
                      <ellipse cx="12.8847" cy="9.90783" rx="0.961538" ry="0.961538" fill="#9DA5B6"></ellipse>
                    </svg>
                    <span class="blind">댓글</span>
                  </span>
                  <span class="comment-count">${el.comment.childObjectCount}</span>
                </div>
              </li>`;
    });
    document.querySelector(".news-list").innerHTML = newsItemHtml;
  })
  .catch((error) => console.error("Error comment.json", error))
;


// 헤더 메뉴 토글버튼
const menuBtn = document.querySelector(".btn-menu");
const sideBar = document.querySelector(".side-bar");
const layout = document.querySelector(".layout");

menuBtn.addEventListener("click", () => {
  const isFolded = sideBar.classList.contains("fold");
  sideBar.classList.toggle("fold", !isFolded);
  layout.classList.toggle("fold", !isFolded);
});

// 사이드바 추천채널 토글버튼
const foldBtn = document.querySelector(".btn-fold");
const navList = document.querySelector(".nav-list");
const navMoreBtn = document.querySelector(".navigator .btn-more");

foldBtn.addEventListener("click", () => {
  const isHidden = navList.classList.contains("hidden");
  navList.classList.toggle("hidden", !isHidden);
  foldBtn.classList.toggle("hidden", !isHidden);
  navMoreBtn.classList.toggle("hidden", !isHidden);
});

// 최근 뉴스 슬라이드

new Swiper(".news-slide", {
  direction: "horizontal",
  allowTouchMove: true,
  slidesPerView: 5,
  navigation: {
    prevEl: ".sc-news .btn-prev",
    nextEl: ".sc-news .btn-next",
  },
  on: {
    reachBeginning: function () {
      document.querySelector(".sc-news .btn-prev").classList.add("hidden");
      document.querySelector(".sc-news .btn-next").classList.remove("hidden");
    },
    reachEnd: function () {
      document.querySelector(".sc-news .btn-next").classList.add("hidden");
      document.querySelector(".sc-news .btn-prev").classList.remove("hidden");
    },
    init: function () {
      document.querySelector(".sc-news .btn-prev").classList.add("hidden");
      document.querySelector(".sc-news .btn-next").classList.remove("hidden");
    },
  },
});
