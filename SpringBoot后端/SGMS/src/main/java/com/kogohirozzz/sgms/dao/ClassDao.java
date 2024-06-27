package com.kogohirozzz.sgms.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import com.kogohirozzz.sgms.domain.Class;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ClassDao extends BaseMapper<Class> {
    Integer findClassnameBySclass(@Param("sclass") Integer sclass);
    Integer findSclassByClassname(@Param("classname") Integer classname);
    int deleteBySclass(@Param("sclass")Integer sclass);
}
