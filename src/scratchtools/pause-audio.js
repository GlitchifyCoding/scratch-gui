const scratchSound = function () {
    try {
      return document.querySelector("div.sound-editor_editor-container_iUSW-")[
        Object.keys(
          document.querySelector("div.sound-editor_editor-container_iUSW-")
        ).find((key) => key.startsWith("__reactInternalInstance"))
      ].return.return.return.stateNode;
    } catch (err) {
      return null;
    }
  };

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

  waitForElements(
    '[class^="sound-editor_round-button_"]',
    function () {
      if (!document.querySelector(".scratchtoolsPause")) {
        var respond = true;
        var currentStart = 0;
        var currentlyActive = false;
        var btn =
        document.querySelector('[class^="sound-editor_round-button_"]')
        function addButton() {
          window.btn2 = document.createElement("button");
          btn2.className = btn.className + " scratchtoolsPause";
          btn2.title = "Pause";
          btn2.style.backgroundColor = "#ff9f00";
          btn2.style.marginLeft = ".5rem";
          var img = document.createElement("img");
          img.src = "https://raw.githubusercontent.com/STForScratch/data/main/pause.svg";
          img.draggable = false;
          if (!scratchSound().state.playhead) {
            btn2.style.opacity = "0.5";
          }
          btn2.addEventListener("click", onPause);
          btn2.appendChild(img);
          btn.parentNode.appendChild(btn2);
          window.btn3 = document.createElement("button");
          btn3.className = btn.className;
          btn3.title = "Cancel";
          btn3.style.backgroundColor = "rgb(207, 99, 207)";
          btn3.style.marginLeft = ".5rem";
          var img2 = document.createElement("img");
          img2.src =
            "https://scratch.mit.edu/static/assets/fe5afd6776eac0f7724b132a9ff5057d.svg";
          img2.style.filter = "brightness(0) invert(1)";
          img2.draggable = false;
          btn3.appendChild(img2);
          btn.parentNode.appendChild(btn3);
          function callback() {
            if (btn.firstChild.src === "https://scratch.mit.edu/static/assets/b5257afbe4bcf7953029ddb8f18b24fe.svg") {
              btn2.style.opacity = "0.5";
            } else {
              btn2.style.opacity = "1";
            }
          }
          var waitForStop = new MutationObserver(callback);
          waitForStop.observe(btn, {
            attributes: true,
            childList: true,
            subtree: true,
          });
        }
        function onPause() {
          if (scratchSound().state.playhead) {
            btn2.style.opacity = 0.5;
            pauseAudio();
          }
        }
        addButton();

        function pauseAudio() {
          scratchSound().state.trimStart =
            scratchSound().state.playhead;
          currentStart = scratchSound().state.playhead;
          respond = false;
          btn.click();
          respond = true;
        }

        btn.addEventListener("click", function () {
          if (respond) {
            if (!scratchSound().state.playhead) {
              btn2.style.opacity = "1";
              if (currentStart !== 0) {
                scratchSound().state.trimStart =
                  currentStart;
                respond = false;
                btn.click();
                btn.click();
                respond = true;
              }
            } else {
              scratchSound().state.trimStart = null;
              currentStart = 0;
            }
          }
        });

        btn3.addEventListener("click", function () {
          if (currentStart !== 0) {
            currentStart = 0;
            scratchSound().state.trimEnd = null;
            scratchSound().state.trimStart = null;
            if (scratchSound().state.playhead) {
              btn.click();
            } else {
              btn.click();
              btn.click();
            }
          }
        });
        waitForElements(
          '[class^="selector_list-area_"] > div',
          function (el) {
            el.addEventListener("click", function () {
              currentStart = 0;
            });
          },
          "resetStartOnSoundChange",
          false
        );
      }
    },
    "scratchtoolsPauseAudio",
    false
  );
