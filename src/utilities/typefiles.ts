import type { CSSProperties, ReactNode } from "react";

export type buttonTypes = "button" | "submit" | "reset";

export type ButtonAttributes = {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: buttonTypes;
  isDisable?: boolean;
  isBorder?: boolean;
  icon?: string;
  iconClassName?: string;
};

export type TextAttributes = {
  type: titleTextTypeAttributes | textTypeAttributes;
  text: string;
  className?: string;
  url?: string;
  isHover?: boolean;
  onClick?: () => void;
};

export type titleTextTypeAttributes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type textTypeAttributes = "p" | "del" | "i";

export interface layoutAttributes {
  children: ReactNode;
  title: pageTitleAttributes;
  slug?: string;
  description?: string;
  btnFunction?: () => void;
  btnText?: string;
}

export type pageTitleAttributes =
  | "Login"
  | "Dashboard User"
  | "Dashboard Demo"
  | "Register"
  | "Onboarding"
  | "Settings"
  | "Home"
  | "Admin Dashboard"
  | "Landing Page"

export interface isNotificationPopAttributes {
  isTimer?: boolean;
  timer?: number | string;
  notificationState?: boolean;
  notificationText: string;
  bgColour?: string;
  textColour?: string;
  isNavigation?: boolean;
  isURL?: boolean;
  URL?: string;
  isRevalidate?: boolean;
  isRevaliddateURL?: string[];
  showCancelButton?: boolean;
  statusCode?: number | null;
  event?: notificationButtonEvents;
  icon?: string;
}

export type notificationButtonEvents = "ok" | "cancel" | "";
export interface closeComponentAttributes {
  onClick: Function;
  className?: string;
}

export interface ShareSocialAttribute {
  url: string;
  title: string;
  hashtags?: string[];
  emailBody?: string;
  styleProperties?: SocialShareStyleProperties;
  popUp: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEmail: boolean;
  className?: string;
}

export interface SocialShareStyleProperties {
  width?: string;
  height?: string;
  paddingX?: string;
  marginX?: string;
  socialShareFontSize?: number;
  displayStyle?: string;
  displayDirection?: "flex-col" | "flex-row";
}

export type userRoleAttributes =
  | "super_user_mit"
  | "dev_user_mit"
  | "admin_mit"
  | "support_agent_mit"
  | "customer_mit"
  | "guess_mit";

export interface notificationInitialState {
  notification: isNotificationPopAttributes;
}

export type notificationActionAttributes = {
  type: "SET_NOTIFICATION";
  payload: isNotificationPopAttributes;
};
export interface notificationContextAttributes {
  notificationState: notificationInitialState;
  notificationDispatch: React.Dispatch<notificationActionAttributes>;
}
export interface reactChildrenNodeAttributes {
  children: ReactNode;
}
export interface UserInitialStateAttributes {
  user: userAttributes | null;
  token: string;
  isServerAlive: boolean | null; // null = checking, true = alive, false = dead
  isRefreshTokenResponseState: string;
  globalError: { errorState: boolean; errorMessage: string };
}

export interface userAttributes {
  _id?: string;
  fullName?: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  phoneNumber: string;
  provider?: authProviderAttributes;
  picture?: string;
  picturePublicId?: string;
  subscriptionPlan?: subscriptionAttributes;
  isOTPVerified?: boolean;
  isRestricted?: boolean;
  role?: userRoleAttributes;
  isActivated?: boolean;
  isAggreedTermsAndCondition: boolean;
  isMITAffiliate: boolean;
  mitAffiliateID: string;
  userRoleBasedAccessSytem?: UserRoleBasedAccess;
  isWithDefaultPassword?: string;
  userActivityLog?: orderActivityLog[];
  address?: string;
}

export type UserRoleBasedAccess = {
  isAccess: UserRoleAccessAttributes;
  isPermission: UserPermissionAttributes;
  isNotification: userNotificationObjectAccessAttributes;
};

export interface userNotificationObjectAccessAttributes {
  isEnabled: boolean;
  access: UserNotificationAccessAttributes;
}

export type UserRoleAccessAttributes = {
  tierPlans: boolean;
  users: boolean;
  email: boolean;
  points: boolean;
};

export type UserPermissionAttributes = {
  readWriteTierPlans: boolean;
  readWriteUsers: boolean;
  readWriteEmail: boolean;
  readWritePoint: boolean;
};

export type UserNotificationAccessAttributes = {
  tierPlans: boolean;
  users: boolean;
  email: boolean;
  points: boolean;
};

export interface RegisterFieldAttributes {
  field: registeruserAttributes;
  name: registerationNameAttributes;
  placeHolder: string;
}

export type RegisterUserComponetStateAttributes = {
  regUser: RegUserDataAttributes;
};

export type RegUserDataAttributes = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  isAggreed: boolean;
  isMITAffiliate: boolean;
  mitAffiliateID: string;
  phoneNumber: string;
};

export type LoginComponentStateAttributes = {
  logInData: LoginDataAttributes;
};

export type LoginDataAttributes = Array<{
  email: string;
  password: string;
  label: string;
  placeholder: string;
  icon: string;
}>;

export type registerationNameAttributes =
  | "email"
  | "password"
  | "phoneNumber"
  | "firstName"
  | "lastName";

export type registeruserAttributes =
  | "Create Password"
  | "Email Address"
  | "Phone Number"
  | "First Name"
  | "Last Name";

export type authProviderAttributes = "google" | "local";

