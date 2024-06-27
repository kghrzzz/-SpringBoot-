package com.kogohirozzz.sgms.service.impl;

import com.kogohirozzz.sgms.dao.ClassDao;
import com.kogohirozzz.sgms.dao.StudentDao;
import com.kogohirozzz.sgms.domain.Class;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.StudentSUMByClass;
import com.kogohirozzz.sgms.service.ClassService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ClassServiceImpl implements ClassService {
    @Autowired
    private ClassDao classDao;
    @Autowired
    private StudentDao studentDao;

    @Override
    public ResultInfo getClassFor() {
        List<Class> classList = classDao.selectList(null);
        return new ResultInfo(classList,"ok",100);
    }

    @Override
    public ResultInfo getClassList() {
        List<Class> classList = classDao.selectList(null);
        List<StudentSUMByClass> newClassList = new ArrayList<>();
        for (Class list:classList){
            newClassList.add(new StudentSUMByClass(list.getClassname(),studentDao.selectStudentSUMByClass(list.getSclass())));
        }
        return new ResultInfo(newClassList,"ok",100);
    }

    @Override
    public ResultInfo delClass(Class classname) {
        classname.setSclass(classDao.findSclassByClassname(classname.getClassname()));
        try {
            studentDao.updateSclass(classname.getSclass());
        }catch (Exception e){
        }
        classDao.deleteBySclass(classname.getSclass());
        return new ResultInfo("ok",100);
    }

    @Override
    public ResultInfo insertClass(Integer classname) {
        classDao.insert(new Class(null,classname));
        return new ResultInfo("ok",100);
    }
}
