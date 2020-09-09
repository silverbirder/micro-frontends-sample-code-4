export interface IMyEvent<A, C> extends CustomEventInit {
    detail: {
        args: A
        callback?(values: C): void
    }
}

export const eventHubName = 'trigger-event-hub';
