const observer = new MutationObserver(function colorComments() {
    Object.keys(Blockly.getMainWorkspace().commentDB_).forEach(function (
      commentData
    ) {
      var comment = Blockly.getMainWorkspace().commentDB_[commentData];
      if (comment.block_ !== undefined) {
        comment.foreignObject_.firstChild.firstChild.style.color = "white";
        comment.foreignObject_.firstChild.style.backgroundColor =
          comment.block_.colour_;
        comment.foreignObject_.parentNode.querySelector("rect").style.fill =
          comment.block_.colourSecondary_;
      }
    });
  });
    observer.observe(document.querySelector('body'), {
        attributes: true,
        childList: true,
        subtree: true,
      });
    var style = document.createElement("style");
    style.innerHTML = `
          textarea.scratchCommentTextarea.scratchCommentText {
              background-color: unset;
      }
      `;
    document.body.appendChild(style);