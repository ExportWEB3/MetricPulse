import type { AxiosResponse } from "axios";
import Big from "big.js";
import { axiosPrivate } from "./baseURL";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { mutate } from "swr";
import type { addDateActionTypeAttributes, addDateAttributes, clientResponse, LineItemType, OrderLineItem, RedeemDraftState, userAttributes, userRoleAttributes } from "./typefiles";

export const refreshFunc = async (): Promise<{
  token: string;
  user: userAttributes;
} | null> => {
  try {
    const response: AxiosResponse<clientResponse> = await axiosPrivate.post(
      `/refresh`
    );

    const payload = response?.data?.payload as {
      token: string;
      user: userAttributes;
    };

    return payload;
  } catch (error) {
    throw error;
  }
};

export const displayCurrency = (stringDigital: number | string) => {
  const expression = /[^0-9 .\-]/g;

  if (
    stringDigital == null ||
    (typeof stringDigital !== "string" && typeof stringDigital !== "number")
  ) {
    return ""; // Return null or a default fallback, like "Invalid Value"
  }
  const amountToString = stringDigital?.toString();

  // Check if the string is a valid number
  if (!amountToString) {
    return ""; // Return empty string for invalid input
  }

  const m = amountToString?.replace(expression, "");

  // Ensure the result is a valid number
  const sanitizedNumber = parseFloat(m);

  if (isNaN(sanitizedNumber)) {
    return ""; // Return empty string if the sanitized value is not valid
  }

  const fixedurrency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    currencyDisplay: "narrowSymbol",
  }).format(Number(m));
  return fixedurrency;
};

export const formatToTitleCase = (input: string) => {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/[_\-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

//filter out non digits from strings
export const removeNonDigits = (stringValue: string) => {
  if (typeof stringValue !== "string" && typeof stringValue === "number") {
    return "";
  }
  const m = stringValue?.toString();
  const expression = /[^0-9 .\-]/g;

  const filteredNum = m?.replace(expression, "");

  return filteredNum;
};

//check for non number values
export const iSStringNumberValue = (stringValue: string[]) => {
  if (!Array.isArray(stringValue)) return [false];
  return stringValue?.map((item) => /^-?\d+(\.\d+)?$/.test(item));
};

export function validateNumericString(
  value: string,
  options?: { allowDecimal?: boolean }
): true | string {
  if (typeof value !== "string" || value.trim() === "") {
    return "Value must be a non-empty string";
  }

  const allowDecimal = options?.allowDecimal ?? false;

  if (allowDecimal) {
    // allow integers or decimals
    if (!/^\d+(\.\d+)?$/.test(value)) {
      return "Value must be a valid number";
    }
  } else {
    // only allow whole numbers
    if (!/^\d+$/.test(value)) {
      return "Value must be a valid whole number";
    }
  }

  return true;
}

export const convertDate = (params: {
  date: Date | string;
  isFortmat?: boolean;
  isFormatStructure?: string;
}) => {
  const { date, isFortmat, isFormatStructure } = params;
  let converted: string = "";

  isFortmat
    ? (converted = dayjs(date)
        .utc()
        .format(isFormatStructure ? isFormatStructure : "MMM-DD-YYYY"))
    : (converted = dayjs(date).utc().format());

  return converted;
};

export const isValidDate = (input: string | Date): boolean => {
  if (!input) return false;

  const date = dayjs(input);
  return date.isValid();
};

export const allowedAdminRoles: userRoleAttributes[] = [
  "admin_mit",
  "dev_user_mit",
  "super_user_mit",
  "support_agent_mit",
];
export const isAdminValidation = (params: {
  userRole: userRoleAttributes;
}): { isValid: boolean } => {
  const { userRole } = params;

  if (!userRole || typeof userRole !== "string") return { isValid: false };

  if (allowedAdminRoles?.includes(userRole)) return { isValid: true };

  return { isValid: false };
};

export const displayNumber = (stringDigital: number | string) => {
  if (!stringDigital) return "0";
  const expression = /[^0-9 .\-]/g;
  const amountToString = stringDigital.toString();
  const cleaned = amountToString.replace(expression, "");

  // Format as integer (no decimals) with thousands separator
  return Number(cleaned).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};

export const calculateCurrency = (
  amount: number | string,
  actionType:
    | "multiply"
    | "addition"
    | "subtraction"
    | "division"
    | "percentage"
    | "no-action"
    | "of_percentage",
  actionValue: number | string
) => {
  const expression = /[^0-9 .\-]/g;
  const constantNumber = new Big(100);

  const filteredNum = amount
    ? amount?.toString()?.replace(expression, "")
    : "0";
  const filterActionNum = actionValue
    ? actionValue?.toString()?.replace(expression, "")
    : "0";

  const parsedNum = new Big(filteredNum);
  const parsedActionNum = new Big(filterActionNum);

  let result = new Big(0);

  switch (actionType) {
    case "addition":
      result = parsedNum.plus(parsedActionNum);
      break;

    case "subtraction":
      result = parsedNum.minus(parsedActionNum);
      break;

    case "multiply":
      result = parsedNum.times(parsedActionNum);
      break;

    case "division":
      result = parsedActionNum.eq(0)
        ? new Big(0)
        : parsedNum.div(parsedActionNum);
      break;

    case "percentage":
      result = parsedNum.times(parsedActionNum).div(constantNumber);
      break;

    case "no-action":
      result = parsedNum.times(constantNumber);
      break;

    case "of_percentage":
      result = parsedActionNum.eq(0)
        ? new Big(0)
        : parsedNum.div(parsedActionNum).times(constantNumber);
      break;
  }

  return result.toFixed(2);
};

export const generateAddDate = (params: addDateAttributes): string => {
  const { actionType, dateNum } = params;
  const validUnits = [
    "millisecond",
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  if (
    !actionType ||
    !validUnits.includes(actionType) ||
    typeof dateNum !== "number" ||
    !Number.isFinite(dateNum)
  ) {
    return "";
  }
  let date = dayjs();

  date = date.add(dateNum, actionType as addDateActionTypeAttributes);
  if (!date.isValid()) return "";
  return convertDate({ date: date.utc().format(), isFortmat: true });
};

export const invalidateSWRKeys = (keys: string[]) => {
  if (!Array.isArray(keys)) return;

  keys.forEach((key) => {
    if (typeof key === "string") {
      mutate(key);
    }
  });
};

export const upsertItemUtil = (
  prev: RedeemDraftState,
  item: OrderLineItem,
  quantity: string,
  itemType: LineItemType
): RedeemDraftState => {
  let newItems = [...prev.items];

  // find if this item already exists
  const existingIndex = newItems.findIndex(
    (it) => it.itemType === itemType && it.itemId === item?.itemId
  );

  if (Number(quantity) === 0) {
    if (existingIndex > -1) {
      newItems.splice(existingIndex, 1);
    }
  } else {
    if (existingIndex > -1) {
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity,
      };
    } else {
      newItems.push({
        itemType,
        itemId: item?.itemId,
        itemName: item?.itemName,
        unitPrice: item?.unitPrice,
        quantity,
        packageId: item?.packageId,
        installmentFeePrice: item?.installmentFeePrice,
        isInstallmentFee: item?.isInstallmentFee,
      });
    }
  }

  return {
    ...prev,
    items: newItems,
    selectedPackageId:
      itemType === "package_order" && Number(quantity) > 0
        ? item?.itemId
        : prev.selectedPackageId,
  };
};
