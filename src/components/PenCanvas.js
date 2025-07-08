import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, Pattern, Rect } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PenCanvas = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const strokeWidths = [1, 3, 5, 8, 12];

  const onGestureEvent = (event) => {
    const { x, y } = event.nativeEvent;
    
    if (event.nativeEvent.state === State.BEGAN) {
      setIsDrawing(true);
      const newPath = `M${x},${y}`;
      setCurrentPath(newPath);
    } else if (event.nativeEvent.state === State.ACTIVE && isDrawing) {
      const newPath = currentPath + ` L${x},${y}`;
      setCurrentPath(newPath);
    } else if (event.nativeEvent.state === State.END) {
      if (currentPath) {
        setPaths(prevPaths => [...prevPaths, {
          path: currentPath,
          color: currentColor,
          strokeWidth: strokeWidth
        }]);
      }
      setCurrentPath('');
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath('');
    setIsDrawing(false);
  };

  const undoLastStroke = () => {
    setPaths(prevPaths => prevPaths.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pen Drawing Canvas</Text>
      
      {/* Color Palette */}
      <View style={styles.colorPalette}>
        <Text style={styles.sectionTitle}>Colors:</Text>
        <View style={styles.colorRow}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                currentColor === color && styles.selectedColor
              ]}
              onPress={() => setCurrentColor(color)}
            />
          ))}
        </View>
      </View>

      {/* Stroke Width Selection */}
      <View style={styles.strokeSection}>
        <Text style={styles.sectionTitle}>Stroke Width:</Text>
        <View style={styles.strokeRow}>
          {strokeWidths.map((width) => (
            <TouchableOpacity
              key={width}
              style={[
                styles.strokeButton,
                strokeWidth === width && styles.selectedStroke
              ]}
              onPress={() => setStrokeWidth(width)}
            >
              <Text style={styles.strokeText}>{width}px</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Drawing Canvas */}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.canvasContainer}>
          <Svg
            height={screenHeight * 0.5}
            width={screenWidth - 40}
            style={styles.canvas}
          >
            <Defs>
              <Pattern
                id="grid"
                patternUnits="userSpaceOnUse"
                width="20"
                height="20"
              >
                <Rect width="20" height="20" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="0.5" />
              </Pattern>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Render completed paths */}
            {paths.map((pathData, index) => (
              <Path
                key={index}
                d={pathData.path}
                stroke={pathData.color}
                strokeWidth={pathData.strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            
            {/* Render current path being drawn */}
            {currentPath && (
              <Path
                d={currentPath}
                stroke={currentColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </PanGestureHandler>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={undoLastStroke}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearCanvas}>
          <Text style={[styles.buttonText, styles.clearButtonText]}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  colorPalette: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedColor: {
    borderColor: '#333',
    borderWidth: 3,
  },
  strokeSection: {
    marginBottom: 15,
  },
  strokeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  strokeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedStroke: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  strokeText: {
    fontSize: 12,
    color: '#333',
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  canvas: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButtonText: {
    color: 'white',
  },
});

export default PenCanvas;