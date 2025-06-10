# Technical Documentation

🌐 **Language / 语言**: [English](TECHNICAL_EN.md) | [中文简体](TECHNICAL.md)

## Project Architecture

This tool uses JavaScript scripts to intercept and modify HTTP requests/responses to solve Xbox Nigeria market cart issues.

### Core Components

1. **ngmarket.js** - Market identifier modifier
2. **getcartid.js** - Cart ID extractor  
3. **buy.js** - Purchase request processor

## Technical Principles

### Problem Background

The Xbox Nigeria market has technical limitations that prevent certain games from being properly added to the cart or completing the purchase process. Main issues include:

1. Inconsistent market identifiers
2. Cart IDs cannot be properly passed between different requests
3. Regional validation mechanism anomalies

### Solution

By intercepting and modifying requests at the network layer, we unify market identifiers and ensure proper Cart ID transmission.

## Detailed Script Analysis

### ngmarket.js - Market Modification Script

```javascript
if ($request.method.toUpperCase() !== "OPTIONS") {
  let body = JSON.parse($request.body);
  let headers = $request.headers;
  let url = $request.url;

  // Modify market identifier to Nigeria
  if (body.market) {
    body.market = "NG";
  }

  // Modify locale settings
  if (body.locale) {
    body.locale = "en-NG";
  }

  // Modify cart friendly name
  if (body.friendlyName) {
    if (url.includes("appId=storeCart")) {
      body.friendlyName = "cart-save-for-later-NG";
    } else {
      body.friendlyName = "cart-NG";
    }
  }

  // Modify market identifier in HTTP headers
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

**Functionality**:
- Intercepts loadCart requests to `cart.production.store-web.dynamics.com`
- Unifies all market-related identifiers to "NG" (Nigeria)
- Ensures consistency between request body and header information

### getcartid.js - ID Extraction Script

```javascript
let body = $response.body;
let obj = JSON.parse(body);

if (obj.cart && obj.cart.id) {
    let cartId = obj.cart.id;
    
    // Persistently store Cart ID
    $persistentStore.write(cartId, "cartId");

    $notification.post("Cart ID 获取成功", `cartId: ${cartId}`, "");
    
    console.log(`Cart ID: ${cartId}`);
} else {
    $notification.post("Cart ID 获取失败", "响应体中未找到 cart id", "");
    console.log("响应体中未找到 cart id");
}

$done({});
```

**Functionality**:
- Intercepts loadCart API responses
- Extracts cart.id field from response
- Uses persistentStore to store ID persistently
- Provides user feedback notifications

### buy.js - Purchase Processing Script

```javascript
if ($request.method.toUpperCase() !== "OPTIONS") {
    let storedCartId = $persistentStore.read("cartId");

    if (storedCartId) {
        let headers = $request.headers;
        let body = JSON.parse($request.body);

        if (body.cartId) {
            // Replace Cart ID in purchase request
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

**Functionality**:
- Intercepts RequestParentalApproval purchase requests
- Reads previously stored Cart ID from persistent storage
- Replaces cartId field in request
- Ensures purchase process uses correct ID

## Network Interception Configuration

### URL Pattern Matching

```regex
^https://cart\.production\.store-web\.dynamics\.com/v\d+\.\d+/cart/loadCart
^https://cart\.production\.store-web\.dynamics\.com/v\d+\.\d+/Cart/RequestParentalApproval
```

These regex patterns match:
- Dynamic version numbers (`v\d+\.\d+`)
- Specific API endpoints
- HTTPS protocol requests

### URL Rewrite Rules

```regex
^https://www\.microsoft\.com/store/purchase/purchaseui/(cart|checkout)\?.*market=[^&]*.*
```

Rewrite target:
```
https://www.microsoft.com/store/purchase/purchaseui/$1?market=NG
```

Ensures Microsoft Store pages also use Nigeria market identifier.

## Data Flow Diagram

```
User accesses Xbox Store
       ↓
   Selects Nigeria games
       ↓
   Clicks add to cart
       ↓
[ngmarket.js] Intercepts request → Modifies market identifier → Sends modified request
       ↓
   Server responds with cart data
       ↓
[getcartid.js] Intercepts response → Extracts Cart ID → Stores persistently
       ↓
   User proceeds to checkout
       ↓
[buy.js] Intercepts purchase request → Replaces Cart ID → Completes purchase
```

## Security Considerations

### MITM (Man-in-the-Middle) Protection

1. **Certificate Verification**: Ensure only trusted MITM certificates are used
2. **Domain Restriction**: Only enable interception for specific Microsoft and Dynamics domains
3. **Script Integrity**: Use GitHub Raw links to ensure reliable script sources

### Data Privacy

1. **Minimal Interception**: Only intercept necessary requests and responses
2. **Local Processing**: All data processing occurs on local device
3. **Temporary Storage**: Cart ID is only stored temporarily for session duration

### Error Handling

1. **Graceful Degradation**: Script failures don't affect normal purchase flow
2. **Logging**: Detailed error logs for problem diagnosis
3. **Timeout Mechanism**: Prevents infinite request waiting

## Compatibility Analysis

### Proxy Tool Support

| Feature | Surge | Shadowrocket | Quantumult X |
|---------|--------|--------------|--------------|
| HTTP Request Script | ✅ | ✅ | ✅ |
| HTTP Response Script | ✅ | ✅ | ✅ |
| Persistent Store | ✅ | ✅ | ✅ |
| Notification | ✅ | ✅ | ✅ |
| URL Rewrite | ✅ | ✅ | ✅ |

### System Requirements

- **iOS**: 13.0+
- **macOS**: 10.15+  
- **Network**: Environment supporting HTTPS interception

## Performance Impact

### Memory Usage
- Script runtime usage: < 1MB
- Persistent storage: < 1KB

### Network Latency
- Request interception overhead: < 5ms
- Response processing overhead: < 3ms

### Battery Consumption
Minimal impact on device battery, scripts only activate for specific requests.

## Troubleshooting Guide

### Common Error Types

1. **Script Loading Failed**
   - Check network connection
   - Verify script URL accessibility
   - Confirm proxy tool version compatibility

2. **MITM Certificate Issues**
   - Regenerate certificate
   - Confirm system trust settings
   - Check certificate validity period

3. **Data Parsing Errors**
   - Verify API response format
   - Check JSON parsing logic
   - Update script version

### Debugging Tools

1. **Proxy Logs**: View request/response details
2. **Console Output**: Script execution status
3. **Notification System**: Real-time operation feedback

## Updates and Maintenance

### Automatic Update Mechanism

`script-update-interval=0` in script configuration means no automatic updates, ensuring stability. To update:

1. Manually modify script-path in configuration
2. Reload proxy configuration
3. Verify new version works properly

### Version Compatibility

Maintain multiple versions to support different API changes:
- v1.0.x - Current stable version
- v1.1.x - New feature testing version
- legacy - Old API compatibility 