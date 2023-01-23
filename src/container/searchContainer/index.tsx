import React, { useRef, useState } from 'react';
import { companies } from '../../data/companies';
import { areas } from '../../data/areas';
import  {Button,MultiSelectDropdown}  from '../../components';
import { connect } from 'react-redux';
import { SelectProps } from 'react-multi-select-component';

const SearchContainer = ({
  setArea
}: {
  setArea: (e: {
    areaSelect: { value: string }[];
    countrySelect: { value: string }[];
  }) => void;
}) => {
  const [areaSelect, setAreaSelect] = useState<{ value: string }[] | []>([]);
  const [countrySelect, setCountrySelect] = useState<{ value: string }[] | []>(
    []
  );
  const companyRef: any = useRef(null);
  const stateRef: any = useRef(null);

  return (
    <>
      <main className="mx-auto my-32">
        <h2 className="text-md font-semibold">Select Country and Area</h2>
        <div className="flex flex-col space-y-4">
          <MultiSelectDropdown
            ref={companyRef}
            onChange={(e: { value: string }[]) => setCountrySelect(e)}
            data={companies}
            property="country"
          />
          <MultiSelectDropdown
            ref={stateRef}
            onChange={(e: { value: string }[]) => setAreaSelect(e)}
            data={areas}
            property="state"
          />
          <div className="flex pb-12 flex-row space-x-2">
            <Button
              onClick={() => {
                setArea({ areaSelect, countrySelect });
              }}
              text="Search"
            ></Button>
            <Button
              onClick={() => {
                setArea({ areaSelect: [], countrySelect: [] });
                companyRef?.current?.clear();
                stateRef?.current?.clear();
              }}
              text="Clear"
            ></Button>
          </div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state: {
  area: {
    areaSelect: { value: string }[];
    countrySelect: { value: string }[];
  };
}) => ({
  area: state.area
});

const mapDispatchToProps = (dispatch: Function) => ({
  setArea: (count: {
    areaSelect: { value: string }[];
    countrySelect: { value: string }[];
  }) => dispatch({ type: 'area', count })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
