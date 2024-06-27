package com.kogohirozzz.sgms.service.impl;

import com.kogohirozzz.sgms.dao.ClassDao;
import com.kogohirozzz.sgms.dao.CourseDao;
import com.kogohirozzz.sgms.dao.ScoreDao;
import com.kogohirozzz.sgms.dao.StudentDao;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.Student;
import com.kogohirozzz.sgms.domain.StudentFor;
import com.kogohirozzz.sgms.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;
    @Autowired
    private ClassDao classDao;
    @Autowired
    private ScoreDao scoreDao;
    //获取学生信息
    @Override
    public ResultInfo getStudentFor() {
        List<Student> studentList = studentDao.selectList(null);
        List<StudentFor> list = new ArrayList<>();
        for (Student lists:studentList){
            list.add(new StudentFor(lists.getSid(),lists.getName(),classDao.findClassnameBySclass(lists.getSclass()),lists.getSgender()));
        }
        return new ResultInfo(list,"ok",100);
    }
    //更新学生信息
    @Override
    public ResultInfo updateStudent(StudentFor studentFor) {
        Student student = new Student(studentFor.getSid(),studentFor.getName(),classDao.findSclassByClassname(studentFor.getClassname()),studentFor.getSgender(),"");
        studentDao.updateStudentNotPWDBySid(student.getSid(), student.getName(),student.getSclass(),student.getSgender());
        return new ResultInfo("ok",100);
    }
    //删除学生信息
    @Override
    public ResultInfo delStudent(Student student) {
        scoreDao.delBySidInt(student.getSid());
        studentDao.delBySid(student.getSid());
        return new ResultInfo("ok",100);
    }
    //添加学生信息
    @Override
    public ResultInfo insertStudent(StudentFor studentFor) {
        Student student = new Student(studentFor.getSid(),studentFor.getName(),classDao.findSclassByClassname(studentFor.getClassname()),studentFor.getSgender(),"123456");
        studentDao.insert(student);
        return new ResultInfo("ok",100);
    }
    //获取通过班级名获取学生信息
    @Override
    public ResultInfo getStudentByClassName(StudentFor studentFor) {
        int sclass = classDao.findSclassByClassname(studentFor.getClassname());
        List<StudentFor> list = new ArrayList<>();
        List<Student> studentList = studentDao.findStudentBySclass(sclass);
        for (Student lists:studentList){
            list.add(new StudentFor(lists.getSid(),lists.getName(),studentFor.getClassname(),lists.getSgender()));
        }
        return new ResultInfo(list,"ok",100);
    }
}
