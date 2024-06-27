package com.kogohirozzz.sgms.service;

import com.kogohirozzz.sgms.domain.Class;
import com.kogohirozzz.sgms.domain.ResultInfo;

public interface ClassService {
    ResultInfo getClassFor();
    ResultInfo getClassList();
    ResultInfo delClass(Class classname);
    ResultInfo insertClass(Integer classname);
}
