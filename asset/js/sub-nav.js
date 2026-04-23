/**
 * KV 드롭다운 서브메뉴(모바일 아코디언)
 * - 데스크탑은 CSS hover/focus로 열림
 * - 모바일은 caret 버튼으로 열고 닫음
 */
(function () {
  function init() {
    var nav = document.getElementById("kvNav");
    if (!nav) return;

    var items = nav.querySelectorAll(".kv-nav__item--has-sub");
    if (!items.length) return;

    function closeAll(except) {
      items.forEach(function (li) {
        if (except && li === except) return;
        li.classList.remove("kv-nav__item--subopen");
        var link = li.querySelector(".kv-nav__link");
        var caret = li.querySelector(".kv-nav__caret");
        if (link) link.setAttribute("aria-expanded", "false");
        if (caret) caret.setAttribute("aria-expanded", "false");
      });
    }

    function toggleItem(li) {
      var isOpen = li.classList.contains("kv-nav__item--subopen");
      if (isOpen) {
        closeAll();
        return;
      }

      closeAll(li);
      li.classList.add("kv-nav__item--subopen");
      var link = li.querySelector(".kv-nav__link");
      var caret = li.querySelector(".kv-nav__caret");
      if (link) link.setAttribute("aria-expanded", "true");
      if (caret) caret.setAttribute("aria-expanded", "true");
    }

    items.forEach(function (li) {
      var btn = li.querySelector(".kv-nav__caret");
      var link = li.querySelector(".kv-nav__link");

      if (link) {
        link.setAttribute("aria-haspopup", "true");
        link.setAttribute("aria-expanded", "false");
        link.addEventListener("click", function (e) {
          // 수정키 클릭은 링크 이동을 허용
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          e.stopPropagation();
          toggleItem(li);
        });
      }

      if (btn) {
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggleItem(li);
        });
      }
    });

    // 모바일에서 바깥 클릭 시 닫기
    document.addEventListener("click", function (e) {
      if (nav.contains(e.target)) return;
      closeAll();
    });

    // ESC로 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeAll();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

