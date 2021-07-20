
create database student_app ;
use student_app ;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student_master`;
CREATE TABLE `student_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STUDENT_ID` int(11) NOT NULL ,
  `EMAIL` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PASSWORD` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FNAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LNAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DOB` datetime(0) NULL DEFAULT NULL,
  `MOBILE_NO` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PARENT_ID` int(11) NOT NULL ,
  `DATE_OF_JOIN` datetime(0) NULL DEFAULT NULL,
  `STATUS` BOOLEAN NOT NULL,
  `LAST_LOGIN_DATE` datetime(0) NULL DEFAULT NULL,
  `LAST_LOGIN_IP` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher_master`;
CREATE TABLE `teacher_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEACHER_ID` int(11) NOT NULL ,
  `EMAIL` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PASSWORD` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FNAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LNAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DOB` datetime(0) NULL DEFAULT NULL,
  `MOBILE_NO` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `STATUS` BOOLEAN NOT NULL,
  `LAST_LOGIN_DATE` datetime(0) NULL DEFAULT NULL,
  `LAST_LOGIN_IP` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for parent
-- ----------------------------
DROP TABLE IF EXISTS `parent_master`;
CREATE TABLE `parent_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PARENT_ID` int(11) NOT NULL ,
  `EMAIL` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `PASSWORD` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FNAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LNAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DOB` datetime(0) NULL DEFAULT NULL,
  `MOBILE_NO` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `STATUS` BOOLEAN NOT NULL,
  `LAST_LOGIN_DATE` datetime(0) NULL DEFAULT NULL,
  `LAST_LOGIN_IP` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance_master`;
CREATE TABLE `attendance_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATE` datetime(0) NULL DEFAULT NULL,
  `STUDENT_ID` int(11) NOT NULL ,
  `STATUS` BOOLEAN NOT NULL,
  `REMARK` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade_master`;
CREATE TABLE `grade_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GRADE_ID` int(11) NOT NULL ,
  `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DESC` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course_master`;
CREATE TABLE `course_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `COURSE_ID` int(11) NOT NULL ,
  `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DESCRIPTION` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GRADE_ID` int(11) NOT NULL ,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classroom
-- ----------------------------
DROP TABLE IF EXISTS `classroom_master`;
CREATE TABLE `classroom_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLASSROOM_ID` int(11) NOT NULL ,
  `YEAR` YEAR NOT NULL,
  `GRADE_ID` int(11) NOT NULL ,
  `SECTION` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `STATUS` BOOLEAN NOT NULL,
  `REMARK` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TEACHER_ID` int(11) NOT NULL ,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classroom_student
-- ----------------------------
DROP TABLE IF EXISTS `classroom_student`;
CREATE TABLE `classroom_student`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLASSROOM_ID` int(11) NOT NULL ,
  `STUDENT_ID` int(11) NOT NULL ,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for exam_type
-- ----------------------------
DROP TABLE IF EXISTS `exam_type`;
CREATE TABLE `exam_type`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EXAM_TYPE_ID` int(11) NOT NULL ,
  `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DESC` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam_master`;
CREATE TABLE `exam_master`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EXAM_ID` int(11) NOT NULL ,
  `EXAM_TYPE_ID` int(11) NOT NULL ,
  `NAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `START_DATE` datetime(0) NULL DEFAULT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for exam_result
-- ----------------------------
DROP TABLE IF EXISTS `exam_result`;
CREATE TABLE `exam_result`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EXAM_ID` int(11) NOT NULL ,
  `STUDENT_ID` int(11) NOT NULL ,
  `COURSE_ID` int(11) NOT NULL ,
  `MARKS` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CREATED_MODIFIED_DATE` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `READ_ONLY` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N',
  `ARCHIVE_FLAG` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'F',
  `CLIENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

