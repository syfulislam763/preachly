import { ONBOARDING_COMPLETE, BIBLE_FAMILIARITY, BIBLE_VERSION, DENOMINATION, FAITH_GOAL, JOURNEY_REASON, TONE_PREFERENCE, ONBOARDING_STATUS, ONBOARDING_OPTIONS } from "../../context/Paths";

import api from "../../context/api";


export const journey_reason = async (payload, cb) => {
  try {
    //console.log("Journey Reason headers: ", api.defaults.headers);
    const response = await api.post(JOURNEY_REASON, payload);
    cb(response.data, true);
  
  } catch (error) {
    cb(error, false);
  }
}

export const bible_familiarity = async (payload, cb) => {
  try {
    const response = await api.post(BIBLE_FAMILIARITY, payload);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const bible_version = async (payload, cb) => {
  try {
    const response = await api.post(BIBLE_VERSION, payload);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const denomination = async (payload, cb) => {
  try {
    const response = await api.post(DENOMINATION, payload);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const faith_goal = async (payload, cb) => {
  try {
    const response = await api.post(FAITH_GOAL, payload);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const tone_preference = async (payload, cb) => {
  try {
    const response = await api.post(TONE_PREFERENCE, payload);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}   

export const onboarding_complete = async (cb) => {
  try {
    const response = await api.post(ONBOARDING_COMPLETE);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const onboarding_status = async (access,cb) => {
  try {
    const response = await api.get(ONBOARDING_STATUS, {
      headers: {
        Authorization: `Bearer ${access}`
      },
      });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}
export const onboarding_options = async (cb) => {
  try {
    const response = await api.get(ONBOARDING_OPTIONS);
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}
