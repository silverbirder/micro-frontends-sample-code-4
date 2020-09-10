export interface IHistoryEvent<A> extends CustomEventInit {
    detail: {
        args: A
    }
}
