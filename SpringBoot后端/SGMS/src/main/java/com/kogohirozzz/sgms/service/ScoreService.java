package com.kogohirozzz.sgms.service;

import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.Score;
import com.kogohirozzz.sgms.domain.ScoreClass;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public interface ScoreService {
    ResultInfo getMyScore(HttpServletRequest request) throws IOException;
    ResultInfo getScore();
    ResultInfo updateScore(ScoreClass scoreClass);
    ResultInfo delScore(ScoreClass scoreClass);
    ResultInfo insertScore(ScoreClass scoreClass);
}
