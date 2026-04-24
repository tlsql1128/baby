/**
 * 집콕 놀이 모음: 상황 필터 + 검색
 * - 상황별 집 안 놀이 중심
 */
(function () {
  "use strict";

  var CATS = [
    { id: "none", label: "준비물 없는 놀이" },
    { id: "5m", label: "5분 놀이" },
    { id: "rain", label: "비 오는 날 놀이" },
    { id: "energy", label: "에너지 발산 놀이" },
    { id: "quiet", label: "조용한 놀이" },
    { id: "rest", label: "부모가 쉬면서 가능한 놀이" },
  ];

  var PLAYS = [
    // 준비물 없는 놀이(5)
    { title: "표정 따라하기", cat: "none", situation: "식사 전후, 잠들기 전", items: "없음", time: "3~5분", how: "웃는 얼굴, 놀란 얼굴처럼 표정을 바꿔 보여 주고 따라 하게 해요.", caution: "아기가 불편해하면 바로 멈추기" },
    { title: "손뼉 리듬 놀이", cat: "none", situation: "기분 전환이 필요할 때", items: "없음", time: "2~4분", how: "탁탁 쉬기 같은 짧은 패턴을 만들고 따라 하게 기다립니다.", caution: "큰 소리로 놀라게 하지 않기" },
    { title: "몸으로 동물 흉내", cat: "none", situation: "에너지 조금 빼고 싶을 때", items: "없음", time: "3~6분", how: "곰 걸음, 토끼 점프처럼 쉬운 동작을 한 가지씩 따라 해요.", caution: "미끄럼 위험 없는 바닥에서 하기" },
    { title: "이름 부르면 손 흔들기", cat: "none", situation: "낯가림, 집중 시작", items: "없음", time: "2~3분", how: "이름을 부르고 손을 흔들어 인사해요. 아기가 따라 하면 크게 반응합니다.", caution: "억지로 반복하지 않기" },
    { title: "숨바꼭질 음성 힌트", cat: "none", situation: "짧게 재미를 주고 싶을 때", items: "없음", time: "3~5분", how: "방 안에서 살짝 숨어 이름을 부르고, 소리로 찾아오게 합니다.", caution: "문턱, 가구 모서리 안전 확인" },

    // 5분 놀이(5)
    { title: "양말 공 던지기", cat: "5m", situation: "잠깐 에너지 빼기", items: "말아 만든 양말 공", time: "5분", how: "바구니를 목표로 던져 넣어 봅니다. 가까운 거리부터 시작해요.", caution: "작은 공 사용 금지, 얼굴 방향 던지지 않기" },
    { title: "쿠션 길 따라 걷기", cat: "5m", situation: "집 안에서 안전하게 움직이기", items: "쿠션 2~4개", time: "4~6분", how: "쿠션을 한 줄로 두고 그 위를 따라 걷게 합니다.", caution: "높이 쌓지 않기, 미끄럼 방지" },
    { title: "종이컵 숨기기", cat: "5m", situation: "집중 시작", items: "종이컵 2~3개, 큰 장난감 1개", time: "5분", how: "컵 아래에 장난감을 숨기고 찾게 해요. 처음엔 일부가 보이게요.", caution: "삼킬 크기 장난감 금지" },
    { title: "손가락 길 만들기", cat: "5m", situation: "조용한 5분", items: "없음", time: "3~5분", how: "손가락으로 바닥에 길을 그리며 자동차가 간다고 말해요.", caution: "바닥 먼지, 작은 물건 치우기" },
    { title: "책 한 장만 읽기", cat: "5m", situation: "루틴 만들기", items: "그림책", time: "5분", how: "한 권 전체가 아니라 한 장만 읽고 끝내도 괜찮아요.", caution: "억지로 끝까지 읽지 않기" },

    // 비 오는 날(5)
    { title: "이불 터널", cat: "rain", situation: "움직임이 필요할 때", items: "이불, 의자 2개", time: "10분", how: "의자 위에 이불을 덮어 터널을 만들고 기어가게 합니다.", caution: "의자 넘어짐 방지, 숨 막힘 위험 없게 넓게" },
    { title: "방 안 보물찾기", cat: "rain", situation: "심심할 때", items: "안전한 물건 5개", time: "10~15분", how: "찾을 물건을 하나씩 숨기고 힌트를 한 문장으로 줘요.", caution: "서랍, 문틈 손 끼임 주의" },
    { title: "종이컵 탑 쌓기", cat: "rain", situation: "조용히 집중", items: "종이컵 10개 내외", time: "10분", how: "한 줄, 두 줄로 쌓아 보고 무너지면 같이 웃으며 다시 시작합니다.", caution: "컵을 찢어 먹지 않게 관찰" },
    { title: "실내 그림자 놀이", cat: "rain", situation: "조명 있는 저녁", items: "손전등(약한 빛)", time: "8~10분", how: "벽에 그림자를 만들고 손 모양을 바꿔 봅니다.", caution: "눈에 직접 비추지 않기" },
    { title: "빗소리 듣고 이야기", cat: "rain", situation: "차분한 전환", items: "창가", time: "5~8분", how: "빗소리를 듣고 어떤 소리인지 말로 붙여 줍니다.", caution: "창문 잠금, 방충망 기대지 않기" },

    // 에너지 발산(5)
    { title: "쿠션 섬 점프", cat: "energy", situation: "뛰고 싶을 때", items: "쿠션 여러 개", time: "8~12분", how: "바닥에 쿠션을 섬처럼 두고 안전한 거리만 점프해요.", caution: "높은 점프 금지, 미끄럼 방지" },
    { title: "빨래 바구니 밀기", cat: "energy", situation: "힘을 쓰고 싶을 때", items: "빈 바구니", time: "5~8분", how: "바구니를 밀며 방 한 바퀴를 돕습니다.", caution: "손가락 끼임 주의, 무거운 짐 금지" },
    { title: "몸으로 숫자 만들기", cat: "energy", situation: "짧게 재미", items: "없음", time: "5~7분", how: "1, 2, 3을 몸으로 표현해 보고 따라 합니다.", caution: "무리한 자세 금지" },
    { title: "풍선 톡톡", cat: "energy", situation: "실내에서 가볍게", items: "풍선 1개", time: "7~10분", how: "풍선을 바닥에 떨어뜨리지 않게 톡톡 치며 이동해요.", caution: "터지면 조각 즉시 치우기, 입에 넣지 않기" },
    { title: "라인 따라 걷기", cat: "energy", situation: "기분 전환", items: "종이테이프(선)", time: "8~10분", how: "바닥에 선을 붙이고 그 위를 걷게 해요. 뒤로 걷기는 짧게만.", caution: "테이프 미끄럼, 떼어 삼키지 않게" },

    // 조용한 놀이(5)
    { title: "스티커 붙이기", cat: "quiet", situation: "조용히 집중", items: "큰 스티커, 종이", time: "10분", how: "스티커를 떼어 종이에 붙입니다. 한 번에 5장만 꺼내요.", caution: "입에 넣지 않게 관찰" },
    { title: "색 찾기 미션", cat: "quiet", situation: "가만히 놀고 싶을 때", items: "집 안 물건", time: "5~8분", how: "파란색 찾기처럼 한 색만 정해 천천히 찾아봅니다.", caution: "서랍 깊이 손 넣지 않게" },
    { title: "조용한 소리 찾기", cat: "quiet", situation: "흥분 가라앉히기", items: "없음", time: "3~5분", how: "시계 소리, 냉장고 소리처럼 작은 소리를 같이 들어요.", caution: "무서워하면 즉시 중단" },
    { title: "손가락 인형 대화", cat: "quiet", situation: "잠들기 전", items: "손", time: "5분", how: "손가락을 인형처럼 움직이며 한 문장씩 대화합니다.", caution: "아기가 싫어하면 멈추기" },
    { title: "종이 접기 흉내", cat: "quiet", situation: "테이블 놀이", items: "종이 1~2장", time: "8~10분", how: "정교한 종이접기보다 반으로 접고 펴는 흉내부터 시작합니다.", caution: "종이를 찢어 먹지 않게" },

    // 부모가 쉬면서 가능한 놀이(5)
    { title: "소리만 내는 퀴즈", cat: "rest", situation: "부모가 앉아 있을 때", items: "집 안 물건 2~3개", time: "5~7분", how: "종이 구기기 같은 소리를 내고 뭔지 맞혀 봅니다.", caution: "너무 큰 소리 금지" },
    { title: "오늘 한 가지 칭찬", cat: "rest", situation: "정리하며 대화", items: "없음", time: "3~5분", how: "오늘 잘한 일을 한 가지 말해 주고, 아이도 따라 말하게 해요.", caution: "강요하지 않기" },
    { title: "그림책 오디오 읽기", cat: "rest", situation: "부모 목이 쉬었을 때", items: "그림책", time: "5~10분", how: "책을 넘기며 짧은 문장만 읽어 줍니다. 설명은 최소로요.", caution: "화면 대체로 오래 틀지 않기" },
    { title: "손 마사지 놀이", cat: "rest", situation: "차분한 시간", items: "로션(선택)", time: "3~6분", how: "손가락을 하나씩 쓸어 주고, 아기도 보호자 손을 만져 보게 합니다.", caution: "향이 강한 제품 피하기" },
    { title: "낮은 목소리 따라하기", cat: "rest", situation: "흥분 진정", items: "없음", time: "2~4분", how: "작게, 천천히 말하는 것을 따라 하게 합니다. 속도를 느리게요.", caution: "아이를 놀리듯 흉내내지 않기" },
  ];

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  var activeCat = "none";
  var barEl = document.getElementById("ipCatBar");
  var searchEl = document.getElementById("ipSearch");
  var listEl = document.getElementById("ipList");
  var resultEl = document.getElementById("ipResult");

  function matches(p, cat, q) {
    if (cat && p.cat !== cat) return false;
    if (!q) return true;
    var blob = (p.title + " " + p.situation + " " + p.items + " " + p.how + " " + p.time + " " + p.caution).toLowerCase();
    return blob.indexOf(q) !== -1;
  }

  function buildCard(p) {
    return (
      '<li class="ip-card">' +
      '<div class="ip-card__head">' +
      '<h3 class="ip-card__title">' +
      esc(p.title) +
      "</h3>" +
      '<p class="ip-card__meta"><span class="badge">추천 상황: ' +
      esc(p.situation) +
      '</span> <span class="badge">소요 시간: ' +
      esc(p.time) +
      "</span></p>" +
      "</div>" +
      '<div class="ip-card__body">' +
      '<p class="ip-line"><strong>준비물</strong> ' +
      esc(p.items) +
      "</p>" +
      '<p class="ip-line"><strong>놀이 방법</strong> ' +
      esc(p.how) +
      "</p>" +
      '<p class="ip-line"><strong>주의사항</strong> ' +
      esc(p.caution) +
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
    for (i = 0; i < PLAYS.length; i++) {
      if (matches(PLAYS[i], activeCat, q)) out.push(PLAYS[i]);
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
      var btns = barEl.querySelectorAll(".ip-cat-btn");
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
        '<button type="button" class="ip-cat-btn' +
          (i === 0 ? " is-active" : "") +
          '" data-cat="' +
          esc(CATS[i].id) +
          '">' +
          esc(CATS[i].label) +
          "</button>"
      );
    }
    barEl.innerHTML = h.join("");
    var btns = barEl.querySelectorAll(".ip-cat-btn");
    var b;
    for (b = 0; b < btns.length; b++) {
      btns[b].addEventListener("click", function () {
        setCat(this.getAttribute("data-cat") || "none");
      });
    }
  }

  function init() {
    buildBar();
    if (searchEl) {
      searchEl.addEventListener("input", function () {
        render();
      });
    }
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