export type subscriptionAttributes = {
  _id?: string;
  userId: string;
  subscriptionPlanId: string;
  billingCycle: billingCircleAttributes;
  nextBillingDate: string;
  totalPoints: string;
  createdAt?: string | Date;
  activityLog?: orderActivityLog[];
  paymentDetailsLog?: paymentDetailsAttributes[];
  subscriptionAction: SubcriptionFutureActionAttributes; //stores future upgrade the user made
  isAutoRenew?: boolean;
  billingReqAction?: billingReqActionAttributes[];
  lastBilledDate: string;
  nextBillingReqId: string;
  status: SubscriptionStatusAttributes;
  paymentProvider?: paymentProviderAttributes;
};

export type transactionPaymentStatusAttributes =
  | "pending"
  | "paid"
  | "cancelled"
  | "inactive"
  | "failed";

export type billingReqActionAttributes = {
  billingReqId: string;
  dueDate: string | null;
  hasRequestSent: boolean;
  billingStatus: transactionPaymentStatusAttributes;
  attemptDate?: string | null;
  amount?: string;
  billingCycle: billingCircleAttributes;
  subscriptionPlanId: string;
};
export type subscriptionActionEventAttributes =
  | "cancel"
  | "upgrade"
  | "downgrade"
  | "retain"
  | null;

export type SubcriptionFutureActionAttributes = {
  subscriptionPlanId: string;
  subscriptionUserActionType: subscriptionActionEventAttributes;
  isActive: boolean;
  executeAt: string | null;
  billingCycle: billingCircleAttributes | "";
  isPaid: boolean;
};

export type billingMethodAttributes = "monthly";

export interface Tier {
  _id?: string;
  name: string;
  monthlyFee: string; // stored as string
  pointsPerMonth: string; // stored as string
  newMemberBonus?: SubscriptionToggleOptionAttributes;
  loyaltyBonus?: SubscriptionToggleOptionAttributes;
  birthdayBonus?: SubscriptionToggleOptionAttributes;
  perks: string[];
  tangibleGiftsFrequency?: TangibleGiftAttributes;
  redeemableAfterDays: durationMonthAttributes; // stored as string
  referralBonus?: SubscriptionToggleOptionAttributes;
  isActive: boolean;
  dateCreated?: string;
  domesticFlightComplimentary?: SubscriptionToggleOptionAttributes;
  createdBy?: string;
  updatedAt?: string;
}

export type OptionObject = { label: string; value: string };
export type OptionType = string | OptionObject;

export interface DropDownComponentProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (option: customInputOnchangeDataAttributes) => void;
  placeholder?: string;
  labelRenderer?: (opt: OptionObject) => ReactNode;
  name?: unknown;
  disabled?: boolean;
}

export type domesticFlightComplimentaryAttributes = {
  value: string;
  type: SubscriptionToggleTypeAttributes;
};

export type TangibleGiftAttributes = {
  frequency: tangibleGiftsFrequencyAttributes;
};

export type tangibleGiftsFrequencyAttributes =
  | "none"
  | "bi-annually"
  | "annually ";

export type SubscriptionToggleOptionAttributes = {
  isActive: boolean;
  reward: string; // must be a string number
  durationCondition: durationMonthAttributes;
  type: SubscriptionToggleTypeAttributes;
};

export type SubscriptionToggleTypeAttributes = "point" | "money";
export type durationMonthAttributes =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "0";

export interface globalErrorAttribute {
  errorState: false;
  errorMessage: "";
}

export type UserActionAttributes =
  | {
      type: "SET_USER";
      payload: userAttributes;
    }
  | {
      type: "SET_TOKEN";
      payload: string;
    }
  | {
      type: "SET_SERVER_STATE_ON";
    }
  | {
      type: "CLEAR_SERVER_STATE_OFF";
    }
  | {
      type: "SET_REFRESH_TOKEN_RESPONSE";
      payload: string;
    }
  | { type: "SET_GLOBALERROR"; payload: globalErrorAttribute }
  | { type: "CLEAR_GLOBALERROR" }
  | {
      type: "LOG_OUT";
    };
export interface UserContextAttributes {
  userState: UserInitialStateAttributes;
  userDispatch: React.Dispatch<UserActionAttributes>;
}

export type themeAttributes = "dark" | "light";

export interface settingInitialStateAttributes {
  isSideBar: boolean;
  isTheme?: themeAttributes;
  isLoading?: boolean;
}

export interface PaymentProviderIntialStateAttributes {
  stripeClientSecret: string;
}

export type settingActionAttributes =
  | { type: "SET_TOGGLE_SIDEBAR" }
  | { type: "SET_THEME"; payload: themeAttributes }
  | { type: "SET_ISLOADING_STARTS" }
  | { type: "SET_ISLOADING_ENDS" };

export type paymentProviderActionAttributes = {
  type: "SET_STRIPE_CLIENT_SECRET";
  payload: string;
};

export interface settingContextAttributes {
  settingsState: settingInitialStateAttributes;
  settingDispatch: React.Dispatch<settingActionAttributes>;
}

export interface PaymentProviderContextAttributes {
  paymentProviderState: PaymentProviderIntialStateAttributes;
  paymentProviderDispatch: React.Dispatch<paymentProviderActionAttributes>;
}

export type inputTypeAttributes =
  | "text"
  | "number"
  | "email"
  | "password"
  | "checkbox"
  | "radio";
export interface inputAttributes {
  type: inputTypeAttributes;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  className?: string;
  name: string;
  isDisable?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  onChange?: (data: customInputOnchangeDataAttributes) => void;
  customData?: unknown;
  value?: string | number | readonly string[] | undefined;
  isCheckedState?: boolean;
  onKeyDown?: (data: React.KeyboardEvent<HTMLInputElement>) => void;
  checked?: boolean;
}
export interface customInputOnchangeDataAttributes {
  value: string | boolean;
  payload: unknown;
  name?: unknown;
}
export interface textAreaAttributes {
  onChange?: (data: customInputOnchangeDataAttributes) => void;
  customData?: unknown;
  className?: string;
  placeHolder?: string;
  value?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  name?: string;
}

