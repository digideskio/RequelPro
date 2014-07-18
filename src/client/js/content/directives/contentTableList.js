angular.module('RequelPro').directive('rightClick', function ($parse) {
  return function ($scope, $el, attrs) {
    var fn = $parse(attrs.rightClick);
    $el.on('contextmenu', function (event) {
      $scope.$apply(function () {
        event.preventDefault();
        fn($scope, {$event: event});
      });
    });
    $scope.$on('$destroy', function () {
      $el.off('contextmenu');
    });
  };
});
angular.module('RequelPro').directive('contentTableList', [
  function () {
    return {
      restrict: 'E',
      scope: {
        connection: '='
      },
      replace: true,
      controllerAs: 'CTLCtrl',
      templateUrl: 'content/directives/contentTableList.html',
      controller: ['$scope', '$log', '$timeout', 'mout', '$modal', function ($scope, $log, $timeout, mout, $modal) {

        var _this = this;

        var menu = new gui.Menu();

        var deleteTable = new gui.MenuItem({
          label: 'Delete Table',
          click: function () {
            _this.deleteTable(_this.contextTable);
          }
        });

        menu.append(deleteTable);

        function showErrorModal(err, table) {
          $log.error(err);
          $modal({
            title: 'Failed to delete <strong>' + table + '</strong> table!',
            content: err.stack,
            backdrop: 'static',
            placement: 'center',
            html: true,
            animation: 'danger am-flip-x'
          });
        }

        this.deleteTable = function (table) {
          return $scope.connection.deleteTable($scope.connection.db, table)
            .then(function () {
              $timeout(function () {
                mout.array.remove($scope.tableList, table);
                $scope.connection.table = null;
                $log.info('Successfully deleted:', table);
              });
            })
            .catch(function (err) {
              showErrorModal(err, table);
            })
            .error(function (err) {
              showErrorModal(err, table);
            });
        };

        this.openMenu = function ($event, table) {
          this.contextTable = table;
          $event.preventDefault();
          $event.stopPropagation();
          menu.popup($event.originalEvent.x, $event.originalEvent.y);
          return false;
        };

        $scope.$watch('connection.db', function (db) {
          if (db && $scope.connection) {
            $scope.processing = true;
            $scope.connection.tableList(db)
              .then(function (tableList) {
                $timeout(function () {
                  $scope.tableList = tableList;
                });
              })
              .finally(function () {
                $scope.processing = false;
              })
              .catch($log.error)
              .error($log.error);
          }
        });
      }]
    };
  }
]);