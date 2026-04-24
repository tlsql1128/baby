/**
 * 베베트리: 체크리스트/선택형 페이지의 작은 동작 모음
 * (알레르기 체크는 checklist-flow.js에서 제출 후 결과로 처리합니다.)
 */
(function () {
  function initMonthlyGrowth() {
    var select = document.getElementById("monthSelect");
    var box = document.getElementById("growthBox");
    if (!select || !box) return;

    function setBox(lines) {
      var text = lines.join(" ");
      var p = box.querySelector(".result-box__text");
      if (p) p.textContent = text;
    }

    var map = {
      "0-3": [
        "수유·분유 양과 횟수, 젖병 거부, 토하는 양을 짧게 기록해요.",
        "배뇨·배변 횟수, 색, 점도를 관찰해요.",
        "수면은 총 시간보다, 깼을 때 기운이 있는지 같이 봐요.",
        "열, 호흡, 피부색 변화가 있으면 병원 상담을 우선해요.",
      ],
      "4-6": [
        "뒤집기 시도, 목 가누기, 손으로 잡는 동작을 날짜로 남겨요.",
        "이유식을 시작했다면 새 재료는 한 번에 하나, 소량으로 관찰해요.",
        "낮잠과 밤잠의 구분이 생기는지, 루틴을 간단히 적어봐요.",
        "검진에서 키·몸무게 곡선은 의료진 설명을 기준으로 봐요.",
      ],
      "7-9": [
        "앉기, 기기, 잡고 서기 등 움직임이 늘어나는지 관찰해요.",
        "씹기 연습, 음식 텍스처 변화에 적응하는지 봐요.",
        "낯가림, 분리 불안이 생길 수 있어요. 하루 컨디션 메모가 도움돼요.",
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
        "잠은 낮잠과 밤잠의 균형을 간단히 적어봐요.",
      ],
      "19-24": [
        "뛰기, 계단, 공놀이 같은 큰 움직임이 늘 수 있어요.",
        "두 단어 조합, 요구 표현이 늘어나는지 관찰해요.",
        "또래와의 관심이 생겨요. 사회성은 기질에 따라 달라요.",
        "검진에서 걱정되는 부분은 사례를 2, 3개 적어 가면 상담이 쉬워요.",
      ],
    };

    function update() {
      var v = select.value;
      setBox(map[v] || ["선택한 월령의 체크 포인트가 준비 중이에요."]);
    }

    select.addEventListener("change", update);
    update();
  }

  function init() {
    initMonthlyGrowth();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

