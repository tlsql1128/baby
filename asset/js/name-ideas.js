/**
 * 이름 추천 / 태명 추천: 카테고리 + 검색 + 랜덤
 */
(function () {
  "use strict";

  var CATS = [
    { id: "all", label: "전체" },
    { id: "boy", label: "남아 이름" },
    { id: "girl", label: "여아 이름" },
    { id: "pure", label: "순우리말 이름" },
    { id: "hanja", label: "한자 이름" },
    { id: "tae", label: "태명 추천" },
  ];

  var IDEAS = [
    // 태명(50)
    { name: "튼튼이", kind: "태명", tags: ["tae"], meaning: "건강하게 자라길 바라는 마음", vibe: "든든하고 씩씩한 느낌" },
    { name: "복덩이", kind: "태명", tags: ["tae"], meaning: "좋은 복을 가득 안고 오길 바라는 마음", vibe: "포근하고 기쁜 느낌" },
    { name: "별이", kind: "태명", tags: ["tae"], meaning: "반짝이는 존재로 자라길 바라는 마음", vibe: "맑고 반짝한 느낌" },
    { name: "사랑이", kind: "태명", tags: ["tae"], meaning: "사랑을 듬뿍 받는 아이", vibe: "따뜻하고 부드러운 느낌" },
    { name: "열매", kind: "태명", tags: ["tae"], meaning: "소중한 결실처럼 찾아온 아이", vibe: "단단하고 감사한 느낌" },
    { name: "햇살이", kind: "태명", tags: ["tae"], meaning: "따뜻한 기운을 주는 아이", vibe: "밝고 환한 느낌" },
    { name: "콩콩이", kind: "태명", tags: ["tae"], meaning: "작은 심장 소리처럼 소중한 존재", vibe: "통통 튀고 귀여운 느낌" },
    { name: "토리", kind: "태명", tags: ["tae"], meaning: "작고 귀여운 아기(도토리처럼)", vibe: "동글동글 사랑스러운 느낌" },
    { name: "라온이", kind: "태명", tags: ["tae"], meaning: "즐겁고 행복한 아이", vibe: "명랑하고 밝은 느낌" },
    { name: "다온이", kind: "태명", tags: ["tae"], meaning: "좋은 일이 다 오는 아이", vibe: "복이 모이는 느낌" },
    { name: "봄이", kind: "태명", tags: ["tae"], meaning: "봄처럼 포근하게 찾아온 아이", vibe: "상큼하고 따뜻한 느낌" },
    { name: "초롱이", kind: "태명", tags: ["tae"], meaning: "초롱초롱 빛나는 눈망울", vibe: "맑고 귀여운 느낌" },
    { name: "구름이", kind: "태명", tags: ["tae"], meaning: "구름처럼 부드럽게 머무는 아이", vibe: "포근하고 잔잔한 느낌" },
    { name: "하트", kind: "태명", tags: ["tae"], meaning: "가족의 마음 한가운데 온 아이", vibe: "사랑이 가득한 느낌" },
    { name: "기쁨이", kind: "태명", tags: ["tae"], meaning: "찾아온 순간부터 기쁨이 된 아이", vibe: "환하고 설레는 느낌" },
    { name: "미소", kind: "태명", tags: ["tae"], meaning: "가족에게 미소를 주는 아이", vibe: "온화하고 다정한 느낌" },
    { name: "빛나", kind: "태명", tags: ["tae"], meaning: "매일이 빛나길 바라는 마음", vibe: "반짝이고 힘 있는 느낌" },
    { name: "단비", kind: "태명", tags: ["tae"], meaning: "가뭄 끝에 내리는 고마운 비", vibe: "정갈하고 감사한 느낌" },
    { name: "보물", kind: "태명", tags: ["tae"], meaning: "가장 소중한 보물 같은 아이", vibe: "든든하고 귀한 느낌" },
    { name: "꿀떡이", kind: "태명", tags: ["tae"], meaning: "쑥쑥 잘 먹고 잘 크길", vibe: "통통하고 활기찬 느낌" },
    { name: "꼬물이", kind: "태명", tags: ["tae"], meaning: "작게 꼬물꼬물 움직이는 소중한 생명", vibe: "아기자기한 느낌" },
    { name: "반짝이", kind: "태명", tags: ["tae"], meaning: "반짝반짝 빛나는 하루를 선물", vibe: "경쾌하고 맑은 느낌" },
    { name: "달콩이", kind: "태명", tags: ["tae"], meaning: "달콤한 마음을 주는 아이", vibe: "달달하고 귀여운 느낌" },
    { name: "감사", kind: "태명", tags: ["tae"], meaning: "찾아온 것만으로도 감사한 아이", vibe: "차분하고 따뜻한 느낌" },
    { name: "새싹이", kind: "태명", tags: ["tae"], meaning: "새싹처럼 자라나는 생명", vibe: "싱그럽고 풋풋한 느낌" },
    { name: "단단이", kind: "태명", tags: ["tae"], meaning: "몸도 마음도 단단히 크길", vibe: "든든하고 안정적인 느낌" },
    { name: "바다", kind: "태명", tags: ["tae"], meaning: "넓고 깊은 마음을 가진 아이", vibe: "시원하고 여유로운 느낌" },
    { name: "나비", kind: "태명", tags: ["tae"], meaning: "자유롭게 날아오르길", vibe: "가볍고 산뜻한 느낌" },
    { name: "해피", kind: "태명", tags: ["tae"], meaning: "매일 행복하길 바라는 마음", vibe: "명랑하고 경쾌한 느낌" },
    { name: "산들", kind: "태명", tags: ["tae"], meaning: "산들바람처럼 편안한 아이", vibe: "부드럽고 잔잔한 느낌" },
    { name: "소담이", kind: "태명", tags: ["tae"], meaning: "소담소담 풍성하게 자라길", vibe: "풍성하고 포근한 느낌" },
    { name: "이슬이", kind: "태명", tags: ["tae"], meaning: "이슬처럼 맑고 깨끗한 아이", vibe: "청량하고 맑은 느낌" },
    { name: "모찌", kind: "태명", tags: ["tae"], meaning: "말랑말랑 포근한 존재", vibe: "말랑하고 귀여운 느낌" },
    { name: "찰떡이", kind: "태명", tags: ["tae"], meaning: "엄마 아빠와 찰떡같이 잘 맞길", vibe: "정겨운 느낌" },
    { name: "파랑이", kind: "태명", tags: ["tae"], meaning: "파란 하늘처럼 시원한 마음", vibe: "시원하고 맑은 느낌" },
    { name: "노을이", kind: "태명", tags: ["tae"], meaning: "노을처럼 따뜻한 빛", vibe: "감성적이고 온화한 느낌" },
    { name: "봄비", kind: "태명", tags: ["tae"], meaning: "따뜻한 봄비처럼 다정한 아이", vibe: "포근하고 고운 느낌" },
    { name: "둥실이", kind: "태명", tags: ["tae"], meaning: "둥실둥실 편안하게 자라길", vibe: "느긋하고 포근한 느낌" },
    { name: "금동이", kind: "태명", tags: ["tae"], meaning: "금처럼 귀하고 반짝이는 아이", vibe: "귀하고 단정한 느낌" },
    { name: "은별", kind: "태명", tags: ["tae"], meaning: "은빛 별처럼 소중한 존재", vibe: "차분하고 반짝한 느낌" },
    { name: "하늘이", kind: "태명", tags: ["tae"], meaning: "하늘처럼 큰 품을 가진 아이", vibe: "시원하고 넓은 느낌" },
    { name: "해님이", kind: "태명", tags: ["tae"], meaning: "햇빛처럼 따뜻한 아이", vibe: "환하고 밝은 느낌" },
    { name: "달님이", kind: "태명", tags: ["tae"], meaning: "달빛처럼 포근한 아이", vibe: "조용하고 부드러운 느낌" },
    { name: "온유", kind: "태명", tags: ["tae"], meaning: "온화하고 부드럽게 자라길", vibe: "차분하고 다정한 느낌" },
    { name: "맑음이", kind: "태명", tags: ["tae"], meaning: "맑은 마음으로 자라길", vibe: "깨끗하고 맑은 느낌" },
    { name: "푸름이", kind: "태명", tags: ["tae"], meaning: "푸르게 쑥쑥 자라길", vibe: "싱그럽고 건강한 느낌" },
    { name: "살랑이", kind: "태명", tags: ["tae"], meaning: "살랑살랑 기분 좋은 바람", vibe: "가볍고 산뜻한 느낌" },
    { name: "이안", kind: "태명", tags: ["tae"], meaning: "편안함과 안정을 바라는 마음", vibe: "차분하고 안정적인 느낌" },
    { name: "소중이", kind: "태명", tags: ["tae"], meaning: "무엇보다 소중한 존재", vibe: "다정하고 감사한 느낌" },
    { name: "행복이", kind: "태명", tags: ["tae"], meaning: "가족의 행복을 안고 온 아이", vibe: "기쁜 느낌" },

    // 순우리말 이름(뜻 포함)
    { name: "가온", kind: "순우리말", tags: ["pure", "boy", "girl"], meaning: "세상의 중심", vibe: "단정하고 안정적인 느낌" },
    { name: "라온", kind: "순우리말", tags: ["pure", "boy", "girl"], meaning: "즐거운, 기쁜", vibe: "밝고 부드러운 느낌" },
    { name: "다온", kind: "순우리말", tags: ["pure", "boy", "girl"], meaning: "좋은 일이 모두 오는", vibe: "복이 모이는 느낌" },
    { name: "나래", kind: "순우리말", tags: ["pure", "girl"], meaning: "날개", vibe: "가볍고 시원한 느낌" },
    { name: "하람", kind: "순우리말", tags: ["pure", "boy"], meaning: "하늘이 내린 소중한 사람", vibe: "든든하고 맑은 느낌" },
    { name: "아린", kind: "순우리말", tags: ["pure", "girl"], meaning: "맑고 고운 느낌", vibe: "청초하고 부드러운 느낌" },
    { name: "소율", kind: "순우리말", tags: ["pure", "girl"], meaning: "맑고 부드러운 울림", vibe: "고운 울림 같은 느낌" },
    { name: "이든", kind: "순우리말", tags: ["pure", "boy"], meaning: "튼튼하게 자라다", vibe: "건강하고 단단한 느낌" },
    { name: "온새", kind: "순우리말", tags: ["pure", "boy", "girl"], meaning: "온전한 새로움", vibe: "신선하고 단정한 느낌" },
    { name: "새봄", kind: "순우리말", tags: ["pure", "girl"], meaning: "새로운 봄", vibe: "상큼하고 따뜻한 느낌" },

    // 한자 이름(뜻 포함)
    { name: "서준", kind: "한자", tags: ["hanja", "boy"], meaning: "상서로울 서, 준걸 준", vibe: "단정하고 믿음직한 느낌" },
    { name: "도윤", kind: "한자", tags: ["hanja", "boy"], meaning: "길 도, 윤택할 윤", vibe: "부드럽고 지적인 느낌" },
    { name: "지우", kind: "한자", tags: ["hanja", "boy", "girl"], meaning: "지혜 지, 집 우", vibe: "차분하고 영리한 느낌" },
    { name: "하윤", kind: "한자", tags: ["hanja", "girl"], meaning: "클 하, 윤택할 윤", vibe: "밝고 고운 느낌" },
    { name: "예린", kind: "한자", tags: ["hanja", "girl"], meaning: "예쁠 예, 맑을 린", vibe: "맑고 단정한 느낌" },
    { name: "민준", kind: "한자", tags: ["hanja", "boy"], meaning: "민첩할 민, 준걸 준", vibe: "또렷하고 씩씩한 느낌" },
    { name: "서아", kind: "한자", tags: ["hanja", "girl"], meaning: "상서로울 서, 아름다울 아", vibe: "단아하고 고운 느낌" },
    { name: "지안", kind: "한자", tags: ["hanja", "girl"], meaning: "지혜 지, 편안할 안", vibe: "안정적이고 부드러운 느낌" },
    { name: "우진", kind: "한자", tags: ["hanja", "boy"], meaning: "도울 우, 참될 진", vibe: "든든하고 성실한 느낌" },
    { name: "채윤", kind: "한자", tags: ["hanja", "girl"], meaning: "빛날 채, 윤택할 윤", vibe: "환하고 단정한 느낌" },

    // 남아 이름(의미/느낌 포함)
    { name: "준호", kind: "남아", tags: ["boy"], meaning: "준수하고 넓은 마음을 떠올리게 하는 이름", vibe: "또렷하고 믿음직한 느낌" },
    { name: "시우", kind: "남아", tags: ["boy"], meaning: "부드러운 발음, 시원한 인상", vibe: "맑고 단정한 느낌" },
    { name: "현우", kind: "남아", tags: ["boy"], meaning: "차분한 울림이 있는 이름", vibe: "안정적이고 듬직한 느낌" },
    { name: "건우", kind: "남아", tags: ["boy"], meaning: "건강하고 반듯한 이미지를 주는 이름", vibe: "단단하고 씩씩한 느낌" },
    { name: "은찬", kind: "남아", tags: ["boy"], meaning: "차분한 음과 밝은 음이 조화로운 이름", vibe: "부드럽고 밝은 느낌" },
    { name: "태오", kind: "남아", tags: ["boy"], meaning: "짧고 힘 있는 발음으로 기억하기 쉬운 이름", vibe: "활기차고 또렷한 느낌" },
    { name: "도현", kind: "남아", tags: ["boy"], meaning: "또렷한 발음, 단정한 인상", vibe: "지적인 느낌" },
    { name: "정우", kind: "남아", tags: ["boy"], meaning: "정갈하고 안정적인 울림", vibe: "차분하고 신뢰감 있는 느낌" },
    { name: "유준", kind: "남아", tags: ["boy"], meaning: "부드러운 시작과 단정한 마무리", vibe: "따뜻하고 안정적인 느낌" },
    { name: "하준", kind: "남아", tags: ["boy"], meaning: "맑은 음감, 밝은 인상을 주는 이름", vibe: "환하고 씩씩한 느낌" },

    // 여아 이름(의미/느낌 포함)
    { name: "서연", kind: "여아", tags: ["girl"], meaning: "부드럽게 이어지는 발음으로 편안한 인상", vibe: "단아하고 따뜻한 느낌" },
    { name: "지아", kind: "여아", tags: ["girl"], meaning: "짧고 또렷해 부르기 쉬운 이름", vibe: "맑고 사랑스러운 느낌" },
    { name: "수아", kind: "여아", tags: ["girl"], meaning: "정갈하고 부드러운 울림", vibe: "고운 느낌" },
    { name: "윤아", kind: "여아", tags: ["girl"], meaning: "부드럽고 밝은 이미지를 주는 이름", vibe: "환하고 단정한 느낌" },
    { name: "하린", kind: "여아", tags: ["girl"], meaning: "맑고 차분한 인상이 남는 이름", vibe: "청아한 느낌" },
    { name: "예나", kind: "여아", tags: ["girl"], meaning: "또렷한 발음이 귀에 잘 남는 이름", vibe: "밝고 경쾌한 느낌" },
    { name: "서하", kind: "여아", tags: ["girl"], meaning: "부드러움과 시원함이 함께 느껴지는 이름", vibe: "단아하고 시원한 느낌" },
    { name: "다인", kind: "여아", tags: ["girl"], meaning: "단정한 발음, 여러 의미로 확장하기 좋은 이름", vibe: "차분한 느낌" },
    { name: "아윤", kind: "여아", tags: ["girl"], meaning: "부드러운 발음으로 편안한 인상", vibe: "고운 느낌" },
    { name: "채원", kind: "여아", tags: ["girl"], meaning: "또렷한 울림과 단정한 인상", vibe: "맑고 안정적인 느낌" },
  ];

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  var activeCat = "all";
  var searchEl = document.getElementById("niSearch");
  var listEl = document.getElementById("niList");
  var resultEl = document.getElementById("niResult");
  var barEl = document.getElementById("niCatBar");
  var randBtn = document.getElementById("niRandomBtn");

  function matches(it, cat, q) {
    if (cat !== "all" && it.tags.indexOf(cat) === -1) return false;
    if (!q) return true;
    var blob = (it.name + " " + it.kind + " " + it.meaning + " " + it.vibe).toLowerCase();
    return blob.indexOf(q) !== -1;
  }

  function buildCard(it) {
    return (
      '<li class="ni-card">' +
      '<div class="ni-card__head">' +
      '<h3 class="ni-card__name">' +
      esc(it.name) +
      "</h3>" +
      '<p class="ni-card__meta"><span class="badge">' +
      esc(it.kind) +
      "</span></p>" +
      "</div>" +
      '<div class="ni-card__body">' +
      '<p class="ni-card__line"><strong>뜻</strong> ' +
      esc(it.meaning) +
      "</p>" +
      '<p class="ni-card__line"><strong>느낌</strong> ' +
      esc(it.vibe) +
      "</p>" +
      "</div>" +
      "</li>"
    );
  }

  function render() {
    if (!listEl) return;
    var q = searchEl && searchEl.value ? searchEl.value.trim().toLowerCase() : "";
    var out = [];
    var i;
    for (i = 0; i < IDEAS.length; i++) {
      if (matches(IDEAS[i], activeCat, q)) out.push(IDEAS[i]);
    }
    listEl.style.opacity = "0.6";
    window.setTimeout(function () {
      listEl.innerHTML = out.map(buildCard).join("");
      listEl.style.opacity = "1";
      if (resultEl) resultEl.textContent = "총 " + out.length + "개";
    }, 60);
  }

  function setCat(id) {
    activeCat = id;
    if (barEl) {
      var btns = barEl.querySelectorAll(".ni-cat-btn");
      var b;
      for (b = 0; b < btns.length; b++) {
        if (btns[b].getAttribute("data-cat") === id) btns[b].classList.add("is-active");
        else btns[b].classList.remove("is-active");
      }
    }
    render();
  }

  function buildBar() {
    if (!barEl) return;
    var h = [];
    var i;
    for (i = 0; i < CATS.length; i++) {
      h.push(
        '<button type="button" class="ni-cat-btn' +
          (CATS[i].id === "all" ? " is-active" : "") +
          '" data-cat="' +
          esc(CATS[i].id) +
          '">' +
          esc(CATS[i].label) +
          "</button>"
      );
    }
    barEl.innerHTML = h.join("");
    var btns = barEl.querySelectorAll(".ni-cat-btn");
    var b;
    for (b = 0; b < btns.length; b++) {
      btns[b].addEventListener("click", function () {
        setCat(this.getAttribute("data-cat") || "all");
      });
    }
  }

  function pickRandomVisible() {
    var q = searchEl && searchEl.value ? searchEl.value.trim().toLowerCase() : "";
    var pool = [];
    var i;
    for (i = 0; i < IDEAS.length; i++) {
      if (matches(IDEAS[i], activeCat, q)) pool.push(IDEAS[i]);
    }
    if (!pool.length) return;
    var chosen = pool[Math.floor(Math.random() * pool.length)];
    if (searchEl) searchEl.value = chosen.name;
    render();
    if (searchEl) searchEl.focus();
  }

  function init() {
    buildBar();
    if (searchEl) {
      searchEl.addEventListener("input", function () {
        render();
      });
    }
    if (randBtn) {
      randBtn.addEventListener("click", function () {
        pickRandomVisible();
      });
    }
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

