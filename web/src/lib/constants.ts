export const REVIEW_NUM_CAP = 300;
export const OPENAI_CAP = 75;

export const REQUIRED_COLUMNS = ["SKU", "首次评价", "首评时间"] as const;
export const OPTIONAL_COLUMNS = ["追加评价", "追评图片", "首评图片"] as const;

export const EMPTY_REVIEW = "此用户没有填写评价。";

export const MAX_UPLOAD_SIZE = 6 * 1024 * 1024; // 6 MB
export const ALLOWED_FILE_TYPES = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