export interface nonBTNModalAttributes {
  modalState: boolean;
  children: ReactNode;
  modalText: string;
  className?: string;
  zIndex?: string;
  disableOutSideBoxClose: boolean;
  closeModalCustomFunc?: Function;
  closeButtonClassName?: string;
  hederTextClassName?: string;
  headerDivClassName?: string;
  isHideCloseBTN?: boolean;
  containerClassName?: string;
}

export type HeaderMenuAttributes = {
  menuName: menuNameAttributes;
  slug: menuSlugAttributes;
  link: string;
};

export type menuNameAttributes =
  | "Home"
  | "Dashboard"
  | "About Us"
  | "Pricing"
  | "Contact"
  | "Login"
  | "Sign Up"
  | "Report"
  | "Setting"
  | "My Account"
  | "Profile"
  | "Manage Point"
  | "Manage User"
  | "Manage Trip"
  | "Subscription"
  | "Admin Users"
  | "Email"
  | "Log Out"
  | "Trips";
export type menuSlugAttributes =
  | "home"
  | "dashboard"
  | "pricing"
  | "contact"
  | "login"
  | "signup"
  | "about"
  | "report"
  | "setting"
  | "profile"
  | "account"
  | "pointManagement"
  | "tripManagement"
  | "subscription"
  | "adminUsers"
  | "email"
  | "userManagement"
  | "logout"
  | "trips";

export interface FAQuestionsAttributes {
  FAQ: string;
  answer: string;
  _id: string;
}

export interface AccordionAttributes {
  data: FAQuestionsAttributes[];
  onClick?: (arg: { faqId: string }) => void;
  userRole: userRoleAttributes;
}
export type objectFitAttributes =
  | "fill"
  | "contain"
  | "cover"
  | "none"
  | "scale-down";
export interface formUIAttributes {
  children?: ReactNode;
  title?: string;
  onSubmit: Function;
  className?: string;
}
export interface SWRPropsAttributes {
  cacheKey: string | null;
  apiEndPoint?: string;
  reqFucn?: any;
  httpMethod?: "get" | "post" | "patch" | "delete";
  isConditional?: boolean;
  conditionalStatement?: boolean;
  payload?: any;
  shouldRetryOnError?: boolean;
  revalidateOnFocus?: boolean;
}

export interface clientResponse {
  statusCode?: successStatusCodes;
  message?: string;
  status: boolean;
  payload?: unknown;
}

export type successStatusCodes = 200 | 201 | 500 | number;

export interface globalHTTPReqFuncAttributes {
  apiEndPoint: string;
  httpMethod: "post" | "get" | "patch" | "delete";
  reqData?: unknown;
  isSuccessNotification: isNotificationPopAttributes;
  timerDuration?: number;
  responseType?: httpResponseTypeAttrbutes;
  contypeType?: "multipart/form-data" | "application/json";
  buttonLoadingSetter?: (loading: boolean) => void;
}
export type httpResponseTypeAttrbutes =
  | "arraybuffer"
  | "blob"
  | "document"
  | "formdata"
  | "stream"
  | "json"
  | "text";

export type OnboardingScreenNameAttributes =
  | "welcome"
  | "plans"
  | "payment"
  | "confirm"
  | "thankyou";
export type OboardingComponentsScreenNamesAttributes = {
  screenName: OnboardingScreenNameAttributes;
  onClick: (data: { screenName: OnboardingScreenNameAttributes }) => void;
};
export type onboardingScreenEventAttributes = "goback" | "goforward";

export interface StepItem {
  id: string;
  label: string;
}

export interface LoginField {
  name: string;
  type: string;
  placeholder: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  pointsPerMonth: number;
  pointsPerYear: number;
  expirationMonths: number;
  bonus?: string;
  mostPopular?: boolean;
}

export interface CreditCardFormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  group: "full" | "half";
}

export interface searchUIAttributes {
  onChange: Function;
  className?: string;
  isReadOnly?: boolean;
  onClick?: Function;
  reDirectURLFucn?: Function;
  placeHolder?: string;
}

export interface dropDownSearchAttributes<T = string> {
  onClick: (payload: { item: T; index: number }) => void;
  data: string[];
  icon?: string;
  initialState?: string;
}
export type dropDownOnClickFuncAttributes = {
  item: string;
  index?: number | string;
};

export interface draywerAttributes {
  children: ReactNode;
  className?: string;
  drawerState: drawerStateAttributes;
  setDrawerState: React.Dispatch<React.SetStateAction<drawerStateAttributes>>;
  isFullDarkBG?: boolean;
}

export interface drawerStateAttributes {
  isOpen: boolean;
  placement: "left" | "right" | "top" | "bottom";
}

export interface subscriptionPlansResponseAttributes {
  headerData: SubscriptionPlansHeaderResponseAttributes[];
  planTable: SubscriptionTablePlanAttributes[];
}

export type SubscriptionPlansHeaderResponseAttributes = {
  title: string;
  value: string;
};

export type SubscriptionTablePlanAttributes = {
  planName: string;
  price: string;
  points: string;
  subscribers: string;
  _id?: string;
};

export type ClientTierPlanResponse = {
  tierPlans: customTierAttributes[];
  isAccess: boolean;
  stats: clientResponseDataStasAttributes[];
};
export type clientResponseDataStasAttributes = {
  title: string;
  value: string;
  slug?: string;
};

export interface customTierAttributes extends Tier {
  subscribers?: string;
  totalActiveSubscribers?: string;
  totalAmount?: string;
}

