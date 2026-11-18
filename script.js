// 张捷个人主页：移动端导航、深色模式、表单校验、导航高亮
(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var navLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  var themeToggle = document.getElementById("themeToggle");
  var THEME_KEY = "zj-homepage-theme";

  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }

  var savedTheme = localStorage.getItem(THEME_KEY);
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (systemDark ? "dark" : "light"));

  themeToggle.addEventListener("click", function () {
    var next = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
  });

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setStatus(message, type) {
    status.textContent = message;
    status.className = "form-status" + (type ? " " + type : "");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    if (!name) {
      setStatus("请填写您的称呼。", "error");
      form.name.focus();
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("请输入有效的邮箱地址。", "error");
      form.email.focus();
      return;
    }
    if (!message) {
      setStatus("请填写留言内容。", "error");
      form.message.focus();
      return;
    }

    setStatus("已收到您的留言（前端演示，未上传服务器）。", "success");
    form.reset();
  });

  var sections = Array.from(document.querySelectorAll("section[id]"));
  var linkMap = new Map(
    Array.from(navLinks).map(function (link) {
      return [link.getAttribute("href").slice(1), link];
    })
  );

  function onScroll() {
    var scrollPos = window.scrollY + 120;
    var currentId = sections[0] ? sections[0].id : "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });
    var activeLink = linkMap.get(currentId);
    if (activeLink) activeLink.classList.add("active");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
