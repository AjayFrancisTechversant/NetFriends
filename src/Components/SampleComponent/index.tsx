import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
} from 'react-native';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Item {
  id: number;
  title: string;
  content: string;
}

const items: Item[] = [
  { id: 1, title: 'Item 1', content: 'This is the content for Item 1.' },
  { id: 2, title: 'Item 2', content: 'This is the content for Item 2.' },
  { id: 3, title: 'Item 3', content: 'This is the content for Item 3.' },
];

const AnimatedList: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleExpand(item.id)}
          >
            <Text style={styles.headerText}>{item.title}</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.contentContainer,
              expandedItem === item.id ? styles.expanded : styles.collapsed,
            ]}
          >
            <Text style={styles.contentText}>{item.content}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    padding: 15,
    backgroundColor: '#007bff',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  contentContainer: {
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
  },
  expanded: {
    height: 'auto',
    padding: 15,
  },
  collapsed: {
    height: 0,
    padding: 0,
  },
  contentText: {
    fontSize: 16,
  },
});

export default AnimatedList;
