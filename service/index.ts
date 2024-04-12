import type { UseFetchOptions } from "nuxt/app";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

const BASE_URL = "/server";
class HttpRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ) {
    return new Promise<T>((resolve: any, reject) => {
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        headers: {
          Authorization: localStorage.getItem("token") || "",
          //Authorization: "Bearer " + useRequestHeaders(["Cookie"]).cookie!.substring(6),
        },
        server: false,
        ...options,
      };
      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }
      if (method === "POST" || method === "PUT") {
        newOptions.body = data;
      }
      useFetch(url, newOptions)
        .then(({ data: response }) => {
          const serverResponse: ServerResponse<any> = response.value as any;
          switch (serverResponse.code) {
            case 0:
              if (method !== "GET") {
                useNuxtApp().$toast.success(serverResponse.message);
              }
              break;
            case -1:
              useNuxtApp().$toast.error(
                serverResponse.data || serverResponse.message
              );
              break;
            default:
              useNuxtApp().$toast.error(serverResponse.message);
          }

          resolve(response.value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 封装常用方法

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "GET", params, options);
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }

  put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "PUT", data, options);
  }

  delete<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "DELETE", params, options);
  }
}

const restUtil = new HttpRequest();

export default restUtil;
