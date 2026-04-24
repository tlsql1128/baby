/**
 * 베베트리: 발달 체크 (개월 수 + 항목별 기대 범주 비율)
 */
(function () {
  "use strict";

  var CRITERIA = {
    c1: {
      t: "눈 맞춤·얼굴 따라감",
      play: "자주 눈을 맞춰 주며 얼굴에 부드러운 표정을 보여주세요. 거울 앞에 함께 앉는 것도 좋아요.",
    },
    c2: {
      t: "큰소리·말소리 쪽으로 시선·고개가 갑니다",
      play: "조용한 방에서 쪽쪽이 소리, 노래, 이름을 짧게 불러보며 어느 쪽에 반응하는지 봐 주세요.",
    },
    c3: {
      t: "웃음·밝은 얼굴이 이전보다 늘었어요",
      play: "놀릴 틈이 생길 때마다 눈높이에 맞춰 웃고 반응해 주면 감정 표현이 붙는 데 도움이 돼요.",
    },
    c4: {
      t: "고개·목을 흔들·들어 올릴 힘이 자라고 있어요",
      play: "배·어깨를 받쳐 주고 가볍게 위아래·좌우로 흥미가 가는 쪽에 소리·장난감을 보여주세요.",
    },
    c5: {
      t: "손으로 물건을 잡고 흔들거나 당겨봅니다",
      play: "다양한 질감(부드럽·거친) 딸랑이를 손에 쥐어 주고 같이 둥글게 굴려 봅니다.",
    },
    c6: {
      t: "뒤집기(또는 누워서 몸 뒤집기)를 시도해요",
      play: "바닥에 안전한 매트를 깔고 엎드려서 관심이 가는 장난감을 조금씩 옆으로 옮겨 봅니다.",
    },
    c7: {
      t: "옹알이·아·어 비슷한 말이 나옵니다",
      play: "아이가 내는 소리에 천천히 맞장구를 치고, 음절을 조금씩 늘려 흉내 냄을 도와주세요.",
    },
    c8: {
      t: "익숙한 얼굴과 낯선 얼굴에 반응이 달라집니다",
      play: "자주 본 사람·처음 본 사람을 섞지 않고, 누군가 올 땐 미리 익은 목소리로 말을 걸어 주세요.",
    },
    c9: {
      t: "배밀기·기기·(지지하면) 느슷하게 앉기를 시도해요",
      play: "엎드려 머리·상체를 일으킬 틈을 만들고, 가벼운 쿠션으로 둘러 앉는 자세를 연습해 봅니다.",
    },
    c10: {
      t: "부르는 이름에 잠시 돌아보거나 눈을 맞출 때가 늘어요",
      play: "기저귀·수유·놀이 전에 항상 같은 톤으로 이름을 먼저 부르는 습관을 이어가 보세요.",
    },
    c11: {
      t: "빨·집·덜그럭 딸랑이 등을 양손으로 옮기며 탐색해요",
      play: "쉬운 숨은그림(큰 사진)이나 쌓이는 링, 컵·공 담기 놀이로 손끝을 자극해 봅니다.",
    },
    c12: {
      t: "가구·손을 잡고 일어서거나 뒤뚱걸음(짧은 걸음)이 보이기도 해요",
      play: "가구 모서리는 안전·패딩이 있는지 먼저 보고, 짧은 가구 뒤를 붙잡고 오르기를 함께 봅니다.",
    },
    c13: {
      t: "흉내·엄마·딱 한두 말(낱말)이 섞여 나와요(이 시기권이면)",
      play: "일상 물건 이름(물·우유·빨대)을 짧게 말하며, 아이의 소리 뒤에 말을 한 토막씩 이어가 보세요.",
    },
    c14: {
      t: "뛰기·쌓기·넣기를 시도하거나 두 말(물 줘)을 이을 때가 있어요(이때권이면)",
      play: "큰 블록 쌓기, 통에 맞춰 넣기, 가벼운 달리기(실내)를 겹치지 않고 한 번씩 봅니다.",
    },
    c15: {
      t: "짧은 문장·또래·간단한 역할놀이·계단(손) 오르내리기(이때권이면)",
      play: "책 한 권, 인형, 단순한 푸시카로 역할놀이를 이어가고, 밖이면 짧은 계단(보호)에서 같이 봅니다.",
    },
  };

  var BUCKETS = [
    { min: 0, max: 3, expected: ["c1", "c2", "c3", "c4"] },
    { min: 4, max: 6, expected: ["c4", "c5", "c6", "c7", "c8", "c9"] },
    { min: 7, max: 9, expected: ["c5", "c6", "c7", "c8", "c9", "c10", "c11"] },
    { min: 10, max: 12, expected: ["c6", "c7", "c8", "c9", "c10", "c11", "c12"] },
    { min: 13, max: 18, expected: ["c8", "c9", "c10", "c11", "c12", "c13", "c14"] },
    { min: 19, max: 24, expected: ["c10", "c11", "c12", "c13", "c14", "c15"] },
    { min: 25, max: 36, expected: ["c12", "c13", "c14", "c15"] },
  ];

  function getBucket(month) {
    for (var i = 0; i < BUCKETS.length; i++) {
      if (month >= BUCKETS[i].min && month <= BUCKETS[i].max) {
        return BUCKETS[i];
      }
    }
    return BUCKETS[BUCKETS.length - 1];
  }

  function scrollToResult(el) {
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function init() {
    var form = document.getElementById("devCheckForm");
    var out = document.getElementById("devResult");
    var err = document.getElementById("devCheckErr");
    if (!form || !out) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (err) {
        err.hidden = true;
        err.textContent = "";
      }

      var monthIn = form.querySelector('[name="childMonths"]');
      var m = monthIn ? parseInt(monthIn.value, 10) : NaN;
      if (!monthIn || monthIn.value === "" || isNaN(m)) {
        if (err) {
          err.hidden = false;
          err.textContent = "0에서 36 사이의 아이의 현재 개월 수(숫자)를 넣어 주세요.";
        }
        return;
      }
      if (m < 0 || m > 36) {
        if (err) {
          err.hidden = false;
          err.textContent = "개월 수는 0 이상 36 이하의 숫자로 넣어 주세요.";
        }
        return;
      }

      var bucket = getBucket(m);
      var exp = bucket.expected;
      var checked = [];
      var missed = [];
      for (var j = 0; j < exp.length; j++) {
        var cid = exp[j];
        var inputEl = form.querySelector('input[data-cid="' + cid + '"]');
        if (inputEl && inputEl.checked) {
          checked.push(cid);
        } else {
          missed.push(cid);
        }
      }

      var nExp = exp.length;
      var nOk = checked.length;
      var ratio = nExp ? nOk / nExp : 0;

      var tier;
      if (ratio >= 0.8) {
        tier = "a";
      } else if (ratio >= 0.5) {
        tier = "b";
      } else {
        tier = "c";
      }

      var judgeSummary;
      if (tier === "a") {
        judgeSummary =
          "지금 " +
          m +
          "개월권에 자주 눈에 띄는 흐름으로 볼 때, 체크한 항목은 <strong>대체로 자연스러운 발달</strong> 쪽에 가깝게 보여요. 아이마다 빠르고 느린 차이는 흔합니다.";
      } else if (tier === "b") {
        judgeSummary =
          "지금 " +
          m +
          "개월권 흐름에 비해, <strong>일부는 조금 더 집에서 관찰</strong>해 보면 좋겠어요. 며칠씩 끊지 말고 2~4주 정도는 같은 눈높이로 지켜볼 수 있어요.";
      } else {
        judgeSummary =
          "같은 개월권에서 보기에, <strong>집에서 한번 더 점검</strong>해 볼 항목이 꽤 있어요. 꼭 이상이 있다는 뜻은 아니고, <strong>소아청소년과</strong>에서 흐름을 같이 이야기해 보는 편이 좋겠어요.";
      }

      var missText;
      if (missed.length === 0) {
        missText =
          "이 구간에서 함께 본 <strong>기대 항목</strong>이 모두 눈에 띄면 좋겠다고 느껴졌어요. 다음에도 비슷한 눈높이로 놀이·관찰을 이어가 주세요.";
      } else {
        missText =
          "아래 <strong>조금 더 관찰할 발달</strong>에 적힌 항목이 있다면, 2~4주는 같은 눈높이로 흐름이 붙는지 봅니다. <strong>크게</strong> 어긋난 느낌이 <strong>멈추지 않을 때</strong>는 건강·발달을 보는 병원에서 이야기해 보면 좋겠어요. 이 결과는 <strong>참고용</strong>이에요.";
      }

      var playBullets = [];
      for (var p = 0; p < Math.min(3, missed.length); p++) {
        var mid = missed[p];
        if (CRITERIA[mid] && playBullets.length < 3) {
          playBullets.push(CRITERIA[mid].play);
        }
      }
      if (playBullets.length === 0) {
        playBullets.push("하루 한 번, 짧은 눈 맞춤·노래·따라말놀이를 이어가 보세요.");
        playBullets.push("놀이 후엔 잠·식사·흥미가 어느 쪽이었는지 한 줄씩 기록해 두면 다음에 비교하기 쉬워요.");
        playBullets.push("아이의 호흡·색·기력이 떨어지는 날엔 쉬어 가며 같은 놀이를 짧게 나눠 보세요.");
      }

      var listChecked = checked
        .map(function (cid) {
          return "<li>" + CRITERIA[cid].t + "</li>";
        })
        .join("");
      if (!listChecked) {
        listChecked =
          "<li>이 구간의 기대 항목이 아직 하나도 체크되지 않았어요. 잠·수유 직후 말고, 놀이할 때를 골라 다시 봐 주세요.</li>";
      }

      var listMissed = missed
        .map(function (cid) {
          return "<li>" + CRITERIA[cid].t + "</li>";
        })
        .join("");
      if (!listMissed) {
        listMissed = "<li>이 구간의 기대 항목이 모두 체크에 포함되었어요.</li>";
      }

      out.innerHTML =
        '<div class="dev-result__grid">' +
        '<article class="dev-result__card dev-result__card--main">' +
        '<p class="dev-result__eyebrow">현재 입력</p>' +
        "<p class=\"dev-result__title\">" +
        m +
        "개월 아이를 기준으로, 대략 <strong>" +
        bucket.min +
        "~" +
        bucket.max +
        "개월권</strong>에서 자주 이야기하는 모습이 잘 잡혔는지 짚어 봤어요.</p>" +
        "<p class=\"dev-result__p dev-result__p--sub\">" +
        "이 표는 <strong>가정·참고용</strong>이에요. 실제 발달·건강은 아이, 환경, 병력에 따라 달라질 수 있고, <strong>의학적 판정을 대체하지 않아요</strong>." +
        "</p></article>" +
        '<article class="dev-result__card">' +
        '<p class="dev-result__eyebrow">체크 결과</p>' +
        "<p class=\"dev-result__value\">" +
        "이번에 함께 본 <strong>기대 항목 " +
        nExp +
        "개</strong> 가운데, <strong>체크된 항목은 " +
        nOk +
        "개</strong>예요(약 " +
        Math.round(ratio * 100) +
        "%).</p></article>" +
        '<article class="dev-result__card dev-result__card--wide">' +
        '<p class="dev-result__eyebrow">판단(참고)</p>' +
        "<p class=\"dev-result__p\">" +
        judgeSummary +
        "</p>" +
        "<p class=\"dev-result__p\">" +
        missText +
        "</p></article>" +
        '<div class="dev-result__split">' +
        '<article class="dev-result__card dev-result__mini">' +
        "<p class=\"dev-result__box-title\">잘 보이는 발달</p>" +
        "<p class=\"dev-result__box-desc\">(이번에 체크된 기대 항목)</p>" +
        '<ul class="dev-result__ul">' +
        listChecked +
        "</ul></article>" +
        '<article class="dev-result__card dev-result__mini">' +
        "<p class=\"dev-result__box-title\">조금 더 관찰할 발달</p>" +
        "<p class=\"dev-result__box-desc\">(이번에 아직 체크되지 않은 기대 항목)</p>" +
        '<ul class="dev-result__ul dev-result__ul--soft">' +
        listMissed +
        "</ul></article></div>" +
        '<article class="dev-result__card dev-result__card--wide">' +
        '<p class="dev-result__eyebrow">추천 놀이(가정에서)</p>' +
        "<ul class=\"dev-result__ul dev-result__ul--play\">" +
        playBullets
          .map(function (line) {
            return "<li>" + line + "</li>";
          })
          .join("") +
        "</ul></article>" +
        '<article class="dev-result__card dev-result__card--wide">' +
        '<p class="dev-result__eyebrow">주의 깊게 볼 점</p>' +
        "<p class=\"dev-result__p\">" +
        "같은 흐름이 <strong>1~2개월 이상</strong> 반복해서 어긋난다고 느껴지거나, <strong>말·움직임·눈맞음이 갑자기 많이</strong> 줄어들면 소아청소년과·발달·신경을 보는 병원 상담을 권해 드려요. 짧은 사진·영상을 남기면 상담이 수월해요." +
        "</p></article>" +
        "</div>";

      out.hidden = false;
      out.classList.remove("dev-result--visible");
      void out.offsetWidth;
      out.classList.add("dev-result--visible");
      window.requestAnimationFrame(function () {
        scrollToResult(out);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
