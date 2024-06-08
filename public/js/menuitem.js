/**
 * adds a menu item to node right-click menu. posts message to main app listener.
 * requires Bloom's redux store to be shared as window.store.  see sharestore.py for details.
 */
$(document).ready(function() {
    setMiArr("Card");
    setMiArr("History");
});

const icons = {
    "Card":{"url":"/bloom/assets/icons/single-neutral-id-card-double.svg", "name":"Card"},
     "History":{"url":"/bloom/assets/icons/book-open.svg","name":"History"}
}

function handleAddedClick(event) {
    if (window.store != null) {
        const state = window.store.getState()
        if (state != null && state.contextmenu != null && state.contextmenu.enabled === true) {
            if (state.contextmenu.params != null && state.contextmenu.params.type === "Node") {
                const id = state.contextmenu.params.id
                const etype = event.target.innerText
                var pm = { 'type': 'InternalUrl', 'item': etype, 'id': id };
                parent.postMessage(pm, "*");
            } else {
                console.log("Unsupported type: ", state.contextmenu.params.type)
            }
        }
    }
}

function setMiArr(item) { 
    $(document).arrive("div[data-testid = 'ndl-popover-content']", function (c) {
         var zz = `<li item="{name}" tabindex="-1" role="menuitem" data-testid="ndl-menu-item" class="ndl-menu-item n-flex n-flex-col">
                    <div class="n-flex n-flex-row n-gap-token-4">
                    <div class="ndl-menu-item-icon">
                    <i>
                    <img src="{url}"/>
                    </i></div><div class="n-flex n-flex-col n-gap-token-2 n-w-full">
                    <div class="ndl-menu-item-title"><div class="max-w-xs flex justify-between" data-testid="ndl-menu-title">
                    <span class="whitespace-nowrap text-ellipsis overflow-hidden">{name}</span>
                    <span><span class="mx-2"></span></span></div></div></div></div></li>
        `
        for (const [k, v] of Object.entries(icons[item])) {
            zz = zz.replaceAll("{" + k + "}", v)
        }
        var d = $(zz).get(0);
        d.addEventListener('click', handleAddedClick, true);
        var j = $(c.getElementsByTagName('ul'));
        j.append($(d));
    });
}
  
  // TODO
  // nlp interaction/documents/llm
