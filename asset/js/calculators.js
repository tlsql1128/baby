/**
 * 베베트리: 서브페이지 계산기용 간단 스크립트(바닐라)
 */
function formatKoreanDate(d) {
  if (!d || isNaN(d.getTime())) return "";
  return (
    d.getFullYear() +
    "년 " +
    (d.getMonth() + 1) +
    "월 " +
    d.getDate() +
    "일"
  );
}

/* 출산 예정일: LMP + 280일, 현재 주차·시기별 안내(참고) */
function initDueDateCalculator() {
  var form = document.getElementById("dueForm");
  var out = document.getElementById("dueResult");
  if (!form || !out) return;

  var MS_DAY = 86400000;
  var MAX_PREG_DAYS = 310;

  function setWarn(msg) {
    out.innerHTML =
      '<p class="due-result-msg due-result-msg--warn">' + msg + "</p>";
  }

  function trimesterBlock(week) {
    if (week <= 12) {
      return {
        checkpoint:
          "엽산 복용 여부와 첫 산전 검사 일정을 산부인과에서 확인해 보세요. 입덧이 있으면 소량씩 자주 수분을 챙기고, 무리한 운동은 피하는 편이 좋아요.",
        supplies: [
          "엽산(의료진 안내에 따라)",
          "편한 임산부 속옷",
          "수분 보충용 텀블러",
          "병원·응급 연락처 메모",
        ],
        caution:
          "음주·흡연은 피하고 과로를 줄이세요. 복통이나 출혈이 있으면 지체하지 말고 병원에 문의하세요.",
      };
    }
    if (week <= 27) {
      return {
        checkpoint:
          "태동을 느끼기 시작할 수 있어요. 철분 섭취와 가벼운 산책 같은 운동을 꾸준히 이어가 보세요. 자세가 불편해지면 휴식과 바디필로우를 활용해 보세요.",
        supplies: [
          "임산부 속옷·바디필로우",
          "수분 보충용 텀블러",
          "태아 보험 약관 비교",
          "산모 교실·교육 정보 확인",
        ],
        caution:
          "오래 서 있거나 무리한 일정은 줄이는 것이 좋아요. 두통·어지러움이 심해지면 병원에 알려 주세요.",
      };
    }
    return {
      checkpoint:
        "입원 가방과 보호자 동선, 산후조리 계획을 한번에 점검해 보세요. 신생아 용품은 미리 세척·정리해 두면 마음이 편해져요.",
      supplies: [
        "입원 가방(산모·아기용)",
        "신생아 옷·기저귀·손수건",
        "보호자 연락망·병원 연락처",
        "택시·차량 이동 경로 메모",
      ],
      caution:
        "가진통과 진진통을 헷갈리지 않도록 병원 안내를 참고하세요. 붓기·혈압·통증이 심해지거나 이상 증상이 있으면 바로 연락하세요.",
    };
  }

  function imminentList() {
    return [
      "입원 가방 최종 점검",
      "병원 연락처 저장",
      "택시·차량 이동 경로 확인",
      "보호자 비상 연락 준비",
    ];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector('[name="lmp"]');
    if (!input || !input.value) {
      setWarn("마지막 생리 시작일을 선택해 주세요.");
      return;
    }
    var start = new Date(input.value + "T12:00:00");
    if (isNaN(start.getTime())) {
      setWarn("마지막 생리 시작일을 확인해 주세요.");
      return;
    }

    var today = new Date();
    today.setHours(12, 0, 0, 0);
    start.setHours(12, 0, 0, 0);

    if (start.getTime() > today.getTime()) {
      setWarn("오늘 이후 날짜는 입력할 수 없어요. 마지막 생리 시작일을 확인해 주세요.");
      return;
    }

    var totalDays = Math.floor((today - start) / MS_DAY);
    if (totalDays > MAX_PREG_DAYS) {
      setWarn("입력하신 날짜가 너무 이전 같아요. 마지막 생리 시작일을 다시 확인해 주세요.");
      return;
    }

    var due = new Date(start);
    due.setDate(due.getDate() + 280);

    var weekDisplay = Math.min(42, Math.max(1, Math.floor(totalDays / 7) + 1));
    var monthStep = Math.min(10, Math.max(1, Math.ceil(weekDisplay / 4)));
    var block = trimesterBlock(weekDisplay);

    var suppliesHtml = block.supplies
      .map(function (item) {
        return "<li>" + item + "</li>";
      })
      .join("");

    var pastDue = today.getTime() > due.getTime();
    var weekNote = pastDue
      ? "예정일을 지난 경우라면 분만·진찰 일정을 병원과 확인하세요. 주차는 참고용이에요."
      : "주차는 마지막 생리 첫날을 기준으로 한 참고값이에요. 초음파 주차와 다를 수 있어요.";

    var imminentHtml = "";
    if (weekDisplay >= 36) {
      var items = imminentList()
        .map(function (t) {
          return "<li>" + t + "</li>";
        })
        .join("");
      imminentHtml =
        '<article class="due-result-card due-result-card--imminent">' +
        '<p class="due-result-card__eyebrow">36주 이상</p>' +
        '<h3 class="due-result-card__label">출산 임박 준비</h3>' +
        '<ul class="due-result-card__ul">' +
        items +
        "</ul>" +
        "</article>";
    }

    var lead =
      "입력한 날짜 기준 예상 출산 예정일은 " +
      formatKoreanDate(due) +
      "입니다. 현재 주차에 맞는 준비사항도 함께 확인해 보세요.";

    out.innerHTML =
      '<div class="due-result-grid">' +
      '<article class="due-result-card due-result-card--hero">' +
      '<h3 class="due-result-card__label">출산 예정일</h3>' +
      '<p class="due-result-card__value">' +
      formatKoreanDate(due) +
      "</p>" +
      '<p class="due-result-card__lead">' +
      lead +
      "</p>" +
      '<p class="due-result-card__foot">마지막 생리 첫날에 280일을 더한 널리 쓰이는 참고식이에요. 실제는 초음파·의료진 판정이 맞아요.</p>' +
      "</article>" +
      '<article class="due-result-card">' +
      '<h3 class="due-result-card__label">현재 주차</h3>' +
      '<p class="due-result-card__value due-result-card__value--week">임신 ' +
      weekDisplay +
      "주차 (" +
      monthStep +
      "개월차)</p>" +
      '<p class="due-result-card__text">' +
      weekNote +
      "</p>" +
      "</article>" +
      '<article class="due-result-card due-result-card--wide">' +
      '<h3 class="due-result-card__label">이번 시기 체크포인트</h3>' +
      '<p class="due-result-card__text">' +
      block.checkpoint +
      "</p>" +
      "</article>" +
      '<article class="due-result-card">' +
      '<h3 class="due-result-card__label">준비물</h3>' +
      '<ul class="due-result-card__ul">' +
      suppliesHtml +
      "</ul>" +
      "</article>" +
      '<article class="due-result-card">' +
      '<h3 class="due-result-card__label">주의사항</h3>' +
      '<p class="due-result-card__text">' +
      block.caution +
      "</p>" +
      "</article>" +
      imminentHtml +
      "</div>";
  });
}

