#!/bin/bash

# Digital Pen Studio APK Build Script
# This script helps build the APK for the pen components app

echo "🎨 Digital Pen Studio APK Builder"
echo "=================================="

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if user is logged in to Expo
echo "🔐 Checking Expo authentication..."
if ! eas whoami &> /dev/null; then
    echo "⚠️  You need to log in to Expo to build the APK."
    echo "Please run: eas login"
    echo "Then run this script again."
    exit 1
fi

# Display build options
echo ""
echo "📱 Build Options:"
echo "1. Preview APK (for testing)"
echo "2. Production APK"
echo "3. Development build"
echo ""

read -p "Choose build type (1-3): " choice

case $choice in
    1)
        echo "🚀 Building Preview APK..."
        eas build --platform android --profile preview
        ;;
    2)
        echo "🚀 Building Production APK..."
        eas build --platform android --profile production
        ;;
    3)
        echo "🚀 Building Development build..."
        eas build --platform android --profile development
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Build process started!"
echo "📱 You can monitor the build progress at: https://expo.dev/accounts/[your-username]/projects/digital-pen-studio/builds"
echo ""
echo "💡 Tips:"
echo "   - The build will take 10-20 minutes to complete"
echo "   - You'll receive an email when it's ready"
echo "   - Download the APK from the Expo dashboard"