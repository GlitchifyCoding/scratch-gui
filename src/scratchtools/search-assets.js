if (document.querySelector('[class^="asset-panel_wrapper_"]')) {
  if (!document.querySelector(".scratchtoolsAssetSearch")) {
    var input = document.createElement("input");
    var assetBox = document.querySelector('[class^="asset-panel_wrapper_"]')
    var assetRow = assetBox.firstChild.firstChild;
    input.className = "scratchtoolsAssetSearch input_input-form_l9eYg";
    input.placeholder = "Search";
    input.type = "search";
    input.autocomplete = "off";
    input.addEventListener("input", function () {
      assetRow.childNodes.forEach(function (el) {
        if (el.parentNode === assetRow) {
          if (input.value !== "") {
            if (
              el
                .querySelector('[class^="sprite-selector-item_sprite-name_"]')
                .textContent.toLowerCase()
                .includes(input.value)
            ) {
              el.style.display = null;
            } else {
              el.style.display = "none";
            }
          } else {
            el.style.display = null;
          }
        }
      });
    });
    input.style.margin = ".3rem";
    assetBox.firstChild.prepend(input);
  }
}

const observer3 = new MutationObserver(function (assetBox) {
    if (!document.querySelector(".scratchtoolsAssetSearch") && document.querySelector('[class^="asset-panel_wrapper_"]')) {
      var input = document.createElement("input");
      var assetRow = assetBox.firstChild.firstChild;
      input.className = "scratchtoolsAssetSearch input_input-form_l9eYg";
      input.placeholder = "Search";
      input.type = "search";
      input.autocomplete = "off";
      input.addEventListener("input", function () {
        assetRow.childNodes.forEach(function (el) {
          if (el.parentNode === assetRow) {
            if (input.value !== "") {
              if (
                el
                  .querySelector('[class^="sprite-selector-item_sprite-name_"]')
                  .textContent.toLowerCase()
                  .includes(input.value)
              ) {
                el.style.display = null;
              } else {
                el.style.display = "none";
              }
            } else {
              el.style.display = null;
            }
          }
        });
      });
      input.style.margin = ".3rem";
      assetBox.firstChild.prepend(input);
    }
  });
observer3.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });