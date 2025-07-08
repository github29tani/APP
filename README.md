# Digital Pen Studio - React Native Drawing App

A feature-rich digital drawing application built with React Native and Expo, designed for creating beautiful pen drawings with various tools and styles.

## Features

### 🎨 Drawing Tools
- **Pen Tools**: Normal pen, brush, highlighter, eraser
- **Pen Types**: Normal, calligraphy, marker
- **Color Palette**: 12 vibrant colors to choose from
- **Stroke Width**: 6 different stroke sizes (1px to 16px)
- **Opacity Control**: Adjustable opacity for brush and highlighter tools

### 🎯 Advanced Features
- **Gesture Drawing**: Smooth drawing with pan gesture recognition
- **Undo/Redo**: Undo last stroke functionality
- **Save/Load**: Save drawings locally and load them later
- **Grid Background**: Professional grid canvas for precise drawing
- **Real-time Preview**: See your strokes as you draw

### 📱 User Experience
- **Modern UI**: Clean, intuitive interface with beautiful styling
- **Touch Optimized**: Designed for touch devices with responsive controls
- **Portrait Mode**: Optimized for portrait orientation
- **Safe Areas**: Proper handling of device safe areas

## Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- EAS CLI (for building APK)
- Android Studio (for local building) or Expo Go app

### Quick Start

1. **Clone the project and install dependencies:**
```bash
cd /path/to/digital-pen-studio
npm install --legacy-peer-deps
```

2. **Start the development server:**
```bash
npm start
```

3. **Run on Android:**
```bash
npm run android
```

### Dependencies
```json
{
  "expo": "^53.0.17",
  "react": "18.2.0",
  "react-native": "0.72.0",
  "react-native-gesture-handler": "~2.24.0",
  "react-native-svg": "^15.12.0",
  "react-native-safe-area-context": "5.4.0"
}
```

## Building APK

### Option 1: Using EAS Build (Recommended)

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Build APK:**
```bash
# For preview/testing
npm run build:android-preview

# For production
npm run build:android
```

### Option 2: Local Build

1. **Install Android Studio and set up Android SDK**

2. **Configure environment variables:**
```bash
export ANDROID_HOME=/path/to/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

3. **Build locally:**
```bash
npx expo run:android --variant release
```

## Project Structure

```
digital-pen-studio/
├── src/
│   └── components/
│       ├── PenApp.js          # Main app component
│       ├── PenCanvas.js       # Basic canvas component
│       └── PenToolbar.js      # Toolbar component
├── assets/                    # App icons and images
├── App.js                     # Entry point
├── app.json                   # Expo configuration
├── eas.json                   # EAS build configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## Configuration Files

### app.json
- App metadata and build configuration
- Android package: `com.pdlebhaii.digitalpen`
- Permissions for file storage

### eas.json
- Build profiles for development, preview, and production
- APK build configuration
- Auto-increment version management

## Usage

1. **Select a Tool**: Choose from pen, brush, highlighter, or eraser
2. **Pick a Color**: Tap on any color from the palette
3. **Adjust Stroke Width**: Select the desired stroke thickness
4. **Start Drawing**: Touch and drag to create your masterpiece
5. **Save Your Work**: Tap the Save button to store your drawing
6. **Load Previous Drawings**: Access saved drawings from the horizontal scroll view

## Troubleshooting

### Common Issues

**1. Dependency Conflicts:**
```bash
npm install --legacy-peer-deps
```

**2. Gesture Handler Issues:**
```bash
npx expo install react-native-gesture-handler
```

**3. SVG Rendering Problems:**
```bash
npx expo install react-native-svg
```

**4. Build Failures:**
- Clear Expo cache: `expo start --clear`
- Reset Metro cache: `npx expo start --clear`

### Build-Specific Issues

**EAS Build Authentication:**
- Ensure you're logged in: `eas login`
- Check project configuration: `eas build:configure`

**Local Android Build:**
- Verify Android SDK installation
- Check environment variables
- Ensure emulator/device is connected

## Performance Optimization

- **Efficient Path Rendering**: Uses optimized SVG paths for smooth drawing
- **Memory Management**: Proper cleanup of drawing paths
- **Gesture Optimization**: Debounced gesture handling for better performance

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Refer to [Expo documentation](https://docs.expo.dev/)

## Version History

- **v1.0.0**: Initial release with core drawing features
  - Basic pen tools and colors
  - Save/load functionality
  - Gesture-based drawing
  - Professional UI design

---

**Built with ❤️ using React Native and Expo**