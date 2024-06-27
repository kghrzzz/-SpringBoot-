/*
 Navicat Premium Data Transfer

 Source Server         : 121.41.66.107_3306
 Source Server Type    : MySQL
 Source Server Version : 80300
 Source Host           : 121.41.66.107:9005
 Source Schema         : StudentScore

 Target Server Type    : MySQL
 Target Server Version : 80300
 File Encoding         : 65001

 Date: 20/05/2024 23:35:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for administrator
-- ----------------------------
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator`  (
  `aid` int UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `atitle` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`aid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of administrator
-- ----------------------------
INSERT INTO `administrator` VALUES (1, 'admin', '管理员', '123456');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `sclass` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `classname` int NOT NULL,
  PRIMARY KEY (`sclass`) USING BTREE,
  INDEX `class`(`sclass` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, 101);
INSERT INTO `class` VALUES (2, 102);
INSERT INTO `class` VALUES (3, 103);
INSERT INTO `class` VALUES (4, 104);
INSERT INTO `class` VALUES (5, 201);
INSERT INTO `class` VALUES (6, 202);
INSERT INTO `class` VALUES (7, 203);
INSERT INTO `class` VALUES (8, 204);
INSERT INTO `class` VALUES (9, 301);
INSERT INTO `class` VALUES (10, 302);
INSERT INTO `class` VALUES (11, 303);
INSERT INTO `class` VALUES (12, 304);
INSERT INTO `class` VALUES (13, 401);
INSERT INTO `class` VALUES (14, 402);
INSERT INTO `class` VALUES (15, 403);
INSERT INTO `class` VALUES (16, 404);
INSERT INTO `class` VALUES (17, 501);
INSERT INTO `class` VALUES (18, 502);
INSERT INTO `class` VALUES (19, 503);
INSERT INTO `class` VALUES (20, 504);
INSERT INTO `class` VALUES (21, 601);
INSERT INTO `class` VALUES (22, 602);
INSERT INTO `class` VALUES (23, 603);
INSERT INTO `class` VALUES (24, 604);
INSERT INTO `class` VALUES (25, 701);
INSERT INTO `class` VALUES (26, 702);
INSERT INTO `class` VALUES (27, 703);
INSERT INTO `class` VALUES (28, 704);
INSERT INTO `class` VALUES (29, 801);
INSERT INTO `class` VALUES (30, 802);
INSERT INTO `class` VALUES (31, 803);
INSERT INTO `class` VALUES (32, 804);
INSERT INTO `class` VALUES (33, 901);
INSERT INTO `class` VALUES (34, 902);
INSERT INTO `class` VALUES (35, 903);
INSERT INTO `class` VALUES (36, 904);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `cid` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`cid`) USING BTREE,
  INDEX `cid`(`cid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '数学');
INSERT INTO `course` VALUES (2, '语文');
INSERT INTO `course` VALUES (3, '英语');
INSERT INTO `course` VALUES (4, '科学');
INSERT INTO `course` VALUES (5, '音乐');
INSERT INTO `course` VALUES (6, '美术');
INSERT INTO `course` VALUES (7, '体育');
INSERT INTO `course` VALUES (8, '品德与生活');
INSERT INTO `course` VALUES (9, '信息技术');
INSERT INTO `course` VALUES (10, '物理');
INSERT INTO `course` VALUES (11, '化学');
INSERT INTO `course` VALUES (12, '生物');
INSERT INTO `course` VALUES (13, '地理');
INSERT INTO `course` VALUES (14, '思想品德');
INSERT INTO `course` VALUES (15, '历史');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `sid` int UNSIGNED NOT NULL,
  `cid` int UNSIGNED NOT NULL,
  `score` decimal(5, 2) NULL DEFAULT NULL,
  `type` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  INDEX `cid`(`cid` ASC) USING BTREE,
  INDEX `scores_ibfk_1`(`sid` ASC) USING BTREE,
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (202410101, 1, 93.00, '期中测试');
INSERT INTO `score` VALUES (202410101, 2, 88.00, '期中测试');
INSERT INTO `score` VALUES (202410101, 3, 89.00, '期中测试');
INSERT INTO `score` VALUES (202410101, 1, 92.00, '期末测试');
INSERT INTO `score` VALUES (202410102, 1, 86.50, '期末测试');
INSERT INTO `score` VALUES (666666, 1, 66.00, '测试');
INSERT INTO `score` VALUES (666666, 2, 99.00, '测试');
INSERT INTO `score` VALUES (666666, 3, 35.50, '测试');
INSERT INTO `score` VALUES (666666, 6, 63.00, '测试');
INSERT INTO `score` VALUES (666666, 7, 44.00, '测试');
INSERT INTO `score` VALUES (666666, 5, 67.00, 'test');
INSERT INTO `score` VALUES (666666, 9, 114.00, '测试1');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `sid` int UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `sclass` int UNSIGNED NULL DEFAULT NULL,
  `sgender` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sid`) USING BTREE,
  INDEX `sclass`(`sclass` ASC) USING BTREE,
  CONSTRAINT `sclass` FOREIGN KEY (`sclass`) REFERENCES `class` (`sclass`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (666666, '佛爷', 9, '男', '654321');
INSERT INTO `student` VALUES (202410101, '李明', 1, '男', '123456');
INSERT INTO `student` VALUES (202410102, '光明', 1, '男', '123456');
INSERT INTO `student` VALUES (202410201, '刘霞', 2, '女', '123456');
INSERT INTO `student` VALUES (202430312, '高松灯', 11, '女', '123456');
INSERT INTO `student` VALUES (1145141919, '李田所', 29, '男', '123456');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `tid` int UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`tid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (2022005, '一位教师', '体育教师', '男', '123456');
INSERT INTO `teacher` VALUES (2024001, '李莉莉', '数学教师', '女', '123456');
INSERT INTO `teacher` VALUES (88888888, '测试', 'test', '男', '123456');

SET FOREIGN_KEY_CHECKS = 1;
