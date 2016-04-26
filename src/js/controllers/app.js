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

  $scope.make = function () {
    if ($scope.input) {
      var list = $scope.list();
      if ($scope.list().length > 1) {
        $scope.tests = {};
        var trie = new RegexTrie();
        var regex = trie.add(list).toRegExp();
        $scope.output = regex.toString().slice(1, -1);

        for (var i = 0; i < list.length; ++i) {
          var word = list[i];
          $scope.tests[word] = regex.test(word);
        }
      }
    }
  };

  $scope.make();
};
