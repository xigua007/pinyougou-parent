package com.pinyougou.sellergoods.service;

import java.util.List;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

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
	
	/**
	 * 品牌分页
	 * @param pageNum 当前页码
	 * @param pageSize 每页大小
	 * @return
	 */
	public PageResult findPage(int pageNum, int pageSize);
	
	/**
	 * 增加品牌
	 * @param tbBrand
	 */
	public void add(TbBrand tbBrand);
	
	/**
	 * 根据id查询当个品牌
	 * @param id
	 * @return
	 */
	public TbBrand findOne(Long id);
	
	/**
	 * 修改某个品牌
	 * @param brand
	 */
	public void update(TbBrand brand);
	
	/**
	 * 根据id批量删除品牌
	 * @param id
	 */
	public void delete(Long[] ids);

}