export type applicationActionEvent = "readOnly" | "writeOnly";

export type TripDataAttributes = {
  tripName: string;
  startDate: string;
  image: string;
  endDate: string;
  totalParticipants: string;
  totalUsedPoints: string;
  destination: string;
  totalEarning: string;
  maxGroupSize: string;
  isSoldOut: boolean;
  _id?: string;
  pointUsedActivityLogs?: orderActivityLog[];
  tripImage?: string;
  organizer?: string;
  participantSum?: string;
  orderTotalSum?: string;
  orderTotalAmountPaid?: string;
  tripId: string;
};

export interface orderActivityLog {
  logMessage: string;
  logDate: string;
  _id?: string;
}

export interface TripsResponseDataAttributes {
  trips: TripDataAttributes[];
  isAccess: boolean;
  stats: clientResponseDataStasAttributes[];
}

export interface PaginationProps {
  pageNumber: number;
  setPageNumber: (value: number) => void;
  totalPages: number;
  className?: string;
}

export interface PointsAdminSummary {
  label: string;
  value: string;
  change?: string;
  color?: string;
}

export interface PointsSummary {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface UsersData {
  name: {
    userName: string;
    id: string;
    userImg: string;
  };
  joinDate: string;
  lastLogin: string;
  contact: {
    email: string;
    phone: string;
  };
  subscription: string;
  expiryDate: string;
  pointsBalance: {
    points: string;
    pointsExpiry: string;
  };
  status: string;
  lastPayment: string;
}

export interface AdminUsersData {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface EmailCampaignTable {
  name: {
    campaignName: string;
    campaignStat: string;
  };
  type: string;
  status: string;
  performance: string;
}

export interface LineChartProps {
  data: { [key: string]: string | number }[];
  lines: { dataKey: string; color: string; name?: string }[];
  xKey: string;
  height?: number | string; // allow both px numbers and percentages
}

export type PieData = {
  name: string;
  value: number;
  color: string;
  label?: string;
};

export type PieChartProps = {
  data: PieData[];
  height?: number;
};

export type BarChartProps = {
  data: { value: number; color: string };
  height?: number;
  style?: CSSProperties;
  className?: string;
};

export interface UsersResponseDataAttributes {
  users: UsersResponseTableAttributes[];
  isAccess: boolean;
  stats: clientResponseDataStasAttributes[];
  pagination?: {
    totalDocumentSize?: number;
    totalPageSize: number;
  };
}

export type UsersResponseTableAttributes = {
  picture: string;
  name: string;
  joinedDate: string;
  userType: userRoleAttributes;
  totalPoint: string;
  expiredPoint: string;
  lastPayment: string;
  address: string;
  lastLogin: string;
  subsriptionPlan: string;
  monthlyFee: string;
  nextBillingDate: string;
  totalSpent: string;
  pointActivityLog: orderActivityLog[];
  userActivityLog: orderActivityLog[];
  emailHistry: orderActivityLog[];
  phoneNumber: string;
  email: string;
  isAffiliate?: boolean;
  firstName?: string;
  lastName?: string;
  _id?: string;
  mitAffiliateID: string;
};

export type userEditDataAttributes = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password?: string;
  isAffiliate: boolean;
  phoneNumber: string;
  mitAffiliateID: string;
  address: string;
  _id?: string;
};

export interface adminManageUserStateAttributes {
  modalState: boolean;
  userDetails: UsersResponseTableAttributes | null;
  eventType: applicationActionEvent;
  addUserModalState?: boolean;
}

export type userEditDataFieldAttributes = {
  key: string;
  label: string;
  type: inputTypeAttributes;
  placeholder: string;
};

export type OnboardingComponentStateAttributes = {
  selectedPlanId: string;
  billingCycle: billingMethodAttributes;
  userId: string;
  paymentProvider?: paymentProviderAttributes;
  tierPlan: Tier | undefined;
  eventType?: stripeMetaDataEventTypeAttributes;
};

export type paymentProviderAttributes = "stripe" | "paypal" | "";

export interface onboardingSubComponentsAttributes {
  onboardingComponentState: OnboardingComponentStateAttributes;
  setOnboardingComponentState: React.Dispatch<
    React.SetStateAction<OnboardingComponentStateAttributes>
  >;
  customFunc?: () => void;
}

export type StripePaymentAttributes = {
  eventType: stripeMetaDataEventTypeAttributes;
  userSubscriptionId: string;
  customFunction?: () => void;
  userId: string;
  reqAction?: reqActionPaymentAttributes;
};

export type stripeMetaDataEventTypeAttributes =
  | "add_payment_registeration_event"
  | "add_payment_inApp_event"
  | "add_payment_renewal_event"
  | "payment_retry"
  | "add_card_event"
  | "";

export type addDateAttributes = {
  actionType: addDateActionTypeAttributes;
  dateNum: number;
};

export type addDateActionTypeAttributes =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export type stripePaymentMethodResultAttributes = {
  paymentMethodId: string;
  cardBrand: string;
  lastFourDigit: string;
  exp_month: number;
  exp_year: number;
  type?: string;
};

export type StripeCardIndexComponent = {
  isCardInput: boolean;
  paymentMethods: stripePaymentMethodResultAttributes[];
  stripeObjects: StripePaymentAttributes;
  stripeClientSecret?: string;
  isManageProfile: boolean;
  customFunction?: (data: stripeCustomFunctionParamsAttributes) => void;
};

export type stripeCustomFunctionParamsAttributes = {
  pmId: string;
  event?: "add_new_card" | "";
};

export type stripePaymentFlowBackendResponseAttributes = {
  clientSecret: string;
  paymentMethod: stripePaymentMethodResultAttributes[];
  userId: string;
};

export interface PointsResponseDataAttributes {
  pointExpiration: PointExpirationDataAttributes[];
  subscribersPoints: SubscribersPointsTableAttributes[];
  isAccess: boolean;
  stats: clientResponseDataStasAttributes[];
  totalPageSize?: number;
  totalDocumentSize?: number;
}

export type PointExpirationDataAttributes = {
  timeFrame: PointExpirationTimeFrameAttributes;
  subscribers: string;
  expiringPoints: string;
};

export type SubscribersPointsTableAttributes = {
  subscribers: string;
  totalPoints: string;
  totalRedeemed: string;
  pointBalanceAfterRedeem: string;
  subscriptionName: string;
  activityLogs: orderActivityLog[];
  profilePicture: string;
  subscriberEmail: string;
  subscriberId?: string;
};

export type paymentInitializationAttributes = {
  paymentProvider: paymentProviderAttributes;
  tierPlanId: string;
  billingCycle: billingCircleAttributes;
  isLoggedInUser: boolean;
  eventType?: stripeMetaDataEventTypeAttributes;
  setUpEventType?: setUpEventType;
  paymentMethodId?: string;
  reqAction?: reqActionPaymentAttributes;
};

export type setUpEventType = "add_card" | "payment_request";
export type reqActionPaymentAttributes = "additional_paymentMethod_event" | "";

export type PointExpirationTimeFrameAttributes =
  | "1 Month or Less"
  | "3 Months or Less"
  | "6 Months or Less"
  | "Others";

export interface SinglePointExpirationRangeDataResponse {
  users: SinglePointExpirationRangeAttributes[];
  isAccess: boolean;
  stats: clientResponseDataStasAttributes[];
}

export interface SinglePointExpirationRangeAttributes {
  picture: string;
  name: string;
  email: string;
  expiringPoints: string;
}
export type pointExpiryModalEvents =
  | "point_expiry_details"
  | "point_user_details"
  | "subscribers_view_event"
  | "none";
export type managePointComponentAttributes = {
  modalState: boolean;
  selectedRange: PointExpirationTimeFrameAttributes;
  event: pointExpiryModalEvents;
};

export type ManagePointChildComponentsStateAttributes = {
  pointComponentState: managePointComponentAttributes;
  setPointComponentState: React.Dispatch<
    React.SetStateAction<managePointComponentAttributes>
  >;
};

export interface customTiptalEditor {
  textValue: string;
  setTextValue?: Function;
  tools?: customTipTalToolsAttributes[];
  editorToolType?: tiptapEditorStyleAttributes;
  editable: boolean;
  className?: string;
  headClassName?: string;
  editorDivClassName?: string;
}

export type tiptapEditorStyleAttributes = "full" | "custom" | "no_heading";

export type customTipTalToolsAttributes =
  | "heading"
  | "bold"
  | "italic"
  | "underline"
  | "link";

export type headerStringValues = "H1" | "H2" | "H3" | "Normal";

export interface sendEmailTextEditorAttributes extends customTiptalEditor {
  customFunction?: () => void;
  modalState: boolean;
  closeModal: () => void;
  onChange?: (data: customInputOnchangeDataAttributes) => void;
  subject?: string;
}

export type EmailModelAttributes = {
  reciepients: string[];
  message: string;
  sender: string;
  subject?: string;
  header?: string;
  isScheduled: boolean;
  schedualedDate: string;
  isEmailCampaign: boolean;
  emailCampaignName?: string;
  deliveryStatus?: emailModelDeliveryStatus;
};

export type emailModelDeliveryStatus = "delivered" | "pending" | "failed";
export type SubscriptionStatusAttributes =
  | "activated"
  | "unactivated"
  | "expired"
  | "cancelled";

export type billingCircleAttributes = "monthly";
export type customerSubscriptionDetailsAttributes = {
  subscriptionPlanName: string;
  subscriptionStatus: SubscriptionStatusAttributes;
  nextBillingDate: string;
  subscriptionPrice: string;
  subscriptionPoint: string;
  billyCycle: billingCircleAttributes;
  totalPoints: string;
  totalPointMoneyValue: string;
  lastPointEarned: string;
  upcomingPointExpiration: string;
  pointRedemptionLog: TripRedemtionAttributes[];
  activityLogs: orderActivityLog[];
  subscriptionActivityLogs: orderActivityLog[];
  lastPointEarnedDate: string;
  activeTierPlans: Tier[]; //all system tier plans
};

export type partialTierPlanAttributes = {
  name: string;
  monthlyFee: string;
  pointsPerMonth: string;
};

export type TripRedemtionAttributes = {
  tripId: string;
  tripName: string;
  date?: string;
  pointUsed: string;
  tripImage?: string;
  tripStartDate: string;
  tripEndDate: string;
};
export type paymentModeAttributes = "cash" | "card" | "no payment";

export type creditBonusTypeAttribute = "Credit" | "Bonus" | "Payment";
export interface paymentDetailsAttributes {
  paymentIntentId: string;
  amount: string | number;
  stripeChargeId: string;
  dateCreated: string | Date;
  status: "paid" | "refunded" | "pending" | "cancelled";
  paymentMode?: paymentModeAttributes;
  cashType: creditBonusTypeAttribute;
  stripeFeeCurrency?: "usd" | string;
  stripeFee?: string;
  subscriptionPlanId: string;
  paymentProvider: paymentProviderAttributes;
}

export interface userDashboardStateAttributes {
  modalState: boolean;
}

export type userDashboardChildrenPropsAttributes = {
  userDashboardState: userDashboardStateAttributes;
  setUserDashboardState: React.Dispatch<
    React.SetStateAction<userDashboardStateAttributes>
  >;
};

export type LayoutComponentProps = reactChildrenNodeAttributes & {
  className?: string;
  parentDivClassName?: string;
};

export type customerTripSummaryAttributes = {
  totalBookedTrip: string;
  totalPointsUsed: string;
  totalAvailableTrips: string;
  trips: TripDataAttributes[];
  totalPages?: number;
};
export type customerFetchTripEventTypeAttributes = "all" | "booked";

export interface esignatureAttributes {
  contractUserId: string;
  imgPublicURL: string;
  text: string;
  plainText?: string;
  img: string;
  contractOwnerEmail?: string;
  header: {
    headerTitle: string;
    headerColour: string;
    headerTextColor: string;
  };
}

export interface tripSubscriptionPlatformResponseData {
  _id: string;
  tripName: string;
  startDate?: Date | string;
  endDate?: Date | string;
  destination: string;
  tripImages: string[];
  tripImagePublicId: string[];
  tripMinimumGroupSize: number;
  tripMaximumGroupSize?: number;
  description?: string;
  isPublished: boolean;
  tripPathString?: string;
  tripIncludedItem?: IncludedNonIncludedAttributes[];
  tripNotIncludedItem?: IncludedNonIncludedAttributes[];
  istripItinarary?: boolean;
  tripItinarary?: intenararyValueAttributes[];
  tripIsAddOn?: boolean;
  tripAddOns?: tripAddOnAttributes[];
  tripBelongsTo: string;
  tripBelongsToName: string;
  tripPackages?: tripSubPackages[];
  salesCount?: string;
  isWaitList?: boolean;
  eventType?: string;
  tripOwnerProfile: profileResponseAttributes;
  userTotalPoint: string;
  contractEsignature: esignatureAttributes | null;
}
export interface IncludedNonIncludedAttributes {
  title: string;
  description: string;
}
export interface intenararyValueAttributes {
  eventImageURL?: string;
  eventPublicImageURL?: string;
  eventTitle: string;
  eventName: string;
  description?: string;
  selectedEventIndex?: number | null;
  eventDate?: string;
}
export interface tripSubPackages {
  packageId: string;
  packageName: string;
  packageDescription: string;
  packageFullPrice: string;
  isPackageDeposit: boolean;
  packageDepositPrice: string;
  packageAvailability: string | number;
  packageSaleCount: number;
  packageDepositPaymentMethod: paymentMethodDepositeAttributes[];
  isTripSubPackageDeadline?: boolean;
  tripSubPackageDeadline?: string | Date;
  isSelectedIndex?: number | null;
  dateSelectionMode?: "Manual" | "Automatic" | null;
  automaticDateSetup?: null | automaticDateSetupAttributes;
  isSpecialOffer?: boolean;
  specialOfferValues?: specialOfferAttributes;
  isPackageClass?: packageClassAttributes;
  isDepositSpecialOffer?: boolean;
  isDepositSpecialOfferValues?: specialOfferAttributes;
  isInstallmentFee?: boolean;
  installmentFeePrice?: string;
}
export type packageClassAttributes = "adult" | "child" | "toddler";
export interface tripAddOnAttributes {
  addOnId: string;
  addOnName: string;
  addOnDescription: {};
  addOnPrice: string;
  addOnDepositPrice?: string;
  availability: number | string;
  addOnPaymentMethod: paymentMethodDepositeAttributes[];
}

export interface paymentMethodDepositeAttributes {
  depositName: string;
  dueDate: string | Date;
  amount: string;
  indexPosition?: string;
  paymentStatus: "paid" | "pending" | "canceled";
  paymentMethodId: string;
  hasRequestSent?: boolean;
  tripFullPrice?: string;
  isPaymentMethodArrayCount?: string | number;
  automaticDateSetup?: automaticDateSetupAttributes | null;
  dateSelectionMode?: "Manual" | "Automatic" | null;
  packageDepositPrice?: string;
  isLastBillingReqDate?: string;
}
export interface automaticDateSetupAttributes {
  startDate: number;
  interval: number;
  endDate: number;
}

export interface specialOfferAttributes {
  oldPrice?: string;
  discounted?: string;
}

export interface readMoreAttributes {
  text: string;
  className?: string;
  limit: string;
  readMoreClassName?: string;
  textDisplayer?: "richText" | "plainText";
  uniqueKey?: string;
}
export interface ItinerarySliderStateAttributes {
  selectedIndex?: number;
  isPopUpState: boolean;
  lessThan?: number;
  greaterThan?: number;
  payload?: intenararyValueAttributes;
}
export interface itinararyPopUpPropsAttributes {
  itinaryPopUpState: ItinerarySliderStateAttributes;
  setItinaryPopUPState: React.Dispatch<
    React.SetStateAction<ItinerarySliderStateAttributes>
  >;
  payload: intenararyValueAttributes;
}

export interface modalUiAttributes {
  btnText: string;
  modalTitletext?: string;
  children: ReactNode;
  className?: string;
  closeFunc?: Function;
  onClick?: Function;
  isBottonBorder: boolean;
  btnClassName?: string;
}

export interface profileResponseAttributes {
  userId: string;
  firstName: string;
  userPicture: string;
  about: string;
  coverPicture: string;
  termsandcondition: string;
  isSupportVerified: boolean;
  website: string;
  address1: string;
  address2: string;
  phoneNumber: string;
  professionalBodyMembership: string;
  isStripeReady: boolean;
  isVerified: boolean;
  isRestricted: boolean;
  role: userRoleAttributes;
  globalDiscount?: tripDiscountMethodAttributes[];
  isravelPartnerVendorId?: string;
  isValidSubscription?: boolean;
}

export interface tripDiscountMethodAttributes {
  discountCode: string;
  discountAmount: string;
  discountValidity: string | number;
  isDisountState?: boolean;
  isDiscountUpdate?: boolean;
  isDiscountType?: discountTypeAttributes;
  discountSelectedIndex?: number | null;
  discountUsedCount?: number;
  discountEventType?: discountEventTypeAttributes;
  isDiscountFor?: discountForAttributes;
  isEnabled?: boolean;
  _id?: string;
}
export type discountTypeAttributes = "$" | "%";
export type discountEventTypeAttributes =
  | "trip_level_event"
  | "global_discount_event";

export type discountForAttributes = "deposit_price" | "fullPackage_price";

export type LineItemType = "addOn_order" | "package_order";

export type OrderLineItem = {
  itemType: LineItemType;
  itemId: string; // packageId | addOnId
  itemName: string; // packageName | addOnName
  unitPrice: string; // parsed number
  quantity?: string; // 1..tripMaximumGroupSize
  packageId?: string;
  orderedItemDepositPrice?: string;
  orderedItemPaymentMethod?: paymentMethodDepositeAttributes[];
  installmentFeePrice?: string;
  isInstallmentFee?: boolean;
};

export type RedeemDraftState = {
  items: OrderLineItem[];
  selectedPackageId?: string | null;
};

export type PackageSelectionProps = {
  tripsData: tripSubscriptionPlatformResponseData;
  redeemDraft: OrderLineItem[];
  upsertItem: (
    item: { id: string; name: string; price: number },
    quantity: number,
    itemType: LineItemType
  ) => void;
  qtyOptions: string[];
  componentState: { selectedScreen: number };
};

export interface buyerDetails {
  participantFirstName: string;
  participantLastName: string;
  participantEmail: string;
  participantPhoneNumber?: string;
}

export interface participantDataAttributes {
  participantId?: string;
  packageId?: string;
  participantNameInfo: buyerDetails;
  packageName: string;
  questions: tripQuestionsAttributes[];
  textAnswer: {
    textValue: string;
    textQuestion: string;
    requiredStatus: boolean;
  }[];
  checkBoxAnser: {
    checkValue: string;
    checkQuestion: string;
    checkOption: checkBoxAnswerAttributes[];
    requiredStatus: boolean;
    checkedStatus: boolean[];
  }[];
  multipleChoiceAnswer: {
    checkValue: string[];
    checkQuestion: string;
    checkOption: multipleChoicesAnswerAttributes[];
    requiredStatus: boolean;
  }[];
  dateQuestionType: { checkValue: string; checkQuestion: string }[];
  fileQuestionType: {
    checkValue: { imageURL: string; publicImgURL: string }[];
    checkQuestion: string;
  }[];
  packageClass?: packageClassAttributes;
}

export interface tripQuestionsAttributes {
  tripQuestionType:
    | "Text"
    | "File"
    | "Date"
    | "Checkbox"
    | "Multiple choice"
    | "Plain";
  tripQuestionRequiredStatus: boolean;
  tripQuestionTextType?: string;
  tripQuestionDateTextType?: string;
  tripQuestionFileUpload?: string;
  tripQuestionCheckBoxType: checkBoxAttributes;
  tripQuestionMultipleChoiceType?: multipleChoicesAttributes;
  isTripQuestionStatus?: boolean;
  isTripQuestionUpdate?: boolean;
  isTripSelectedIndex?: number | null;
  tripQuestionPlainType?: string;
}

export interface checkBoxAttributes {
  checkBoxQuestion: string;
  checkBoxAnswerOption: checkBoxAnswerAttributes[];
  isOther: boolean;
}

export interface checkBoxAnswerAttributes {
  answerValue: string;
}

export interface multipleChoicesAttributes {
  multipleChoiceQuestion: string;
  multipleChoiceAnswerOption: multipleChoicesAnswerAttributes[];
  isOther: boolean;
}

export interface multipleChoicesAnswerAttributes {
  answerValue: string;
}

export type pointRedeemptionReqAttributes = {
  tripId: string;
  selectedItems: OrderLineItem[];
  committedPoint: string;
  orderId: string;
  participantData: participantDataAttributes[];
  esignatureImgURL?: string;
  esignaturePublicURL?: string;
};

export type redeemIndexComponentState = {
  pointInputState: boolean;
  selectedScreen: number;
  hasSignedContract?: boolean;
  signatureState?: boolean;
  esignatureImgURL?: string;
  esignaturePublicURL?: string;
};

export type PlatformSubscriptionPlansProps = {
  tiers: Tier[];
};

export interface OtpProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onResendClick?: () => void;
}

