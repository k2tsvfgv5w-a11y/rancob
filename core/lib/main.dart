/// Browser entry point: exposes `RancobCore.<name>(jsonString) -> jsonString`.
library;

import 'dart:js_interop';
import 'dart:js_interop_unsafe';

import 'api.dart' as api;

void main() {
  final core = JSObject();
  for (final name in api.handlers.keys) {
    core.setProperty(
      name.toJS,
      ((JSString input) => api.call(name, input.toDart).toJS).toJS,
    );
  }
  globalContext.setProperty('RancobCore'.toJS, core);
}
