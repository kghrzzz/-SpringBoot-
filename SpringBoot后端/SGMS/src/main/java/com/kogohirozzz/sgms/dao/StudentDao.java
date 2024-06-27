package com.kogohirozzz.sgms.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kogohirozzz.sgms.domain.Student;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StudentDao extends BaseMapper<Student> {
    Student findStudentBySid(@Param("sid") Integer sid, @Param("password") String password);
    String findNameBySid(@Param("sid") Integer sid);
    Integer findSclassBySid(@Param("sid") Integer sid);
    int updatePasswordBySid(@Param("sid") Integer sid,@Param("password") String password);
    int updateStudentNotPWDBySid(@Param("sid")Integer sid,@Param("name")String name,@Param("sclass")Integer sclass,@Param("sgender")String sgender);
    int delBySid(@Param("sid") Integer sid);
    int selectStudentSUMByClass(@Param("sclass")Integer sclass);
    int updateSclass(@Param("sclass")Integer sclass);
    List<Student> findStudentBySclass(@Param("sclass") Integer sclass);
}
