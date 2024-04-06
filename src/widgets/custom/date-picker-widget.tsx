// import React, { useEffect, useMemo, useState } from 'react';
// import Dropdown from './dropdown';
// import { Label } from '../../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
// import { TWidgetProps } from '../../types';

// export const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

// const generateArray = (start: number, end: number) =>
//   Array.from({ length: end - start + 1 }, (_, index) =>
//     (start + index).toString()
//   );

// type DatePickerProps = TWidgetProps<{
//   name?: string;
//   id?: string;
//   defaultValue?: string;
//   disabled?: boolean;
//   required?: boolean;
//   value?: string
//   onChange?: (date: Date) => void;
// }>;
// type TDate = {
//   day: string;
//   month: string;
//   year: string;
// };
// const DatePickerWidget = ({
//   defaultValue,
//   value,
//   disabled,
//   name,
//   id,

//   onChange,
// }: DatePickerProps) => {
//   const years = useMemo(
//     () => generateArray(1800, new Date().getFullYear()).reverse(),
//     []
//   );
//   const days = useMemo(() => generateArray(1, 31), []);

//   const [date, setDate] = useState<TDate>({
//     day: new Date().,
//     month: '',
//     year: '',
//   });

//   const handleOnChangeDay = (value: string) => {
//     setDate({
//       ...date,
//       day: value,
//     });
//   };
//   const handleOnChangeMonth = (value: string) => {
//     setDate({
//       ...date,
//       month: value,
//     });
//   };
//   const handleOnChangeYear = (value: string) => {
//     setDate({
//       ...date,
//       year: value,
//     });
//   };

//   useEffect(() => {
//     if (
//       onChange &&
//       typeof onChange === 'function' &&
//       date.day &&
//       date.month &&
//       date.year
//     ) {
//       onChange(new Date(`${date.day} ${date.month} ${date.year}`));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [date]);

//   return (
//     <div className="flex flex-col gap-1" id={id}>
//       <div className="flex gap-4 items-center">
//         <Select>
//           <SelectTrigger
//             name={props.property?.location ?? props.property?.id}
//             defaultValue={props.property?.default as string}
//           >
//             <SelectValue placeholder={props.property.placeholder} />
//           </SelectTrigger>
//           <SelectContent>
//             {props.property?.enum &&
//               props.property.enum.map((item, index) => (
//                 <SelectItem
//                   key={`widgetmanager.select.defaultselect.option.${props.property.id}.${index}`}
//                   value={item}
//                 >
//                   {item}
//                 </SelectItem>
//               ))}
//           </SelectContent>
//         </Select>
//         <Dropdown
//           label=""
//           className="w-20"
//           items={days}
//           selectProps={{
//             defaultValue: day,
//             onValueChange: handleOnChangeDay,
//           }}
//           selectTriggerProps={{
//             isError: isError,
//           }}
//           selectValueProps={{
//             placeholder: 'Day',
//           }}
//         />
//         <Dropdown
//           label=""
//           items={months}
//           className="w-40"
//           selectProps={{
//             defaultValue: month,
//             onValueChange: handleOnChangeMonth,
//           }}
//           selectTriggerProps={{
//             isError: isError,
//           }}
//           selectValueProps={{
//             placeholder: 'Select Month',
//           }}
//         />
//         <Dropdown
//           label=""
//           items={years}
//           className="w-28"
//           selectProps={{
//             defaultValue: year,
//             onValueChange: handleOnChangeYear,
//           }}
//           selectTriggerProps={{
//             isError: isError,
//           }}
//           selectValueProps={{
//             placeholder: 'Select year',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DatePickerWidget;

import React, { FC } from 'react';
import { TWidgetProps } from '../../types';

const DatePickerWidget: FC<TWidgetProps> = props => {
  return (
    <input
      type="date"
      name={props.property.id}
      readOnly={props?.property.readOnly}
      required={props?.property.required}
      placeholder={props.property?.placeholder}
      defaultValue={props.property?.default as string}
      disabled={props.property?.disabled}
      pattern={props.property?.pattern}
    />
  );
};

export { DatePickerWidget };
