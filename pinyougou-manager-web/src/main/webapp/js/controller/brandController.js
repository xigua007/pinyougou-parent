app.controller("brandController", function($scope, $controller, brandService) {
	
	//集成baseController
	$controller("baseController", {$scope:$scope});//第一个参数代表继承自那个controller,$scope:$scope的意思是让两者的scope相通，共用scope

	//获取所有品牌列表
	$scope.findAll = function() {
		brandService.findAll().success(function(response) {
			$scope.list = response;
		});
	}

	//查找当前页的品牌列表
	$scope.findPage = function(page, size) {
		brandService.findPage(page, size).success(function(response) {
			$scope.list = response.rows;//显示当前数据
			$scope.paginationConf.totalItems = response.total;//更新总记录数
		});
	}

	//增加或修改品牌
	$scope.save = function() {
		var obj = null;
		if ($scope.entity.id != null) {
			obj = brandService.update($scope.entity);
		} else {
			obj = brandService.add($scope.entity);
		}
		obj.success(function(response) {
			if (response.success) {
				$scope.reloadList();
			}
			alert(response.message);
		});
	}

	//查找单个品牌
	$scope.findOne = function(id) {
		brandService.findOne(id).success(function(response) {
			$scope.entity = response;
		})
	}

	$scope.dele = function() {
		if ($scope.selectIds.length == 0) {
			alert("请选择需要删除的品牌");
			return;
		}
		brandService.dele($scope.selectIds).success(function(response) {
			if (response.success) {
				$scope.reloadList();
			}
			alert(response.message);
		});
	}

	$scope.searchEntity = {};
	$scope.search = function(page, size) {
		brandService.search(page, size, $scope.searchEntity).success(
				function(response) {
					$scope.list = response.rows;//显示当前数据
					$scope.paginationConf.totalItems = response.total;//更新总记录数
				});
	}
});