export interface ForgotPasswordProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface ResetPasswordProps {
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
}

export type orderStatusAttributes = "ongoing" | "paid" | "canceled" | "unpaid";

export interface orderDiscountMethodAttributes {
  orderDiscountCode: string;
  amount: string;
  hasUsedDiscount: boolean;
  isDiscountType: "$" | "%";
  originalOrderTotalPrice?: string;
  originalOrderDepositPrice?: string;
}

export interface orderedItemListAttributes {
  orderedItemName: string;
  orderedQuantity: string;
  orderItemPrice: string;
  orderItemSelectedIndex: string;
  orderedItemDepositPrice?: string;
  orderedItemPaymentMethod?: paymentMethodDepositeAttributes[];
  itemType?: LineItemType;
  itemClass?: packageClassAttributes;
  orderedItemId?: string;
}
export type orderPriceType = "Pay full amount" | "Pay Deposit";

export interface orderAttributes {
  tripId: string;
  tripStartDate: Date | string;
  tripEndDate: Date | string;
  tripName: string;
  tripTotalSum: string;
  tripDepositTotalSum: string;
  depositPaymentDetails?: paymentMethodDepositeAttributes[];
  orderStatus: orderStatusAttributes;
  paymentDetails: paymentDetailsAttributes[];
  userId: string;
  orderDiscountMethod: orderDiscountMethodAttributes;
  orderPriceType: orderPriceType;
  tripPriceType:
    | "One price for all participants"
    | "Different pricing packages";
  affiliateUserString: string;
  participantsData: participantDataAttributes[];
  canceledparticipants?: participantDataAttributes[];
  orderedItemList: orderedItemListAttributes[];
  payerLastName: string;
  payerFirstName: string;
  payerProfilePics: string;
  payerPhoneNumber: string;
  payerEmail: string;
  payerCustomId: string;
  totalAmountPaid: string; //this is to track how much has been paid by the user. Mainly useful for orders with installment payment arrangement
  orderBelongsTo: string;
  _id?: string;
  createdAt: Date | string;
  relatedToTrip?: string;
  orderNote?: string;
  orderActivityLogs?: orderActivityLog[];
  numAddOn: number;
  isPaymentPlanActive: boolean;
  eSignature?: { esignatureImgURL: string; esignaturePublicURL: string };
  tripDestination?: string;
  cashSelection?: {
    cashAmount: number | string;
    cashSelectionType: creditBonusTypeAttribute;
  };
  isBalanceAdjustment?: boolean;
  balanceAdjustmentProperties?: balanceAdjustmentPropertiesAttributes[];
  isLastBillingReqDate?: string | Date;
  processingFeeTotalSum?: string;
  installmentFee?: string;
  lastChargedIdempotencyKey?: string;
  updatedAt?: string;
}

