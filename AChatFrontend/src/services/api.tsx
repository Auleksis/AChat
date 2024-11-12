import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Room, Token, User } from "./apiModels";

export const apiPublic: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_ENDPOINT,
});

export const apiPrivate: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("room_access_token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export async function login(
  username: string,
  password: string
): Promise<string> {
  const response = await apiPublic.post<Token>(
    "/users/login",
    new URLSearchParams({
      username,
      password,
    })
  );
  const token = response.data;

  return token.access_token;
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<string> {
  const response = await apiPublic.post<Token>("/users/register", {
    username,
    email,
    password,
  });
  const token = response.data;

  return token.access_token;
}

export async function getMyRooms(
  page: number = 0,
  count: number = 1000
): Promise<Array<Room>> {
  const response = await apiPrivate.post<Array<Room>>("/rooms/my_rooms", {
    page,
    count,
  });

  return response.data;
}

export async function findRooms(
  query: string,
  page: number = 0,
  count: number = 1000
): Promise<Array<Room>> {
  const response = await apiPrivate.post<Array<Room>>("/rooms/search_rooms", {
    query,
    page,
    count,
  });

  return response.data;
}

export async function getUsername(): Promise<User> {
  const response = await apiPrivate.get<User>("/users/username");

  return response.data;
}

export async function removeRoom(id: string): Promise<string> {
  const response = await apiPrivate.delete<string>(`/rooms/delete_room/${id}`);

  return response.data;
}

export async function createRoom(name: string): Promise<Room> {
  const response = await apiPrivate.post<Room>("/rooms/create_room", { name });
  const room = response.data;

  return room;
}

export async function joinRoom(id: string): Promise<Token> {
  const response = await apiPrivate.get<Token>("/rooms/join_room", {
    params: { room_id: id },
  });
  const room_access_token = response.data;

  return room_access_token;
}
