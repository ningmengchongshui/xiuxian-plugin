/*
 Navicat Premium Data Transfer
 Date: 02/02/2024 20:15:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '时间控制器',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限名',
  `start_time` bigint(11) NULL DEFAULT 0 COMMENT '开始时间',
  `end_time` bigint(11) NULL DEFAULT 0 COMMENT '结束时间',
  `gaspractice` int(11) NULL DEFAULT 0 COMMENT '气境',
  `bodypractice` int(11) NULL DEFAULT 0 COMMENT '体境',
  `soul` int(11) NULL DEFAULT 0 COMMENT '魂境',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NULL DEFAULT 1,
  `grade` int(11) NULL DEFAULT 1,
  `account` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ass
-- ----------------------------
DROP TABLE IF EXISTS `ass`;
CREATE TABLE `ass`  (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `create_time` bigint(20) NULL DEFAULT NULL COMMENT '创建时间',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `typing` int(11) NOT NULL COMMENT '类型,不同的类型文本不同',
  `grade` bigint(20) NULL DEFAULT 0 COMMENT '等级,限制人数',
  `bag_grade` int(11) NULL DEFAULT 0 COMMENT '藏宝阁等级',
  `property` bigint(20) NOT NULL COMMENT '储蓄',
  `fame` bigint(20) NULL DEFAULT 0 COMMENT '名气',
  `activation` bigint(20) NULL DEFAULT 0 COMMENT '活跃度',
  `doc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pk_ass_item_typing`(`typing`) USING BTREE,
  CONSTRAINT `pk_ass_item_typing` FOREIGN KEY (`typing`) REFERENCES `ass_typing` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ass_bag
-- ----------------------------
DROP TABLE IF EXISTS `ass_bag`;
CREATE TABLE `ass_bag`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aid` bigint(20) NOT NULL COMMENT '编号',
  `tid` int(11) NULL DEFAULT NULL COMMENT '物品编号',
  `type` int(11) NULL DEFAULT NULL COMMENT '物品类型',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '10' COMMENT '物品名',
  `acount` bigint(20) NULL DEFAULT 1 COMMENT '数量',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_bag_item_name`(`name`) USING BTREE,
  CONSTRAINT `fk_ass_bag_item_name` FOREIGN KEY (`name`) REFERENCES `goods` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 242881 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ass_typing
-- ----------------------------
DROP TABLE IF EXISTS `ass_typing`;
CREATE TABLE `ass_typing`  (
  `id` int(11) NOT NULL,
  `master` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '主人',
  `vice_master` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '副主人',
  `super_admin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '超级管理员',
  `admin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '管理员',
  `core_member` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '核心成员',
  `senior_menber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '高级成员',
  `intermediate_member` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '中级成员',
  `lowerlevel_member` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '低级成员',
  `tagged_member` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标记成员',
  `reviewed_member` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '待审核成员',
  `doc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for auction
-- ----------------------------
DROP TABLE IF EXISTS `auction`;
CREATE TABLE `auction`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `state` int(11) NULL DEFAULT 0 COMMENT '状体',
  `start_time` bigint(20) NULL DEFAULT NULL COMMENT '开始时间',
  `party_a` json NULL COMMENT '甲方',
  `party_b` json NULL COMMENT '乙方',
  `party_all` json NULL COMMENT '所有记录',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品名',
  `account` int(11) NULL DEFAULT NULL COMMENT '物品数量',
  `price` int(11) NULL DEFAULT NULL COMMENT '价格',
  `UpdateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `type` int(11) NULL DEFAULT NULL COMMENT '物品类型',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1702921884853 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for board
-- ----------------------------
DROP TABLE IF EXISTS `board`;
CREATE TABLE `board`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `state` int(11) NULL DEFAULT 0,
  `party_a` json NULL,
  `party_b` json NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品名',
  `account` int(11) NULL DEFAULT NULL COMMENT '物品数量',
  `price` int(11) NULL DEFAULT NULL COMMENT '物品价格',
  `type` int(11) NULL DEFAULT NULL COMMENT '物品类型',
  `UpdateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1706157362835 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for exchange
-- ----------------------------
DROP TABLE IF EXISTS `exchange`;
CREATE TABLE `exchange`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `state` int(11) NULL DEFAULT 0,
  `party_a` json NULL,
  `party_b` json NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品名称',
  `account` int(11) NULL DEFAULT NULL COMMENT '物品数量',
  `type` int(11) NULL DEFAULT NULL COMMENT '物品类型',
  `price` int(11) NULL DEFAULT NULL,
  `UpdateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1704775428832 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fate_level
-- ----------------------------
DROP TABLE IF EXISTS `fate_level`;
CREATE TABLE `fate_level`  (
  `id` int(11) NOT NULL,
  `grade` int(11) NULL DEFAULT NULL COMMENT '等级',
  `exp_gaspractice` int(11) NULL DEFAULT 0,
  `exp_bodypractice` int(11) NULL DEFAULT 0,
  `exp_soul` int(11) NULL DEFAULT 0,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL,
  `type` int(11) NULL DEFAULT 1 COMMENT '类型',
  `monster_type` int(11) NULL DEFAULT 0 COMMENT '怪物类型',
  `grade` int(11) NULL DEFAULT 1 COMMENT '物品种类等级',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名字唯一',
  `addition` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'blood',
  `talent` json NULL COMMENT '属性',
  `wheeldisc` int(11) NULL DEFAULT 0 COMMENT '命运转盘----特殊物品',
  `commodities` int(11) NULL DEFAULT 0 COMMENT '万宝楼------基础物品',
  `alliancemall` int(11) NULL DEFAULT 0 COMMENT '联盟商城------稀有物品',
  `palace` int(11) NULL DEFAULT 0 COMMENT '日常物品',
  `limit` int(11) NULL DEFAULT 0 COMMENT '限定物品---1为普通 2为版本|绝版 3为极品',
  `drops` int(11) NULL DEFAULT 0 COMMENT '怪物掉落：材料',
  `boolere_covery` int(11) NULL DEFAULT NULL,
  `attack` int(11) NULL DEFAULT 0,
  `defense` int(11) NULL DEFAULT 0,
  `blood` int(11) NULL DEFAULT 0,
  `critical_hit` int(11) NULL DEFAULT 0,
  `critical_damage` int(11) NULL DEFAULT 0,
  `exp_gaspractice` int(11) NULL DEFAULT 0,
  `exp_bodypractice` int(11) NULL DEFAULT 0,
  `exp_soul` int(11) NULL DEFAULT 0,
  `size` int(11) NULL DEFAULT 0,
  `speed` int(11) NULL DEFAULT 0,
  `price` int(11) NULL DEFAULT 100,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_name_unique`(`name`) USING BTREE,
  UNIQUE INDEX `uq_goods_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for levels
-- ----------------------------
DROP TABLE IF EXISTS `levels`;
CREATE TABLE `levels`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NULL DEFAULT NULL,
  `grade` int(20) NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `attack` int(11) NULL DEFAULT NULL,
  `defense` int(11) NULL DEFAULT NULL,
  `blood` int(11) NULL DEFAULT NULL,
  `critical_hit` int(11) NULL DEFAULT NULL COMMENT '暴击率',
  `critical_damage` int(11) NULL DEFAULT NULL COMMENT '暴击伤害',
  `speed` int(11) NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `soul` int(11) NULL DEFAULT NULL,
  `exp_needed` int(11) NULL DEFAULT NULL,
  `success_rate` int(11) NULL DEFAULT 10 COMMENT '成功率',
  `doc` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 143 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for map_point
-- ----------------------------
DROP TABLE IF EXISTS `map_point`;
CREATE TABLE `map_point`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  `type` int(11) NULL DEFAULT NULL COMMENT '地点编号',
  `grade` int(11) NULL DEFAULT NULL COMMENT '等级',
  `attribute` int(11) NULL DEFAULT NULL COMMENT '属性',
  `x` int(11) NULL DEFAULT NULL,
  `y` int(11) NULL DEFAULT NULL,
  `z` int(11) NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1302 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for map_position
-- ----------------------------
DROP TABLE IF EXISTS `map_position`;
CREATE TABLE `map_position`  (
  `id` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `grade` int(11) NULL DEFAULT NULL,
  `attribute` int(11) NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `x1` int(11) NULL DEFAULT NULL,
  `x2` int(11) NULL DEFAULT NULL,
  `y1` int(11) NULL DEFAULT NULL,
  `y2` int(11) NULL DEFAULT NULL,
  `z1` int(11) NULL DEFAULT NULL,
  `z2` int(11) NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for map_treasure
-- ----------------------------
DROP TABLE IF EXISTS `map_treasure`;
CREATE TABLE `map_treasure`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `attribute` int(11) NULL DEFAULT NULL,
  `acount` int(11) NULL DEFAULT NULL,
  `x` bigint(20) NULL DEFAULT NULL,
  `y` bigint(20) NULL DEFAULT NULL,
  `z` bigint(20) NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3163 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for monster
-- ----------------------------
DROP TABLE IF EXISTS `monster`;
CREATE TABLE `monster`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(20) NULL DEFAULT NULL,
  `grade` int(11) NULL DEFAULT NULL COMMENT '最低等级',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `out_trade_no` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `plan_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_private_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `plan_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `month` int(11) NULL DEFAULT NULL,
  `total_amount` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `show_amount` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `redeem_id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_type` int(100) NULL DEFAULT NULL,
  `discount` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sku_detail` json NULL,
  `address_person` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `UpdateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `doc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sky
-- ----------------------------
DROP TABLE IF EXISTS `sky`;
CREATE TABLE `sky`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通天塔',
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 168 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for talent
-- ----------------------------
DROP TABLE IF EXISTS `talent`;
CREATE TABLE `talent`  (
  `id` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for txt
-- ----------------------------
DROP TABLE IF EXISTS `txt`;
CREATE TABLE `txt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2011 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` bigint(20) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(3) NULL DEFAULT NULL COMMENT '更新时间',
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '编号',
  `password` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '123456' COMMENT '密码',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `autograph` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '无' COMMENT '个性签名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像地址',
  `phone` bigint(20) NULL DEFAULT NULL COMMENT '手机号',
  `state` bigint(20) NULL DEFAULT 0 COMMENT '状态标记',
  `state_start_time` bigint(20) NULL DEFAULT 9999999999999 COMMENT '状态开始时间',
  `state_end_time` bigint(20) NULL DEFAULT 9999999999999 COMMENT '状态结束时间',
  `age` bigint(20) NULL DEFAULT 1 COMMENT '当前寿命',
  `age_limit` bigint(20) NULL DEFAULT 100 COMMENT '寿命上限',
  `age_state` bigint(20) NULL DEFAULT 1 COMMENT '寿命状态',
  `point_type` bigint(20) NULL DEFAULT 0 COMMENT '地点编号',
  `pont_attribute` bigint(20) NULL DEFAULT 0 COMMENT '地点属性_默认0',
  `pont_x` bigint(20) NULL DEFAULT 0 COMMENT '地点x轴_默认0',
  `pont_y` bigint(20) NULL DEFAULT 0 COMMENT '地点y轴_默认0',
  `battle_show` bigint(20) NULL DEFAULT 0 COMMENT '是否现实战斗过程',
  `pont_z` bigint(20) NULL DEFAULT 0 COMMENT '地点z轴_默认0',
  `battle_blood_now` bigint(20) NULL DEFAULT 0 COMMENT '当前血量',
  `battle_blood_limit` bigint(20) NULL DEFAULT 0 COMMENT '血量上限',
  `battle_attack` bigint(20) NULL DEFAULT 0 COMMENT '攻击',
  `battle_defense` bigint(20) NULL DEFAULT 0 COMMENT '防御',
  `battle_speed` bigint(20) NULL DEFAULT 0 COMMENT '敏捷',
  `battle_power` bigint(20) NULL DEFAULT 0 COMMENT '战力',
  `battle_critical_hit` bigint(20) NULL DEFAULT 0 COMMENT '暴击率',
  `battle_critical_damage` bigint(20) NULL DEFAULT 50 COMMENT '暴击伤害',
  `special_reputation` bigint(20) NULL DEFAULT 0 COMMENT '声望',
  `special_prestige` bigint(20) NULL DEFAULT 30 COMMENT '煞气',
  `special_spiritual` bigint(20) NULL DEFAULT 100 COMMENT '灵力',
  `special_spiritual_limit` bigint(20) NULL DEFAULT 100 COMMENT '灵力上限',
  `special_virtues` bigint(20) NULL DEFAULT 0 COMMENT '功德',
  `talent` json NULL COMMENT '灵根',
  `talent_size` bigint(20) NULL DEFAULT 0 COMMENT '天赋',
  `talent_show` bigint(20) NULL DEFAULT 0 COMMENT '是否显示灵根',
  `sign_day` bigint(20) NULL DEFAULT 0 COMMENT '签到天数',
  `sign_math` bigint(20) NULL DEFAULT 1 COMMENT '签到月',
  `sign_size` bigint(20) NOT NULL DEFAULT 1 COMMENT '签到大小',
  `sign_time` bigint(20) NULL DEFAULT 0 COMMENT '签到时间',
  `bag_grade` bigint(20) NULL DEFAULT 1 COMMENT '背包等级',
  `newcomer_gift` bigint(20) NULL DEFAULT 0 COMMENT '是否是新人',
  `point_attribute` bigint(20) NULL DEFAULT 0 COMMENT '地点属性',
  `point_x` bigint(20) NULL DEFAULT 0 COMMENT '坐标',
  `point_y` bigint(20) NULL DEFAULT 0 COMMENT '坐标',
  `point_z` bigint(20) NULL DEFAULT 0 COMMENT '坐标',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  `man_size` int(11) NULL DEFAULT 0 COMMENT '南天宫',
  `dong_size` int(11) NULL DEFAULT 0 COMMENT '东湖宫',
  `dong_minit` int(11) NULL DEFAULT 0 COMMENT '东湖宫',
  PRIMARY KEY (`id`, `sign_size`) USING BTREE,
  UNIQUE INDEX `idx_uid_unique`(`uid`) USING BTREE,
  INDEX `idx_uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10742 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_ass
-- ----------------------------
DROP TABLE IF EXISTS `user_ass`;
CREATE TABLE `user_ass`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_tiime` bigint(20) NULL DEFAULT NULL COMMENT '加入时间',
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `aid` bigint(20) NOT NULL,
  `contribute` bigint(20) NULL DEFAULT 0 COMMENT '贡献',
  `authentication` int(11) NULL DEFAULT NULL COMMENT '鉴权',
  `identity` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份名',
  `doc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关系表',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_ass_item_uid`(`uid`) USING BTREE,
  INDEX `fk_user_ass_item_aid`(`aid`) USING BTREE,
  CONSTRAINT `fk_user_ass_item_aid` FOREIGN KEY (`aid`) REFERENCES `ass` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_ass_item_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 139 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_bag
-- ----------------------------
DROP TABLE IF EXISTS `user_bag`;
CREATE TABLE `user_bag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '编号',
  `tid` int(11) NULL DEFAULT NULL COMMENT '物品编号',
  `type` int(11) NULL DEFAULT NULL COMMENT '物品类型',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '10' COMMENT '物品名',
  `acount` bigint(11) NULL DEFAULT 1 COMMENT '数量',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_bag_item_name`(`name`) USING BTREE,
  CONSTRAINT `fk_user_bag_item_name` FOREIGN KEY (`name`) REFERENCES `goods` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 333954 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_blessing
-- ----------------------------
DROP TABLE IF EXISTS `user_blessing`;
CREATE TABLE `user_blessing`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户编号',
  `day` int(11) NULL DEFAULT NULL COMMENT '总天数',
  `record` json NULL COMMENT '充值记录',
  `time` bigint(20) NULL DEFAULT NULL COMMENT '领取时间',
  `receive` json NULL COMMENT '领取记录',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1983 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_compensate
-- ----------------------------
DROP TABLE IF EXISTS `user_compensate`;
CREATE TABLE `user_compensate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户编号',
  `time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '时间串',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 202 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_damage
-- ----------------------------
DROP TABLE IF EXISTS `user_damage`;
CREATE TABLE `user_damage`  (
  `id` int(11) NOT NULL,
  `uid` int(11) NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `record` int(11) NULL DEFAULT NULL,
  `doc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_equipment
-- ----------------------------
DROP TABLE IF EXISTS `user_equipment`;
CREATE TABLE `user_equipment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_equipment_item_name`(`name`) USING BTREE,
  CONSTRAINT `fk_user_equipment_item_name` FOREIGN KEY (`name`) REFERENCES `goods` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25066 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_fate
-- ----------------------------
DROP TABLE IF EXISTS `user_fate`;
CREATE TABLE `user_fate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '本命数据',
  `uid` varbinary(50) NOT NULL COMMENT '编号',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品名',
  `grade` int(20) NULL DEFAULT NULL COMMENT '等级',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_equipment_item_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 808 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_level
-- ----------------------------
DROP TABLE IF EXISTS `user_level`;
CREATE TABLE `user_level`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` int(11) NULL DEFAULT NULL COMMENT '境界类型',
  `career` int(11) NULL DEFAULT 0 COMMENT '职业类型,非职业为0',
  `addition` int(11) NULL DEFAULT NULL COMMENT '突破概率加成',
  `realm` bigint(20) NULL DEFAULT NULL COMMENT '等级',
  `experience` bigint(20) NULL DEFAULT NULL COMMENT '经验',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 67432 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_log
-- ----------------------------
DROP TABLE IF EXISTS `user_log`;
CREATE TABLE `user_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `create_time` bigint(20) NULL DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21598 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_ring
-- ----------------------------
DROP TABLE IF EXISTS `user_ring`;
CREATE TABLE `user_ring`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '编号',
  `tid` int(11) NULL DEFAULT NULL COMMENT '物品编号',
  `type` int(11) NULL DEFAULT NULL COMMENT '物品类型',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '10' COMMENT '物品名',
  `acount` bigint(11) NULL DEFAULT 1 COMMENT '数量',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_bag_item_name`(`name`) USING BTREE,
  CONSTRAINT `user_ring_ibfk_1` FOREIGN KEY (`name`) REFERENCES `goods` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 211434 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_skills
-- ----------------------------
DROP TABLE IF EXISTS `user_skills`;
CREATE TABLE `user_skills`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '玩家编号',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '功法名',
  `doc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_skills_item_name`(`name`) USING BTREE,
  CONSTRAINT `fk_user_skills_item_name` FOREIGN KEY (`name`) REFERENCES `goods` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 115856 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Function structure for random_sort
-- ----------------------------
DROP FUNCTION IF EXISTS `random_sort`;
delimiter ;;
CREATE FUNCTION `random_sort`()
 RETURNS int(11)
BEGIN
    RETURN FLOOR(RAND() * 100);
  END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
