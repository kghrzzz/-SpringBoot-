package com.kogohirozzz.sgms.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kogohirozzz.sgms.domain.Administrator;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdministratorDao extends BaseMapper<Administrator> {
    Administrator findAdministratorByAname(@Param("name") String name,@Param("password") String password);
    int updatePasswordByAid(@Param("aid") Integer aid,@Param("password") String password);
}
