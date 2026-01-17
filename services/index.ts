import { err, log } from "@/utils/logger";
import axios, { AxiosError, AxiosResponse } from "axios";

export const CDN_URL = "https://hunter.akbolat.net";

export interface IApiError extends AxiosError {}
export interface IAxiosResponse extends AxiosResponse {}

export type IResponse = {
  data: any[] | any;
  status: boolean;
  message: string;
  error: string;
};

export const axiosApi = axios.create({
  baseURL: "https://hunter.akbolat.net/api",
});

axiosApi.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function get(url = "", isDocument = false) {
  log("[GET]", url);

  try {
    const response = await axiosApi.get(url);
    return {
      data: response.data,
      error: null,
      success: response.status === 200,
    };
  } catch (error) {
    return {
      data: null,
      error: handleError(error as IApiError),
      success: false,
    };
  }
}

export async function post(url = "", data: any = null) {
  log("[POST]", url);
  try {
    const response = await axiosApi.post(url, data);
    return {
      data: response.data,
      error: null,
      success: response.status < 400,
    };
  } catch (error) {
    return {
      data: null,
      error: handleError(error as IApiError),
      success: false,
    };
  }
}

export async function put(url = "", data: any = null) {
  log("[PUT]", url);

  try {
    const response = await axiosApi.put(url, data);
    return {
      data: response.data,
      error: null,
      success: response.status === 200,
    };
  } catch (error) {
    return {
      data: null,
      error: handleError(error as IApiError),
      success: false,
    };
  }
}

export async function remove(url = "") {
  log("[DELETE]", url);
  try {
    const response = await axiosApi.delete(url);
    return {
      data: response.data,
      error: null,
      success: response.status === 200,
    };
  } catch (error) {
    return {
      data: null,
      error: handleError(error as IApiError),
      success: false,
    };
  }
}

export async function postData(imageUri: string, fileName?: string) {
  log("[POST DATA]", "upload", imageUri);

  try {
    const formData = new FormData();

    // React Native için dosya formatı
    const file = {
      uri: imageUri,
      type: "image/jpeg",
      name: fileName || `photo_${Date.now()}.jpg`,
    } as any;

    formData.append("files", file);

    const response = await axiosApi.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { data: response.data, error: null, success: true };
  } catch (error) {
    return {
      data: null,
      error: handleError(error as IApiError),
      success: false,
    };
  }
}

export function handleError(error: IApiError) {
  const errorBody = error?.response?.data
    ? error.response.data
    : { message: `${error}` };
  if (error?.status === 401) {
    err("401: Yetkisiz erişim", error);
  }
  return errorBody;
}
