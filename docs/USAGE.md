# 使用说明

🌐 **Language / 语言**: [English](USAGE_EN.md) | [中文简体](USAGE.md)

## 前提条件

在使用本工具之前，请确保您已经：

1. 安装了支持的代理工具（Surge 或 Shadowrocket）
2. 了解基本的代理配置方法
3. 已阅读并理解相关风险和免责声明

## 支持的代理工具

### Surge (推荐)
- **平台**: iOS, macOS  
- **版本要求**: Surge 4.0+
- **配置文件**: `config/surge.conf`

### Shadowrocket
- **平台**: iOS
- **版本要求**: 2.1.90+
- **配置文件**: `config/shadowrocket.conf`

## 配置步骤

### 方法一：完整配置文件导入

1. 下载对应的配置文件
2. 在代理工具中导入配置文件
3. 启用MITM功能
4. 安装并信任证书

### 方法二：手动添加配置

#### Surge配置

1. 打开Surge配置文件
2. 在`[Script]`部分添加：
```
ngmarket = type=http-request,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/cart/loadCart,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/xboxng/ngmarket.js,script-update-interval=0

getcartid = type=http-response,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/cart/loadCart,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/xboxng/getcartid.js,script-update-interval=0

buy = type=http-request,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/Cart/RequestParentalApproval,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/xboxng/buy.js,script-update-interval=0
```

3. 在`[URL Rewrite]`部分添加：
```
^https://www\.microsoft\.com/store/purchase/purchaseui/(cart|checkout)\?.*market=[^&]*.* https://www.microsoft.com/store/purchase/purchaseui/$1?market=NG 302
```

4. 在`[MITM]`部分添加：
```
hostname = %APPEND% *.microsoft.com, *.dynamics.com
```

#### Shadowrocket配置

类似地将对应配置添加到Shadowrocket配置文件中。

## 使用流程

### 第一步：访问Xbox商店
1. 打开Xbox官网或应用
2. 浏览尼日利亚市场的游戏
3. 选择要购买的游戏

### 第二步：添加到购物车
1. 点击"添加到购物车"
2. 工具会自动拦截并修改请求
3. 观察代理工具的日志确认脚本运行

### 第三步：获取Cart ID
1. 打开购物车页面
2. 工具会自动提取并存储Cart ID
3. 会收到获取成功的通知

### 第四步：完成购买
1. 进行结账操作
2. 工具会自动使用存储的Cart ID
3. 完成购买流程

## 故障排除

### 常见问题

#### 1. 脚本不执行
**可能原因**：
- MITM未正确配置
- 域名未添加到MITM列表
- 证书未安装或信任

**解决方法**：
- 重新配置MITM
- 检查域名配置
- 重新安装证书

#### 2. 购物车ID获取失败
**可能原因**：
- 网络响应格式变化
- 脚本路径错误

**解决方法**：
- 检查网络连接
- 更新脚本版本
- 查看详细日志

#### 3. 购买时ID替换失败
**可能原因**：
- 没有存储的Cart ID
- 请求格式变化

**解决方法**：
- 重新获取Cart ID
- 检查脚本更新

### 调试方法

1. **查看代理日志**
   - Surge: 首页 → 最近请求
   - Shadowrocket: 日志 → 最近活动

2. **检查脚本执行**
   - 观察是否有脚本执行记录
   - 检查错误信息

3. **验证MITM配置**
   - 确认域名已添加
   - 验证证书已信任

## 高级配置

### 自定义脚本路径

如果您想使用本地脚本文件，可以将script-path修改为本地路径：
```
script-path=/path/to/your/script.js
```

### 调整超时时间

默认超时时间为90秒，您可以根据网络情况调整：
```
timeout=120
```

### 启用调试模式

在脚本中添加更多日志输出来调试问题。

## 安全注意事项

1. **证书安全**：只信任来源可靠的证书
2. **配置备份**：定期备份您的代理配置
3. **更新检查**：定期检查脚本更新
4. **使用监控**：注意代理工具的资源使用情况

## 技术支持

如果遇到问题，请按以下顺序寻求帮助：

1. 查阅本文档的故障排除部分
2. 检查GitHub Issues中是否有类似问题
3. 提交新的Issue并提供详细信息：
   - 使用的代理工具和版本
   - 错误日志
   - 操作步骤
   - 预期结果和实际结果 