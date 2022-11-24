var allSelectors = {};
var allCallbacksForWait = {};
const waitForElements = function (selector, callback, id, rework) {
  if (allCallbacksForWait[selector] === undefined) {
    allCallbacksForWait[selector] = [{ callback: callback, id: id }];
  } else {
    allCallbacksForWait[selector].push({ callback: callback, id: id });
  }
  if (rework) {
    allSelectors[id] = [document.querySelectorAll(selector)];
  } else {
    allSelectors[id] = [];
    returnScratchToolsSelectorsMutationObserverCallbacks();
  }
};

function enableScratchToolsSelectorsMutationObserver() {
  var ScratchToolsSelectorsMutationObserver = new MutationObserver(
    returnScratchToolsSelectorsMutationObserverCallbacks
  );
  ScratchToolsSelectorsMutationObserver.observe(
    document.querySelector("html"),
    { attributes: true, childList: true, subtree: true }
  );
}
enableScratchToolsSelectorsMutationObserver();

function returnScratchToolsSelectorsMutationObserverCallbacks() {
  Object.keys(allCallbacksForWait).forEach(function (el) {
    document.querySelectorAll(el).forEach(function (element) {
      allCallbacksForWait[el].forEach(function (el2) {
        if (!allSelectors[el2.id].includes(element)) {
          allSelectors[el2.id].push(element);
          el2.callback(element);
        }
      });
    });
  });
}

waitForElements('[class^="index_app"]', function() {
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
}, 'wait for project timer', false)
