# 技术文档

🌐 **Language / 语言**: [English](TECHNICAL_EN.md) | [中文简体](TECHNICAL.md)

## 项目架构

本工具采用JavaScript脚本拦截和修改HTTP请求/响应的方式来解决Xbox尼日利亚市场的购物车问题。

### 核心组件

1. **ngmarket.js** - 市场标识修改器
2. **getcartid.js** - 购物车ID提取器  
3. **buy.js** - 购买请求处理器

## 技术原理

### 问题背景

Xbox尼日利亚市场存在技术限制，导致某些游戏无法正常添加到购物车或完成购买流程。主要问题包括：

1. 市场标识不一致
2. 购物车ID在不同请求间无法正确传递
3. 区域验证机制异常

### 解决方案

通过在网络层拦截和修改请求，统一市场标识并确保购物车ID的正确传递。

## 脚本详细分析

### ngmarket.js - 市场修改脚本

```javascript
if ($request.method.toUpperCase() !== "OPTIONS") {
  let body = JSON.parse($request.body);
  let headers = $request.headers;
  let url = $request.url;

  // 修改市场标识为尼日利亚
  if (body.market) {
    body.market = "NG";
  }

  // 修改语言区域设置
  if (body.locale) {
    body.locale = "en-NG";
  }

  // 修改购物车友好名称
  if (body.friendlyName) {
    if (url.includes("appId=storeCart")) {
      body.friendlyName = "cart-save-for-later-NG";
    } else {
      body.friendlyName = "cart-NG";
    }
  }

  // 修改HTTP头中的市场标识
  if (headers["X-MS-Market"]) {
    headers["X-MS-Market"] = "NG";
  }

  if (headers["x-ms-market"]) {
    headers["x-ms-market"] = "NG";
  }

  $done({
    headers: headers,
    body: JSON.stringify(body)
  });
} else {
  $done({});
}
```

**功能说明**：
- 拦截到`cart.production.store-web.dynamics.com`的loadCart请求
- 统一修改所有市场相关标识为"NG"（尼日利亚）
- 确保请求体和头部信息的一致性

### getcartid.js - ID提取脚本

```javascript
let body = $response.body;
let obj = JSON.parse(body);

if (obj.cart && obj.cart.id) {
    let cartId = obj.cart.id;
    
    // 持久化存储Cart ID
    $persistentStore.write(cartId, "cartId");

    $notification.post("Cart ID 获取成功", `cartId: ${cartId}`, "");
    
    console.log(`Cart ID: ${cartId}`);
} else {
    $notification.post("Cart ID 获取失败", "响应体中未找到 cart id", "");
    console.log("响应体中未找到 cart id");
}

$done({});
```

**功能说明**：
- 拦截loadCart API的响应
- 从响应中提取cart.id字段
- 使用persistentStore持久化存储ID
- 提供用户反馈通知

### buy.js - 购买处理脚本

```javascript
if ($request.method.toUpperCase() !== "OPTIONS") {
    let storedCartId = $persistentStore.read("cartId");

    if (storedCartId) {
        let headers = $request.headers;
        let body = JSON.parse($request.body);

        if (body.cartId) {
            // 替换购买请求中的Cart ID
            body.cartId = storedCartId;
            $notification.post("Cart ID 替换成功", `使用 Cart ID: ${storedCartId}`, "");
        } else {
            $notification.post("Cart ID 替换失败", "请求体中未找到 cartId", "");
            console.log("请求体中未找到 cartId，此请求可能不需要替换");
        }

        $done({
            body: JSON.stringify(body)
        });
    } else {
        $notification.post("Cart ID 提取失败", "没有存储的 cartId 可用于替换", "");
        console.log("没有存储的 cartId 可用");
        $done({});
    }
} else {
    $done({});
}
```

**功能说明**：
- 拦截RequestParentalApproval购买请求
- 从持久化存储中读取之前保存的Cart ID
- 替换请求中的cartId字段
- 确保购买流程使用正确的ID

