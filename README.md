# Xbox Nigeria Market Cart Tool

🌐 **Language / 语言**: [English](README_EN.md) | [中文简体](README.md)
##surge/Shadowrocket脚本
```[Body Rewrite]
http-request https://www.microsoft.com/store/purchase/purchaseui/(cart|checkout) market=[^&amp;]* market=NG

[Script]
ngmarket.js = type=http-request,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/cart/loadCart,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/ngmarket.js,script-update-interval=0
getcartid = type=http-response,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/cart/loadCart,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/getcartid.js,script-update-interval=0
buy = type=http-request,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/Cart/RequestParentalApproval,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/buy.js,script-update-interval=0

[MITM]
hostname = %APPEND% *.microsoft.com,*.dynamics.com```

## 📖 文档导航

| 文档 | 描述 | 链接 |
|------|------|------|
| 📋 使用说明 | 详细的安装配置和使用指南 | [USAGE.md](docs/USAGE.md) |
| 🔧 技术文档 | 工具原理、脚本分析和架构说明 | [TECHNICAL.md](docs/TECHNICAL.md) |
| 🔒 安全说明 | 安全考虑、风险评估和合规声明 | [SECURITY.md](docs/SECURITY.md) |
| ⚙️ Surge配置 | Surge代理工具配置文件 | [surge.conf](config/surge.conf) |
| ⚙️ Shadowrocket配置 | Shadowrocket代理工具配置文件 | [shadowrocket.conf](config/shadowrocket.conf) |

## 项目简介

这是一个用于解决Xbox尼日利亚市场游戏添加到购物车问题的工具集。由于Xbox尼日利亚市场的技术限制，某些游戏无法正常添加到购物车并进行购买，本工具通过网络请求修改来解决这一问题。

## 重要声明

⚠️ **安全报告**: 此工具涉及的技术问题已于2025年3月3日 17:16向微软安全响应中心(MSRC)提交，案例号为VULN-149047。我们遵循负责任的披露原则。

⚠️ **免责声明**: 本工具仅用于教育和研究目的，使用者需自行承担使用风险和责任。

## 功能特性

- 🛒 自动修改市场标识为尼日利亚(NG)
- 🔄 自动提取和重用购物车ID
- 📱 支持Surge和Shadowrocket代理工具
- 🔧 简单易用的配置模式

## 文件说明

### 脚本文件

- `ngmarket.js` - 市场标识修改脚本
- `getcartid.js` - 购物车ID提取脚本  
- `buy.js` - 购买请求处理脚本

### 配置文件

- `surge.conf` - Surge代理配置
- `shadowrocket.conf` - Shadowrocket代理配置

## 使用方法

### 1. Surge配置

将`surge.conf`中的配置添加到您的Surge配置文件中，或直接使用提供的配置文件。

### 2. Shadowrocket配置

将`shadowrocket.conf`中的配置添加到您的Shadowrocket配置文件中。

### 3. 启用MITM

确保在代理工具中启用MITM功能，并添加以下域名：
- `*.microsoft.com`
- `*.dynamics.com`

## 工作原理

1. **市场修改**: 拦截Microsoft Store的请求，将市场标识修改为尼日利亚(NG)
2. **ID提取**: 从购物车加载响应中提取Cart ID并持久化存储
3. **ID重用**: 在购买请求中使用存储的Cart ID替换原始ID

## 技术细节

本工具通过以下方式工作：

1. 拦截到`cart.production.store-web.dynamics.com`的请求
2. 修改请求体中的市场信息为尼日利亚
3. 提取并存储有效的购物车ID
4. 在后续购买请求中重用该ID

## 兼容性

- ✅ Surge (iOS/macOS)
- ✅ Shadowrocket (iOS)
- ✅ 其他支持JavaScript脚本的代理工具

## 注意事项

- 请确保代理工具已正确配置MITM功能
- 使用前请仔细阅读相关服务条款
- 本工具不保证在所有情况下都能正常工作
- Microsoft可能随时修复相关技术问题

## 更新日志

- v1.0.0 - 初始版本发布

## 许可证

本项目采用MIT许可证 - 详见[LICENSE](LICENSE)文件

## 贡献

欢迎提交Issue和Pull Request来改进本项目。

## 联系方式

如有问题或建议，请通过GitHub Issues联系。 
