/**
 * 월령별 놀이백과: 월령 필터 + 검색
 * - 발달 단계에 맞춘 놀이 중심
 */
(function () {
  "use strict";

  var CATS = [
    { id: "0-3", label: "0~3개월" },
    { id: "4-6", label: "4~6개월" },
    { id: "7-9", label: "7~9개월" },
    { id: "10-12", label: "10~12개월" },
    { id: "13-18", label: "13~18개월" },
    { id: "19-24", label: "19~24개월" },
    { id: "25-36", label: "25~36개월" },
  ];

  var PLAYS = [
    // 0~3
    { title: "눈 맞춤 따라오기", age: "0~3개월", cat: "0-3", items: "보호자 얼굴", how: "아기 얼굴에서 20~25cm 거리로 천천히 시선을 맞추고, 좌우로 아주 느리게 이동합니다.", effect: "시각 추적, 관계 신호 읽기", caution: "피곤해 보이면 바로 멈추기, 강한 조명 피하기" },
    { title: "흑백 카드 천천히 보기", age: "0~3개월", cat: "0-3", items: "흑백 패턴 카드", how: "짧게 20~30초씩 보여 주고 쉬었다가 다시 합니다. 한 장만 반복해도 좋아요.", effect: "초기 시각 자극, 집중 유지", caution: "가까이 들이밀지 않기, 과자극 주의" },
    { title: "딸랑이 소리 찾기", age: "0~3개월", cat: "0-3", items: "부드러운 딸랑이", how: "한쪽에서 작게 소리를 내고 반응을 기다립니다. 반대쪽도 같은 방식으로 반복해요.", effect: "청각 방향 감지, 주의 전환", caution: "귀 가까이에서 크게 울리지 않기" },
    { title: "배 위 엎드리기 짧게", age: "0~3개월", cat: "0-3", items: "얇은 담요", how: "각성 상태에서 30초에서 시작해요. 팔이 불편해 보이면 담요를 가슴 아래에 살짝 받칩니다.", effect: "목·어깨 근육, 몸 중심", caution: "항상 보호자 관찰, 울면 쉬기" },
    { title: "손바닥 압박 놀이", age: "0~3개월", cat: "0-3", items: "보호자 손", how: "손바닥을 살짝 감싸 쥐게 하고, 손가락을 천천히 펴고 접도록 도와줍니다.", effect: "잡기 반사, 촉감 인지", caution: "세게 쥐지 않기, 손 차가움 주의" },

    // 4~6
    { title: "잡기 목표 주기", age: "4~6개월", cat: "4-6", items: "가벼운 링/천", how: "손이 닿을 만한 위치에 두고 스스로 잡게 기다립니다. 잡으면 칭찬하고 천천히 빼 봐요.", effect: "눈과 손 협응, 소근육", caution: "입으로 가져가므로 작은 부품 금지" },
    { title: "거울 속 나 찾기", age: "4~6개월", cat: "4-6", items: "아기 안전 거울", how: "거울에 비친 얼굴을 보며 이름을 불러 주세요. 표정 따라 하기도 좋아요.", effect: "사회적 관심, 얼굴 인식", caution: "유리 거울 금지, 모서리 안전" },
    { title: "뒤집기 응원 놀이", age: "4~6개월", cat: "4-6", items: "매트", how: "장난감을 옆으로 살짝 두어 몸을 돌리도록 유도합니다. 어깨를 살짝 도와주되 억지로는 하지 않아요.", effect: "몸통 회전, 대근육", caution: "낙상 위험 있는 곳 금지" },
    { title: "느리게 굴러가는 공 보기", age: "4~6개월", cat: "4-6", items: "큰 공(부드러운 재질)", how: "아기 앞에서 아주 천천히 굴려 시선을 따라가게 합니다. 손이 닿으면 잡게 해요.", effect: "시각 추적, 예측", caution: "작은 공 금지, 얼굴로 굴리지 않기" },
    { title: "양손 건네기", age: "4~6개월", cat: "4-6", items: "장난감 2개", how: "한 손에 쥔 장난감을 반대 손으로 옮기는 것을 기다립니다. 보호자가 옮겨 주기보다 시간을 줘요.", effect: "양손 협응, 손 교차", caution: "피곤 신호가 오면 중단" },

    // 7~9
    { title: "까꿍 놀이", age: "7~9개월", cat: "7-9", items: "손/얇은 천", how: "얼굴을 가렸다가 천천히 보여 주며 이름을 불러요. 아기가 천을 잡아 내리게 해도 좋아요.", effect: "대상 영속성, 관계 놀이", caution: "천이 코·입을 덮지 않게" },
    { title: "앉아서 장난감 탐색", age: "7~9개월", cat: "7-9", items: "다양한 질감 장난감 2~3개", how: "앞에 두고 하나씩 만지게 해요. 한 번에 많이 주지 말고 교체합니다.", effect: "탐색, 선택, 집중", caution: "작은 부품, 배터리 포함 제품 금지" },
    { title: "이름 부르면 돌아보기", age: "7~9개월", cat: "7-9", items: "보호자 목소리", how: "한 번 부르고 기다립니다. 돌아보면 웃으며 반응해 주세요.", effect: "주의 전환, 의사소통 시작", caution: "반복해서 재촉하지 않기" },
    { title: "컵 안에 숨기기", age: "7~9개월", cat: "7-9", items: "종이컵/플라스틱 컵, 작은 장난감", how: "장난감을 컵 아래에 숨기고 찾게 합니다. 처음엔 일부가 보이게요.", effect: "문제 해결, 손 조작", caution: "질식 크기 장난감 금지" },
    { title: "두드리기 리듬 놀이", age: "7~9개월", cat: "7-9", items: "비어 있는 용기", how: "탁, 탁, 쉬기 같은 짧은 패턴을 보여 주고 따라 하게 기다립니다.", effect: "모방, 리듬 감각", caution: "큰 소리로 놀라게 하지 않기" },

    // 10~12
    { title: "붙잡고 서기 안전 놀이", age: "10~12개월", cat: "10-12", items: "안정적인 소파/낮은 테이블", how: "잡을 곳을 제공하고, 무릎을 살짝 굽혔다 펴는 움직임을 천천히 돕습니다.", effect: "하체 힘, 균형", caution: "미끄럼 방지, 모서리 보호" },
    { title: "가리키기 따라보기", age: "10~12개월", cat: "10-12", items: "그림책/집 안 사물", how: "보호자가 가리키면 아기도 손을 뻗게 유도합니다. 맞으면 크게 반응해요.", effect: "공동 주의, 언어 준비", caution: "억지로 손을 잡아 끌지 않기" },
    { title: "블록 넣고 빼기", age: "10~12개월", cat: "10-12", items: "큰 블록, 큰 통", how: "넣기부터 시작해요. 빼기도 보여 주고, 성공하면 칭찬합니다.", effect: "손 조절, 원인 결과", caution: "작은 블록 금지" },
    { title: "간단 단어 따라하기", age: "10~12개월", cat: "10-12", items: "보호자 목소리", how: "엄마, 아빠, 안녕 같은 한 단어를 천천히 말하고, 입 모양을 보여 줍니다.", effect: "언어 모방, 소리 인식", caution: "정답 강요 금지" },
    { title: "상자 열고 닫기", age: "10~12개월", cat: "10-12", items: "뚜껑 있는 상자", how: "열기, 닫기를 번갈아 보여 주고 아기가 따라 하게 기다립니다.", effect: "손 조작, 집중", caution: "손 끼임 주의, 너무 딱딱한 뚜껑 금지" },

    // 13~18
    { title: "흉내 걷기 길 만들기", age: "13~18개월", cat: "13-18", items: "쿠션 2~3개", how: "쿠션 사이를 천천히 걷는 모습을 보여 주고 따라 하게 합니다.", effect: "균형, 전신 조절", caution: "높이 쌓지 않기, 미끄럼 주의" },
    { title: "정리 상자 넣기", age: "13~18개월", cat: "13-18", items: "큰 바구니", how: "장난감 하나를 집어 바구니에 넣고 박수. 아기가 따라 하면 한 개씩 늘려요.", effect: "지시 따르기, 분류 시작", caution: "무거운 장난감 금지" },
    { title: "두 가지 선택하기", age: "13~18개월", cat: "13-18", items: "장난감 2개", how: "둘 중 하나를 고르게 하고 선택을 존중합니다. 선택한 것에 이름을 붙여 말해 주세요.", effect: "의사 표현, 선택 경험", caution: "선택을 바꾸더라도 혼내지 않기" },
    { title: "동작 따라 하기", age: "13~18개월", cat: "13-18", items: "보호자 몸", how: "손 흔들기, 무릎 굽히기 같은 동작을 보여 주고 따라 하게 합니다.", effect: "모방, 신체 인지", caution: "무리한 동작 금지" },
    { title: "간단 퍼즐 맞추기", age: "13~18개월", cat: "13-18", items: "큰 손잡이 퍼즐 1~2조각", how: "한 조각만 시작해요. 맞추는 방향을 살짝 힌트로 보여 줍니다.", effect: "공간 인지, 소근육", caution: "작은 조각 금지" },

    // 19~24
    { title: "색과 모양 분류하기", age: "19~24개월", cat: "19-24", items: "큰 색 블록 6~8개", how: "빨간 것만 모으기, 동그란 것만 모으기처럼 한 기준만 먼저 합니다.", effect: "분류, 규칙 이해", caution: "너무 오래 하면 지치니 5분만" },
    { title: "역할 놀이 시작", age: "19~24개월", cat: "19-24", items: "인형, 숟가락, 작은 컵", how: "인형에게 밥 주기, 재우기처럼 짧게 시작해요. 보호자가 한 문장만 말해도 좋아요.", effect: "상징 놀이, 언어", caution: "작은 소품은 삼킴 위험 체크" },
    { title: "두 단계 지시 따르기", age: "19~24개월", cat: "19-24", items: "장난감, 바구니", how: "블록 가져와서 바구니에 넣기처럼 두 단계 지시를 짧게 합니다.", effect: "작업 기억, 이해력", caution: "안 되면 한 단계로 줄이기" },
    { title: "그림책 질문 놀이", age: "19~24개월", cat: "19-24", items: "그림책", how: "이건 뭐야, 어디 있지 같은 질문을 짧게 하고, 대답하면 크게 칭찬해요.", effect: "어휘, 상호작용", caution: "답을 강요하지 않기" },
    { title: "큰 종이 스티커 떼기", age: "19~24개월", cat: "19-24", items: "큰 스티커, 종이", how: "스티커를 떼어 붙이는 행동을 보여 주고 따라 하게 합니다.", effect: "손끝 힘, 집중", caution: "입에 넣지 않게 관찰" },

    // 25~36
    { title: "길 만들기 협동 놀이", age: "25~36개월", cat: "25-36", items: "블록, 자동차 장난감", how: "블록으로 길을 만들고 자동차를 굴립니다. 아기에게 한 역할만 맡겨요.", effect: "협동, 계획", caution: "무리한 규칙 강요 금지" },
    { title: "감정 이름 붙이기", age: "25~36개월", cat: "25-36", items: "그림 카드/그림책", how: "기쁨, 속상함 같은 감정을 그림으로 보고 이름을 말해요. 상황 예시를 한 문장으로 덧붙입니다.", effect: "감정 언어, 공감", caution: "정답 맞히기 놀이로 만들지 않기" },
    { title: "가위는 아직 연습 단계", age: "25~36개월", cat: "25-36", items: "유아 안전 가위, 두꺼운 종이", how: "한 번에 길게 자르기보다 짧은 선을 따라 자르는 연습을 합니다.", effect: "손 조절, 집중", caution: "반드시 보호자 동행, 날카로운 가위 금지" },
    { title: "역할 바꾸기 놀이", age: "25~36개월", cat: "25-36", items: "인형, 장난감", how: "엄마가 아기 역할, 아기가 엄마 역할을 바꿔 해 봅니다.", effect: "관점 바꾸기, 사회성", caution: "거부하면 즉시 중단" },
    { title: "간단 규칙 게임", age: "25~36개월", cat: "25-36", items: "카드 3~5장", how: "같은 그림 찾기처럼 규칙이 하나인 게임을 짧게 진행합니다.", effect: "규칙 이해, 인내", caution: "이기기보다 진행을 칭찬" },
  ];

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  var activeCat = "0-3";
  var barEl = document.getElementById("pbaCatBar");
  var searchEl = document.getElementById("pbaSearch");
  var listEl = document.getElementById("pbaList");
  var resultEl = document.getElementById("pbaResult");

  function matches(p, cat, q) {
    if (cat && p.cat !== cat) return false;
    if (!q) return true;
    var blob = (p.title + " " + p.items + " " + p.how + " " + p.effect + " " + p.caution).toLowerCase();
    return blob.indexOf(q) !== -1;
  }

  function buildCard(p) {
    return (
      '<li class="pba-card">' +
      '<div class="pba-card__head">' +
      '<h3 class="pba-card__title">' +
      esc(p.title) +
      "</h3>" +
      '<p class="pba-card__meta"><span class="badge">추천 월령: ' +
      esc(p.age) +
      "</span></p>" +
      "</div>" +
      '<div class="pba-card__body">' +
      '<p class="pba-line"><strong>준비물</strong> ' +
      esc(p.items) +
      "</p>" +
      '<p class="pba-line"><strong>놀이 방법</strong> ' +
      esc(p.how) +
      "</p>" +
      '<p class="pba-line"><strong>기대 효과</strong> ' +
      esc(p.effect) +
      "</p>" +
      '<p class="pba-line"><strong>주의사항</strong> ' +
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
      var btns = barEl.querySelectorAll(".pba-cat-btn");
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
        '<button type="button" class="pba-cat-btn' +
          (i === 0 ? " is-active" : "") +
          '" data-cat="' +
          esc(CATS[i].id) +
          '">' +
          esc(CATS[i].label) +
          "</button>"
      );
    }
    barEl.innerHTML = h.join("");
    var btns = barEl.querySelectorAll(".pba-cat-btn");
    var b;
    for (b = 0; b < btns.length; b++) {
      btns[b].addEventListener("click", function () {
        setCat(this.getAttribute("data-cat") || "0-3");
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

