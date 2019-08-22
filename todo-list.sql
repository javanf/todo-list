/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50547
Source Host           : 127.0.0.1:3306
Source Database       : todo-list

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-08-22 09:50:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `uid` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for task_group
-- ----------------------------
DROP TABLE IF EXISTS `task_group`;
CREATE TABLE `task_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务分组id',
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_group
-- ----------------------------
INSERT INTO `task_group` VALUES ('1', '测试', '2019-06-06 09:54:21');
INSERT INTO `task_group` VALUES ('2', '测试', '2019-06-06 11:18:48');
INSERT INTO `task_group` VALUES ('9', '已完成', '2019-06-19 15:25:29');
INSERT INTO `task_group` VALUES ('6', '测试1', '2019-06-17 17:31:55');
INSERT INTO `task_group` VALUES ('5', '待办', '2019-06-06 14:25:13');

-- ----------------------------
-- Table structure for task_list
-- ----------------------------
DROP TABLE IF EXISTS `task_list`;
CREATE TABLE `task_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(255) NOT NULL COMMENT '任务名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `enclosure` blob COMMENT '附件（base64/图片路径）',
  `level` int(11) NOT NULL COMMENT '等级',
  `group_id` int(11) NOT NULL COMMENT '分组id',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`group_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_list
-- ----------------------------
INSERT INTO `task_list` VALUES ('1', '任务1', '任务一', 0x756E646566696E6564, '1', '5', '2019-08-20 14:06:27');
INSERT INTO `task_list` VALUES ('2', '任务二', '任务二', 0x756E646566696E6564, '2', '5', '2019-08-20 14:52:25');
INSERT INTO `task_list` VALUES ('3', '任务三', '任务三', 0x756E646566696E6564, '0', '1', '2019-08-20 14:52:27');
INSERT INTO `task_list` VALUES ('4', '任务四', '任务四', 0x756E646566696E6564, '0', '6', '2019-06-20 09:42:04');
INSERT INTO `task_list` VALUES ('5', '测试5', '测试', 0x756E646566696E6564, '0', '1', '2019-08-20 14:32:37');
INSERT INTO `task_list` VALUES ('6', '测试', '123123123', 0x756E646566696E6564, '2', '2', '2019-08-20 14:04:25');
INSERT INTO `task_list` VALUES ('7', '测试', '测试', 0x756E646566696E6564, '2', '5', '2019-08-20 14:52:22');
INSERT INTO `task_list` VALUES ('8', '任务10', '任务10', '', '0', '6', '2019-06-17 17:58:15');
INSERT INTO `task_list` VALUES ('9', '任务意识', '任务意识', 0x756E646566696E6564, '0', '2', '2019-08-20 14:06:25');
INSERT INTO `task_list` VALUES ('10', '任务十二', '任务十二', 0x756E646566696E6564, '0', '1', '2019-08-20 14:32:41');
INSERT INTO `task_list` VALUES ('11', '任务十三', '任务十三', 0x756E646566696E6564, '1', '1', '2019-08-20 14:52:20');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456', null, null);
INSERT INTO `user` VALUES ('2', 'javan', '123456', '::1', '2019-06-19 18:04:56');
