import { ONBOARDING_COMPLETE, BIBLE_FAMILIARITY, BIBLE_VERSION, DENOMINATION, FAITH_GOAL, JOURNEY_REASON, TONE_PREFERENCE } from "../../context/Paths";

import axios from "axios";


export const journey_reason = async (payload, token, cb) => {
  try {
    const response = await axios.post(JOURNEY_REASON, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);
  
  } catch (error) {
    cb(error, false);
  }
}

export const bible_familiarity = async (payload, token, cb) => {
  try {
    const response = await axios.post(BIBLE_FAMILIARITY, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const bible_version = async (payload, token, cb) => {
  try {
    const response = await axios.post(BIBLE_VERSION, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const denomination = async (payload, token, cb) => {
  try {
    const response = await axios.post(DENOMINATION, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const faith_goal = async (payload, token, cb) => {
  try {
    const response = await axios.post(FAITH_GOAL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}

export const tone_preference = async (payload, token, cb) => {
  try {
    const response = await axios.post(TONE_PREFERENCE, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}   

export const onboarding_complete = async (payload, token, cb) => {
  try {
    const response = await axios.post(ONBOARDING_COMPLETE, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cb(response.data, true);

  } catch (error) {
    cb(error, false);
  }
}