/* 수면: 취침·기상 시각에서 총 수면·상태·추천(참고) */
function initSleepCalculator() {
  var form = document.getElementById("sleepForm");
  var out = document.getElementById("sleepResult");
  if (!form || !out) return;

  function setMessage(className, text) {
    out.innerHTML =
      '<p class="sleep-result-msg ' +
      className +
      '">' +
      text +
      "</p>";
  }

  function renderCard(totalMin, hoursFloat) {
    var h = Math.floor(totalMin / 60);
    var m = totalMin % 60;
    var timeLine;
    if (h === 0) {
      timeLine = "약 " + m + "분";
    } else if (m === 0) {
      timeLine = "약 " + h + "시간";
    } else {
      timeLine = "약 " + h + "시간 " + m + "분";
    }

    var statusLabel;
    var recLine;
    if (hoursFloat < 3) {
      statusLabel = "수면이 많이 부족해 보여요.";
      recLine =
        "오늘은 평소보다 일찍 재우는 것을 추천해요. 다음 낮잠은 2~3시간 안에 시도해 보세요.";
    } else if (hoursFloat < 5) {
      statusLabel = "잠이 부족한 편이에요.";
      recLine =
        "오늘은 평소보다 일찍 재우는 것을 추천해요. 다음 낮잠은 2~3시간 안에 시도해 보세요.";
    } else if (hoursFloat < 8) {
      statusLabel = "비교적 안정적인 수면이에요.";
      recLine =
        "평소 수면 루틴을 유지해도 좋아요. 다음 수면은 아이 컨디션을 보며 3~4시간 뒤에 시도해 보세요.";
    } else {
      statusLabel = "충분히 잔 편이에요.";
      recLine =
        "무리하게 재우기보다 활동 시간을 조금 가져도 좋아요. 졸림 신호가 보이면 다음 수면을 준비해 주세요.";
    }

    var foot =
      "월령과 건강 상태에 따라 필요한 수면은 달라질 수 있어요. 여기 숫자는 한 구간만 넣었을 때의 참고예요.";

    out.innerHTML =
      '<div class="sleep-result-card">' +
      '<div class="sleep-result-card__block">' +
      '<p class="sleep-result-card__label">총 수면시간</p>' +
      '<p class="sleep-result-card__value">' +
      timeLine +
      "</p>" +
      "</div>" +
      '<div class="sleep-result-card__block">' +
      '<p class="sleep-result-card__label">수면 상태</p>' +
      '<p class="sleep-result-card__text">' +
      statusLabel +
      "</p>" +
      "</div>" +
      '<div class="sleep-result-card__block">' +
      '<p class="sleep-result-card__label">추천</p>' +
      '<p class="sleep-result-card__text">' +
      recLine +
      "</p>" +
      "</div>" +
      '<div class="sleep-result-card__block">' +
      '<p class="sleep-result-card__label">체크 포인트</p>' +
      '<p class="sleep-result-card__text">' +
      "하품, 눈 비비기, 보챔, 멍하게 있음 같은 졸림 신호를 함께 살펴보세요." +
      "</p>" +
      "</div>" +
      '<p class="sleep-result-card__foot">' +
      foot +
      "</p>" +
      "</div>";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bed = form.querySelector('[name="bedtime"]')?.value;
    var wake = form.querySelector('[name="waketime"]')?.value;
    if (!bed || !wake) {
      setMessage(
        "sleep-result-msg--warn",
        "잠든 시각과 일어난 시각을 모두 넣어 주세요."
      );
      return;
    }
    if (bed === wake) {
      setMessage("sleep-result-msg--warn", "시간을 다시 확인해 주세요.");
      return;
    }
    var b = new Date("1970-01-01T" + bed + ":00");
    var w = new Date("1970-01-01T" + wake + ":00");
    if (w <= b) w.setDate(w.getDate() + 1);
    var totalMin = Math.round((w - b) / 60000);
    if (totalMin <= 0) {
      setMessage("sleep-result-msg--warn", "시간을 다시 확인해 주세요.");
      return;
    }
    var hoursFloat = totalMin / 60;
    renderCard(totalMin, hoursFloat);
  });
}

