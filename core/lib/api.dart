/// Pure-Dart API over `agri_core` (no JS imports), so the same code runs in the
/// Dart VM for tests and, through main.dart, in the browser.
library;

import 'dart:convert';

import 'package:agri_core/agri_core.dart';

/// Every handler takes decoded JSON and returns a JSON string.
final Map<String, String Function(Map<String, dynamic>)> handlers = {
  'info': _info,
  'layout': _layout,
  'analyze': _analyze,
  'check': _check,
  'timeSeries': _timeSeries,
  // No 'newSeed': agri_core's is clock based and dart2js only has millisecond
  // precision, which would give just 100 distinct seeds. The web UI uses crypto.
  // Same rule as the app's plan gate (agri_core/plan.dart).
  'canAddActive': (a) => jsonEncode({
    'ok': canAddActive(
      pro: a['pro'] == true,
      activeCount: (a['activeCount'] as num).toInt(),
    ),
  }),
};

/// Runs one handler. Errors come back as `{"error": code, "message": ...}`.
String call(String name, String input) {
  try {
    final decoded = input.isEmpty ? <String, dynamic>{} : jsonDecode(input);
    return handlers[name]!(decoded as Map<String, dynamic>);
  } on AnovaException catch (e) {
    return jsonEncode({'error': 'anova', 'message': e.message});
  } catch (e) {
    return jsonEncode({'error': 'invalid', 'message': e.toString()});
  }
}

// -------------------------------------------------------------- helpers

/// JSON cannot carry NaN or infinity; map them to null / a large finite value.
Object? _n(num? x) {
  if (x == null) return null;
  final d = x.toDouble();
  if (d.isNaN) return null;
  if (d.isInfinite) return d > 0 ? 1e9 : -1e9;
  return d;
}

List<PlotValue> _plots(Object? raw) => [
  for (final r in (raw as List).cast<Map<String, dynamic>>())
    PlotValue(
      id: r['id'],
      treatment: r['trt'] as String,
      block: (r['block'] as num?)?.toInt(),
      value: (r['value'] as num).toDouble(),
      levels: (r['levels'] as List?)?.cast<String>(),
    ),
];

PostHocTest _test(Object? id) => postHocTests.firstWhere(
  (t) => t.id == id,
  orElse: () => postHocTests.first,
);

Map<String, Object?> _row(AnovaRow r) => {
  'source': r.source,
  'df': r.df,
  'ss': _n(r.ss),
  'ms': _n(r.ms),
  'f': _n(r.f),
  'p': _n(r.p),
  'fCrit05': _n(r.fCrit05),
  'fCrit01': _n(r.fCrit01),
  'sig': r.significance,
};

Map<String, Object?> _postHoc(PostHocResult r) => {
  'test': _idOf(r.testName),
  'alpha': r.alpha,
  'ranked': [
    for (final x in r.ranked)
      {'trt': x.treatment, 'mean': _n(x.mean), 'letters': x.letters},
  ],
  'criticalRanges': [for (final c in r.criticalRanges) _n(c)],
};

String _idOf(String name) =>
    postHocTests.firstWhere((t) => t.name == name).id;

// ----------------------------------------------------------------- calls

/// Constants the UI must not hard-code: plan limit and the post-hoc registry.
String _info(Map<String, dynamic> _) => jsonEncode({
  'freeActiveLimit': freeActiveLimit,
  'tests': [
    for (final t in postHocTests) {'id': t.id, 'name': t.name},
  ],
});

/// {design: 'crd'|'rcbd', treatments, reps, seed}
String _layout(Map<String, dynamic> a) {
  final treatments = (a['treatments'] as num).toInt();
  final reps = (a['reps'] as num).toInt();
  final seed = (a['seed'] as num).toInt();
  if (treatments < 2 || reps < 2) {
    throw AnovaException('Need at least 2 treatments and 2 replications.');
  }
  final plots = a['design'] == 'rcbd'
      ? randomizeRcbd(treatments: treatments, blocks: reps, seed: seed)
      : randomizeCrd(treatments: treatments, replications: reps, seed: seed);
  return jsonEncode({
    'plots': [
      for (final p in plots)
        {
          'n': p.plotNumber,
          't': p.treatmentIndex,
          'rep': p.replicate,
          'block': p.block,
        },
    ],
  });
}

