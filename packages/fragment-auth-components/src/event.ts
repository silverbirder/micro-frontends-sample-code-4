import {IMyEvent} from "@controller/function-event-hub";

export interface AuthEvent extends IMyEvent<Boolean, Boolean> {
    detail: {
        args: Boolean,
        callback?(values: Boolean): void
    }
}

export {eventType} from '@type/common-variable';