/* 예방접종: 생후 개월 수로 당장 확인할 흐름(간이 안내) */
function initVaxCalculator() {
  var form = document.getElementById("vaxForm");
  var out = document.getElementById("vaxResult");
  if (!form || !out) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var m = parseFloat(form.querySelector('[name="months"]')?.value);
    if (isNaN(m) || m < 0 || m > 60) {
      out.textContent = "0에서 60 사이의 개월 수를 넣어 주세요.";
      return;
    }
    var lines = [];
    if (m < 1) {
      lines.push("초기 접종은 병원 안내와 예방접종도우미 일정표를 먼저 확인해 주세요.");
    } else if (m < 6) {
      lines.push("예방접종은 예방접종도우미 일정과 담당 병원 안내가 기준이에요. 대표적으로 BCG, B형 간염, 2·4·6개월 접종이 포함될 수 있어요.");
    } else {
      lines.push("독감, MMR, 수두, A형 간염, 일본뇌염 등, 월령에 맞는 백신을 정해진 날에 맞추는 것이 중요해요.");
    }
    lines.push(
      "아래 예방접종 안내에서 준비물과 접종 전 체크사항도 함께 확인해 보세요. 병원 방문 전 준비에 도움이 될 거예요."
    );
    out.textContent = lines.join(" ");
    var guide = document.getElementById("vax-onpage-guide");
    if (guide) {
      window.requestAnimationFrame(function () {
        var y = guide.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initDueDateCalculator();
  initSleepCalculator();
  initVaxCalculator();
});
