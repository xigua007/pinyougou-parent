app.controller("baseController", function($scope) {
	
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
	
});