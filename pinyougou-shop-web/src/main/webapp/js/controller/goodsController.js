 //控制层 
app.controller('goodsController' ,function($scope,$controller ,goodsService, itemCatService, typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//添加商品
	$scope.add=function(){			
		$scope.entity.goodsDesc.introduction = editor.html();
		goodsService.add( $scope.entity  ).success(
			function(response){
				if(response.success){
					alert("新增成功");
		        	$scope.entity = {};//清空页面
		        	editor.html("");//清空富文本编辑器内容
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	$scope.entity={ goodsDesc:{itemImages:[],specificationItems:[]}  };
	
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
			function(response){
				$scope.itemCat1List=response;
			}		
		);
	}
    
	//第一个参数是需要监控的变量，第二个参数是变量发生变化后
	$scope.$watch("entity.goods.category1Id",function(newValue, oldValue){
		itemCatService.findByParentId(newValue).success(
			function(response){
				$scope.itemCat2List=response;
			}		
		);
	});
	
	//第一个参数是需要监控的变量，第二个参数是变量发生变化后
	$scope.$watch("entity.goods.category2Id",function(newValue, oldValue){
		itemCatService.findByParentId(newValue).success(
			function(response){
				$scope.itemCat3List=response;
			}		
		);
	});
	
	$scope.$watch("entity.goods.category3Id",function(newValue, oldValue){
		itemCatService.findOne(newValue).success(
			function(response){
				$scope.entity.goods.typeTemplateId=response.typeId;
			}		
		);
	});
	
	
	//读取模板ID后，读取品牌列表 扩展属性  规格列表
	$scope.$watch('entity.goods.typeTemplateId',function(newValue,oldValue){
		typeTemplateService.findOne(newValue).success(
			function(response){
				$scope.typeTemplate=response;// 模板对象 
				$scope.typeTemplate.brandIds= JSON.parse($scope.typeTemplate.brandIds);//品牌列表类型转换
				//扩展属性
				$scope.entity.goodsDesc.customAttributeItems= JSON.parse($scope.typeTemplate.customAttributeItems);
			}
		);
		
	});
	//读取模板ID后，读取品牌列表 扩展属性  规格列表
	$scope.$watch('entity.goods.typeTemplateId',function(newValue,oldValue){
		//读取规格
		typeTemplateService.findSpecList(newValue).success(
				function(response){
					$scope.specList=response;
				}
		);		
	});
	
	//勾选规格选项的时候会触发调用:网络 移动3G 移动4G 联通3G 联通4G 电信3G 电信4G  移动2G	 联通2G 电信2G 双卡
	$scope.updateSpecAttribute=function($event,name,value){
		var object= $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems ,'attributeName', name);
		
		if(object!=null){	
			if($event.target.checked ){
				object.attributeValue.push(value);		
			}else{//取消勾选
				object.attributeValue.splice( object.attributeValue.indexOf(value ) ,1);//移除选项
				//如果选项都取消了，将此条记录移除
				if(object.attributeValue.length==0){
					$scope.entity.goodsDesc.specificationItems.splice(
							$scope.entity.goodsDesc.specificationItems.indexOf(object),1);
				}
				
			}
		}else{	
			$scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]});
		}
		
	}
	
	//第六课：创建SKU列表
	$scope.createItemList=function(){
		
		$scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0'} ];//列表初始化
		
		var items= $scope.entity.goodsDesc.specificationItems;
		
		for(var i=0;i<items.length;i++){
			$scope.entity.itemList= addColumn( $scope.entity.itemList, items[i].attributeName,items[i].attributeValue );			
		}	
		
	}
	
	//第六课：
	addColumn=function(list,columnName,columnValues){
		
		var newList=[];		
		for(var i=0;i< list.length;i++){
			var oldRow=  list[i];			
			for(var j=0;j<columnValues.length;j++){
				var newRow=  JSON.parse( JSON.stringify(oldRow)  );//深克隆
				newRow.spec[columnName]=columnValues[j];
				newList.push(newRow);
			}			
		}		
		return newList;
	}
	
});	
