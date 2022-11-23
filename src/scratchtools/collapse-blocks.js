
    if (Window.collapsed === undefined) {
      Window.collapsed = [];
    }
    var gui = document.querySelector("body");
  
    var observe = new MutationObserver(addCollapse);
  
    // Start observing the target node for configured mutations
    observe.observe(gui, { attributes: true, childList: true, subtree: true });
    function addCollapse() {
      try {
        Object.keys(
          Blockly.getMainWorkspace().blockDB_
        ).forEach(function (id) {
          var block = Blockly
            .getMainWorkspace()
            .getBlockById(id);
          if (block.outputShape_ === null) {
            if (Window.collapsed.includes(id)) {
              block.setCollapsed(true);
            } else {
              block.setCollapsed(false);
            }
            var test = function (el) {
              if (block.collapsed_ === false) {
                var collapse = { enabled: true, text: "Collapse" };
                collapse.callback = function () {
                  Window.collapsed.push(block.id);
                  block.setCollapsed(true);
                };
              } else {
                var collapse = { enabled: true, text: "Uncollapse" };
                collapse.callback = function () {
                  delete Window.collapsed[Window.collapsed.indexOf(block.id)];
                  block.setCollapsed(false);
                };
              }
              el.push(collapse);
            };
            if (!block.customContextMenu) {
                console.log(block.type)
            block.customContextMenu = test
        }
          }
        });
      } catch (err) {
        console.error(err);
      }
    }