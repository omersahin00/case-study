export interface EndpointAttributes {
    handler: Function;
    method: "GET" | "POST" | "PUT" | "DELETE";
    auth: boolean;
}

export interface EndpointGroup {
    [key: string]: EndpointAttributes | EndpointGroup; // iç içe olan yönlendirmeler için
}