export interface balanceAdjustmentPropertiesAttributes {
  previousBalance: number | string;
  newBalance: number | string;
  date: string | Date;
  orderPreviousTotalSum: string | number;
  orderNewTotalSum: string | number;
}

export type CustomerOrderedTripStatsAttributes = {
  tripName: string;
  tripImage: string;
  organizer: string;
  startDate: string;
  tripAddOn: tripAddOnAttributes[];
  endDate: string;
  participantSum: string;
  orderTotalSum: string;
  orderTotalAmountPaid: string;
  remainingBalance: string;
  redeemedPoints: string;
  unUsedPoints: string;
  tripId: string;
  orders: orderAttributes[];
  tripMaxGroupSize: string;
};

export type OrderListDetailsComponentStates = {
  redeemPointModal: boolean;
  viewDetailsModal: boolean;
  orderTotalSum: string;
  totalAmountPaid: string;
  order: orderAttributes | null;
  addOnModalState: boolean;
};

// Dashboard Types
export type DashboardModeAttributes = "demo" | "real";

export interface DailyMetricPoint {
  date: string;
  value: number | string;
}

export interface MonthlyMetricPoint {
  month: string;
  value: number;
}

export interface ProductMetric {
  name: string;
  revenue: number;
  units: number;
  satisfaction: number | string;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  users: number;
}

