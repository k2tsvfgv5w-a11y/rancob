/// Runs test cases through the pure-Dart API in the VM and prints the results,
/// so tools/verify-core.mjs can compare them with the compiled core.js.
///
///   dart run tool/native.dart cases.json > native.json
library;

import 'dart:convert';
import 'dart:io';

import 'package:rancob_web_core/api.dart' as api;

void main(List<String> args) {
  final cases = jsonDecode(File(args.first).readAsStringSync()) as List;
  final out = [
    for (final c in cases.cast<Map<String, dynamic>>())
      api.call(c['fn'] as String, jsonEncode(c['input'])),
  ];
  stdout.write(jsonEncode(out));
}
