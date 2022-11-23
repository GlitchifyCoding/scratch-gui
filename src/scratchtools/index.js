var ScratchTools = {};
ScratchTools.Storage = {};
console.log("ScratchTools API Created");

var allSelectors = {};
var allCallbacksForWait = {};
ScratchTools.waitForElements = function (selector, callback, id, rework) {
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

function GM_addStyle(styleData) {
  var style = document.createElement("style");
  style.textContent = styleData;
  return document.querySelector("html").appendChild(style);
}

ScratchTools.console = {};
ScratchTools.console.log = function (text) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: lime",
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};
ScratchTools.console.warn = function (text) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: yellow",
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};
ScratchTools.console.error = function (text) {
  var styleArray = [
    "padding: 0.1rem",
    "background-color: #ff9f00",
    "border-radius: 0.2rem",
    "color: black",
  ];
  console.log("%cScratchTools", styleArray.join(";"), text);
};

ScratchTools.waitForElements('[class^="index_app"]', function() {
    ScratchTools.Scratch = {
        vm: null,
        blockly: null,
      };
      try {
        ScratchTools.Scratch.vm =
          window.vm ||
          (() => {
            const app = document.querySelector("#app");
            return app[
              Object.keys(app).find((key) => key.startsWith("__reactContainer"))
            ].child.stateNode.store.getState().scratchGui.vm;
          })();
        ScratchTools.console.log("Able to load Virtual Machine.");
      } catch (err) {
        ScratchTools.console.warn("Unable to load Virtual Machine.");
      }
      try {
        if (Blockly !== undefined) {
          ScratchTools.Scratch.blockly = Blockly;
          ScratchTools.console.log("Able to load Blockly.");
        } else {
          ScratchTools.console.warn("Unable to load Blockly.");
        }
      } catch (err) {
        ScratchTools.console.warn("Unable to load Blockly.");
      }
      
      ScratchTools.Scratch.contextMenus = {};
      
      ScratchTools.Scratch.waitForContextMenu = function (info) {
        if (ScratchTools.Scratch.contextMenus[info.block] !== undefined) {
          ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback;
          if (ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).type === "procedures_definition" && info.id !== "original-custom-block-function") {
            ScratchTools.Scratch.contextMenus[info.block]["original-custom-block-function"] = ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).customContextMenu;
          }
        } else {
          ScratchTools.Scratch.contextMenus[info.block] = {};
          ScratchTools.Scratch.contextMenus[info.block][info.id] = info.callback;
          if (ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).type === "procedures_definition" && info.id !== "original-custom-block-function") {
            ScratchTools.Scratch.contextMenus[info.block]["original-custom-block-function"] = ScratchTools.Scratch.blockly.getMainWorkspace().getBlockById(info.block).customContextMenu;
          }
        }
        ScratchTools.Scratch.blockly
          .getMainWorkspace()
          .getBlockById(info.block).customContextMenu = function (menu) {
          Object.keys(ScratchTools.Scratch.contextMenus[info.block]).forEach(
            function (el) {
              ScratchTools.Scratch.contextMenus[info.block][el](menu);
            }
          );
        };
      };
      
      ScratchTools.Scratch.scratchPaint = function () {
        var app = document.querySelector(".paint-editor_mode-selector_28iiQ");
        if (app !== null) {
          return app[
            Object.keys(app).find((key) => key.startsWith("__reactInternalInstance"))
          ].child.stateNode.store.getState().scratchPaint;
        } else {
          return null;
        }
      };
      
      ScratchTools.Scratch.scratchSound = function () {
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
      
      ScratchTools.Scratch.scratchGui = function () {
        try {
          const app = document.querySelector("#app");
          return app[
            Object.keys(app).find((key) => key.startsWith("__reactContainer"))
          ].child.stateNode.store.getState().scratchGui;
        } catch (err) {
          return null;
        }
      };
      
}, 'prepareVM', false)

import './clones.js'
import './add-last-option.js'
import './scroll-lists.js'