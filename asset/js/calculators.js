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

/* 출산 예정일: 마지막 생리 시작일 + 280일(간이) */
function initDueDateCalculator() {
  var form = document.getElementById("dueForm");
  var out = document.getElementById("dueResult");
  if (!form || !out) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector('[name="lmp"]');
    if (!input || !input.value) {
      out.textContent = "날짜를 선택해 주세요.";
      return;
    }
    var start = new Date(input.value + "T12:00:00");
    if (isNaN(start.getTime())) {
      out.textContent = "날짜를 다시 확인해 주세요.";
      return;
    }
    var due = new Date(start);
    due.setDate(due.getDate() + 280);
    out.innerHTML =
      "예정일은 <strong>" +
      formatKoreanDate(due) +
      "</strong>으로 계산돼요. 마지막 생리 첫날에 280일을 더한 값이며, 참고용이에요.";
  });
}

/* 수면: 취침·기상 시각에서 수면시간(간이) */
function initSleepCalculator() {
  var form = document.getElementById("sleepForm");
  var out = document.getElementById("sleepResult");
  if (!form || !out) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bed = form.querySelector('[name="bedtime"]')?.value;
    var wake = form.querySelector('[name="waketime"]')?.value;
    if (!bed || !wake) {
      out.textContent = "취침 시각과 기상 시각을 모두 넣어 주세요.";
      return;
    }
    var b = new Date("1970-01-01T" + bed + ":00");
    var w = new Date("1970-01-01T" + wake + ":00");
    if (w <= b) w.setDate(w.getDate() + 1);
    var diff = (w - b) / 60000;
    if (diff <= 0) {
      out.textContent = "시간을 다시 확인해 주세요.";
      return;
    }
    var h = Math.floor(diff / 60);
    var m = Math.round(diff % 60);
    out.textContent =
      "이 구간이면 잠이 든 뒤 약 " +
      h +
      "시간 " +
      m +
      "분으로 계산돼요. 참고용이며, 아기는 날마다 달라요.";
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
    lines.push("아래 예방접종 안내에서 준비물과 확인할 내용을 함께 보면 좋아요.");
    out.innerHTML = lines.join(" ");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initDueDateCalculator();
  initSleepCalculator();
  initVaxCalculator();
});
