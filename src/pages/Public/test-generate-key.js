#!/usr/bin/env node
/**
 * Generate a valid encryption key for AES-256-GCM
 * This script generates a proper 32-byte key and displays it in hex format
 */
const crypto = require('crypto');

// Generate a proper 32-byte random key (256 bits)
const key = crypto.randomBytes(32);

// Convert to hex string for easy copying
const hexKey = key.toString('hex');

console.log('===== ENCRYPTION KEY =====');
console.log('Generated 32-byte key (hex):', hexKey);
console.log('\n===== USAGE IN YOUR CODE =====');
console.log(`const SECRET_KEY = '${hexKey}';`);
console.log('\n===== VERIFICATION =====');
console.log('Key length in bytes:', Buffer.from(hexKey, 'hex').length);

// Test key with a simple encryption to verify it works
try {
  const testData = 'Test encryption with this key';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(hexKey, 'hex'), iv);
  let encrypted = cipher.update(testData, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  console.log('\n✅ Key successfully tested with AES-256-GCM encryption');
} catch (error) {
  console.error('\n❌ Error testing key:', error.message);
}

