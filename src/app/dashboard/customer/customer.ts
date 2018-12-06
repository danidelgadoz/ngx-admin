export class Customer {
    id: string;
    documentType: string;
    documentNumber: string;
    name: number;
    phoneNumber: string;
    email: string;
    address: string;

    constructor(
        id: string,
        documentType: string,
        documentNumber: string,
        name: number,
        phoneNumber: string,
        email: string,
        address: string
    ) {
        this.id = id;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
    }
}
