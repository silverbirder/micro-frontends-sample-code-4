import {IMyEvent} from "@controller/function-event-hub";
import {IHistoryEvent} from "@controller/function-history-navigation";

export const eventType = {
    'eventHubName': 'trigger-event-hub',
    'historyNavigationName': 'trigger-history-navigation'
};

export interface SearchBoxEvent extends IMyEvent<String, String> {
    detail: {
        args: String,
        callback?(values: String): void
    }
}

export interface SearchBoxHistoryEvent extends IHistoryEvent<any> {
    detail: {
        args: any
    }
}
