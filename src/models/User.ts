export default interface User {
  id: string;
  email: string;
  name?: string;
  enabled: boolean;
  image?: string;
  updateAt?: string;
  createdAt?: string;
  provider: string;
}
