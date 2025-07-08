import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const PenToolbar = ({ 
  selectedTool, 
  onToolSelect, 
  opacity, 
  onOpacityChange,
  penType,
  onPenTypeChange 
}) => {
  const tools = [
    { id: 'pen', name: 'Pen', icon: '✏️' },
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'highlighter', name: 'Highlight', icon: '🖍️' },
    { id: 'eraser', name: 'Eraser', icon: '🧹' },
  ];

  const penTypes = [
    { id: 'normal', name: 'Normal' },
    { id: 'calligraphy', name: 'Calligraphy' },
    { id: 'marker', name: 'Marker' },
  ];

  const opacityLevels = [0.3, 0.5, 0.7, 1.0];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pen Tools</Text>
      
      {/* Tool Selection */}
      <View style={styles.toolsRow}>
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[
              styles.toolButton,
              selectedTool === tool.id && styles.selectedTool
            ]}
            onPress={() => onToolSelect(tool.id)}
          >
            <Text style={styles.toolIcon}>{tool.icon}</Text>
            <Text style={styles.toolName}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pen Type Selection */}
      {selectedTool === 'pen' && (
        <View style={styles.penTypeSection}>
          <Text style={styles.subTitle}>Pen Type:</Text>
          <View style={styles.penTypeRow}>
            {penTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.penTypeButton,
                  penType === type.id && styles.selectedPenType
                ]}
                onPress={() => onPenTypeChange(type.id)}
              >
                <Text style={styles.penTypeText}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Opacity Control */}
      {(selectedTool === 'highlighter' || selectedTool === 'brush') && (
        <View style={styles.opacitySection}>
          <Text style={styles.subTitle}>Opacity:</Text>
          <View style={styles.opacityRow}>
            {opacityLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.opacityButton,
                  opacity === level && styles.selectedOpacity
                ]}
                onPress={() => onOpacityChange(level)}
              >
                <Text style={styles.opacityText}>{Math.round(level * 100)}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  toolButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    minWidth: 60,
  },
  selectedTool: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  toolIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  toolName: {
    fontSize: 10,
    color: '#333',
    fontWeight: '500',
  },
  penTypeSection: {
    marginBottom: 15,
  },
  penTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  penTypeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedPenType: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  penTypeText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  opacitySection: {
    marginBottom: 10,
  },
  opacityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opacityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedOpacity: {
    backgroundColor: '#FF9500',
    borderColor: '#FF9500',
  },
  opacityText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default PenToolbar;