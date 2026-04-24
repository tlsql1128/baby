/**
 * 베베트리: 수면 가이드 체크(항목별 맞춤 문구)
 */
(function () {
  "use strict";

  var ORDER = [
    "frequent-wake",
    "hard-sleep",
    "short-nap",
    "late-bedtime",
    "night-feeding",
    "overstimulation",
    "irregular-routine",
    "discomfort",
    "separation-anxiety",
    "illness-sign",
  ];

  var BY_KEY = {
    "frequent-wake": {
      label: "밤에 자주 깨는 느낌",
      status: "밤에 잠이 자주 끊기는 패턴이 느껴질 수 있어요.",
      tip: "취침 직전 조명과 소리를 낮추고, 씻기·옷·짧은 책 같은 <strong>같은 순서</strong>로 마무리해 보세요. 밤에 깨도 조명은 아주 약하게만 켜고 말을 짧게 이어가면 도움이 될 수 있어요.",
      routines: [
        "밤·낮 톤(소리, 밝기)이 확 달라지게 맞춰 주세요.",
        "깨었을 때 눈을 마주치며 <strong>짧고 낮은 목소리</strong>로 말을 걸어 보세요.",
      ],
    },
    "hard-sleep": {
      label: "잠들기까지 시간이 오래 걸림",
      status: "잠들기까지 시간이 오래 걸리는 편으로 느껴질 수 있어요.",
      tip: "잠들기 30분 전부터는 뛰기·큰소리·밝은 화면을 줄이고, 목욕이나 읽기처럼 <strong>느리고 조용한 루틴</strong>을 한 줄로 잡아 보세요. 졸릴 틈이 오면 그때 취침 루틴으로 이어갑니다.",
      routines: [
        "누우면 15~20분은 같은 자세로 <strong>기다려 보는 연습</strong>을 잠·깸마다 이어갈 수 있어요.",
        "낮잠과 밤잠 <strong>시간표</strong>를 한 눈에 볼 수 있게 적어 두면 흐름이 잡히기 쉬워요.",
      ],
    },
    "short-nap": {
      label: "낮잠이 짧게 끊김",
      status: "낮잠이 짧게 끊기는 모습이 느껴질 수 있어요.",
      tip: "낮잠 직전에 <strong>배고픔, 기저귀, 온도, 주변 소음</strong>을 먼저 점검해 보세요. 잠이 얕다면 촉수(아기마다 다름)로 포옹·백색소음 등을 짧게 시도해 봄직한 것만 골라 써 봅니다.",
      routines: [
        "낮잠 <strong>시작 시각</strong>의 편차를 30분 안쪽으로 맞춰 보면 잠이 길어질 때가 있어요.",
        "낮에 바깥 공기·가벼운 놀이 뒤 잠이 오기 쉬울 수 있으니, 무리한 자극만 피해 보세요.",
      ],
    },
    "late-bedtime": {
      label: "취침이 늦은 편",
      status: "취침이 늦어지면 누적 피로가 쌓일 수 있어요.",
      tip: "오늘·내일은 평소보다 <strong>20~30분 앞당겨</strong> 취침 루틴을 시작해 보는 것도 한 방법이에요. 늦게 자면 늦게 깨는 악순환이 쉬워질 수 있어요.",
      routines: [
        "저녁 밥·간식 <strong>마지막 시각</strong>을 조금 앞으로 당겨 잠·소화 리듬을 맞춰 보세요.",
        "늦잠·낮잠 막바지가 <strong>밤잠</strong>에 겹친다면, 낮잠 끝 시각을 조금씩 앞으로 실험해 봅니다.",
      ],
    },
    "night-feeding": {
      label: "밤 수유·습관적 깸",
      status: "밤중 수유나 습관적으로 잠이 깨는 흐름이 수면에 영향을 줄 수 있어요.",
      tip: "월령·수유 방식·체중 흐름에 따라 <strong>밤 수유</strong>가 필요한 시기는 달라요. 꼭 의료 권고가 있어야 한다는 뜻은 아니고, 아이 컨디션을 보며 <strong>천천히 횟수·시간</strong>을 줄여 보는 방식이 조심스럽기 좋아요. 걱정되면 <strong>소아과</strong>와 먼저 이야기해 보는 편이 안전해요.",
      routines: [
        "밤에 깨었을 때 <strong>기저귀</strong>와 <strong>옷이 불편한지</strong> 먼저 본 뒤, 수유가 필요한지 잠깐 구분해 봅니다.",
        "밤수·간식 루틴을 <strong>적어 두면</strong> 병원이나 식구와 나누기 좋아요.",
      ],
    },
    "overstimulation": {
      label: "잠 직전 자극이 많음",
      status: "잠들기 직전에 자극이 많았을 수 있어요.",
      tip: "자기 전에는 <strong>밝은 화면, 큰소리, 격한 몸놀이</strong>를 줄이고, 조명도 서서히 낮춰 주세요. 흥분이 남은 날엔 쉬엄놀이·읽기로 <strong>호흡</strong>을 늦춰 봅니다.",
      routines: [
        "TV·휴대폰 <strong>30분 전</strong>엔 끄거나 다른 방에서 마무리해 보세요.",
        "뛰놀았다면 <strong>물 한 모금, 손·발 닦기, 낮은 목소리</strong>로 전환을 알려 주세요.",
      ],
    },
    "irregular-routine": {
      label: "수면 루틴이 들쭉날쭉함",
      status: "하루마다 취침·기상·낮잠 흐름이 들쭉날쭉하면 잠이 들기 흔들릴 수 있어요.",
      tip: "매일 <strong>비슷한 순서</strong>(씻기, 옷, 어두운 방, 짧은 책, 포옹)로 반복해 보면 '이제 쉬는 시간'이 몸에 익기 쉬워요. 완벽한 시각이 아니라 <strong>순서</strong>를 먼저 맞춰 보는 것이 좋아요.",
      routines: [
        "주말에도 <strong>기상 시각</strong>이 한두 시간밖에 안 늘게 맞춰 보면 밤이 편해질 때가 있어요.",
        "캘린더에 '어제 잠든 시각'만 <strong>한 줄씩</strong> 적어 두고 한 주만 보아도 흐름이 보이기 쉬워요.",
      ],
    },
    "discomfort": {
      label: "배·기저귀·온도 등 불편",
      status: "배앓이, 기저귀, 덥고 추운 느낌 같은 <strong>불편함</strong>이 잠에 영향을 줄 수 있어요.",
      tip: "잠들기 직전에 <strong>기저귀, 옷 겹, 실내 온·습도, 방금 튬 여부</strong>를 먼저 보세요. 끈적한 옷, 너무 두꺼운 이불도 흔한 원인이에요.",
      routines: [
        "취침 10분 전 <strong>기저귀·옷</strong>만 한번 더 점검해 보는 습관이 부담이 덜해요.",
        "이유·월령이면 <strong>식습관</strong>을 아침·저녁 짧게만 적어 두면 토·복통 흐름이 보이기 쉬워요.",
      ],
    },
    "separation-anxiety": {
      label: "잠 직전 분리·불안",
      status: "분리불안이 느껴지는 시기엔, 잠들기 전에 <strong>안심</strong>을 더 오래 찾을 수 있어요.",
      tip: "짧은 <strong>스킨십</strong>과, 매일 비슷한 <strong>말</strong>(이제 쉬자, 나는 곁에 있어)로 마무리해 보고, 갑자기 자리를 비울 때 낮은 목소리로 <strong>다녀올 말</strong>을 먼저 해두면 덜 서두를 때가 있어요.",
      routines: [
        "불 켜기·문 닫기는 <strong>느리고 예측 가능하게</strong> 해보고, '곧 갈게'는 짧게 반복해 보세요.",
        "잠들기 직전엔 <strong>화면</strong>보다 <strong>같이 앉기·노랫말</strong>로만 마무리해 보는 주를 실험해 봅니다.",
      ],
    },
    "illness-sign": {
      label: "몸이 좋지 않다는 느낌",
      status: "감기 직전이거나 컨디션이 떨어지면 <strong>잠</strong>이 쉽게 흐트러질 수 있어요.",
      tip: "이 항목만으로 병이 있다고 단정하는 것은 아니에요. 다만 <strong>열, 떨리는 호흡, 끊이는 구토, 눈에 띄는 처짐, 물·수유 거부</strong>가 <strong>함께</strong> 이어질 때 지체하지 말고 <strong>소아청소년과</strong>나 119·응급 안내를 먼저 떠올려 주세요.",
      routines: [
        "체온·수면 길이·섭취량을 <strong>하루 세 칸</strong>만 메모해 두면 진료·상담에 큰 도움이 돼요.",
        "밤·낮 <strong>호흡 소리</strong>가 달라졌다면, 영상 한 번 남기고 병원에 말씀해 보면 좋아요.",
      ],
    },
  };

  function scrollToResult(el) {
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function gradeText(n) {
    if (n === 0) {
      return { title: "종합(참고)", body: "특별히 골랐던 수면 쪽 어긋남은 적다고 느껴질 수 있어요. 위 항목이 하나도 없다면, 오늘은 쉬어 가도 괜찮아요." };
    }
    if (n <= 2) {
      return { title: "종합(참고)", body: "골랐던 항목이 한두 가지면, 가정에서 <strong>가벼운 루틴 조정</strong>으로 나아질 때가 많아요. 몇 주만 같은 눈높이로 이어가 보면 좋겠어요." };
    }
    if (n <= 5) {
      return { title: "종합(참고)", body: "골랐던 항목이 여럿이면 <strong>밤·낮·수면 루틴</strong>을 한번에 훑어 보는 편이 좋아요. 메모로만 일주일 남겨 둬도 흐름이 보이기 쉬워요." };
    }
    return { title: "종합(참고)", body: "골랐던 항목이 많이 겹쳐 보일 수 있어요. <strong>몇 밤씩</strong> 짧게 기록해 두고, 개선이 늦게 느껴지면 <strong>소아과·수면</strong>을 같이 이야기해 보는 것을 권해 드려요. 단, 아래 '주의할 점'이 있을 때는 기다리지 말고 <strong>진료·응급</strong>을 먼저 떠올려 주세요." };
  }

  function buildSummary(checked) {
    if (checked.length === 0) return "";
    var labels = checked.map(function (k) {
      return BY_KEY[k] ? BY_KEY[k].label : k;
    });
    if (labels.length === 1) {
      return "지금은 <strong>" + labels[0] + "</strong>에 가장 가깝다고 느끼시는 모양이에요. 아래에 항목마다 풀어서 적어 뒀어요.";
    }
    if (labels.length === 2) {
      return "지금은 <strong>" + labels[0] + "</strong>과(와) <strong>" + labels[1] + "</strong> 쪽이 함께 떠오르는 느낌이에요. 밑에 항목마다를 나눠 봤어요.";
    }
    var first = labels.slice(0, 2).join("·");
    var rest = labels.length - 2;
    return (
      "지금은 <strong>" +
      first +
      "</strong> 등, 겹쳐서 느껴지는 부분이 " +
      labels.length +
      "가지예요(그 밖 " +
      rest +
      "가지). 아래를 항목별로 나눠 봤어요."
    );
  }

  function collectRoutines(checked) {
    var out = [];
    for (var i = 0; i < checked.length; i++) {
      var p = BY_KEY[checked[i]];
      if (p && p.routines) {
        for (var r = 0; r < p.routines.length; r++) {
          if (out.length >= 4) return out;
          if (p.routines[r] && out.indexOf(p.routines[r]) === -1) {
            out.push(p.routines[r]);
          }
        }
      }
    }
    if (out.length < 2 && checked.length) {
      out.push("잠 30분 전엔 '지금은 느리게'라고 <strong>말</strong>로 톤을 낮춰도 좋아요.");
      if (out.length < 2) {
        out.push("한 주는 <strong>취침 시각</strong>만 캘린더에 점으로 찍어 봅니다.");
      }
    }
    return out.slice(0, 4);
  }

  function cautionBlock(checked) {
    if (checked.indexOf("illness-sign") >= 0) {
      return (
        "<p class=\"sleep-check-result__caution sleep-check-result__caution--strong\">" +
        "<strong>몸이 안 좋다는 느낌</strong>을 골랐어요. 열, 호흡이 힘듦, 구토, 처짐이 겹쳤다면, 집에서 기다리기보다 <strong>소아청소년과·응급</strong>을 먼저 생각해 주세요. 이 안내는 진단이 아니라, 언제 연락을 떠올릴지 짚는 <strong>참고</strong>예요." +
        "</p>"
      );
    }
    if (checked.length >= 6) {
      return (
        "<p class=\"sleep-check-result__caution\">" +
        "겹쳐 체크된 항목이 많다면, 몇 밤 <strong>수면·기상·낮잠</strong>만 적어 둔 뒤 <strong>검진·상담</strong>에 가져가면 이야기가 수월해요. " +
        "단, 숨쉬기·의식·열이 <strong>갑자기</strong> 나빠지면 늦추지 말고 <strong>진료</strong>를 고려해 주세요." +
        "</p>"
      );
    }
    return (
      "<p class=\"sleep-check-result__caution\">" +
      "이 결과는 <strong>참고</strong>예요. 아이·가정·병력에 따라 다르고, <strong>의학적 판정을 대체하지 않아요</strong>. 수면·호흡·체온이 한꺼번에 걱정될 때 소아청소년과에 말씀해 보는 편이 좋아요." +
      "</p>"
    );
  }

  function init() {
    var form = document.getElementById("sleepCheckForm");
    var out = document.getElementById("sleepCheckResult");
    var err = document.getElementById("sleepCheckErr");
    if (!form || !out) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (err) {
        err.hidden = true;
        err.textContent = "";
      }

      var checked = [];
      ORDER.forEach(function (k) {
        var inp = form.querySelector('input[data-key="' + k + '"]');
        if (inp && inp.checked) checked.push(k);
      });

      if (checked.length === 0) {
        if (err) {
          err.hidden = false;
          err.textContent = "해당되는 항목을 1개 이상 선택해 주세요.";
        }
        return;
      }

      var g = gradeText(checked.length);
      var summary = buildSummary(checked);

      var itemsHtml = checked
        .map(function (k) {
          var p = BY_KEY[k];
          if (!p) return "";
          return (
            '<li class="sleep-check-result__per">' +
            '<p class="sleep-check-result__per-title">' +
            p.label +
            "</p>" +
            '<p class="sleep-check-result__per-status">현재 상태: ' +
            p.status +
            "</p>" +
            "<p>추천 팁: " +
            p.tip +
            "</p>" +
            "</li>"
          );
        })
        .join("");

      var routines = collectRoutines(checked);
      var rHtml = routines
        .map(function (line) {
          return "<li>" + line + "</li>";
        })
        .join("");

      out.innerHTML =
        '<div class="sleep-check-result__inner sleep-check-result--visible">' +
        '<p class="sleep-check-result__eyebrow">수면 체크 결과</p>' +
        '<article class="sleep-check-result__card sleep-check-result__card--grade">' +
        "<h3 class=\"sleep-check-result__h\">" +
        g.title +
        "</h3>" +
        "<p class=\"sleep-check-result__p\">" +
        g.body +
        "</p></article>" +
        '<article class="sleep-check-result__card">' +
        "<h3 class=\"sleep-check-result__h\">현재 상태 요약</h3>" +
        "<p class=\"sleep-check-result__p\">" +
        summary +
        "</p></article>" +
        '<article class="sleep-check-result__card">' +
        "<h3 class=\"sleep-check-result__h\">체크 항목별 해석</h3>" +
        '<ol class="sleep-check-result__ol">' +
        itemsHtml +
        "</ol></article>" +
        '<article class="sleep-check-result__card">' +
        "<h3 class=\"sleep-check-result__h\">추천 루틴(실천)</h3>" +
        "<ul class=\"sleep-check-result__ul\">" +
        rHtml +
        "</ul></article>" +
        '<article class="sleep-check-result__card sleep-check-result__card--caution">' +
        "<h3 class=\"sleep-check-result__h\">주의할 점</h3>" +
        cautionBlock(checked) +
        "</article>" +
        "</div>";

      out.hidden = false;
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
