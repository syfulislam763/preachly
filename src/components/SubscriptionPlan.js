import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PlanSelector = ({OtherPlan=null}) => {
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

      {OtherPlan&& OtherPlan()}

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
    borderWidth: 1,
    borderColor: '#B0CFCB',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal:15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width:'100%',
    
  },
  selectedPlan: {
    borderColor: '#005A55',
  },
  planTitle: {
    fontFamily:'NunitoSemiBold',
    fontSize: 16,
    color: '#0B1D26',
  },
  subText: {
    fontSize: 16,
    color: '#84B3B2',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceText: {
    fontSize: 18,
    fontFamily:"NunitoSemiBold",
    color: '#0B172A',
  },
  radioOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#46636A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#005F56',
    borderWidth: 1,
  },
  radioInner: {
    width: 23,
    height: 23,
    borderRadius: 23/2,
    backgroundColor: '#005A55',
  },
  badge: {
    position: 'absolute',
    right: 16,
    top: -10,
    backgroundColor: '#005A55',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: 'white',
    fontFamily:'NunitoSemiBold',
    fontSize:14
  },
});
