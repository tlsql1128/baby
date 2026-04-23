/**
 * 메인 KV 상단 메뉴(모바일 토글), jQuery
 * 전역 헤더가 아닌, KV에 포함된 내비게이션 전용
 */
$(function () {
  var $btn = $("#kvMenuBtn");
  var $nav = $("#kvNav");

  if (!$btn.length || !$nav.length) {
    return;
  }

  function setLabel(expanded) {
    $btn.attr("aria-label", expanded ? "메뉴 닫기" : "메뉴 열기");
  }

  $btn.on("click", function () {
    var isOpen = $nav.hasClass("kv-nav--open");
    if (isOpen) {
      $nav.removeClass("kv-nav--open");
      $btn.attr("aria-expanded", "false");
      setLabel(false);
    } else {
      $nav.addClass("kv-nav--open");
      $btn.attr("aria-expanded", "true");
      setLabel(true);
    }
  });

  // 메뉴 링크 포커스/클릭 시 모바일 패널 닫기(선택)
  $nav.find("a").on("click", function () {
    if (window.matchMedia("(max-width: 52rem)").matches) {
      $nav.removeClass("kv-nav--open");
      $btn.attr("aria-expanded", "false");
      setLabel(false);
    }
  });

  // 리사이즈 시 데스크톱이면 열림 상태 정리
  $(window).on("resize", function () {
    if (!window.matchMedia("(max-width: 52rem)").matches) {
      $nav.removeClass("kv-nav--open");
      $btn.attr("aria-expanded", "false");
      setLabel(false);
    }
  });
});