/// {rcbd, factorial, orders?, data, test, alpha, transform?, unit?}
String _analyze(Map<String, dynamic> a) {
  final raw = _plots(a['data']);
  if (raw.isEmpty) throw AnovaException('No data.');
  final rcbd = a['rcbd'] == true;
  final test = _test(a['test']);
  final alpha = (a['alpha'] as num?)?.toDouble() ?? 0.05;
  final unit = (a['unit'] as String?) ?? '';

  // Original treatment means (for back-labeled display under transformation).
  final sums = <String, double>{};
  final counts = <String, int>{};
  for (final d in raw) {
    sums[d.treatment] = (sums[d.treatment] ?? 0) + d.value;
    counts[d.treatment] = (counts[d.treatment] ?? 0) + 1;
  }
  final originalMeans = {
    for (final k in sums.keys) k: _n(sums[k]! / counts[k]!),
  };

  final avail = availableTransforms(raw);
  final reqCode = (a['transform'] as String?) ?? 'none';
  final requested = DataTransform.values.firstWhere(
    (t) => t.code == reqCode,
    orElse: () => DataTransform.none,
  );
  final active = avail.contains(requested) ? requested : DataTransform.none;
  final data = transformPlotValues(raw, active);
  final suggested = suggestTransform(
    [for (final d in raw) d.value],
    isPercentUnit: unit.trim() == '%',
  );

  // Live diagnostics on active (possibly transformed) data.
  ShapiroWilk? norm;
  HomogeneityTest? homog;
  try {
    final chk = checkData(data, rcbd: rcbd);
    norm = chk.normality;
    homog = chk.homogeneity;
  } on AnovaException {
    homog = leveneTest(data);
  }

  // Non-parametric Kruskal-Wallis + Dunn (always on original ranks).
  Map<String, Object?>? kruskalJson;
  try {
    final k = kruskalWallis(raw, alpha: alpha);
    kruskalJson = {
      'h': _n(k.h),
      'df': k.df,
      'p': _n(k.p),
      'sig': k.significance,
      'alpha': k.alpha,
      'groups': [
        for (final g in k.groups)
          {
            'trt': g.treatment,
            'n': g.n,
            'median': _n(g.median),
            'mean': _n(g.mean),
            'meanRank': _n(g.meanRank),
            'letters': g.letters,
          },
      ],
    };
  } on AnovaException {
    kruskalJson = null;
  }

  final extra = <String, Object?>{
    'transform': active.code,
    'availableTransforms': [for (final t in avail) t.code],
    'suggestedTransform': suggested?.code,
    'originalMeans': originalMeans,
    'normality': norm == null
        ? null
        : {'w': _n(norm.w), 'p': _n(norm.p), 'n': norm.n},
    'homogeneity': homog == null
        ? null
        : {'f': _n(homog.f), 'p': _n(homog.p), 'df1': homog.df1, 'df2': homog.df2},
    'kruskal': kruskalJson,
  };

  if (a['factorial'] == true) {
    return jsonEncode({
      ..._factorial(data, rcbd, test, alpha, a['orders'] as List?),
      ...extra,
    });
  }
  final r = rcbd ? anovaRcbd(data) : anovaCrd(data);
  final ph = test.run(r, alpha: alpha);
  return jsonEncode({
    'kind': 'single',
    'design': r.design,
    'rows': [for (final x in r.rows) _row(x)],
    'grandMean': _n(r.grandMean),
    'mse': _n(r.mse),
    'dfError': r.dfError,
    'cv': _n(r.cv),
    'harmonicReps': _n(r.harmonicReps),
    'treatment': _row(r.treatment),
    'means': [
      for (final m in r.means)
        {'trt': m.treatment, 'mean': _n(m.mean), 'n': m.n},
    ],
    'postHoc': _postHoc(ph),
    ...extra,
  });
}

