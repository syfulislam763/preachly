import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import {
  initPaymentSheet,
  presentPaymentSheet,
  retrieveSetupIntent,
} from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import { ROOT_URL } from '../../../../context/Paths';
import api from '../../../../context/api';

const headers = {
  Authorization: 'Bearer YOUR_LOGIN_TOKEN', // 🔁 Replace with actual auth token
  'Content-Type': 'application/json',
};

export default function createPlan() {
  const navigation = useNavigation();

  const [plans, setPlans] = useState([]);
  const [selectedPlanType, setSelectedPlanType] = useState('yearly');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [setupIntentId, setSetupIntentId] = useState(null);
  const [monthlyPlan, setMonthlyPlan] = useState(null);
  const [yearlyPlan, setYearlyPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  console.log("plans: ", plans);
  console.log("selected* ", selectedPlanType)

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/subscription/setup/check-plans/`);
      if (res.data.success) {
        const data = res.data.data;
        let month, year;
        const temp = [...data.plans]
        temp.forEach(item => {
            if(item.interval == "month"){
                month = item;
            }else{
                year = item;
            }
        })
        

        setPlans(data.plans);
        setMonthlyPlan(month);
        setYearlyPlan(year)
        if (data.plans.some((p) => p.plan_type === 'explorer_yearly')) {
          setSelectedPlanType('yearly');
        } else if (data.plans.length > 0) {
          setSelectedPlanType(
            data.plans[0].plan_type.includes('monthly') ? 'monthly' : 'yearly'
          );
        }
      } else {
        console.log('Error', 'Failed to load subscription plans');
      }
    } catch (err) {
      //Alert.alert('Error', 'Failed to fetch plans');
      console.error('Plans error:', JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const startFreeTrial = async (cb=(a)=>{}) => {
    const selectedPlan = plans.find((p) =>
      selectedPlanType === 'yearly'
        ? p.plan_type === 'explorer_yearly'
        : p.plan_type === 'explorer_monthly'
    );
    if (!selectedPlan || loading) return;

    setLoading(true);
    try {
      // 1. Check subscription status
      const status = await api.get(`/subscription/status/`);
      const active = status.data.data?.is_active || status.data.data?.is_trial_active;
      if (active) {
        cb("active");
        //navigation.replace('Congratulation');
        console.log("go congratulations page")
        return;
      }

      // 2. Create setup intent
      const setup = await api.post(`/subscription/payment/setup-intent/`, {});
      const secret = setup.data.data.client_secret;
      setClientSecret(secret);
      setSetupIntentId(setup.data.data.setup_intent_id);

      // 3. Init and present payment sheet
      const init = await initPaymentSheet({
        setupIntentClientSecret: secret,
        merchantDisplayName: 'Explorer Pro',
      });
      if (init.error) throw init.error;

      const present = await presentPaymentSheet();
      if (present.error) throw present.error;

      // 4. Retrieve setup intent for payment method ID
      const intent = await retrieveSetupIntent(secret);
      console.log(intent, "intent")
      const paymentMethodId = intent.setupIntent.paymentMethodId;
      if (!paymentMethodId) throw new Error('Payment method ID not found');

      // 5. Add payment method
      await api.post(
        `/subscription/payment/add-method/`,
        { payment_method_id: paymentMethodId }
      );

      await api.post(
        `/subscription/create/`,
        {
          plan_type: selectedPlan.plan_type,
          payment_method_id: paymentMethodId,
        }
      );
      cb("success")
      console.log('Success', 'Free trial started!');
      //navigation.replace('Congratulation');
    } catch (e) {
      console.error('Stripe error:', e);
      cb("error")
      if (e.message?.includes('canceled')) {
        console.log('Cancelled', 'Payment was cancelled');
      } else {
        console.log('Error', e.message || 'Payment failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    setSelectedPlanType,
    selectedPlanType,
    monthlyPlan,
    yearlyPlan,
    startFreeTrial
  }

}
