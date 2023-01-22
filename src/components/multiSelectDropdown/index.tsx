import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useState
} from 'react';
import { companies } from '../../data/companies';
import { MultiSelect } from 'react-multi-select-component';
import { areaProps, companiesProps } from '../../types/jsonFile';
import * as _ from 'lodash';
interface SelectProps {
  label: string;
  value: string;
}

type DataProp = areaProps | companiesProps;

interface MultiSelectDropdownProps {
  data: DataProp[];
  property: string;
  onChange: (e: SelectProps[]) => void;
}

const MultiSelectDropdown = forwardRef(
  ({ onChange, data, property }: MultiSelectDropdownProps, ref) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectProps[]>([]);

    const options = _.uniqBy(
      data.map((item) => {
        return {
          label: item[property as keyof DataProp],
          value: item[property as keyof DataProp]
        };
      }),
      'value'
    );

    useImperativeHandle(ref, () => ({
      clear() {
        setSelectedOptions([]);
      }
    }));

    return (
      <div>
        <MultiSelect
          options={options}
          value={selectedOptions}
          onChange={(e: SelectProps[]) => {
            setSelectedOptions(e);
            onChange(e);
          }}
          labelledBy="Select"
        />
      </div>
    );
  }
);

export default MultiSelectDropdown;
export type { SelectProps };
