/**
 * adds a menu item to node right-click menu. posts message to main app listener.
 */
$(document).ready(function() {
  setUp();
  setMiArr("Card");
  setMiArr("History");
});

var state={fired:false,item:''}

function eventFire(el, etype) {
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function mapToObj(map){
  const obj = {}
  for (let [k,v] of map)
    obj[k] = v
  return obj
}

function handleAddedClick(event) {
  var v = $(event.target).closest('ul').children().first().get(0);
  var item = $(event.target).closest('li').first();
  console.log("item handled:", item.attr('item'));
  //item.get(0).removeEventListener('click', handleAddedClick, true);
  eventFire(v, 'click');
  state.fired = true;
  state.item = item.attr('item'); 
}

function setUp() {
  $(document).arrive("div[data-testid = 'closeInspector-Button']", function(b) {
    if (state.fired === true) {
      $(b).closest("div[data-testid='node-inspector']").parent().css("visibility","hidden");
      var p = [];
      $(b).closest("div[data-testid='node-inspector']").find("div[data-testid='property-row']").each(function() {
        p.push([this.children[0].textContent,this.children[1].textContent]);
      });
      const m = new Map(p);
      state.fired = false;
      eventFire(b, 'click');
      var pm = {'type': 'InternalUrl','item': state.item,'id': m.get("tideId"), 'map':JSON.stringify(mapToObj(m))};
      parent.postMessage(pm,"*");
    }
  });
}

function setMiArr(item) {
  $(document).arrive("div[data-testid = 'popover-content']", function(c) {
    var zz = '<li item="@@item@@" tabindex="-1" role="menuitem" data-testid="ndl-menu-item" class="ndl-menu-item n-flex n-flex-col"><div class="n-flex n-flex-row n-gap-token-4"><div class="ndl-menu-item-icon"><i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title>@@item@@</title><circle class="a" cx="9.813" cy="9.812" r="9.063" transform="translate(-3.056 4.62) rotate(-23.025)"></circle><line class="a" x1="16.221" y1="16.22" x2="23.25" y2="23.25"></line></svg></i></div><div class="n-flex n-flex-col n-gap-token-2 n-w-full"><div class="ndl-menu-item-title"><div class="max-w-xs flex justify-between" data-testid="ndl-menu-title"><span class="whitespace-nowrap text-ellipsis overflow-hidden">@@item@@</span><span><span class="mx-2"></span></span></div></div></div></div></li>'.replaceAll("@@item@@", item);
    var d = $(zz).get(0);
    d.addEventListener('click', handleAddedClick, true);
    var j = $(c.getElementsByTagName('ul'));
    j.append($(d));
  });
}


// TODO
// nlp interaction/documents/llm

