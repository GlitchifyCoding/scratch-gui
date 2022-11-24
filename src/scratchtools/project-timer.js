const foundVM = false

const observer = new MutationObserver(function() {
    try {
        if (!foundVM) {
        if (document.querySelector('[class^="index_app"]')['_reactRootContainer'].current.child.stateNode.store.getState().scratchGui.vm) {
            foundVM = true
        }
    var vm = document.querySelector('[class^="index_app"]')['_reactRootContainer'].current.child.stateNode.store.getState().scratchGui.vm
  if (
    document.scratchtoolsTimer !== undefined &&
    document.scratchtoolsTimer !== null
  ) {
    var bar = document.createElement("div");
    bar.className = "timer scratchtools";
    bar.style.margin = "0";
    bar.style.marginTop = "7px";
    bar.style.marginLeft = "5px";
    document.querySelectorAll("div").forEach(function (el) {
      if (el.className.includes("controls_controls-container_")) {
        if (document.querySelector("div.timer.scratchtools") === null) {
          el.appendChild(bar);
          bar.textContent = "0 secs";
        }
      }
    });
  }
vm.runtime.on("PROJECT_RUN_START", function () {
    if (document.querySelector("div.timer.scratchtools") === null) {
      var bar = document.createElement("div");
      bar.className = "timer scratchtools";
      bar.style.margin = "0";
      bar.style.marginTop = "7px";
      bar.style.marginLeft = "5px";
      document.querySelectorAll("div").forEach(function (el) {
        if (el.className.includes("controls_controls-container_")) {
          if (document.querySelector("div.timer.scratchtools") === null) {
            el.appendChild(bar);
            bar.textContent = "0 secs";
          }
        }
      });
    }
    document.scratchtoolsTimer = vm.runtime.currentMSecs;
  });
  vm.runtime.on("PROJECT_RUN_STOP", function () {
    document.scratchtoolsTimer = null;
    if (document.querySelector("div.timer.scratchtools") !== null) {
      document.querySelector("div.timer.scratchtools").remove();
    }
  });
  setInterval(getCurrentM, 50);
  function getCurrentM() {
    if (document.querySelector("div.timer.scratchtools") !== null) {
      if (document.scratchtoolsTimer !== undefined) {
        document.querySelector("div.timer.scratchtools").textContent = `${
          (vm.runtime.currentMSecs -
            document.scratchtoolsTimer) /
          1000
        } secs`;
      }
    }
  }
}
} catch(err) {}
})

observer.observe(document.querySelector('body'), {
    attributes: true,
    childList: true,
    subtree: true,
  });