import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <View>
      {/* Monthly Plan */}
      <TouchableOpacity
        style={[
          styles.planContainer,
          selectedPlan === 'monthly' && styles.selectedPlan,
        ]}
        onPress={() => setSelectedPlan('monthly')}
      >
        <View>
          <Text style={styles.planTitle}>Monthly Plan</Text>
          <Text style={styles.subText}>7-Day Free Trial</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.priceText}>$11.99 / Month</Text>
          <View style={[styles.radioOuter, selectedPlan === 'monthly' && styles.radioOuterSelected]}>
            {selectedPlan === 'monthly' && <View style={styles.radioInner} />}
          </View>
        </View>
      </TouchableOpacity>

      {/* Annual Plan */}
      <TouchableOpacity
        style={[
          styles.planContainer,
          selectedPlan === 'annual' && styles.selectedPlan,
        ]}
        onPress={() => setSelectedPlan('annual')}
      >
        <View>
          <Text style={styles.planTitle}>Annual Plan</Text>
          <Text style={styles.subText}>7-Day Free Trial</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.priceText}>$79.99 / Year</Text>
          <View style={[styles.radioOuter, selectedPlan === 'annual' && styles.radioOuterSelected]}>
            {selectedPlan === 'annual' && <View style={styles.radioInner} />}
          </View>
        </View>

        {/* Save Badge */}
        {selectedPlan !== 'annual' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Save 44%</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PlanSelector;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  planContainer: {
    borderWidth: 1.5,
    borderColor: '#B0CFCB',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width:'100%'
  },
  selectedPlan: {
    borderColor: '#005F56',
  },
  planTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#0B1D26',
  },
  subText: {
    fontSize: 13,
    color: '#84B3B2',
    marginTop: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1D26',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#46636A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#005F56',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#005F56',
  },
  badge: {
    position: 'absolute',
    right: 16,
    top: -10,
    backgroundColor: '#005F56',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
});
