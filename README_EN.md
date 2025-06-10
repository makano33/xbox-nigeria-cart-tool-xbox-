# Xbox Nigeria Market Cart Tool

🌐 **Language / 语言**: [English](README_EN.md) | [中文简体](README.md)

## 📖 Documentation Navigation

| Document | Description | Link |
|----------|-------------|------|
| 📋 Usage Guide | Detailed installation, configuration and usage instructions | [USAGE_EN.md](docs/USAGE_EN.md) |
| 🔧 Technical Docs | Tool principles, script analysis and architecture | [TECHNICAL_EN.md](docs/TECHNICAL_EN.md) |
| 🔒 Security Notice | Security considerations, risk assessment and compliance | [SECURITY_EN.md](docs/SECURITY_EN.md) |
| ⚙️ Surge Config | Surge proxy tool configuration file | [surge.conf](config/surge.conf) |
| ⚙️ Shadowrocket Config | Shadowrocket proxy tool configuration file | [shadowrocket.conf](config/shadowrocket.conf) |

## Project Introduction

This is a tool set designed to solve the issue of adding Xbox Nigeria market games to the shopping cart. Due to technical limitations in the Xbox Nigeria market, certain games cannot be properly added to the cart and purchased. This tool resolves this issue through network request modifications.

## Important Notice

⚠️ **Security Report**: The technical issues addressed by this tool have been reported to Microsoft Security Response Center (MSRC) on March 3, 2025, at 17:16, with case number VULN-149047. We follow responsible disclosure principles.

⚠️ **Disclaimer**: This tool is for educational and research purposes only. Users assume all risks and responsibilities for its use.

## Features

- 🛒 Automatically modify market identifier to Nigeria (NG)
- 🔄 Automatically extract and reuse cart IDs
- 📱 Support for Surge and Shadowrocket proxy tools
- 🔧 Simple and easy-to-use configuration mode

## File Description

### Script Files

- `ngmarket.js` - Market identifier modification script
- `getcartid.js` - Cart ID extraction script
- `buy.js` - Purchase request processing script

### Configuration Files

- `surge.conf` - Surge proxy configuration
- `shadowrocket.conf` - Shadowrocket proxy configuration

## Usage

### 1. Surge Configuration

Add the configuration from `surge.conf` to your Surge configuration file, or use the provided configuration file directly.

### 2. Shadowrocket Configuration

Add the configuration from `shadowrocket.conf` to your Shadowrocket configuration file.

### 3. Enable MITM

Ensure that MITM functionality is enabled in your proxy tool and add the following domains:
- `*.microsoft.com`
- `*.dynamics.com`

## How It Works

1. **Market Modification**: Intercepts Microsoft Store requests and changes market identifier to Nigeria (NG)
2. **ID Extraction**: Extracts Cart ID from cart loading responses and stores it persistently
3. **ID Reuse**: Uses stored Cart ID to replace original ID in purchase requests

## Technical Details

This tool works by:

1. Intercepting requests to `cart.production.store-web.dynamics.com`
2. Modifying market information in request body to Nigeria
3. Extracting and storing valid cart IDs
4. Reusing those IDs in subsequent purchase requests

## Compatibility

- ✅ Surge (iOS/macOS)
- ✅ Shadowrocket (iOS)
- ✅ Other proxy tools that support JavaScript scripts

## Important Notes

- Ensure your proxy tool has MITM functionality properly configured
- Please read relevant terms of service carefully before use
- This tool is not guaranteed to work in all situations
- Microsoft may fix related technical issues at any time

## Changelog

- v1.0.0 - Initial release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Issues and Pull Requests are welcome to improve this project.

## Contact

For questions or suggestions, please contact us through GitHub Issues. 