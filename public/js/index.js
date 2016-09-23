var ng = angular.module('myApp', []);

ng.controller('contr1', function($scope, $http, $httpParamSerializerJQLike) {
    $scope.isEdit = false;
    $scope.currInx = -1;
    $scope.formFinished = '0';
    $scope.formTitle = '';

    $scope.getAll = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/task/'
        }).then(function(res) {
            console.log(res);

            $scope.list = res.data.data;
        }, function(res) {
            alert(res.statusText);
        });
    }

    $scope.updateEvent = function(inx) {
        var params = {
            id: $scope.list[inx].id,
            title: $scope.list[inx].title,
            finished: $scope.list[inx].finished
        };
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/api/task',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            },
            data: $httpParamSerializerJQLike(params)
        }).then(function(res) {
            if (res.status == 200) {
                alert('success');

                $scope.getAll();
            } else {
                alert('fail.');
            }
        }, function(res) {
            alert(res.statusText);
        });
    }

    $scope.editEvent = function(inx) {
        if ($scope.isEdit && $scope.currInx != inx) {
            alert('Please finish the project you are editing.');

            return false;
        }

        $scope.isEdit = !$scope.isEdit;
        $scope.currInx = inx;

        $scope.list[inx].isEdit = $scope.isEdit;

        if (!$scope.isEdit) {
            $scope.updateEvent(inx);
        }
    }

    $scope.addEvent = function() {
        $('#amModalAdd').modal({
            closeViaDimmer: false
        });
    }

    $scope.addAction = function() {
        console.log($scope);

        var params = {
            title: $scope.formTitle,
            finished: $scope.formFinished
        };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/task/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            },
            data: $httpParamSerializerJQLike(params)
        }).then(function(res) {
            console.log(res);

            var data = res.data;

            if (res.status == 200) {
                alert('success!');

                $scope.getAll();

                $('#amModalAdd').modal('close');
            }
        }, function(res) {
            alert('请刷新页面后重新尝试。');
        });
    }

    $scope.delEvent = function(inx) {
        var params = {
            id: $scope.list[inx].id
        };

        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/api/task',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            },
            data: $httpParamSerializerJQLike(params)
        }).then(function(res) {
            if (res.status == 200) {
                alert('success!');

                $scope.getAll();
            } else {
                alert('fail.');
            }
        }, function(res) {
            alert(res.statusText);
        });
    }

    $scope.getAll();
});