export interface CustomerSegment {
  segment: string;
  count: number;
  value: number;
}

export interface ChartCategory {
  category?: string;
  region?: string;
  value?: number;
  percentage?: number;
  revenue?: number;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: "positive" | "warning" | "neutral";
  actionable: boolean;
}

export interface SummaryMetrics {
  totalRevenue: number;
  totalUsers: number;
  activeUsers: number;
  conversionRate: number | string;
  customerRetention: number | string;
  avgSessionDuration: number;
  bounceRate: number | string;
}

export interface MetricDataAttributes {
  mode: DashboardModeAttributes;
  timePeriod: {
    startDate: string;
    endDate: string;
    type: "30days" | "90days" | "12months" | "custom";
  };
  summaryMetrics: SummaryMetrics;
  dailyMetrics: {
    revenue: DailyMetricPoint[];
    engagement: DailyMetricPoint[];
    conversion: DailyMetricPoint[];
  };
  monthlyMetrics: {
    revenue: MonthlyMetricPoint[];
  };
  productMetrics: ProductMetric[];
  trafficSources: TrafficSource[];
  customerSegments: CustomerSegment[];
  chartData: {
    revenueByCategory: ChartCategory[];
    geographicDistribution: ChartCategory[];
  };
  aiInsights: AIInsight[];
  lastUpdated: string;
}

