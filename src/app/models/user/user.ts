export class User {

    id?: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor(name: string, email: string, password: string, isAdmin: boolean) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}
