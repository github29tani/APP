import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Text, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  SafeAreaView 
} from 'react-native';
import Svg, { Path, Defs, Pattern, Rect } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import PenToolbar from './PenToolbar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PenApp = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [opacity, setOpacity] = useState(1.0);
  const [penType, setPenType] = useState('normal');
  const [savedDrawings, setSavedDrawings] = useState([]);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#FFC0CB', '#A52A2A', '#808080'
  ];
  
  const strokeWidths = [1, 3, 5, 8, 12, 16];

  const getStrokeStyle = () => {
    let baseWidth = strokeWidth;
    let strokeColor = currentColor;
    let strokeOpacity = opacity;

    switch (selectedTool) {
      case 'brush':
        baseWidth = strokeWidth * 1.5;
        break;
      case 'highlighter':
        strokeOpacity = 0.4;
        break;
      case 'calligraphy':
        baseWidth = strokeWidth * 0.8;
        break;
      case 'eraser':
        strokeColor = '#FFFFFF';
        strokeOpacity = 1;
        break;
      default:
        break;
    }

    return {
      strokeWidth: baseWidth,
      stroke: strokeColor,
      strokeOpacity: strokeOpacity,
    };
  };

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
        const strokeStyle = getStrokeStyle();
        setPaths(prevPaths => [...prevPaths, {
          path: currentPath,
          ...strokeStyle,
          tool: selectedTool,
          penType: penType
        }]);
      }
      setCurrentPath('');
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    Alert.alert(
      "Clear Canvas",
      "Are you sure you want to clear the entire canvas?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => {
            setPaths([]);
            setCurrentPath('');
            setIsDrawing(false);
          }
        }
      ]
    );
  };

  const undoLastStroke = () => {
    setPaths(prevPaths => prevPaths.slice(0, -1));
  };

  const saveDrawing = () => {
    if (paths.length === 0) {
      Alert.alert("Nothing to Save", "Please draw something before saving.");
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newDrawing = {
      id: Date.now(),
      paths: [...paths],
      timestamp: timestamp,
      name: `Drawing ${savedDrawings.length + 1}`
    };

    setSavedDrawings(prev => [...prev, newDrawing]);
    Alert.alert("Saved!", `Drawing saved as "${newDrawing.name}"`);
  };

  const loadDrawing = (drawing) => {
    Alert.alert(
      "Load Drawing",
      `Load "${drawing.name}"? Current drawing will be lost.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Load", 
          onPress: () => {
            setPaths(drawing.paths);
            setCurrentPath('');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Digital Pen Studio</Text>
        
        {/* Pen Toolbar */}
        <PenToolbar
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
          opacity={opacity}
          onOpacityChange={setOpacity}
          penType={penType}
          onPenTypeChange={setPenType}
        />

        {/* Color Palette */}
        <View style={styles.colorPalette}>
          <Text style={styles.sectionTitle}>Colors:</Text>
          <View style={styles.colorGrid}>
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
              height={screenHeight * 0.4}
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
                  stroke={pathData.stroke}
                  strokeWidth={pathData.strokeWidth}
                  strokeOpacity={pathData.strokeOpacity}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              
              {/* Render current path being drawn */}
              {currentPath && (
                <Path
                  d={currentPath}
                  {...getStrokeStyle()}
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
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveDrawing}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearCanvas}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Saved Drawings */}
        {savedDrawings.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.sectionTitle}>Saved Drawings:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {savedDrawings.map((drawing) => (
                <TouchableOpacity
                  key={drawing.id}
                  style={styles.savedDrawing}
                  onPress={() => loadDrawing(drawing)}
                >
                  <Text style={styles.savedDrawingName}>{drawing.name}</Text>
                  <Text style={styles.savedDrawingTime}>{drawing.timestamp}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    textShadowColor: '#ccc',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 2,
  },
  selectedColor: {
    borderColor: '#333',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  strokeSection: {
    marginBottom: 15,
  },
  strokeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  strokeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedStroke: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  strokeText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  canvasContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  canvas: {
    backgroundColor: 'white',
    borderRadius: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  savedSection: {
    marginTop: 10,
  },
  savedDrawing: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  savedDrawingName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  savedDrawingTime: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
});

export default PenApp;