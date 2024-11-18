import type { DateRangePickerProps, DateValue, ValidationResult } from 'react-aria-components';
import {
    Button,
    CalendarCell,
    CalendarGrid,
    DateInput,
    DateRangePicker,
    DateSegment,
    Dialog,
    FieldError,
    Group,
    Heading,
    Label,
    Popover,
    RangeCalendar,
    Text,
} from 'react-aria-components';

interface MyDateRangePickerProps<T extends DateValue> extends DateRangePickerProps<T> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
}

export default function MyDateRangePicker<T extends DateValue>({ label, description, errorMessage, ...props }: MyDateRangePickerProps<T>) {
    return (
        <DateRangePicker {...props}>
            <Label>{label}</Label>
            <Group>
                <DateInput slot="start">{(segment) => <DateSegment segment={segment} />}</DateInput>
                <span aria-hidden="true">–</span>
                <DateInput slot="end">{(segment) => <DateSegment segment={segment} />}</DateInput>
                <Button>
                    <img alt="" src="/svg/calendarGray.svg" />
                </Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
            <Popover>
                <Dialog>
                    <RangeCalendar>
                        <header>
                            <Button slot="previous">◀</Button>
                            <Heading />
                            <Button slot="next">▶</Button>
                        </header>
                        <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
                    </RangeCalendar>
                </Dialog>
            </Popover>
        </DateRangePicker>
    );
}