export interface DashboardInitialStateAttributes {
  mode: DashboardModeAttributes;
  metrics: MetricDataAttributes | null;
  insights: any | null;
  isLoading: boolean;
  error: string | null;
  csvUploadProgress: number;
  lastUpdated: string | null;
}

export type DashboardActionAttributes =
  | {
      type: "SET_MODE";
      payload: DashboardModeAttributes;
    }
  | {
      type: "SET_METRICS";
      payload: MetricDataAttributes | null;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_ERROR";
      payload: string;
    }
  | {
      type: "CLEAR_ERROR";
    }
  | {
      type: "SET_CSV_UPLOAD_PROGRESS";
      payload: number;
    }
  | {
      type: "SET_INSIGHTS";
      payload: any;
    }
  | {
      type: "RESET_DASHBOARD";
    };

export interface DashboardContextAttributes {
  dashboardState: DashboardInitialStateAttributes;
  dashboardDispatch: React.Dispatch<DashboardActionAttributes>;
}

// Metric Card Types for easy mapping
export interface MetricCardAttributes {
  type: "MRR" | "Total Users" | "New Users" | "Churn Rate";
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
  value: number | string;
  growth: number | string;
  growthType?: "positive" | "negative" | "neutral"; 
  format?: "currency" | "number" | "percentage"; 
}

export interface MetricCardsCollectionAttributes {
  cards: MetricCardAttributes[];
}
