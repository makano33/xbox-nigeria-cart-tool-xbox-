# Usage Guide

🌐 **Language / 语言**: [English](USAGE_EN.md) | [中文简体](USAGE.md)

## Prerequisites

Before using this tool, please ensure you have:

1. Installed a supported proxy tool (Surge or Shadowrocket)
2. Basic understanding of proxy configuration
3. Read and understood the relevant risks and disclaimers

## Supported Proxy Tools

### Surge (Recommended)
- **Platform**: iOS, macOS  
- **Version Requirement**: Surge 4.0+
- **Configuration File**: `config/surge.conf`

### Shadowrocket
- **Platform**: iOS
- **Version Requirement**: 2.1.90+
- **Configuration File**: `config/shadowrocket.conf`

## Configuration Steps

### Method 1: Complete Configuration File Import

1. Download the corresponding configuration file
2. Import the configuration file in your proxy tool
3. Enable MITM functionality
4. Install and trust the certificate

### Method 2: Manual Configuration Addition

#### Surge Configuration

1. Open your Surge configuration file
2. Add to the `[Script]` section:
```
ngmarket = type=http-request,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/cart/loadCart,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/xboxng/ngmarket.js,script-update-interval=0

getcartid = type=http-response,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/cart/loadCart,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/xboxng/getcartid.js,script-update-interval=0

buy = type=http-request,pattern=^https://cart.production.store-web.dynamics.com/v\d+\.\d+/Cart/RequestParentalApproval,requires-body=1,max-size=0,binary-body-mode=0,timeout=90,script-path=https://raw.githubusercontent.com/theslugger/xboxngn/refs/heads/main/xboxng/buy.js,script-update-interval=0
```

3. Add to the `[URL Rewrite]` section:
```
^https://www\.microsoft\.com/store/purchase/purchaseui/(cart|checkout)\?.*market=[^&]*.* https://www.microsoft.com/store/purchase/purchaseui/$1?market=NG 302
```

4. Add to the `[MITM]` section:
```
hostname = %APPEND% *.microsoft.com, *.dynamics.com
```

#### Shadowrocket Configuration

Similarly add the corresponding configuration to your Shadowrocket configuration file.

## Usage Flow

### Step 1: Access Xbox Store
1. Open Xbox website or application
2. Browse games in the Nigeria market
3. Select the game you want to purchase

### Step 2: Add to Cart
1. Click "Add to Cart"
2. The tool will automatically intercept and modify requests
3. Observe proxy tool logs to confirm script execution

### Step 3: Get Cart ID
1. Open the cart page
2. The tool will automatically extract and store the Cart ID
3. You will receive a success notification

### Step 4: Complete Purchase
1. Proceed with checkout
2. The tool will automatically use the stored Cart ID
3. Complete the purchase process

## Troubleshooting

### Common Issues

#### 1. Scripts Not Executing
**Possible Causes**:
- MITM not properly configured
- Domains not added to MITM list
- Certificate not installed or trusted

**Solutions**:
- Reconfigure MITM
- Check domain configuration
- Reinstall certificate

#### 2. Cart ID Extraction Failed
**Possible Causes**:
- Network response format changes
- Script path error

**Solutions**:
- Check network connection
- Update script version
- View detailed logs

#### 3. ID Replacement Failed During Purchase
**Possible Causes**:
- No stored Cart ID
- Request format changes

**Solutions**:
- Re-obtain Cart ID
- Check script updates

### Debugging Methods

1. **View Proxy Logs**
   - Surge: Home → Recent Requests
   - Shadowrocket: Logs → Recent Activity

2. **Check Script Execution**
   - Observe if there are script execution records
   - Check error messages

3. **Verify MITM Configuration**
   - Confirm domains are added
   - Verify certificate is trusted

## Advanced Configuration

### Custom Script Path

If you want to use local script files, you can modify the script-path to a local path:
```
script-path=/path/to/your/script.js
```

### Adjust Timeout

The default timeout is 90 seconds, you can adjust it based on network conditions:
```
timeout=120
```

### Enable Debug Mode

Add more log output in scripts to debug issues.

## Security Considerations

1. **Certificate Security**: Only trust certificates from reliable sources
2. **Configuration Backup**: Regularly backup your proxy configuration
3. **Update Checks**: Regularly check for script updates
4. **Usage Monitoring**: Monitor proxy tool resource usage

## Technical Support

If you encounter problems, please seek help in the following order:

1. Consult the troubleshooting section of this document
2. Check if there are similar issues in GitHub Issues
3. Submit a new Issue with detailed information:
   - Proxy tool and version used
   - Error logs
   - Operation steps
   - Expected and actual results 