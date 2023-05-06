// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys: { [k: string]: number } = {
  ArrowDown: 1,
  ArrowUp: 1,
  Space: 1,
  PageDown: 1,
  PageUp: 1,
  End: 1,
  Home: 1,
};

function preventDefault(e: Event, handler: Function) {
  e.preventDefault();
  handler(e);
}

function preventDefaultForScrollKeys(e: KeyboardEvent, handler: Function) {
  if (keys[e.code]) {
    preventDefault(e, handler);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    () => {},
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
export function disableScroll(handler: Function) {
  window.addEventListener(
    "DOMMouseScroll",
    (e) => preventDefault(e, handler),
    false
  ); // older FF
  window.addEventListener(
    wheelEvent,
    (e) => preventDefault(e, handler),
    wheelOpt
  ); // modern desktop
  window.addEventListener(
    "touchmove",
    (e) => preventDefault(e, handler),
    wheelOpt
  ); // mobile
  window.addEventListener(
    "keydown",
    (e) => preventDefaultForScrollKeys(e, handler),
    false
  );
}

// call this to Enable
export function enableScroll(handler: Function) {
  window.removeEventListener(
    "DOMMouseScroll",
    (e) => preventDefault(e, handler),
    false
  );
  //@ts-ignore
  window.removeEventListener(
    wheelEvent,
    (e) => preventDefault(e, handler),
    wheelOpt
  );
  //@ts-ignore
  window.removeEventListener(
    "touchmove",
    (e) => preventDefault(e, handler),
    wheelOpt
  );
  window.removeEventListener(
    "keydown",
    (e) => preventDefaultForScrollKeys(e, handler),
    false
  );
}