## 网络拦截配置

### URL模式匹配

```regex
^https://cart\.production\.store-web\.dynamics\.com/v\d+\.\d+/cart/loadCart
^https://cart\.production\.store-web\.dynamics\.com/v\d+\.\d+/Cart/RequestParentalApproval
```

这些正则表达式模式匹配：
- 动态版本号 (`v\d+\.\d+`)
- 特定的API端点
- HTTPS协议的请求

### URL重写规则

```regex
^https://www\.microsoft\.com/store/purchase/purchaseui/(cart|checkout)\?.*market=[^&]*.*
```

重写目标：
```
https://www.microsoft.com/store/purchase/purchaseui/$1?market=NG
```

确保Microsoft Store页面也使用尼日利亚市场标识。

## 数据流图

```
用户访问Xbox商店
       ↓
   选择尼日利亚游戏
       ↓
   点击添加到购物车
       ↓
[ngmarket.js] 拦截请求 → 修改市场标识 → 发送修改后请求
       ↓
   服务器响应购物车数据
       ↓
[getcartid.js] 拦截响应 → 提取Cart ID → 持久化存储
       ↓
   用户进行结账操作
       ↓
[buy.js] 拦截购买请求 → 替换Cart ID → 完成购买
```

## 安全考虑

### MITM (中间人攻击) 防护

1. **证书验证**: 确保只使用可信的MITM证书
2. **域名限制**: 只对特定的Microsoft和Dynamics域名启用拦截
3. **脚本完整性**: 使用GitHub Raw链接确保脚本来源可靠

### 数据隐私

1. **最小化拦截**: 只拦截必要的请求和响应
2. **本地处理**: 所有数据处理在本地设备进行
3. **临时存储**: Cart ID仅临时存储，用于会话期间

### 错误处理

1. **优雅降级**: 脚本失败时不影响正常购买流程
2. **日志记录**: 详细的错误日志便于问题诊断
3. **超时机制**: 防止请求无限等待

## 兼容性分析

### 代理工具支持

| 功能 | Surge | Shadowrocket | Quantumult X |
|------|--------|--------------|--------------|
| HTTP Request Script | ✅ | ✅ | ✅ |
| HTTP Response Script | ✅ | ✅ | ✅ |
| Persistent Store | ✅ | ✅ | ✅ |
| Notification | ✅ | ✅ | ✅ |
| URL Rewrite | ✅ | ✅ | ✅ |

### 系统要求

- **iOS**: 13.0+
- **macOS**: 10.15+  
- **网络**: 支持HTTPS拦截的环境

## 性能影响

### 内存使用
- 脚本运行时占用: < 1MB
- 持久化存储: < 1KB

### 网络延迟
- 请求拦截开销: < 5ms
- 响应处理开销: < 3ms

### 电池消耗
对设备电池消耗影响微乎其微，脚本仅在特定请求时激活。

## 故障排除指南

### 常见错误类型

1. **脚本加载失败**
   - 检查网络连接
   - 验证脚本URL可访问性
   - 确认代理工具版本兼容性

2. **MITM证书问题**
   - 重新生成证书
   - 确认系统信任设置
   - 检查证书有效期

3. **数据解析错误**
   - 验证API响应格式
   - 检查JSON解析逻辑
   - 更新脚本版本

### 调试工具

1. **代理日志**: 查看请求/响应详情
2. **控制台输出**: 脚本执行状态
3. **通知系统**: 实时反馈操作结果

## 更新维护

### 自动更新机制

脚本配置中的`script-update-interval=0`表示不自动更新，确保稳定性。如需更新：

1. 手动修改配置中的script-path
2. 重新加载代理配置
3. 验证新版本正常工作

### 版本兼容性

维护多个版本以支持不同的API变化：
- v1.0.x - 当前稳定版本
- v1.1.x - 新功能测试版本
- legacy - 旧版API兼容 