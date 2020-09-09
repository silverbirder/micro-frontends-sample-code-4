export interface IHistoryEvent<A> extends CustomEventInit {
    detail: {
        args: A
    }
}

export const historyNavigationName = 'trigger-history-navigation';
