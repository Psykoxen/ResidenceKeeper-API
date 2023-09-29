import sha256 from "sha256";
class User {
  id: number;
  username: string;
  email: string;
  keypass: string;

  constructor(id: number, username: string, email: string, keypass: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.keypass = keypass;
  }
}

export default User;
