import { createClient, type ConnectRouter, type ServiceImpl, type Transport } from "@connectrpc/connect";

import { SessionService } from "./generated/session_pb";
export { type Session } from "./generated/session_pb"

export class HostingClient {
    readonly sessions;

    constructor(readonly transport: Transport) {
        this.sessions = createClient(SessionService, this.transport)
    }
}

export abstract class HostingBackend {
    abstract sessions: ServiceImpl<typeof SessionService>

    addRoutes(router: ConnectRouter) {
        router.service(SessionService, this.sessions)
    }
}