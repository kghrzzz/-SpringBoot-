package com.kogohirozzz.sgms.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kogohirozzz.sgms.domain.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CourseDao extends BaseMapper<Course> {
    String findCnameBycid(@Param("cid") Integer cid);
    Integer findCidByCname(@Param("cname") String cname);
    int delByCname(@Param("cname") String cname);
}
