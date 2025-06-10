# Security Notice

🌐 **Language / 语言**: [English](SECURITY_EN.md) | [中文简体](SECURITY.md)

## Responsible Disclosure

### Vulnerability Report

The technical issues addressed by this project have been reported to relevant security teams following responsible disclosure principles:

- **Report Time**: March 3, 2025, 17:16 (UTC+8)
- **Report Target**: Microsoft Security Response Center (MSRC)
- **Case Number**: VULN-149047
- **Status**: Submitted, awaiting response

### Disclosure Timeline

1. **March 3, 2025**: Technical issue discovered
2. **March 3, 2025**: Detailed report submitted to MSRC
3. **March X, 2025**: Awaiting Microsoft response and fix
4. **Project Release**: Public solution after reasonable waiting period

## Technical Issue Description

### Affected Scope

**Affected Service**: Xbox Store (Nigeria Market)
**Issue Type**: Shopping cart functionality anomaly
**Severity**: Medium (affects user experience, but no sensitive data exposure)

### Technical Details

Main manifestations of the issue:

1. **Inconsistent Market Identifiers**: Different API calls use different market codes
2. **Session Management Anomalies**: Cart ID transmission failures between requests
3. **Regional Validation Logic Errors**: Some regional users cannot complete purchases normally

These issues prevent Nigeria region users from normally using Xbox Store shopping cart functionality.

## Security Considerations

### Tool Security

#### 1. Data Processing
- **Local Processing**: All data modifications occur on client devices
- **No Data Collection**: Tool does not collect or transmit any user data
- **Temporary Storage**: Only temporarily stores necessary session identifiers

#### 2. Network Security
- **HTTPS Encryption**: All communications maintain original encryption
- **Certificate Verification**: Maintains original SSL/TLS security mechanisms
- **Domain Restriction**: Only effective for specific Microsoft domains

#### 3. Privilege Minimization
- **Precise Matching**: Only intercepts specific API requests
- **Read-Only Access**: Most operations are read-only analysis
- **Graceful Degradation**: Script failures don't affect normal functionality

### Potential Risks

#### 1. MITM Risk
**Risk**: Man-in-the-middle interception could be maliciously exploited

**Mitigation**:
- Use trusted proxy tools
- Regularly update certificates
- Use only in trusted network environments

#### 2. Script Integrity
**Risk**: Remote scripts could be tampered with

**Mitigation**:
- Use official GitHub Raw links
- Regularly check script content
- Consider using local script files

#### 3. Terms of Service
**Risk**: May violate Microsoft Terms of Service

**Mitigation**:
- Use only to resolve technical issues
- Not for malicious purposes
- Follow local laws and regulations

## Usage Recommendations

### Security Best Practices

1. **Environment Isolation**
   - Verify tool in test environment
   - Avoid long-term use in production environment
   - Use dedicated devices or virtual environments

2. **Certificate Management**
   - Regularly update MITM certificates
   - Use strong passwords to protect private keys
   - Promptly revoke expired certificates

3. **Access Control**
   - Limit tool usage permissions
   - Avoid use on public networks
   - Regularly review configuration settings

4. **Monitoring and Auditing**
   - Monitor network traffic anomalies
   - Record tool usage logs
   - Regularly check security status

### Not Recommended Usage Scenarios

❌ **Enterprise Production Environment**: May violate enterprise security policies
❌ **Public Networks**: Security risks exist
❌ **Commercial Use**: May involve legal issues
❌ **Automated Scripts**: Avoid large-scale automated use

## Legal Declaration

### Disclaimer

1. **Educational Purpose**: This tool is for educational and research purposes only
2. **Risk Assumption**: Users assume all risks of use
3. **Compliance Responsibility**: Users must ensure compliance with local laws
4. **Terms of Service**: Users must comply with Microsoft Terms of Service

### Applicable Laws

Use of this tool must comply with the following laws and regulations:

- Cybersecurity Law of the People's Republic of China
- Relevant international cybersecurity laws
- Microsoft Terms of Service and Privacy Policy
- Local consumer protection laws

---

**Last Updated**: March 3, 2025
**Document Version**: v1.0.0 