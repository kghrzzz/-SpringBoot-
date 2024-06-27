package com.kogohirozzz.sgms.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kogohirozzz.sgms.domain.Teacher;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TeacherDao extends BaseMapper<Teacher> {
    Teacher findTeacherByTid(@Param("tid") Integer tid, @Param("password") String password);
    int updatePasswordByTid(@Param("tid") Integer tid,@Param("password") String password);
    int updateTeacherNotPWDByTid(@Param("tid")Integer tid,@Param("name")String name,@Param("title")String title,@Param("gender")String gender);
    int delByTid(@Param("tid") Integer tid);
}
