package com.kogohirozzz.sgms.controller;

import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.ScoreClass;
import com.kogohirozzz.sgms.service.ScoreService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ScoreController {
    @Autowired
    private ScoreService scoreService;
    @GetMapping("/myscore")
    public ResultInfo getMyScore(HttpServletRequest request) throws IOException {return scoreService.getMyScore(request);}
    @GetMapping("/getscore")
    public ResultInfo getScore() {return scoreService.getScore();}
    @PostMapping("/upscore")
    public ResultInfo updateScore(@RequestBody ScoreClass scoreClass) {return scoreService.updateScore(scoreClass);}
    @PostMapping("/delscore")
    public ResultInfo delScore(@RequestBody ScoreClass scoreClass) {return scoreService.delScore(scoreClass);}
}
