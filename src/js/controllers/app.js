module.exports = function ($scope) {
  'use strict';

  var RegexTrie = require('regex-trie');

  $scope.input = ['foo', 'bar', 'baz'].join('\n');
  $scope.tests = {};

  $scope.list = function () {
    return $scope.input.split('\n').filter(function (word) {
      return word !== '';
    });
  };

  $scope.allPassed = function () {
    return $scope.numPassed === $scope.numTests;
  };

  $scope.make = function () {
    $scope.numPassed = 0;
    $scope.numTests = 0;
    if ($scope.input) {
      var list = $scope.list();
      if ($scope.list().length > 1) {
        $scope.tests = {};
        var trie = new RegexTrie();
        var regex = trie.add(list).toRegExp();
        $scope.output = regex.toString().slice(1, -1);

        for (var i = 0; i <= list.length; ++i) {
          var word = list[i];
          var test = regex.test(word);
          if (test) {
            $scope.numPassed += 1;
          }

          $scope.numTests += 1;
          $scope.tests[word] = test;
        }
      }
    }
  };

  $scope.make();
};
