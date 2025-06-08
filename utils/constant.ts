export const SALT_ROUNDS = 10;

export const CLOUD_FOLDER_NAME = "milktea_pictures";

export const TAG_CATEGORY = {
  NEW_PRODUCT: 1,
  BEST_SELLER: 2,
  PROMO_DISCOUNT: 3,
};

export const PAYMENT_SERVICE = {
  PICKUP: 0,
  COD: 1,
};

export const ORDER_STATUS = {
  CONFIRMING: 0,
  PREPARING: 1,
  DELIVERING: 2,
  DELIVERED: 3,
  CANCELLED: 4,
};

export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};
