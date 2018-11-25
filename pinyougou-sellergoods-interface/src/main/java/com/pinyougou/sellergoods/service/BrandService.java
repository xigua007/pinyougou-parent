package com.pinyougou.sellergoods.service;

import java.util.List;

import com.pinyougou.pojo.TbBrand;

/**
 * 品牌接口
 * @author Administrator
 */
public interface BrandService {
	
	/**
	 * 查找所有品牌
	 * @return
	 */
	public List<TbBrand> findAll();

}
