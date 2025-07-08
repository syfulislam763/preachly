
export const BASE_URL = "https://bibel-project.onrender.com"
export const URL_CATEGORY = "/api"
export const ROOT_URL = BASE_URL+URL_CATEGORY

//Authentication API
export const TOKEN_URL = "/auth/token/refresh/"

export const SIGNUP = "/auth/register/initiate/"
export const VERIFY_EMAIL = "/auth/verify-email/"
export const RESEND_OTP = "/auth/resend-otp/"
export const CHANGE_PASSWORD = "/auth/password/change/"
export const LOGIN = "/auth/login/"
export const CREATE_PASS = "/auth/register/complete/"
export const SOCIAL_LOGIN = "/auth/social-auth/"

//Onboarding API
export const ONBOARDING = "/onboarding"

export const JOURNEY_REASON = ONBOARDING+"/journey-reason/"
export const DENOMINATION = ONBOARDING+"/denomination/"
export const FAITH_GOAL = ONBOARDING+"/faith-goals/"
export const FAITH_PREFERENCE = ONBOARDING+"/faith-preference/"
export const BIBLE_VERSION = ONBOARDING+"/bible-version/"
export const BIBLE_FAMILIARITY = ONBOARDING+"/bible-familiarity/"
export const TONE_PREFERENCE = ONBOARDING+"/tone-preference/"
export const ONBOARDING_COMPLETE = ONBOARDING+"/complete/"
export const ONBOARDING_STATUS = ONBOARDING+"/status/"
export const ONBOARDING_OPTIONS = ONBOARDING+"/options/"

//Profile API
export const PROFILE_UPDATE = "/auth/profile/update/"