package com.kogohirozzz.sgms.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kogohirozzz.sgms.domain.Score;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ScoreDao extends BaseMapper<Score> {
    List<Score> findMyScoreBySid(@Param("sid") Integer sid);
    int delBySidInt(@Param("sid") Integer sid);
    int updateScoreBySid(@Param("sid") Integer sid,@Param("cid") Integer cid,@Param("score") float score,@Param("type") String type);
    int delBySidAndCidAndType(@Param("sid") Integer sid,@Param("cid") Integer cid,@Param("type") String type);
}
