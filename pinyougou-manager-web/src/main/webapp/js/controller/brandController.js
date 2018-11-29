app.controller("brandController", function($scope, $http, brandService) {

	//获取所有品牌列表
	$scope.findAll = function() {
		brandService.findAll().success(function(response) {
			$scope.list = response;
		});
	}

	//currentPage:当前页，totalItems：总页数，itemsPerPage：每页条数，perPageOptions：每页多少条，onChange页码变更后自动触发的方法
	$scope.paginationConf = {
		currentPage : 1,
		totalItems : 10,
		itemsPerPage : 10,
		perPageOptions : [ 10, 20, 30, 40, 50 ],
		onChange : function() {
			$scope.reloadList();
		}
	};

	//刷新列表
	$scope.reloadList = function() {
		$scope.search($scope.paginationConf.currentPage,
				$scope.paginationConf.itemsPerPage);
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

	$scope.selectIds = [];//用户批量操作勾选的品牌id集合

	//用户选中复选框的逻辑
	$scope.updateSelection = function($event, id) {
		if ($event.target.checked) {//通过$event.target的checked属性获取checkbox是否选中
			$scope.selectIds.push(id);//push方法往集合里面添加元素
		} else {
			var index = $scope.selectIds.indexOf(id);//检索id在数组中的索引。
			$scope.selectIds.splice(index, 1);//从数组中移除元素。参数1：移除的位置，参数2：移除的个数
		}
	}

	$scope.dele = function() {
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