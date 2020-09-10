import {IMyEvent} from "@controller/function-event-hub";
import {IHistoryEvent} from "@controller/function-history-navigation";

export interface SearchBoxEvent extends IMyEvent<String, String> {
    detail: {
        args: String,
        callback?(values: String): void
    }
}

type historyParameter = {
    q: string
}
export interface SearchBoxHistoryEvent extends IHistoryEvent<historyParameter> {
    detail: {
        args: historyParameter
    }
}
