var allSelectors = {};
var allCallbacksForWait = {};
var waitForElements = function (selector, callback, id, rework) {
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
var showLastItemOption = true;
function addLastOptionToBlock() {
  Object.keys(Blockly.getMainWorkspace().blockDB_).forEach(function (el) {
    var block = Blockly.getMainWorkspace().getBlockById(el);
    if (block.type === "data_itemoflist") {
      function addLastItem(el) {
        if (showLastItemOption) {
          var last = { enabled: true, text: "Select Last" };
          last.callback = function () {
            block.childBlocks_[0].inputList[0].fieldRow[0].setText("last");
          };
          el.push(last);
        }
      }
      ScratchTools.Scratch.waitForContextMenu({
        block: block.id,
        id: "set last item",
        callback: addLastItem,
      });
    }
  });
}
ScratchTools.waitForElements(
  ".blocklyDraggable",
  addLastOptionToBlock,
  "addLastOptionToBlock",
  false
);
ScratchTools.setDisable("add-last-option-list", function () {
  showLastItemOption = false;
});
}, 'scratchtoolsAddLastOption', false)