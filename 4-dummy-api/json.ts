import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const url = 'https://dummyjson.com/users';

const enum Gender {
  male = 'male',
  female = 'female',
}

interface Address {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maideName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
    address: Address;
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

interface IResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

interface IHttpRequestParams {
  url: string;
}

interface IHttpClient {
  get<T>(parameters: IHttpRequestParams): Promise<T>;
}

interface IUsersApiClient {
  fetchUsers: () => Promise<IResponse>;
}

interface IUsersApiClientUrls {
  fetchUsers: string;
}

class HttpClientModel implements IHttpClient {
  constructor() {}

  get<T>(parameters: IHttpRequestParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url } = parameters;

      const options: AxiosRequestConfig = {
        headers: {},
      };

      axios
        .get(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosError) => {
          console.info('-->rejecting<--');
          reject(response);
        });
    });
  }
}

const HttpClient = new HttpClientModel();

class UsersApiClientModel implements IUsersApiClient {
  private readonly urls!: IUsersApiClientUrls;

  constructor(urls: IUsersApiClientUrls) {
    this.urls = urls;
  }

  fetchUsers(): Promise<IResponse> {
    const params: IHttpRequestParams = {
      url: this.urls.fetchUsers,
    };

    return HttpClient.get<IResponse>(params);
  }
}

const UsersApiClient = new UsersApiClientModel({ fetchUsers: url });

UsersApiClient.fetchUsers()
  .then((data) => {
    const users = data.users;
    users.forEach((user) => {
      console.info(`username: ${user.username}`);
      console.info(`email: ${user.email}`);
      console.info(`domain: ${user.domain}`);
      console.info('---');
    });
  })
  .catch((error: AxiosError) => {
    console.error(error.message);
  });
