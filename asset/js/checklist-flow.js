/**
 * 베베트리: 체크리스트 제출, 결과 분석, 스크롤·페이드 인
 */
(function () {
  "use strict";

  var MIN_SELECTED = 3;

  function scrollToEl(el) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function countIn(root, sel) {
    return root.querySelectorAll(sel).length;
  }

  function tierFromRatio(ratio, worry, wThreshold) {
    if (worry >= (wThreshold || 2)) return "c";
    if (worry === 1) return ratio >= 0.55 ? "b" : "c";
    if (ratio >= 0.62) return "a";
    if (ratio >= 0.38) return "b";
    return "c";
  }

  var COPY = {
    development: {
      a: {
        badge: "또래 평균 범위",
        summary: "지금 관찰되는 모습은 자연스러운 발달 흐름으로 보여요. 아이마다 속도는 달라도, 전반적인 방향은 안정적인 편이에요.",
        tip: "집에서도 매일 10분 정도 눈 맞춤과 간단한 놀이를 이어가며 관찰해 주세요.",
      },
      b: {
        badge: "조금 더 관찰 필요",
        summary: "몇 가지 항목은 아직 잘 보이지 않거나 들쭉날쭉할 수 있어요. 한두 달 뒤 변화를 함께 보는 것이 좋아요.",
        tip: "월령별 가이드와 발달 체크를 한 달 뒤에 다시 해보고, 걱정되는 점은 짧게 메모해 두면 상담에 도움이 돼요.",
      },
      c: {
        badge: "상담 추천",
        summary: "체크한 내용만으로 판단할 수는 없지만, 여러 항목에서 걱정이 든다면 전문가 의견을 들어보는 편이 안전해요.",
        tip: "걱정되는 부분이 있다면 소아청소년과 상담을 권장드립니다. 영상이나 메모를 준비해 가면 상담이 수월해요.",
      },
    },
    allergy: {
      a: {
        badge: "천천히 진행 추천 단계",
        summary: "새 식재료 도입과 관찰 습관이 잘 잡혀 가고 있어요. 지금처럼 한 가지씩 확인하는 흐름을 유지해 주세요.",
        tip: "앞으로도 한 번에 하나씩, 소량으로 시도하고 3일에서 4일은 같은 재료로 관찰하는 패턴을 이어가면 좋아요.",
      },
      b: {
        badge: "기록 관리 추천",
        summary: "도입 방식은 괜찮은데 기록이나 시간대 조절이 조금 더 보완되면 더 안심하고 넘어갈 수 있어요.",
        tip: "날짜, 양, 피부, 배변, 수면을 짧게라도 적어 두면 다음 재료 선택과 병원 상담 때 모두 도움이 돼요.",
      },
      c: {
        badge: "주의 식품 관찰 필요",
        summary: "반응이 있었거나 위험 신호에 해당하는 항목이 선택되었어요. 집에서의 체크는 참고용이며 의료 판단을 대신하지 않아요.",
        tip: "입술·눈 주변 붓기, 숨쉬기 어려움, 의식 저하, 심한 두드러기 등이 있었다면 즉시 응급·소아과 상담을 고려해 주세요.",
      },
    },
    growth: {
      a: {
        badge: "현재 성장 흐름 양호",
        summary: "기록해 본 내용을 보면 식사, 수면, 활동의 균형이 대체로 무난해 보여요. 검진 때 의료진 설명과 함께 보면 좋아요.",
        tip: "선택한 월령의 키·몸무게 곡선은 반드시 병원에서 확인하고, 집에서는 기운과 패턴 위주로 이어가면 돼요.",
      },
      b: {
        badge: "식사·수면 패턴 점검 추천",
        summary: "한두 가지 영역에서 조절이 필요해 보일 수 있어요. 며칠 단위로 다시 체크해 보면 흐름이 보이기 쉬워요.",
        tip: "이유식·분유량, 낮잠과 밤잠, 배변을 같은 메모장에 적어 두면 다음 검진 때 질문하기 좋아요.",
      },
      c: {
        badge: "병원 상담 권장",
        summary: "기운, 섭식, 발열 등에서 걱정되는 부분이 여럿 보여요. 성장 곡선과 함께 소아청소년과에서 한번 짚어보길 권해요.",
        tip: "증상이 심하거나 급하게 느껴지면 미루지 말고 당일 진료를 고려해 주세요.",
      },
    },
    sleep: {
      a: {
        badge: "수면 패턴 안정적",
        summary: "밤과 낮의 구분, 취침 전 루틴 등이 비교적 잘 맞춰져 있어요. 지금 리듬을 유지하는 쪽이 좋아요.",
        tip: "밤수를 줄일 때는 한 번에 끊기보다 한 횟씩 천천히 조정하고, 소아과와 상의하는 것이 안전해요.",
      },
      b: {
        badge: "낮잠 조절 필요",
        summary: "낮잠 길이나 시각이 밤잠과 겹치는 느낌이 있을 수 있어요. 낮 활동과 낮잠 창을 조금씩 조정해 볼 만해요.",
        tip: "낮잠 마지막 시각을 조금 앞당기고, 저녁 루틴 시작 시각을 일정하게 맞춰 보세요.",
      },
      c: {
        badge: "취침 시간 조정 추천",
        summary: "밤에 자주 깨거나 잠들기까지 시간이 오래 걸리는 편이에요. 과자극, 낮잠, 저녁 식사 시각을 함께 점검해 보세요.",
        tip: "호흡 곤란, 청색, 의식 변화가 동반되면 수면 문제가 아니라 응급일 수 있으니 바로 진료를 고려해 주세요.",
      },
    },
  };

  function growthMonthLines(value) {
    var map = {
      "0-3": [
        "수유·분유 양과 횟수, 젖병 거부, 토하는 양을 짧게 기록해요.",
        "배뇨·배변 횟수와 색, 점도를 관찰해요.",
        "수면은 총 시간보다 깼을 때 기운이 있는지 같이 봐요.",
        "열, 호흡, 피부색 변화가 있으면 병원 상담을 우선해요.",
      ],
      "4-6": [
        "뒤집기 시도, 목 가누기, 손으로 잡는 동작을 날짜로 남겨요.",
        "이유식을 시작했다면 새 재료는 한 번에 하나, 소량으로 관찰해요.",
        "낮잠과 밤잠의 구분이 생기는지 루틴을 간단히 적어봐요.",
        "검진에서 키·몸무게 곡선은 의료진 설명을 기준으로 봐요.",
      ],
      "7-9": [
        "앉기, 기기, 잡고 서기 등 움직임이 늘어나는지 관찰해요.",
        "씹기 연습과 음식 질감 변화에 적응하는지 봐요.",
        "낯가림, 분리 불안이 생길 수 있어요. 하루 컨디션 메모가 도움이 돼요.",
        "밤에 자주 깨면 낮 활동과 과자극 여부도 같이 봐요.",
      ],
      "10-12": [
        "잡고 걷기, 손짓, 단어 흉내 같은 소통을 기록해요.",
        "식사량 변화가 큰 시기예요. 며칠 단위로 흐름을 봐요.",
        "낙상·낄임이 늘 수 있어요. 집 안전을 점검해요.",
        "검진 때 궁금한 점을 메모해 갔다가 질문해요.",
      ],
      "13-18": [
        "첫걸음이 안정되는지, 넘어짐이 줄어드는지 관찰해요.",
        "말이 느리더라도 제스처, 눈맞춤, 반응을 같이 봐요.",
        "편식이 시작될 수 있어요. 반복 노출을 천천히 해요.",
        "낮잠과 밤잠의 균형을 간단히 적어봐요.",
      ],
      "19-24": [
        "뛰기, 계단, 공놀이 같은 큰 움직임이 늘 수 있어요.",
        "두 단어 조합, 요구 표현이 늘어나는지 관찰해요.",
        "또래에 대한 관심이 생겨요. 사회성은 기질에 따라 달라요.",
        "검진에서 걱정되는 부분은 사례를 두세 가지 적어 가면 상담이 쉬워요.",
      ],
    };
    return map[value] || [];
  }

  function resolveTier(kind, root) {
    var total = countIn(root, 'input[type="checkbox"]');
    var checked = countIn(root, 'input[type="checkbox"]:checked');
    var ratio = total ? checked / total : 0;
    var risk = countIn(root, 'input[type="checkbox"][data-allergy-risk]:checked');

    if (kind === "allergy") {
      if (risk > 0) return "c";
      var goodOnly = Array.from(root.querySelectorAll('input[type="checkbox"]')).filter(function (i) {
        return !i.hasAttribute("data-allergy-risk");
      });
      var gTotal = goodOnly.length;
      var gChecked = goodOnly.filter(function (i) {
        return i.checked;
      }).length;
      var gr = gTotal ? gChecked / gTotal : 0;
      if (gr >= 0.58) return "a";
      if (gr >= 0.3) return "b";
      return "c";
    }

    if (kind === "sleep") {
      var posEls = Array.from(root.querySelectorAll('input[type="checkbox"]')).filter(function (i) {
        return !i.hasAttribute("data-sleep-worry");
      });
      var worryEls = Array.from(root.querySelectorAll('input[type="checkbox"][data-sleep-worry]'));
      var pTot = posEls.length;
      var pChk = posEls.filter(function (i) {
        return i.checked;
      }).length;
      var pr = pTot ? pChk / pTot : 0;
      var wc = worryEls.filter(function (i) {
        return i.checked;
      }).length;
      if (wc >= 2) return "c";
      if (wc === 1) return pr >= 0.55 ? "b" : "c";
      if (pr >= 0.62) return "a";
      if (pr >= 0.38) return "b";
      return "c";
    }

    if (kind === "development" || kind === "growth") {
      return tierFromRatio(ratio, 0, 99);
    }

    return "b";
  }

  function fillResult(wrap, tier, kind) {
    var pack = COPY[kind] && COPY[kind][tier];
    if (!pack) return;
    var badge = wrap.querySelector("[data-result-badge]");
    var summary = wrap.querySelector("[data-result-summary]");
    var tip = wrap.querySelector("[data-result-tip]");
    var extra = wrap.querySelector("[data-result-extra]");
    if (badge) badge.textContent = pack.badge;
    if (summary) summary.textContent = pack.summary;
    if (tip) tip.textContent = pack.tip;
    if (extra && extra.dataset.growthMonth === "1") {
      var sel = document.getElementById("monthSelect");
      var v = sel ? sel.value : "";
      var lines = growthMonthLines(v);
      extra.innerHTML =
        lines.length > 0
          ? "<strong>선택한 월령 참고</strong><ul class=\"checklist-result__bullets\">" +
            lines
              .map(function (line) {
                return "<li>" + line + "</li>";
              })
              .join("") +
            "</ul>"
          : "";
    }
  }

  function bindForm(form) {
    var kind = form.getAttribute("data-checklist-kind");
    if (!kind) return;
    var resultId = form.getAttribute("data-result-id");
    var errId = form.getAttribute("data-error-id");
    var result = resultId ? document.getElementById(resultId) : null;
    var errEl = errId ? document.getElementById(errId) : null;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = countIn(form, 'input[type="checkbox"]:checked');
      if (n < MIN_SELECTED) {
        if (errEl) {
          errEl.hidden = false;
          errEl.textContent = "최소 " + MIN_SELECTED + "개 이상 선택해 주세요.";
        }
        return;
      }
      if (errEl) {
        errEl.hidden = true;
        errEl.textContent = "";
      }
      var tier = resolveTier(kind, form);
      if (result) {
        result.hidden = false;
        result.classList.remove("checklist-result--visible");
        void result.offsetWidth;
        fillResult(result, tier, kind);
        result.classList.add("checklist-result--visible");
        scrollToEl(result);
      }
    });
  }

  function init() {
    document.querySelectorAll("form.checklist-flow").forEach(bindForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
