import {IMyEvent} from "@controller/function-event-hub";
import {IHistoryEvent} from "@controller/function-history-navigation";

export const eventType = {
    'search-box-button-click': 'search-box-button-click',
    'search-box-keyword-history': 'search-box-keyword-history'
};

export interface SearchBoxEvent extends IMyEvent<String, String> {
    detail: {
        args: String,
        callback?(values: String): void
    }
}

export interface SearchBoxHistoryEvent extends IHistoryEvent<String> {
    detail: {
        args: String
    }
}