Map<String, Object?> _factorial(
  List<PlotValue> data,
  bool rcbd,
  PostHocTest test,
  double alpha,
  List? orders,
) {
  final r = anovaFactorial(
    data,
    rcbd: rcbd,
    orders: orders == null
        ? null
        : [for (final o in orders) (o as List).cast<String>()],
  );
  Map<String, Object?> table(TwoWayTable t) => {
    'rowFactor': t.rowFactor,
    'colFactor': t.colFactor,
    'rows': t.rows,
    'cols': t.cols,
    'means': [
      for (final a in t.rows) [for (final b in t.cols) _n(t.means[(a, b)])],
    ],
    'lower': [
      for (final a in t.rows) [for (final b in t.cols) t.letters[(a, b)]!.lower],
    ],
    'upper': [
      for (final a in t.rows) [for (final b in t.cols) t.letters[(a, b)]!.upper],
    ],
    'rowMeans': [for (final x in t.rowMeans) _n(x)],
    'colMeans': [for (final x in t.colMeans) _n(x)],
  };
  const idx = {
    'AxB': [0, 1],
    'AxC': [0, 2],
    'BxC': [1, 2],
  };
  final tables = <String, Object?>{};
  for (final source in r.interactionSources) {
    if (source == 'AxBxC') {
      tables[source] = [
        for (final level in r.levels[2])
          {
            'slice': {'factor': 2, 'level': level},
            ...table(r.table(test, 0, 1, slice: (2, level), alpha: alpha)),
          },
      ];
    } else {
      final i = idx[source]!;
      tables[source] = [
        {'slice': null, ...table(r.table(test, i[0], i[1], alpha: alpha))},
      ];
    }
  }
  return {
    'kind': 'factorial',
    'design': r.design,
    'rows': [for (final x in r.rows) _row(x)],
    'levels': r.levels,
    'grandMean': _n(r.grandMean),
    'mse': _n(r.mse),
    'dfError': r.dfError,
    'cv': _n(r.cv),
    'reps': r.reps,
    'interactionSources': r.interactionSources,
    'significant': [
      for (final s in r.interactionSources)
        if (r.significant(s, alpha)) s,
    ],
    'main': [
      for (var f = 0; f < r.factorCount; f++)
        {'factor': f, ..._postHoc(r.mainEffect(test, f, alpha: alpha))},
    ],
    'tables': tables,
  };
}

/// {rcbd, data, threshold?}: residual diagnostics on the treatment (cell) model.
String _check(Map<String, dynamic> a) {
  final c = checkData(
    _plots(a['data']),
    rcbd: a['rcbd'] == true,
    threshold: (a['threshold'] as num?)?.toDouble() ?? 3,
  );
  return jsonEncode({
    'threshold': c.threshold,
    'normality': c.normality == null
        ? null
        : {'w': _n(c.normality!.w), 'p': _n(c.normality!.p), 'n': c.normality!.n},
    'homogeneity': c.homogeneity == null
        ? null
        : {
            'f': _n(c.homogeneity!.f),
            'p': _n(c.homogeneity!.p),
            'df1': c.homogeneity!.df1,
            'df2': c.homogeneity!.df2,
          },
    'points': [
      for (final p in c.points)
        {
          'id': p.value.id,
          'trt': p.value.treatment,
          'block': p.value.block,
          'value': _n(p.value.value),
          'fitted': _n(p.fitted),
          'residual': _n(p.residual),
          'studentized': _n(p.studentized),
          'trtMean': _n(p.treatmentMean),
        },
    ],
    'outliers': [for (final p in c.outliers) p.value.id],
  });
}

/// {byDay: {'14': [...], '28': [...]}, treatmentOrder?: [...]}
String _timeSeries(Map<String, dynamic> a) {
  final rawMap = (a['byDay'] as Map).cast<String, dynamic>();
  final byDay = <int, List<PlotValue>>{
    for (final e in rawMap.entries) int.parse(e.key): _plots(e.value),
  };
  final order = (a['treatmentOrder'] as List?)?.cast<String>();
  final ts = buildTimeSeries(byDay, treatmentOrder: order);
  return jsonEncode({
    'days': ts.days,
    'hasTrend': ts.hasTrend,
    'minY': _n(ts.minY),
    'maxY': _n(ts.maxY),
    'minYWithSe': _n(ts.minYWithSe),
    'maxYWithSe': _n(ts.maxYWithSe),
    'series': [
      for (final s in ts.series)
        {
          'trt': s.treatment,
          'points': [
            for (final pt in s.points)
              {
                'day': pt.day,
                'mean': _n(pt.mean),
                'sd': _n(pt.sd),
                'se': _n(pt.se),
                'n': pt.n,
              },
          ],
        },
    ],
  });
}
