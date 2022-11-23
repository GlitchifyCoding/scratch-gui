const observer = new MutationObserver(callback);
observer.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });
function callback() {
    if (document.querySelector('[class^="index_app"]')) {
        observer.disconnect()
    var vm = document.querySelector('[class^="index_app"]')['_reactRootContainer'].current.child.stateNode.store.getState().scratchGui.vm
    window.vm = vm
    function setCloneCountForSprite() {
     if (
       document.querySelector("span.scratchtoolsSpriteCloneCounter") !== null
     ) {
       document.querySelector(
         "span.scratchtoolsSpriteCloneCounter"
       ).textContent = `${(
         vm.editingTarget.sprite.clones.length - 1
       ).toString()} clones`;
     } else {
       var foundIt = false;
       document.querySelectorAll("div").forEach(function (el) {
         if (foundIt === false) {
           if (el.className.startsWith("sprite-info_row_")) {
             console.log("foundIt");
             foundIt = true;
             var div = document.createElement("div");
             div.className = "sprite-info_group_14-B_";
             div.innerHTML = `<label class="label_input-group_2vTky"><span style="font-size: 0.625rem; font-weight: bold;" class="scratchtoolsSpriteCloneCounter">${(
               vm.editingTarget.sprite.clones.length - 1
             ).toString()} clones</span></label>`;
             el.appendChild(div);
             el.firstChild.lastChild.style.width = "7rem";
           }
         }
       });
     }
   }
   setInterval(setCloneCountForSprite, 300);
}
}